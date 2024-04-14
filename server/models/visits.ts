import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export interface Visit extends Document {
  studentId: string;
  doctorId: string;
  dateOfVisit: Date;
  notes?: string;
  diagnosis?: string;
  severity: string;
}

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
