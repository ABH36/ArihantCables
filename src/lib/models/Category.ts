import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  parentCategory?: mongoose.Types.ObjectId;
  shortDescription: string;
  longDescription: string;
  heroText: string;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  imageUrl?: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
    shortDescription: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    heroText: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

CategorySchema.index({ status: 1, displayOrder: 1 });

const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
