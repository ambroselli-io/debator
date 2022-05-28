import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import SearchInput from "app/components/SearchInput";
import { removeDiacritics } from "app/services/formatSearch.server";
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
  if (url.searchParams.get("search")?.length) {
    let topics = await TopicModel.aggregate([
      {
        $match: {
          $text: {
            $search: url.searchParams.get("search"),
            $caseSensitive: false,
            $diacriticSensitive: false,
          },
        },
      },
      {
        $project: {
          score: { $meta: "textScore" },
          title: 1,
          categories: 1,
          author: 1,
          difficulty: 1,
          minAge: 1,
          maxAge: 1,
        },
      },
      {
        $sort: { score: { $meta: "textScore" } },
      },
    ]);

    if (!topics.length) {
      return {
        topic: null,
        maxIndex: 0,
      };
    }

    const topicIndex = Number(url.searchParams.get("topicIndex")) || 0;

    const topic = topics[topicIndex % topics.length];

    return {
      topic: { ...topic, title: removeDiacritics(topic.title) },
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
  const submit = useSubmit();
  const navigateToNextStep = useNavigateToNextStep();

  const currentIndex = Number(searchParams.get("topicIndex")) || 0;

  return (
    <>
      <small>
        <i className="text-app">Choisissez un sujet</i>
      </small>
      <Form
        method="GET"
        className="flex w-full max-w-md flex-col items-center"
        onChange={(e) => submit(e.currentTarget)}
      >
        <label className="mt-4 max-w-md text-sm" htmlFor="search">
          🔪 Filtrer un peu ?
        </label>
        <SearchInput
          placeholder="Entrez un mot-clé, un thème, un auteur"
          name="search"
          defaultValue={searchParams.get("search") || ""}
        />
        {!topic?._id && (
          <p className="mt-4 text-center text-sm">
            Désolé, nous n'avons aucun sujet en stock correspondant à ces critères&nbsp;🤷‍♀️
            <br />
            <br />
            Si vous pensez à un sujet, envoyez-nous un message et nous l'intégrerons dans
            notre liste&nbsp;!&nbsp;🤓
          </p>
        )}
        {!!topic?._id && (
          <>
            <TopicSummary topic={topic} />
            <Link
              to={navigateToNextStep("topicId", topic?._id)}
              className="rounded-lg border border-app bg-app px-4 py-2 text-white"
            >
              Je choisis celui-là !
            </Link>
            <input
              type="hidden"
              name="topicIndex"
              defaultValue={maxIndex > 1 ? (currentIndex + 1) % maxIndex : 0}
            />
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
            {topic?._id && maxIndex > 1 && (
              <button
                className="mt-4 rounded-lg border border-app bg-white px-4 py-2 text-app"
                type="submit"
              >
                Montrez-moi un autre&nbsp;sujet
              </button>
            )}
          </>
        )}
      </Form>
      <Link className="mt-4 text-sm text-app underline" to="../rechercher-un-sujet">
        Recherche avancée
      </Link>
    </>
  );
};

export default ChooseATopic;
