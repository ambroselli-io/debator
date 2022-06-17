import environments from "app/assets/environments";
import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Topic";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: "A topic is required",
    },
    author: { type: String }, // if quote
    categories: [{ type: String }],
    difficulty: { type: Number, required: true }, // from 1 to 5, 1 easy, 5 hard
    minAge: { type: Number },
    maxAge: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    userName: String, // for proposed topics
    userEmail: String, // for proposed topics
    verified: { type: Boolean, default: true },
    environments: {
      type: [{ type: String, enum: environments }],
      default: environments,
    },
  },
  { timestamps: true }
);

const TopicModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index(
    { title: "text", author: "text", categories: "text" },
    { default_language: "french" }
  );
  TopicModel.syncIndexes();
} else {
  if (!global.__syncIndexes.includes(MODELNAME)) {
    global.__syncIndexes.push(MODELNAME);
    Schema.index(
      { title: "text", author: "text", categories: "text" },
      { default_language: "french" }
    );
    TopicModel.syncIndexes();
  }
}

export default TopicModel;
