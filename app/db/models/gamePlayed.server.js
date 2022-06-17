import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "GamePlayed";

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    topic: String,
    gameMode: String,
    challenge: String,
    date: String,
    environment: String,
  },
  { timestamps: true }
);

const GamePlayed =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ title: "text", description: "text" });
  GamePlayed.syncIndexes();
} else {
  if (!global.__syncIndexes.includes(MODELNAME)) {
    global.__syncIndexes.push(MODELNAME);
    Schema.index({ title: "text", description: "text" });
    GamePlayed.syncIndexes();
  }
}

export default GamePlayed;
