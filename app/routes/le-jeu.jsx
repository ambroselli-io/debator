import { Link, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import TopicModel from "../db/models/topic.server";
import shuffle from "../services/shuffleArray";
import useSearchParamState from "../services/useSearchParamState";

export const unstable_shouldReload = () => false;
export const loader = async () => {
  const topics = await TopicModel.find().populate("categories");

  return shuffle(topics.map((t) => t.format()));
};

const Game = () => {
  const topics = useLoaderData();

  const [currentTopicId, setCurrentTopicId] = useSearchParamState("id", topics[0]._id, {
    setSearchParamOnMount: true,
    listenToBackButton: true,
  });

  const topic = useMemo(
    () => topics.find((t) => t._id === currentTopicId),
    [topics, currentTopicId]
  );

  const goToNextTopic = () => {
    const currentTopicIndex = topics.findIndex((t) => t._id === currentTopicId);
    if (currentTopicIndex === topics.length - 1) {
      setCurrentTopicId(topics[0]._id);
    } else {
      setCurrentTopicId(topics[currentTopicIndex + 1]._id);
    }
  };

  return (
    <>
      <header className="border-b border-gray-100 py-4 px-6 text-app">
        <h1 className="font-marker text-xl">Pifas</h1>
      </header>
      <main className="flex w-full flex-col items-center">
        <h2 className="min-h-8 relative my-10 w-full px-2 text-center text-3xl">
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
            <b>Catégorie{topic.categories.length > 1 ? "s" : ""}</b>&nbsp;:{" "}
            {topic.categories.map((c) => c.name).join(" - ")}
          </p>
          <p className="text-center">
            <b>Difficulté</b>&nbsp;: {topic.difficulty} sur 5
          </p>
          <p className="text-center">
            <b>Âge&nbsp;:</b> de {topic.minAge} à {topic.maxAge} ans
          </p>
        </small>
        <button
          className="rounded-lg bg-app px-4 py-2 text-white"
          type="button"
          onClick={goToNextTopic}
        >
          Montrez-moi un autre&nbsp;thème
        </button>
        <Link className="mt-4 text-sm text-app underline" to="advanced-search">
          Recherche avancée
        </Link>
      </main>
    </>
  );
};

export default Game;
