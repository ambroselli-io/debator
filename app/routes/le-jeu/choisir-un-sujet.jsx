import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import React from "react";
import Star from "../../components/Star";
import TopicModel from "../../db/models/topic.server";
import { getTodaysTopicSuite } from "../../db/queries/topicsSuite.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const { topics } = await getTodaysTopicSuite();

  const topicId = url.searchParams.get("id");
  if (topicId) {
    const topic = await TopicModel.findById(topicId).populate("categories");
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

const Game = () => {
  const { topic, maxIndex } = useLoaderData();
  const [searchParams] = useSearchParams();

  const currentIndex = Number(searchParams.get("index")) || 0;

  return (
    <>
      <small>
        <i className="text-app">Choisissez un sujet</i>
      </small>
      <h2 className="min-h-8 relative my-0 w-full text-center text-3xl">
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
              <b>{c.fr}</b>
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
      <Link
        to={`../choisir-un-mode-de-jeu?id=${topic._id}`}
        className="rounded-lg border border-app bg-app px-4 py-2 text-white"
        type="submit"
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

export default Game;
