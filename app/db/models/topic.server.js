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
    minAge: { type: Number, required: true },
    maxAge: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Schema.index(
  { title: "text", author: "text", categories: "text" },
  { default_language: "french" }
);

const TopicModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TopicModel.syncIndexes();

export default TopicModel;
