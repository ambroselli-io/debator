import { topicFormat } from "app/db/methods/topic-format.server";
import TopicModel from "app/db/models/topic.server";
import { capitalizeFirstLetter } from "app/services/strings";
import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const categories = formData.getAll("categories");
  const newTopic = Object.fromEntries(formData);
  newTopic.categories = categories.map(capitalizeFirstLetter);
  newTopic.validated = false;
  const existingTopic = await TopicModel.findOne({ title: newTopic.title });
  if (existingTopic) return json({ ok: false, error: "Ce sujet existe déjà !" });
  const topic = await TopicModel.create(newTopic);
  return json({ ok: true, topic: topicFormat(topic) });
};
