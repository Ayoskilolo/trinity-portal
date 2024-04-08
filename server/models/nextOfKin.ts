import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const nextOfKinSchema = defineMongooseModel({
  name: "nextofkin",
  schema: {
    _id: "UUID",
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: Date,
    sex: String,
    student: {
      type: Types.ObjectId,
      required: true,
      ref: "student",
    },
  },
});
