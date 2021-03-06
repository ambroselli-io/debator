import React from "react";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";
import TopicModel from "../../../db/models/topic.server";
import TopicShowOrChoose from "app/components/TopicShowOrChoose";
import GameModeShowOrChoose from "app/components/GameModeShowOrChoose";
import ChallengeModel from "app/db/models/challenge.server";
import Challenge from "app/components/Challenge";
import useNavigateToNextStep from "app/utils/useNavigateToNextStep";
import { topicFormat } from "app/db/methods/topic-format.server";
import { challengeFormat } from "app/db/methods/challenge-format.server";
import { getTopicIdsNotToObfuscate } from "app/utils/obfuscate";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const freeTopicIds = await getTopicIdsNotToObfuscate(request);

  const user = await getUnauthentifiedUserFromCookie(request);
  const challengeQuery = user?.environment
    ? { environments: user.environment }
    : { "environments.Absurde": { $ne: 1 } };
  const challenges = await ChallengeModel.find(challengeQuery);
  let topic = null;
  const topicId = url.searchParams.get("topicId");
  if (topicId) topic = topicFormat(await TopicModel.findById(topicId), freeTopicIds);

  const challengeId = url.searchParams.get("challengeId");

  if (challengeId) {
    const challenge = challengeFormat(await ChallengeModel.findById(challengeId));
    return {
      challenge,
      maxIndex: challenges.length,
      topic,
    };
  }

  const challengeIndex = Number(url.searchParams.get("challengeIndex")) || 0;

  return {
    challenge: challengeFormat(challenges[challengeIndex % challenges.length]),
    maxIndex: challenges.length,
    topic,
  };
};

const ChooseAChallenge = () => {
  const { topic, maxIndex, challenge } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigateToNextStep = useNavigateToNextStep();

  const currentIndex = Number(searchParams.get("challengeIndex")) || 0;

  return (
    <>
      <small className="text-center">
        <TopicShowOrChoose topic={topic} />
        <br />
        <GameModeShowOrChoose />
        <br />
        <i className="text-app">Choisissez un d??fi</i>
        <br />
      </small>
      <Challenge challenge={challenge} />
      <Link
        to={navigateToNextStep("challengeId", challenge?._id)}
        className="rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        Je choisis celui-l?? !
      </Link>
      <Form method="GET">
        <input
          type="hidden"
          name="challengeIndex"
          value={(currentIndex + 1) % maxIndex}
        />
        <input
          type="hidden"
          name="mode"
          defaultValue={searchParams.get("mode") || undefined}
        />
        <input type="hidden" name="topicId" defaultValue={searchParams.get("topicId")} />
        <button
          className="mt-4 rounded-lg border border-app bg-white px-4 py-2 text-app"
          type="submit"
        >
          Montrez-moi un autre&nbsp;d??fi
        </button>
      </Form>
      {challenge.description && (
        <small className="mt-4 max-w-[68ch] text-center" id="challenge-description">
          <i>
            <b>* En quoi consiste le d??fi {challenge.title} ? </b>
          </i>
          <br />
          {challenge.description}
        </small>
      )}
      <Link
        className="mt-4 text-sm text-app underline"
        to={`../rechercher-un-defi?${searchParams.toString()}`}
      >
        Recherche avanc??e
      </Link>
      <Link
        className="mt-4 text-xs text-app underline opacity-80"
        to={navigateToNextStep("challengeId", undefined)}
      >
        Je ne veux pas de d??fi
      </Link>
    </>
  );
};

export default ChooseAChallenge;
