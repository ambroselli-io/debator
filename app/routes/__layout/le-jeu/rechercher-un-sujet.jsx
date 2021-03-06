import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { SelectAutofill, links } from "app/components/Selects";
import { topicFormat } from "app/db/methods/topic-format.server";
import { getCategories } from "app/db/queries/categories.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { getTopicIdsNotToObfuscate } from "app/utils/obfuscate";
import useNavigateToNextStep from "app/utils/useNavigateToNextStep";
import RangeInput from "../../../components/RangeInput";
import SearchInput from "../../../components/SearchInput";
import TopicCard from "../../../components/TopicCard";
import TopicModel from "../../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../../db/queries/topicsSuite.server";

export { links };

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const freeTopicIds = await getTopicIdsNotToObfuscate(request);
  const user = await getUnauthentifiedUserFromCookie(request);

  const categories = await getCategories();
  // all
  if (!searchParams.get("search")?.length) {
    const query = {};
    // get topics

    if (searchParams.getAll("categories")?.filter(Boolean)?.length) {
      query.categories = { $in: searchParams.getAll("categories") };
    }

    if (searchParams.get("difficulty")?.length && searchParams.get("difficulty") > 0) {
      query.difficulty = searchParams.get("difficulty");
    }
    const topicsIdsOrder = (
      await getTodaysTopicSuite({ populate: false, environment: user?.environment })
    ).topics;

    const topics = await TopicModel.find(query);

    return {
      topics: topicsIdsOrder
        .map((tId) => topics.find(({ _id }) => _id.equals(tId)))
        .filter(Boolean)
        .map((t) => topicFormat(t, freeTopicIds)),
      categories,
    };
  }

  const query = {
    $match: {
      $text: {
        $search: url.searchParams.get("search"),
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    },
  };

  if (user?.environment) {
    query.$match.environments = user.environment;
  }

  let topics = await TopicModel.aggregate([
    query,
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

  if (searchParams.getAll("categories")?.filter(Boolean)?.length) {
    topics = topics.filter(
      (t) =>
        searchParams
          .getAll("categories")
          .filter((category) => t.categories.find((cat) => cat === category)).length > 0
    );
  }

  if (searchParams.get("difficulty")?.length && searchParams.get("difficulty") > 0) {
    topics = topics.filter(
      (t) => Number(t.difficulty) === Number(searchParams.get("difficulty"))
    );
  }

  return {
    topics: topics.map((t) => topicFormat(t, freeTopicIds)),
    categories,
  };
};

const SearchTopic = () => {
  const { topics, categories } = useLoaderData();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const navigateToNextStep = useNavigateToNextStep();

  return (
    <>
      <details className="w-full max-w-[68ch]" open>
        <summary className="w-full">
          <h2 className="ml-2 mb-2 inline w-full text-lg font-bold">
            Recherchez un sujet
          </h2>
        </summary>
        <Form
          method="get"
          id="topic-advanced-search"
          className="flex w-full flex-col gap-3 p-4"
          onChange={(e) => submit(e.currentTarget)}
        >
          {searchParams.get("mode") && (
            <input type="hidden" name="mode" defaultValue={searchParams.get("mode")} />
          )}
          {searchParams.get("challengeId") && (
            <input
              type="hidden"
              name="challengeId"
              defaultValue={searchParams.get("challengeId")}
            />
          )}
          <SelectAutofill
            options={
              categories?.map(({ _id, categoryWithCount }) => ({
                value: _id,
                label: categoryWithCount,
              })) || []
            }
            name="categories"
            legend="???? Choisissez des cat??gories"
            form="topic-advanced-search"
            onChange={() => submit(document.getElementById("topic-advanced-search"))}
          />
          <label htmlFor="difficulty">???? Difficult??</label>
          <RangeInput
            type="range"
            name="difficulty"
            min={0}
            max={5}
            step={1}
            className="bg-app text-app accent-app"
          />
          <label htmlFor="search">???? Une id??e pr??cise ?</label>
          <SearchInput
            placeholder="Entrez un mot-cl??"
            name="search"
            label="Entrez un mot cl?? ou une expression correspondant au sujet que vous cherchez"
            defaultValue={searchParams.get("search") || ""}
            className="mb-2"
          />
        </Form>
      </details>
      {!topics.length && (
        <p className="text-center text-sm">
          D??sol??, nous n'avons aucun sujet en stock correspondant ?? ces crit??res&nbsp;?????????????
          <br />
          <br />
          Si vous pensez ?? un sujet, envoyez-nous un message et nous l'int??grerons dans
          notre liste&nbsp;!&nbsp;????
        </p>
      )}
      {!!topics.length && (
        <details className="w-full max-w-[68ch]" open>
          <summary className="w-full">
            <h2 className="ml-2 mt-4 mb-2 inline w-full text-lg font-bold">
              {topics.length > 1
                ? `Voici les sujets disponibles (${topics.length}) ????`
                : "Voici le sujet disponible ????"}
            </h2>
          </summary>
          <main className="flex flex-col p-4">
            {topics.map((topic) => (
              <Link key={topic._id} to={navigateToNextStep("topicId", topic._id)}>
                <TopicCard topic={topic} />
              </Link>
            ))}
          </main>
        </details>
      )}
    </>
  );
};

export default SearchTopic;
