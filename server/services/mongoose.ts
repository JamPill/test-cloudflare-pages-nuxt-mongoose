// ████████ ██    ██ ██████  ███████ ███████
//    ██     ██  ██  ██   ██ ██      ██
//    ██      ████   ██████  █████   ███████
//    ██       ██    ██      ██           ██
//    ██       ██    ██      ███████ ███████

import type { Env } from "~/env";
import type { Mongoose, Model } from "mongoose";

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

// ██ ███    ███ ██████   ██████  ██████  ████████
// ██ ████  ████ ██   ██ ██    ██ ██   ██    ██
// ██ ██ ████ ██ ██████  ██    ██ ██████     ██
// ██ ██  ██  ██ ██      ██    ██ ██   ██    ██
// ██ ██      ██ ██       ██████  ██   ██    ██

import mongoose from "mongoose";

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
/**
 * The connection variable, in the global scope.
 * <br>
 * Because `conn` is in the global scope, Lambda may retain it between
 * function calls thanks to `callbackWaitsForEmptyEventLoop`.
 * This means your Lambda function doesn't have to go through the
 * potentially expensive process of connecting to MongoDB every time.
 * */
let connectionAttempt: Promise<Mongoose> | null = null;

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


const connect = async (db: string) => {
  // Because `connectionAttempt` is in the global scope, Lambda may retain it between
  // function calls thanks to `callbackWaitsForEmptyEventLoop`.
  // This means your Lambda function doesn't have to go through the
  // potentially expensive process of connecting to MongoDB every time.
  if (connectionAttempt === null) {
    console.log("[MongooseService] connecting...");
    connectionAttempt = mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING),
      {
        dbName: db,
        // and tell the MongoDB driver to not wait more than 5 seconds
        // before erroring out if it isn't connected
        serverSelectionTimeoutMS: 2000,
      }
    );

    // `await`ing connection after assigning to the `connectionAttempt` variable
    // to avoid multiple function calls creating new connections
    const connection = await connectionAttempt;

    // Handle connection errors
    connection.connection.on("error", (err) => {
      connectionAttempt = null;
      console.log(`[MongooseService] connection state error: ${err}`);
    });

    // `await`ing connection after assigning to the `connectionAttempt` variable
    // to avoid multiple function calls creating new connections
    // console.log(connection);
    console.log(
      `[MongooseService] connection state: ${connection.connection.readyState} to ${connection.connection.db.databaseName}`
    );
  } else {
    const connection = await connectionAttempt;
    // Switch db if current db is different
    if (connection.connection.db.databaseName !== db) {
      connection.connection.useDb(db);
    }
    console.log(
      "[MongooseService] connection already open (going to reusing it)"
    );
  }
  return connectionAttempt;
};

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

export const handleCollection = async <T>(
  env: Env,
  model: Model<any, any, any, any, any>,
  db?: string
) => {
  try {
    // Select the database to work with
    db = db || env.MONGODB_DEFAULT_DB;

    await connect(db);

    return model;

    //
  } catch (error) {
    throw error;
  }
};

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

export { mongoose };
