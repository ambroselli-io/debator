import React from "react";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import games from "../../games";
import GameModeCard from "../../components/GameModeCard";
import TopicModel from "../../db/models/topic.server";
import TopciShowOrChoose from "app/components/TopciShowOrChoose";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const topicId = url.searchParams.get("id");
  if (topicId) {
    const topic = await TopicModel.findById(topicId);
    return { topic };
  }
  return {};
};

const ChooseAGameMode = () => {
  const { topic } = useLoaderData();

  return (
    <>
      <small className="text-center">
        <TopciShowOrChoose topic={topic} />
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
          }) => {
            const nextStepLink = `../choisir-un-defi?mode=${slug}${
              topic?._id ? `&id=${topic?._id}` : ""
            }`;
            return (
              <Link
                key={slug}
                to={nextStepLink}
                state={{ scroll: false }}
                className="flex-0 max-w-[90w] basis-80 rounded bg-white drop-shadow"
              >
                <GameModeCard
                  Image={Image}
                  title={title}
                  moreInfosLink={`${slug}${topic?._id ? `?id=${topic?._id}` : ""}`}
                  nextStepLink={nextStepLink}
                  shortExplanation={shortExplanation}
                  preparationMinimum={preparationMinimum}
                  preparationAdvised={preparationAdvised}
                  preparation={preparation}
                  gameDuration={gameDuration}
                  numberOfPlayers={numberOfPlayers}
                />
              </Link>
            );
          }
        )}
      </main>
      <Outlet />
    </>
  );
};

export default ChooseAGameMode;
