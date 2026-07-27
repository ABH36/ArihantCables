import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  sourceProductId: string;
  sourceUrl: string;
  imageUrl: string;
  size?: string;
  length?: string;
  priceINR?: number;
  displayOrder: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    sourceProductId: { type: String, required: true, trim: true },
    sourceUrl: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    size: { type: String, default: "" },
    length: { type: String, default: "" },
    priceINR: { type: Number },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

ProductSchema.index({ categoryId: 1, sourceProductId: 1 }, { unique: true });
ProductSchema.index({ categoryId: 1, status: 1, displayOrder: 1 });

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
