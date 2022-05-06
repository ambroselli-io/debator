import mongoose from "mongoose";
import { removeDiacritics } from "../../services/formatSearch.server";
import dbConnection from "../mongo.server";
const MODELNAME = "Topic";

const Schema = new mongoose.Schema(
  {
    fr: {
      type: String,
      trim: true,
      unique: true,
      required: "A topic is required",
    },
    author: { type: String }, // if quote
    categories: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true }],
      required: true,
    },
    difficulty: { type: Number, required: true }, // from 1 to 5, 1 easy, 5 hard
    minAge: { type: Number, required: true },
    maxAge: { type: Number },
  },
  { timestamps: true }
);

Schema.index({ fr: "text", author: "text" }, { default_language: "french" });

Schema.methods.format = function (language = "fr") {
  return {
    _id: this._id,
    name: removeDiacritics(this[language]),
    author: this.author,
    categories: this.categories,
    difficulty: this.difficulty,
    minAge: this.minAge,
    maxAge: this.maxAge,
  };
};
Schema.virtual("name").get(function () {
  return removeDiacritics(this.fr);
});
Schema.set("toObject", { virtuals: true });
Schema.set("toJSON", { virtuals: true });

const TopicModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

TopicModel.syncIndexes();

export default TopicModel;
