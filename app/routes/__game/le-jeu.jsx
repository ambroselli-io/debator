import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import React from "react";
import Star from "../../components/Star";
import TopicModel from "../../db/models/topic.server";
import TopicsSuiteModel from "../../db/models/topicsSuite.server";
import shuffle from "../../services/shuffleArray";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  // find the daily topics suite if exists
  const topicsSuiteQuery = {
    createdAt: { $gte: dayjs().startOf("day"), $lt: dayjs().endOf("day") },
  };
  const topicPopulate = {
    path: "topics",
    model: "Topic",
    populate: {
      path: "categories",
      model: "Category",
    },
  };
  let topicsSuite = await TopicsSuiteModel.findOne(topicsSuiteQuery).populate(
    topicPopulate
  );
  // if it doesn't exist yet, it's the first time it's requested
  // so let's create it
  if (!topicsSuite) {
    const topics = await TopicModel.find().select("_id");
    await TopicsSuiteModel.create({ topics: shuffle(topics) });
    // then populate it
    topicsSuite = await TopicsSuiteModel.findOne(topicsSuiteQuery).populate(
      topicPopulate
    );
  }

  const index = Number(url.searchParams.get("index")) || 0;

  return {
    topic: topicsSuite.topics[index].format(),
    maxIndex: topicsSuite.topics.length - 1,
  };
};

const Game = () => {
  const { topic, maxIndex } = useLoaderData();
  const [searchParams] = useSearchParams();

  const currentIndex = Number(searchParams.get("index")) || 0;

  return (
    <>
      <h2 className="min-h-8 relative my-10 w-full text-center text-3xl">
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          just
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          to
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          make
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          five
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          lines
        </div>
        <figure className="absolute inset-0 flex flex-col justify-between">
          <blockquote className="h-full">
            <p className="flex h-full items-center justify-center font-[xkcd] text-3xl">
              {topic.name.toUpperCase().replace(" ?", "").replace(" !", "")}
              {topic.name.includes(" ?") ? <>&nbsp;?</> : ""}
              {topic.name.includes(" !") ? <>&nbsp;!</> : ""}
            </p>
          </blockquote>
          <figcaption className="text-sm">{topic.author}</figcaption>
        </figure>
      </h2>
      <small className="my-auto mb-10 flex flex-col items-center">
        <p className="text-center">
          Catégorie{topic.categories.length > 1 ? "s" : ""}&nbsp;:{" "}
          {topic.categories.map((c, index, array) => (
            <React.Fragment key={c._id}>
              <b>{c.name}</b>
              {index < array.length - 1 ? " - " : ""}
            </React.Fragment>
          ))}
        </p>
        <p className="flex items-center text-center">
          Difficulté&nbsp;:
          <span className="ml-1 flex">
            {Array.from(Array(5).keys()).map((difficulty) => (
              <Star
                key={difficulty + topic.difficulty}
                className={`h-3 w-3 fill-white${
                  difficulty >= topic.difficulty ? "" : "!important"
                } fill-app${
                  difficulty < topic.difficulty ? "" : "!important"
                } stroke-app`}
              />
            ))}
          </span>
        </p>
        <p className="text-center">
          Âge&nbsp;:{" "}
          {topic.maxAge ? (
            <>
              de{" "}
              <b>
                {topic.minAge} à {topic.maxAge} ans
              </b>
            </>
          ) : (
            <>
              à partir de <b>{topic.minAge} ans</b>
            </>
          )}
        </p>
      </small>
      <Form method="GET">
        <input type="hidden" name="index" value={(currentIndex + 1) % maxIndex} />
        <button className="rounded-lg bg-app px-4 py-2 text-white" type="submit">
          Montrez-moi un autre&nbsp;sujet
        </button>
      </Form>
      <Link className="mt-4 text-sm text-app underline" to="/recherche">
        Recherche avancée
      </Link>
    </>
  );
};

export default Game;
