import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import TopicModel from "../../../db/models/topic.server";
import ChallengeModel from "app/db/models/challenge.server";
import ChallengePlay from "app/components/ChallengePlay";
import TopicSummary from "app/components/TopicSummary";
import GamePlay from "app/components/GamePlay";
import games from "app/games";
import Timer, { links } from "app/components/Timer";
import { useLocalStorage } from "app/services/useLocalStorage";
import { topicFormat } from "app/db/methods/topic-format.server";
import { getTopicIdsNotToObfuscate } from "app/utils/obfuscate";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { isUserLicenced } from "app/utils/isUserLicenced.server";
import dayjs from "dayjs";
import GamePlayed from "app/db/models/gamePlayed.server";

export { links };

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const freeTopicIds = await getTopicIdsNotToObfuscate(request);
  const user = await getUnauthentifiedUserFromCookie(request);
  const licenceIsValid = isUserLicenced(user);
  let topic = null;
  const topicId = url.searchParams.get("topicId");
  if (!topicId)
    return redirect(`/le-jeu/choisir-un-sujet?${url.searchParams.toString()}`);
  if (topicId) topic = topicFormat(await TopicModel.findById(topicId), freeTopicIds);

  let challenge = null;
  const challengeId = url.searchParams.get("challengeId");
  if (challengeId) challenge = await ChallengeModel.findById(challengeId);

  const todaysGame = {
    topic: topic.title,
    gameMode: games.find((g) => g.slug === url.searchParams.get("mode"))?.title,
    challenge: challenge.title,
    date: dayjs().format("YYYY-MM-DD"),
    user: user._id,
    environment: user.environment,
  };
  if (!(await GamePlayed.findOne(todaysGame))) GamePlayed.create(todaysGame);
  return { topic, challenge, licenceIsValid };
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
  const { topic, challenge, licenceIsValid } = useLoaderData();
  const [countdown, setCountdown] = useLocalStorage("countdown", 60);
  const [editable, setEditable] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center  lg:flex-row lg:items-start lg:justify-center lg:pt-4">
      <div className="relative flex w-full max-w-[68ch] flex-col items-center pt-8 lg:pt-0">
        <TopicSummary topic={topic} editable={editable} onlyAuthor Component="h1" />
        <GamePlay editable={editable} />
        <ChallengePlay challenge={challenge} editable={editable} />
        <button
          type="button"
          className="absolute -mt-4 shrink-0 text-xs text-app underline opacity-80 lg:relative lg:mt-0"
          onClick={() => setEditable(!editable)}
        >
          {editable ? "Ne plus modifier" : "Modifier ?"}
        </button>
      </div>
      <div className="flex w-full max-w-[68ch] flex-col items-center lg:border-l lg:border-app">
        <p className="my-10 max-w-lg text-center lg:my-0">
          R??partissez les r??les, faites la pr??paration que vous souhaitez, et quand la
          joute d??butera, servez-vous du chronom??tre ci-dessous pour rythmer les
          diff??rents temps de jeu
          <br />
          (d??bats, ??changes, d??lib??rations...).
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
        <Timer
          key={countdown}
          countdown={countdown}
          className={`${licenceIsValid ? "mb-24" : "mb-72"} lg:mb-0`}
        />
      </div>
    </div>
  );
};

export default LetsPlay;
