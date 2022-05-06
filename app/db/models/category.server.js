import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Category";

const Schema = new mongoose.Schema(
  {
    fr: {
      type: String,
      trim: true,
      unique: true,
      required: "A name is required",
    },
  },
  { timestamps: true }
);

Schema.index({ fr: "text" });

Schema.virtual("name").get(function () {
  return this.fr;
});

const CategoryModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

CategoryModel.syncIndexes();

export default CategoryModel;
