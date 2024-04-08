import { defineMongooseModel } from "#nuxt/mongoose";
import { Types } from "mongoose";

export const doctorsSchema = defineMongooseModel({
  name: "doctors",
  schema: {
    _id: "UUID",
    firstName: String,
    lastName: String,
    dateCreated: Date,
    dateUpdated: Date,
    status: String,
    email: {
      type: "string",
      unique: true,
    },
    password: String,
  },
});
