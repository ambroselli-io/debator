import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import React from "react";
import GameModeCard from "../../components/GameModeCard";
import ArenaGameSvg from "../../components/icons/ArenaGameSvg";
import BackToBackGameSvg from "../../components/icons/BackToBack";
import EditSvg from "../../components/icons/EditSvg";
import IndividualGameSvg from "../../components/icons/IndividualGameSvg";
import TeamDebateSvg from "../../components/icons/TeamDebateSvg";
import TrialGameSvg from "../../components/icons/TrialGameSvg";
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
        <GameModeCard
          Image={IndividualGameSvg}
          title="La joute individuelle"
          shortExplanation="Deux participants, un jury, un public"
          preparationMinimum="Aucune"
          preparationAdvised="10 minutes"
          gameDuration="10 minutes ou +"
          numberOfPlayers="3+"
        />
        <GameModeCard
          Image={ArenaGameSvg}
          title="La joute en arène"
          shortExplanation="Deux participants pour commencer, le public se joint à eux dans l'arène"
          preparation="Aucune"
          gameDuration="10 minutes ou +"
          numberOfPlayers="8+"
        />
        <GameModeCard
          Image={BackToBackGameSvg}
          title="La joute dos à dos"
          shortExplanation="Pas de jeu de corps ni de regard: la voix et l'écoute seules pour débattre"
          preparationMinimum="Aucune"
          preparationAdvised="10 minutes"
          gameDuration="10 minutes ou +"
          numberOfPlayers="3+"
        />
        <GameModeCard
          Image={TeamDebateSvg}
          title="La joute par équipes simple"
          shortExplanation="Débat par équipe avec préparation"
          preparationMinimum="15 minutes"
          preparationAdvised="1 heure ou quelques jours"
          gameDuration="1 heure ou plus"
          numberOfPlayers="5+"
        />
        <GameModeCard
          Image={TrialGameSvg}
          title="Le procès"
          shortExplanation="Un jeu de rôles en même temps qu'une technique de débat"
          preparationMinimum="15 minutes"
          preparationAdvised="1 heure ou quelques jours"
          gameDuration="1 heure ou plus"
          numberOfPlayers="10+"
        />
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
    </>
  );
};

export default Game;
