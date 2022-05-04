import mongoose from "mongoose";
import { removeDiacritics } from "../../services/formatSearch.server";
import dbConnection from "../mongo.server";
const MODELNAME = "Category";

const Schema = new mongoose.Schema(
  {
    fr: {
      type: String,
      trim: true,
      unique: true,
      required: "A name is required",
      index: "text",
    },
  },
  { timestamps: true }
);

Schema.methods.format = function (language = "fr") {
  return {
    _id: this._id,
    name: removeDiacritics(this[language]),
  };
};

const CategoryModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

CategoryModel.syncIndexes();

export default CategoryModel;
