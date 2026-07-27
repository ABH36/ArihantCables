import mongoose, { Document, Schema } from "mongoose";

export interface IDocument extends Document {
  title: string;
  slug: string;
  type: "pricelist" | "catalogue" | "brochure" | "datasheet";
  fileUrl: string;
  categoryId?: mongoose.Types.ObjectId;
  description?: string;
  issueDate?: Date;
  language: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: {
      type: String,
      enum: ["pricelist", "catalogue", "brochure", "datasheet"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    description: { type: String, default: "" },
    issueDate: { type: Date },
    language: { type: String, default: "en" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

DocumentSchema.index({ type: 1, status: 1 });

const ArihantDocument =
  mongoose.models.Document || mongoose.model<IDocument>("Document", DocumentSchema);

export default ArihantDocument;
