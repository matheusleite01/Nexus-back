import { Schema, model } from "mongoose";

export const wishlistShema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    data: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: [true, "productId is required"],
        },
        name: { type: String },
        image: { type: String },
        ageRating: { type: String },
        category: { type: String },
        platform: { type: [String] },
        _id: false,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const Wishlist = model("Wishlist", wishlistShema);
