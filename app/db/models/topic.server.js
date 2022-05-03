import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Topic";

const Schema = new mongoose.Schema(
  {
    fr: {
      type: String,
      trim: true,
      unique: true,
      required: "A topic is required",
      index: "text",
    },
    author: { type: String }, // if quote
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true }],
    difficulty: { type: Number }, // from 1 to 5, 1 easy, 5 hard
    minAge: { type: Number },
    maxAge: { type: Number },
  },
  { timestamps: true }
);

const TopicModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TopicModel.syncIndexes();

export default TopicModel;
