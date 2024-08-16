import { Schema, model } from "mongoose";

export const productSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    name: { type: String, require: [true, "name is required"] },
    description: { type: String, require: [true, "description is required"] },
    price: { type: Number, require: [true, "price is required"] },
    image: { type: String, require: [true, "image is required"] },
    category: { type: String, require: [true, "category is required"] },
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
