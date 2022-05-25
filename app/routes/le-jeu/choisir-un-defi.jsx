import React from "react";
import { Outlet, useLoaderData } from "@remix-run/react";
import TopicModel from "../../db/models/topic.server";
import TopciShowOrChoose from "app/components/TopciShowOrChoose";
import GameModeShowOrChoose from "app/components/GameModeShowOrChoose";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  const topicId = url.searchParams.get("id");
  if (topicId) {
    const topic = await TopicModel.findById(topicId);
    return { topic };
  }
  return {};
};

const ChooseAChallenge = () => {
  const { topic } = useLoaderData();

  return (
    <>
      <small className="text-center">
        <TopciShowOrChoose topic={topic} />
        <br />
        <GameModeShowOrChoose />
        <br />
        <i className="text-app">Choisissez un defi</i>
      </small>
      <main className="mt-5 flex w-full flex-wrap justify-center gap-3"></main>
      <Outlet />
    </>
  );
};

export default ChooseAChallenge;
