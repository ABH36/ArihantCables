import mongoose, { Document, Schema } from "mongoose";

export interface IProductSpec {
  label: string;
  value: string;
}

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
  shortDescription?: string;
  description?: string;
  highlights: string[];
  specs: IProductSpec[];
  datasheetUrl?: string;
  displayOrder: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSpecSchema = new Schema<IProductSpec>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    sourceProductId: { type: String, required: true, trim: true },
    sourceUrl: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    size: { type: String, default: "" },
    length: { type: String, default: "" },
    priceINR: { type: Number },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    specs: { type: [ProductSpecSchema], default: [] },
    datasheetUrl: { type: String, default: "" },
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
