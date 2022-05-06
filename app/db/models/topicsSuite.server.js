import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "TopicsSuite";

const Schema = new mongoose.Schema(
  {
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic", index: true }],
  },
  { timestamps: true }
);

const TopicsSuiteModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TopicsSuiteModel.syncIndexes();

export default TopicsSuiteModel;
