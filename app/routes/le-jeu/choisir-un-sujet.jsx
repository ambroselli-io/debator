import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { mergeSearchParamsToString } from "app/services/searchParamsUtils";
import TopicSummary from "../../components/TopicSummary";
import TopicModel from "../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../db/queries/topicsSuite.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const { topics } = await getTodaysTopicSuite();

  const topicId = url.searchParams.get("id");
  if (topicId) {
    const topic = await TopicModel.findById(topicId);
    return {
      topic,
      maxIndex: topics.length - 1,
    };
  }

  const index = Number(url.searchParams.get("index")) || 0;

  return {
    topic: topics[index],
    maxIndex: topics.length - 1,
  };
};

const ChooseATopic = () => {
  const { topic, maxIndex } = useLoaderData();
  const [searchParams] = useSearchParams();

  const currentIndex = Number(searchParams.get("index")) || 0;
  const nextPage = searchParams.get("mode")?.length
    ? "choisir-un-defi"
    : "choisir-un-mode-de-jeu";

  return (
    <>
      <small>
        <i className="text-app">Choisissez un sujet</i>
      </small>
      <TopicSummary topic={topic} />
      <Link
        to={`../${nextPage}?${mergeSearchParamsToString("id", topic._id, searchParams)}`}
        className="rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        Je choisis celui-là !
      </Link>
      <Form method="GET">
        <input type="hidden" name="index" value={(currentIndex + 1) % maxIndex} />
        <button
          className="mt-4 rounded-lg border border-app bg-white px-4 py-2 text-app"
          type="submit"
        >
          Montrez-moi un autre&nbsp;sujet
        </button>
      </Form>
      <Link className="mt-4 text-sm text-app underline" to="../rechercher-un-sujet">
        Recherche avancée
      </Link>
    </>
  );
};

export default ChooseATopic;
