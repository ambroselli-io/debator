import React, { useMemo } from "react";
import { useLoaderData } from "@remix-run/react";
import games from "../../../games";
import GameModeCard from "../../../components/GameModeCard";
import TopicModel from "../../../db/models/topic.server";
import TopicShowOrChoose from "app/components/TopicShowOrChoose";
import useSearchParamState from "app/services/searchParamsUtils";
import GameInfos from "app/components/GameInfos";
import { topicFormat } from "app/db/methods/topic-format.server";
import { getTopicIdsNotToObfuscate } from "app/utils/obfuscate";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const freeTopicIds = await getTopicIdsNotToObfuscate(request);

  const topicId = url.searchParams.get("topicId");
  if (topicId) {
    const topic = await TopicModel.findById(topicId);
    return { topic: topicFormat(topic, freeTopicIds) };
  }
  return {};
};

const ChooseAGameMode = () => {
  const { topic } = useLoaderData();
  const [showGameModeInfos, setShowGameModeInfos] = useSearchParamState(
    "game-mode-infos-slug",
    "",
    { removeParamOnDefaultValue: true }
  );
  const game = useMemo(
    () => games.find((g) => g.slug === showGameModeInfos),
    [showGameModeInfos]
  );
  return (
    <>
      <small className="text-center">
        <TopicShowOrChoose topic={topic} />
        <br />
        <i className="text-app">Choisissez un mode de jeu</i>
      </small>
      <main className="mt-5 flex w-full max-w-5xl flex-wrap justify-center gap-3">
        {games.map((game) => {
          return (
            <div
              key={game.slug}
              className="flex-0 max-w-[90w] basis-80 rounded bg-white drop-shadow"
            >
              <GameModeCard game={game} onShowGameModeInfos={setShowGameModeInfos} />
            </div>
          );
        })}
      </main>
      <GameInfos
        isOpen={!!showGameModeInfos?.length}
        game={game}
        hide={() => setShowGameModeInfos("")}
      />
    </>
  );
};

export default ChooseAGameMode;
