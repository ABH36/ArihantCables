import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  company?: string;
  phone: string;
  email: string;
  message: string;
  productRef?: string;
  categoryRef?: string;
  sourcePage: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    productRef: { type: String, trim: true },
    categoryRef: { type: String, trim: true },
    sourcePage: { type: String, default: "/contact" },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

InquirySchema.index({ status: 1, createdAt: -1 });

const Inquiry =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
