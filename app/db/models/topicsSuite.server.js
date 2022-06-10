import environments from "app/assets/environments";
import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "TopicsSuite";

const Schema = new mongoose.Schema(
  {
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    date: { type: String },
    environment: { type: String, enum: environments },
  },
  { timestamps: true }
);

const TopicsSuiteModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

Schema.index({ date: 1, environment: 1 }, { unique: true });

if (process.env.NODE_ENV === "production") {
  TopicsSuiteModel.syncIndexes();
} else {
  // if (!global.__syncIndexes.includes(MODELNAME)) {
  //   global.__syncIndexes.push(MODELNAME);
  //   TopicsSuiteModel.syncIndexes();
  // }
}

export default TopicsSuiteModel;
