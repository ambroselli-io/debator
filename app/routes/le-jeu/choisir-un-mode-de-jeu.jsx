import React from "react";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import games from "../../games";
import GameModeCard from "../../components/GameModeCard";
import EditSvg from "../../components/icons/EditSvg";
import TopicModel from "../../db/models/topic.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const topicId = url.searchParams.get("id");
  if (topicId) {
    const topic = await TopicModel.findById(topicId).populate("categories");
    return { topic };
  }
  return {};
};

const Game = () => {
  const { topic } = useLoaderData();

  return (
    <>
      <small className="text-center">
        {!!topic?.name && (
          <>
            <Link
              to={`../choisir-un-sujet?id=${topic._id}`}
              className="inline-flex items-center"
            >
              <i className="text-app">Votre sujet: </i>
              <EditSvg className="ml-2 h-2 w-2" />
            </Link>
            <br />
            <b className="font-[xkcd] uppercase text-black">{topic.name}</b>
            <br />
          </>
        )}
        {!topic?.name && (
          <>
            <Link to="../choisir-un-sujet" className="inline-flex flex-col items-center">
              <i className="text-app">Vous n'avez pas de sujet</i>
              <span className="text-sm text-app underline" to="../rechercher-un-sujet">
                En choisir un
              </span>
            </Link>
            <br />
          </>
        )}
        <br />
        <i className="text-app">Choisissez un mode de jeu</i>
      </small>
      <main className="mt-5 flex w-full flex-wrap justify-center gap-3">
        {games.map(
          ({
            Image,
            title,
            slug,
            shortExplanation,
            preparationMinimum,
            preparationAdvised,
            preparation,
            gameDuration,
            numberOfPlayers,
          }) => (
            <Link
              key={slug}
              to={`${slug}${topic?._id ? `?id=${topic?._id}` : ""}`}
              state={{ scroll: false }}
              className="flex-0 max-w-[90w] basis-80 rounded bg-white drop-shadow"
            >
              <GameModeCard
                Image={Image}
                title={title}
                shortExplanation={shortExplanation}
                preparationMinimum={preparationMinimum}
                preparationAdvised={preparationAdvised}
                preparation={preparation}
                gameDuration={gameDuration}
                numberOfPlayers={numberOfPlayers}
              />
            </Link>
          )
        )}
      </main>
      {/* <Link
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
      </Link> */}
      <Outlet />
    </>
  );
};

export default Game;
