import dayjs from "dayjs";
import { shuffle } from "../../utils/arrays";
import TopicModel from "../models/topic.server";
import TopicsSuiteModel from "../models/topicsSuite.server";

export const getTodaysTopicSuite = async ({ populate = true, environment } = {}) => {
  // find the daily topics suite if exists
  const topicQuery = environment ? { environments: environment } : {};
  const topicsSuiteQuery = { date: dayjs().format("YYYY-MM-DD"), environment };
  const topicPopulate = {
    path: "topics",
    model: "Topic",
  };
  const totalTopics = await TopicModel.countDocuments(topicQuery);

  let topicsSuite = null;
  while (!topicsSuite) {
    topicsSuite = await TopicsSuiteModel.findOne(topicsSuiteQuery);
    // if it doesn't exist yet, it's the first time it's requested
    // so let's create it
    if (topicsSuite && topicsSuite.topics.length !== totalTopics) {
      await TopicsSuiteModel.findByIdAndDelete(topicsSuite._id);
      topicsSuite = null;
    } else {
      const topics = await TopicModel.find(topicQuery).select("_id");
      try {
        topicsSuite = await TopicsSuiteModel.create({
          environment,
          topics: shuffle(topics),
          ...topicsSuiteQuery,
        });
      } catch (e) {
        // maybe concurrency, it's already created -> we try again
      }
    }
  }

  // then populate it
  if (populate) {
    topicsSuite = await TopicsSuiteModel.populate(topicsSuite, topicPopulate);
  }

  return topicsSuite;
};
