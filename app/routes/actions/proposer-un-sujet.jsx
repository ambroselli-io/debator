import TopicModel from "app/db/models/topic.server";
import { json } from "remix";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const categories = formData.getAll("categories");
  const newTopic = Object.fromEntries(formData);
  newTopic.categories = categories;
  newTopic.validated = false;
  const existingTopic = await TopicModel.findOne({ title: newTopic.title });
  if (existingTopic) return json({ ok: false, error: "Ce sujet existe déjà !" });
  const topic = await TopicModel.create(newTopic);
  return json({ ok: true, topic });
};
