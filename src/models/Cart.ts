import { Schema, model } from "mongoose";

export const cartShema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId is required"],
    },
    data: [
      {
        productId: { type: Schema.Types.ObjectId, required: [true, "productId is required"] },
        name: { type: String },
        image: { type: String },
        ageRating: { type: String },
        price: { type: Number },
        platform: { type: [String] },
        _id: false
      }
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Cart = model("Cart", cartShema);
