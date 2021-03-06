import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Transaction";

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", index: true },
    amount: Number,
    currentStatus: String,
    statuses: { type: [String], default: [] },
    country: String,
    currency: String,
    language: String,
    fintecture_session_id: String,
    licence: { type: String, enum: ["monthly", "yearly", "lifely"] },
  },
  { timestamps: true }
);

const TransactionModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  TransactionModel.syncIndexes();
} else {
  // if (!global.__syncIndexes.includes(MODELNAME)) {
  //   global.__syncIndexes.push(MODELNAME);
  //   TransactionModel.syncIndexes();
  // }
}

export default TransactionModel;
