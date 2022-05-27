import { removeDiacritics } from "app/services/formatSearch.server";
import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Challenge";

const Schema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    excludeEnvironment: [String], // education / family / nsfw
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Schema.index({ title: "text", description: "text" });

Schema.methods.format = function () {
  return {
    _id: this._id,
    title: removeDiacritics(this.title),
    description: this.description,
    excludeEnvironment: this.excludeEnvironment,
  };
};

const ChallengeModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

ChallengeModel.syncIndexes();

export default ChallengeModel;
