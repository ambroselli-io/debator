import TextObfuscator from "text-obfuscator";

const getTopicTitle = (topic, freeTopicIds = []) => {
  if (!freeTopicIds?.length) return topic.title;
  if (freeTopicIds.find((oid) => oid.equals(topic._id))) return topic.title;
  return TextObfuscator.encode(topic.title, 2);
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
