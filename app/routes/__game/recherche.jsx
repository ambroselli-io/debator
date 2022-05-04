import { Form, Link, useLoaderData, useSearchParams } from "remix";
import SearchInput from "../../components/SearchInput";
import TopicModel from "../../db/models/topic.server";

export const loader = async ({ request }) => {
  const query = {};
  const sort = {};
  const project = {};
  // search
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const search = searchParams.get("search");
  if (search.length) {
    query.$text = {
      $search: search,
      $caseSensitive: false,
      $diacriticSensitive: false,
    };
    sort.score = { $meta: "textScore" };
    project.score = { $meta: "textScore" };
  }

  const topics = await TopicModel.aggregate([
    { $match: query },
    {
      $project: {
        score: { $meta: "textScore" },
        fr: 1,
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

  const topicaPopulated = await TopicModel.populate(topics, { path: "categories" });

  return { topics: topicaPopulated };
};

const Search = () => {
  const { topics } = useLoaderData();
  const [searchParams] = useSearchParams();

  return (
    <>
      <h2 className="mb-2 w-full">Recherchez un sujet</h2>
      <Form className="w-full">
        <SearchInput name="search" defaultValue={searchParams.get("search")} />
      </Form>
      <pre>{JSON.stringify(topics, null, 2)}</pre>
      <Link className="mt-4 text-sm text-app underline" to="/le-jeu">
        Trouvez un sujet pour moi !
      </Link>
    </>
  );
};

export default Search;
