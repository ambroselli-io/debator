import React from "react";
import { useLoaderData } from "@remix-run/react";
import TopicModel from "../../db/models/topic.server";
import ChallengeModel from "app/db/models/challenge.server";
import ChallengePlay from "app/components/ChallengePlay";
import { redirect } from "remix";
import TopicSummary from "app/components/TopicSummary";
import GamePlay from "app/components/GamePlay";
import Timer from "app/components/Timer";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  let topic = null;
  const topicId = url.searchParams.get("topicId");
  if (!topicId)
    return redirect(`/le-jeu/choisir-un-sujet?${url.searchParams.toString()}`);
  if (topicId) topic = (await TopicModel.findById(topicId)).format();

  let challenge = null;
  const challengeId = url.searchParams.get("challengeId");
  if (challengeId) challenge = await ChallengeModel.findById(challengeId);

  return { topic, challenge };
};

const LetsPlay = () => {
  const { topic, challenge } = useLoaderData();

  return (
    <>
      <Timer />
      <GamePlay />
      <ChallengePlay challenge={challenge} />
      <TopicSummary topic={topic} editable onlyAuthor />
    </>
  );
};

export default LetsPlay;
