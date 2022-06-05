import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "User";

const Schema = new mongoose.Schema(
  {
    /* profile */
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [/^.+@(?:[\w-]+\.)+\w+$/, "Please fill a valid email address"],
    },
    name: { type: String, index: "text" },
    firstName: { type: String },
    lastName: { type: String },
    job: { type: String },
    licence: { type: String, enum: ["monthly", "yearly", "lifely"] },
    licenceStartedAt: { type: Date },
    urlOrigin: { type: String },
    password: { type: String },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

const UserModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ name: "text" });
  UserModel.syncIndexes();
} else {
  // if (!global.__syncIndexes.includes(MODELNAME)) {
  //   global.__syncIndexes.push(MODELNAME);
  //   Schema.index({ name: "text" });
  //   UserModel.syncIndexes();
  // }
}

export default UserModel;
