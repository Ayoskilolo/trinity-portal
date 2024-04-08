import mongoose from "mongoose";

export default async (_nitroApp: any) => {
  console.log("Accessing the Mongodb plugin .....");

  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
};
