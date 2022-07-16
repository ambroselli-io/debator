import TextObfuscator from "text-obfuscator";

const getTopicTitle = (topic, freeTopicIds = []) => {
  if (!freeTopicIds?.length) return { title: topic.title, isObfuscated: false };
  if (freeTopicIds.find((oid) => oid.equals(topic._id)))
    return { title: topic.title, isObfuscated: false };
  return { title: TextObfuscator.encode(topic.title, 2), isObfuscated: true };
};

export const topicFormat = (topic, freeTopicIds) => {
  const { title, isObfuscated } = getTopicTitle(topic, freeTopicIds);
  return {
    _id: topic._id,
    title,
    isObfuscated,
    author: topic.author,
    categories: topic.categories,
    difficulty: topic.difficulty,
    minAge: topic.minAge,
    maxAge: topic.maxAge,
  };
};
