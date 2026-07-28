const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** Build a Cloudinary delivery URL for an image asset (public_id excludes extension). */
export function cldImage(relativePath: string): string {
  const clean = relativePath.replace(/^\//, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${clean}`;
}

/**
 * Build a Cloudinary delivery URL for a raw asset (PDFs etc — public_id includes
 * extension). Always forces `Content-Disposition: attachment` via fl_attachment,
 * since a plain HTML `download` attribute doesn't reliably trigger downloads for
 * cross-origin URLs like res.cloudinary.com.
 *
 * NOT currently used anywhere — this Cloudinary account has raw/PDF delivery
 * blocked by default (401 Unauthorized), which is a Cloudinary security setting
 * ("Allow delivery of PDF and ZIP files" under Console > Settings > Security),
 * not a code issue. All PDFs still link to /public/documents/... until that's
 * enabled; once it is, swap catalogue.json's `pdf` fields and pricelist/page.tsx's
 * `fileUrl` fields over to cldRaw(...) the same way the image fields use cldImage.
 */
export function cldRaw(relativePath: string): string {
  const clean = relativePath.replace(/^\//, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/fl_attachment/${clean}`;
}
