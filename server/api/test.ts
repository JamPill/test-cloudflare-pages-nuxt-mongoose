import type { Env } from "~/env";

import { mongoose, handleCollection } from "../services/mongoose";

//
//
//
//
//
//
//
//
//
//

const userModel =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      {},
      {
        strict: false,
        collection: "users",
      }
    )
  );

//
//
//
//
//
//
//
//
//
//

export default defineEventHandler(async (event) => {
  const env = process.env as unknown as Env;

  // Handle the collection into MongoDB
  const collection = await handleCollection(env, userModel);

  // Find the user
  const res = await collection.find().lean();

  // Return the user

  return {
    res,
  };
});
