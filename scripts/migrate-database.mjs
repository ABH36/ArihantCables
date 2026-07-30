// One-off database migration: copies every collection and every document
// as-is (including original _id values, so Product.categoryId and
// Category.parentCategory references stay valid) from a source MongoDB
// database to a target MongoDB database. Safe to re-run — existing
// documents with the same _id in the target are replaced, not duplicated.
//
// Does NOT copy indexes. The app (via Mongoose) recreates its indexes
// automatically the first time it connects to the target database, since
// autoIndex is left at its default (true) in src/lib/db.ts.
//
// Usage:
//   node scripts/migrate-database.mjs "<source-mongodb-uri>" "<target-mongodb-uri>"
//
// or via environment variables:
//   SOURCE_MONGODB_URI="..." TARGET_MONGODB_URI="..." node scripts/migrate-database.mjs
//
// Run this from the project root (needs node_modules installed, since it
// uses the "mongodb" driver that ships as a dependency of mongoose).

import { MongoClient } from "mongodb";

const SOURCE_URI = process.env.SOURCE_MONGODB_URI || process.argv[2];
const TARGET_URI = process.env.TARGET_MONGODB_URI || process.argv[3];

if (!SOURCE_URI || !TARGET_URI) {
  console.error("Missing source and/or target MongoDB connection string.\n");
  console.error("Usage:");
  console.error('  node scripts/migrate-database.mjs "<source-uri>" "<target-uri>"');
  console.error("or:");
  console.error(
    '  SOURCE_MONGODB_URI="..." TARGET_MONGODB_URI="..." node scripts/migrate-database.mjs'
  );
  process.exit(1);
}

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI);
  const targetClient = new MongoClient(TARGET_URI);

  console.log("Connecting to source and target databases...");
  await sourceClient.connect();
  await targetClient.connect();

  const sourceDb = sourceClient.db();
  const targetDb = targetClient.db();

  console.log(`Source DB: ${sourceDb.databaseName}`);
  console.log(`Target DB: ${targetDb.databaseName}\n`);

  const collections = await sourceDb.listCollections().toArray();

  if (collections.length === 0) {
    console.log("No collections found in the source database. Nothing to do.");
  }

  for (const { name } of collections) {
    const docs = await sourceDb.collection(name).find({}).toArray();

    if (docs.length === 0) {
      console.log(`  ${name}: 0 documents, skipping`);
      continue;
    }

    // Remove any pre-existing docs with the same _id in the target so
    // this script can be safely re-run without creating duplicates.
    const ids = docs.map((d) => d._id);
    await targetDb.collection(name).deleteMany({ _id: { $in: ids } });
    await targetDb.collection(name).insertMany(docs, { ordered: false });

    console.log(`  ${name}: copied ${docs.length} document(s)`);
  }

  await sourceClient.close();
  await targetClient.close();

  console.log("\nMigration complete.");
  console.log(
    "Next step: update the MONGODB_URI environment variable (in EasyPanel / wherever the app is deployed) to the target connection string, then redeploy."
  );
}

migrate().catch((err) => {
  console.error("\nMigration failed:", err);
  process.exit(1);
});
