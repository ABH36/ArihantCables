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
 * A handful of the largest catalogue PDFs (12-31MB) still link to local
 * /public/documents/... instead — this Cloudinary account's raw-upload size cap
 * is 10MB even via chunked upload, which is a plan limit, not something fixable
 * from code.
 */
export function cldRaw(relativePath: string): string {
  const clean = relativePath.replace(/^\//, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/fl_attachment/${clean}`;
}
