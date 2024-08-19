import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId },
    name: { type: String, required: "name is required" },
    email: { type: String, required: "email is required" },
    password: { type: String, required: "password is required" },
  },
  { timestamps: true, versionKey: false },
);

export const User = model("User", userSchema);
