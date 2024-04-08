import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const visitsSchema = defineMongooseModel({
  name: "visits",
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
    dateOfVisit: Date,
    notes: String,
    diagnosis: String,
    severity: String,
  },
});
