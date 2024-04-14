import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const surgeriesSchema = defineMongooseModel({
  name: "surgeries",
  schema: {
    _id: "UUID",
    student: {
      type: Types.ObjectId,
      required: true,
      ref: "student",
    },
    doctor: {
      type: Types.ObjectId,
      required: true,
      ref: "doctor",
    },
    dateCreated: Date,
    dateUpdated: Date,
    status: String,
  },
});
