import React from "react";
import { useLoaderData } from "@remix-run/react";
import TopicModel from "../../../db/models/topic.server";
import ChallengeModel from "app/db/models/challenge.server";
import ChallengePlay from "app/components/ChallengePlay";
import { redirect } from "remix";
import TopicSummary from "app/components/TopicSummary";
import GamePlay from "app/components/GamePlay";
import Timer, { links } from "app/components/Timer";
import { useLocalStorage } from "app/services/useLocalStorage";
import { topicFormat } from "app/db/methods/topic-format.server";
import { getTopicIdsNotToObfuscate } from "app/utils/obfuscate";

export { links };

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const freeTopicIds = await getTopicIdsNotToObfuscate(request);

  let topic = null;
  const topicId = url.searchParams.get("topicId");
  if (!topicId)
    return redirect(`/le-jeu/choisir-un-sujet?${url.searchParams.toString()}`);
  if (topicId) topic = topicFormat(await TopicModel.findById(topicId), freeTopicIds);

  let challenge = null;
  const challengeId = url.searchParams.get("challengeId");
  if (challengeId) challenge = await ChallengeModel.findById(challengeId);

  return { topic, challenge };
};

const countdowns = [
  { display: "30s", seconds: 30, ariaLabel: "30 seconds" },
  { display: "1m", seconds: 60, ariaLabel: "1 minutes" },
  { display: "2m", seconds: 120, ariaLabel: "2 minutes" },
  { display: "3m", seconds: 180, ariaLabel: "3 minutes" },
  { display: "5m", seconds: 300, ariaLabel: "5 minutes" },
  { display: "10m", seconds: 600, ariaLabel: "10 minutes" },
  { display: "30m", seconds: 1800, ariaLabel: "30 minutes" },
];

const LetsPlay = () => {
  const { topic, challenge } = useLoaderData();
  const [countdown, setCountdown] = useLocalStorage("countdown", 60);
  const [editable, setEditable] = useLocalStorage("editable", false);

  return (
    <div className="flex min-h-full w-full flex-col items-center lg:flex-row lg:justify-center">
      <div className="flex w-full max-w-[68ch] flex-col items-center">
        <TopicSummary topic={topic} editable={editable} onlyAuthor Component="h1" />
        <GamePlay editable={editable} />
        <ChallengePlay challenge={challenge} editable={editable} />
        <button
          type="button"
          className="mt-4 text-xs text-app underline opacity-80"
          onClick={() => setEditable(!editable)}
        >
          {editable ? "Ne plus modifier" : "Modifier ?"}
        </button>
      </div>
      <div className="flex w-full max-w-[68ch] flex-col items-center lg:border-l lg:border-app">
        <p className="max-w-lg text-center">
          Répartissez les rôles, faites la préparation que vous souhaitez, et quand la
          joute débutera, servez-vous du chronomètre ci-dessous pour rythmer les
          différents temps de jeu
          <br />
          (débats, échanges, délibérations...).
          <br />
          <b>C'est parti&nbsp;!</b>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {countdowns.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`ajouter ${c.ariaLabel} au minuteur`}
              title={`ajouter ${c.ariaLabel} au minuteur`}
              onClick={() => setCountdown(Number(countdown) + c.seconds)}
              className="h-10 w-10 rounded-full border-app bg-app text-xs text-white"
            >
              +{c.display}
            </button>
          ))}
        </div>
        <div className="mt-2 mb-4 flex flex-wrap justify-center gap-2">
          {countdowns.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-label={`retirer ${c.ariaLabel} au minuteur`}
              title={`retirer ${c.ariaLabel} au minuteur`}
              onClick={() => setCountdown(Math.max(30, Number(countdown) - c.seconds))}
              className="h-10 w-10 rounded-full border border-app bg-white text-xs text-app"
            >
              -{c.display}
            </button>
          ))}
        </div>
        <Timer key={countdown} countdown={countdown} />
      </div>
    </div>
  );
};

export default LetsPlay;
