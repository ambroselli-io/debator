import { useLoaderData } from "@remix-run/react";
import { links } from "app/components/Selects";
import TopicModel from "app/db/models/topic.server";
import { getCategories } from "app/db/queries/categories.server";
import { redirect } from "@remix-run/node";
import ProposeTopic from "app/components/ProposeTopic";
import { capitalizeFirstLetter } from "app/services/strings";
import { useEffect } from "react";

export { links };

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const topic = Object.fromEntries(formData);
  topic.categories = formData.getAll("categories").map(capitalizeFirstLetter);
  topic.environments = formData.getAll("environments").map(capitalizeFirstLetter);
  topic.validated = true;
  await TopicModel.updateOne({ _id: params.topicId }, topic);
  return redirect("/admin/topics");
};

export const loader = async ({ params }) => {
  const topic = await TopicModel.findById(params.topicId);
  const categories = await getCategories();
  return { topic, categories: categories.map(({ _id }) => _id) };
};

const EditTopic = () => {
  const { topic, categories } = useLoaderData();

  useEffect(() => {
    for (const key of Object.keys(window.sessionStorage)) {
      if (key.includes("edit-topic")) window.sessionStorage.removeItem(key);
    }
  });

  return (
    <ProposeTopic
      isOpen
      categories={categories}
      action={undefined}
      method="PUT"
      id="edit-topic"
      topic={topic}
    />
  );
};

export default EditTopic;
