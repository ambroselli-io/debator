import { removeDiacritics } from "app/services/formatSearch.server";
import TextObfuscator from "text-obfuscator";

const getTopicTitle = (topic, freeTopicIds) => {
  if (!freeTopicIds.length) return removeDiacritics(topic.title);
  if (freeTopicIds.find((oid) => oid.equals(topic._id)))
    return removeDiacritics(topic.title);
  return TextObfuscator.encode(removeDiacritics(topic.title));
};

export const topicFormat = (topic, freeTopicIds) => {
  return {
    _id: topic._id,
    title: getTopicTitle(topic, freeTopicIds),
    author: topic.author,
    categories: topic.categories,
    difficulty: topic.difficulty,
    minAge: topic.minAge,
    maxAge: topic.maxAge,
  };
};
