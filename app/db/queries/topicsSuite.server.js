import dayjs from "dayjs";
import { shuffle } from "../../services/arrays";
import TopicModel from "../models/topic.server";
import TopicsSuiteModel from "../models/topicsSuite.server";

export const getTodaysTopicSuite = async ({ populate = true } = {}) => {
  // find the daily topics suite if exists
  const topicsSuiteQuery = {
    createdAt: { $gte: dayjs().startOf("day"), $lt: dayjs().endOf("day") },
  };
  const topicPopulate = {
    path: "topics",
    model: "Topic",
  };
  let topicsSuite = await TopicsSuiteModel.findOne(topicsSuiteQuery);
  // if it doesn't exist yet, it's the first time it's requested
  // so let's create it
  if (!topicsSuite) {
    const topics = await TopicModel.find().select("_id");
    await TopicsSuiteModel.create({ topics: shuffle(topics) });
    topicsSuite = await TopicsSuiteModel.findOne(topicsSuiteQuery);
  }

  // then populate it
  if (populate) {
    topicsSuite = await TopicsSuiteModel.populate(topicsSuite, topicPopulate);
  }

  return topicsSuite;
};
