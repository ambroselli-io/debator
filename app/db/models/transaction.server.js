import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Transaction";

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", index: true },
    amount: Number,
    sessionId: String,
    status: String,
    country: String,
    currency: String,
    language: String,
    fintecture_session_id: String,
  },
  { timestamps: true }
);

const TransactionModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TransactionModel.syncIndexes();

export default TransactionModel;
