import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import useNavigateToNextStep from "app/utils/useNavigateToNextStep";
import TopicSummary from "../../components/TopicSummary";
import TopicModel from "../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../db/queries/topicsSuite.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const { topics } = await getTodaysTopicSuite();

  const topicId = url.searchParams.get("topicId");
  if (topicId) {
    const topic = await TopicModel.findById(topicId);
    return {
      topic: topic.format(),
      maxIndex: topics.length,
    };
  }

  const topicIndex = Number(url.searchParams.get("topicIndex")) || 0;

  return {
    topic: topics[topicIndex].format(),
    maxIndex: topics.length,
  };
};

const ChooseATopic = () => {
  const { topic, maxIndex } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigateToNextStep = useNavigateToNextStep();

  const currentIndex = Number(searchParams.get("topicIndex")) || 0;

  return (
    <>
      <small>
        <i className="text-app">Choisissez un sujet</i>
      </small>
      <TopicSummary topic={topic} />
      <Link
        to={navigateToNextStep("topicId", topic._id)}
        className="rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        Je choisis celui-là !
      </Link>
      <Form method="GET">
        <input type="hidden" name="topicIndex" value={(currentIndex + 1) % maxIndex} />
        <input
          type="hidden"
          name="mode"
          defaultValue={searchParams.get("mode") || undefined}
        />
        <input
          type="hidden"
          name="challengeId"
          defaultValue={searchParams.get("challengeId") || undefined}
        />
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
