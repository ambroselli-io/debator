import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "QuizzAnswer";

const Schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    questionId: String,
    answers: [String],
  },
  { timestamps: true }
);

const QuizzAnswer =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ answers: "text" });
  QuizzAnswer.syncIndexes();
} else {
  if (!global.__syncIndexes.includes(MODELNAME)) {
    global.__syncIndexes.push(MODELNAME);
    Schema.index({ answers: "text" });
    QuizzAnswer.syncIndexes();
  }
}

export default QuizzAnswer;
