import environments from "app/assets/environments";
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
      sparse: true,
    },
    name: { type: String, index: "text" },
    firstName: { type: String },
    lastName: { type: String },
    job: { type: String },
    licence: { type: String, enum: ["monthly", "yearly", "lifely"] },
    environment: { type: String, enum: environments, default: "Éducation" },
    licenceStartedAt: { type: Date },
    urlOrigin: { type: String },
    password: { type: String },
    lastLoginAt: { type: Date },
    role: { type: String },
    organization: { type: String },
    organizationAddress: { type: String },
    organizationPostalCode: { type: String },
    organizationCity: { type: String },
    organizationCountry: { type: String },
    organizationVatNumber: { type: String },
  },
  { timestamps: true }
);

const UserModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ name: "text" });
  UserModel.syncIndexes();
} else {
  global.__syncIndexes = global.__syncIndexes.filter((i) => i !== MODELNAME);
  if (!global.__syncIndexes.includes(MODELNAME)) {
    global.__syncIndexes.push(MODELNAME);
    Schema.index({ name: "text" });
    UserModel.syncIndexes();
  }
}

export default UserModel;
