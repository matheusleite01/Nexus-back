import { Schema, model } from "mongoose";

export const productSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    name: { type: String, required: [true, "name is required"] },
    description: { type: String, required: [true, "description is required"] },
    price: { type: Number, required: [true, "price is required"] },
    image: { type: String, required: [true, "image is required"] },
    category: { type: String, required: [true, "category is required"] },
    systemRequirements: {
      minimun: {
        operatingSystem: { type: String },
        processor: { type: String },
        memory: { type: String },
        graphics: { type: String },
        storage: { type: String },
      },
      recommended: {
        operatingSystem: { type: String },
        processor: { type: String },
        memory: { type: String },
        graphics: { type: String },
        storage: { type: String },
      },
    },
    releaseDate: { type: String },
    developer: { type: String },
    publisher: { type: String },
    ageRating: { type: String },
    platforms: { type: [String] },
    tags: { type: [String] },
  },
  { timestamps: true, versionKey: false },
);

export const Product = model("Product", productSchema);
