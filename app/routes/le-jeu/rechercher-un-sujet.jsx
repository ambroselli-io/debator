import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import SelectAutofill, { links } from "app/components/SelectAutoFill";
import useNavigateToNextStep from "app/utils/useNavigateToNextStep";
import RangeInput from "../../components/RangeInput";
import SearchInput from "../../components/SearchInput";
import TopicCard from "../../components/TopicCard";
import TopicModel from "../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../db/queries/topicsSuite.server";
import { removeDiacritics } from "../../services/formatSearch.server";

export { links };

export const loader = async ({ request }) => {
  const query = {};
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // get categories with number of topics
  const topicsGroupedByCategory = await TopicModel.aggregate([
    {
      $unwind: "$categories",
    },
    {
      $group: {
        _id: "$categories",
        category: { $first: "$categories" },
        count: { $sum: 1 },
      },
    },
  ]);

  const categories = topicsGroupedByCategory.map(({ _id, category }) => ({
    _id,
    categoryWithCount: `${category} (${
      topicsGroupedByCategory.find((t) => t.category === category)?.count
    })`,
  }));

  // all
  if (!searchParams.get("search")?.length) {
    // get topics

    if (searchParams.getAll("categories")?.length) {
      query.categories = { $in: searchParams.getAll("categories") };
    }

    if (searchParams.get("difficulty")?.length && searchParams.get("difficulty") > 0) {
      query.difficulty = searchParams.get("difficulty");
    }
    const topicsIdsOrder = (await getTodaysTopicSuite({ populate: false })).topics;

    const topics = await TopicModel.find(query);

    return {
      topics: topicsIdsOrder
        .map((tId) => topics.find(({ _id }) => _id.equals(tId)))
        .filter(Boolean)
        .map((t) => t.format()),
      categories,
    };
  }

  let topics = await TopicModel.aggregate([
    {
      $match: {
        $text: {
          $search: searchParams.get("search"),
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

  if (searchParams.getAll("categories")?.length) {
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
    topics: topics.map((t) => ({ ...t, title: removeDiacritics(t.title) })),
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
      <details className="w-full" open>
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
            legend="🤌 Choisissez des catégories"
            form="topic-advanced-search"
            onChange={() =>
              setTimeout(() => submit(document.getElementById("topic-advanced-search")))
            }
          />
          <label htmlFor="difficulty">🍬 Difficulté</label>
          <RangeInput
            type="range"
            name="difficulty"
            min={0}
            max={5}
            step={1}
            className="bg-app text-app accent-app"
          />
          <label htmlFor="search">💡 Une idée précise ?</label>
          <SearchInput
            placeholder="Entrez un mot-clé"
            name="search"
            label="Entrez un mot clé ou une expression correspondant au sujet que vous cherchez"
            defaultValue={searchParams.get("search") || ""}
            className="mb-2"
          />
        </Form>
      </details>
      {!topics.length && (
        <p className="text-center text-sm">
          Désolé, nous n'avons aucun sujet en stock correspondant à ces critères&nbsp;🤷‍♀️
          <br />
          <br />
          Si vous pensez à un sujet, envoyez-nous un message et nous l'intégrerons dans
          notre liste&nbsp;!&nbsp;🤓
        </p>
      )}
      {!!topics.length && (
        <details className="w-full" open>
          <summary className="w-full">
            <h2 className="ml-2 mt-4 mb-2 inline w-full text-lg font-bold">
              Voici les sujets disponibles 👇
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
