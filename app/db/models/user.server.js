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
    job: { type: String },
    urlOrigin: { type: String },
  },
  { timestamps: true }
);

Schema.index({ name: "text" });

Schema.methods.me = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    job: this.job,
  };
};

const UserModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

UserModel.syncIndexes();

export default UserModel;
