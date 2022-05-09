import mongoose from "mongoose";
import findOneOrCreate from "../../services/findOneOrCreate.server";
import dbConnection from "../mongo.server";
const MODELNAME = "TopicsSuite";

const Schema = new mongoose.Schema(
  {
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic", index: true }],
  },
  { timestamps: true }
);

Schema.plugin(findOneOrCreate);

const TopicsSuiteModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TopicsSuiteModel.syncIndexes();

export default TopicsSuiteModel;
