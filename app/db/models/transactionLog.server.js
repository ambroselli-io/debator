import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "TransactionLog";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    environment: { type: String },
    content: { type: String, required: true },
    webhookId: { type: String, index: true },
    objectId: { type: String, index: true },
    duplicate: { type: Boolean },
    route: { type: String },
  },
  {
    timestamps: true,
  }
);

const TransactionLogModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TransactionLogModel.syncIndexes();

export default TransactionLogModel;
