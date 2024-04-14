import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
}

export const userSchema = defineMongooseModel({
  name: "user",
  schema: {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      length: [8, "Password should be at least 8 characters long"],
    },
  },
});
