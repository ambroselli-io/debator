import { Form, Link, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import CheckBoxGroup from "../../components/CheckBoxGroup";
import RangeInput from "../../components/RangeInput";
import SearchInput from "../../components/SearchInput";
import TopicCard from "../../components/TopicCard";
import CategoryModel from "../../db/models/category.server";
import TopicModel from "../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../db/queries/topicsSuite.server";
import { removeDiacritics } from "../../services/formatSearch.server";

export const loader = async ({ request }) => {
  const query = {};
  const sort = {};
  const project = {};
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
        count: { $sum: 1 },
      },
    },
  ]);

  const categories = (await CategoryModel.find()).map((c) => ({
    ...c.toJSON(),
    name: `${c.name} (${
      topicsGroupedByCategory.find((t) => t._id.equals(c._id))?.count
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

    const topics = await TopicModel.find(query).populate("categories");

    return {
      topics: topicsIdsOrder
        .map((topicId) => topics.find(({ _id }) => _id.equals(topicId)))
        .filter(Boolean),
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
        fr: 1,
        categories: 1,
        author: 1,
        difficulty: 1,
        name: 1,
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
          .filter((catId) => t.categories.find((_id) => _id.equals(catId))).length > 0
    );
  }

  if (searchParams.get("difficulty")?.length && searchParams.get("difficulty") > 0) {
    topics = topics.filter(
      (t) => Number(t.difficulty) === Number(searchParams.get("difficulty"))
    );
  }

  const topicsPopulated = await TopicModel.populate(topics, { path: "categories" });
  return {
    topics: topicsPopulated.map((t) => ({ ...t, name: removeDiacritics(t.fr) })),
    categories,
  };
};

const Search = () => {
  const { topics, categories } = useLoaderData();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

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
          className="flex w-full flex-col gap-3 p-4"
          onChange={(e) => submit(e.currentTarget)}
        >
          <CheckBoxGroup
            values={
              categories?.map(({ _id, name }) => ({ value: _id, label: name })) || []
            }
            name="categories"
            legend="🤌 Choisissez des catégories"
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
              <Link key={topic._id} to={`../choisir-un-sujet?id=${topic._id}`}>
                <TopicCard topic={topic} />
              </Link>
            ))}
          </main>
        </details>
      )}
    </>
  );
};

export default Search;
