import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Challenge";

const Schema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    excludeEnvironment: [String], // education / family / nsfw
    verified: { type: Boolean, default: true },
    userName: String, // for proposed topics
    userEmail: String, // for proposed topics
  },
  { timestamps: true }
);

const ChallengeModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ title: "text", description: "text" });
  ChallengeModel.syncIndexes();
} else {
  // if (!global.__syncIndexes.includes(MODELNAME)) {
  //   global.__syncIndexes.push(MODELNAME);
  //   Schema.index({ title: "text", description: "text" });
  //   ChallengeModel.syncIndexes();
  // }
}

export default ChallengeModel;
