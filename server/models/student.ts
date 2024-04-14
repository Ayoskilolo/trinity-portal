import { defineMongooseModel } from "#nuxt/mongoose";

export const StudentSchema = defineMongooseModel({
  name: "student",
  schema: {
    matricNumber: { type: "string", unique: true },
    firstName: String,
    lastName: String,
    nationality: String,
    dateOfBirth: Date,
    level: String,
    college: String,
    sex: String,
    religion: String,
    password: String,
  },
});
