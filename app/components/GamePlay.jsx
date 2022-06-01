import games from "app/games";
import useSearchParamState from "app/services/searchParamsUtils";
import { useMemo } from "react";
import { Link, useSearchParams } from "@remix-run/react";
import GameInfos from "./GameInfos";
import EditSvg from "./icons/EditSvg";

const GamePlay = () => {
  const [searchParams] = useSearchParams();
  const game = useMemo(
    () => games.find((g) => g.slug === searchParams.get("mode")),
    [searchParams]
  );
  const { Image, titleForGame } = game;

  const [showGameModeInfos, setShowGameModeInfos] = useSearchParamState(
    "game-mode-infos",
    false,
    { removeParamOnDefaultValue: true }
  );

  return (
    <>
      <article className="flex flex-col items-center p-3">
        <h2 className="flex items-center text-center text-2xl font-bold">
          {titleForGame}
        </h2>
        <Image className="min-w-10 my-3 h-16" />
        <div className="flex items-center gap-2 text-center text-xl">
          <Link
            to={`../choisir-un-mode-de-jeu?${searchParams.toString()}`}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-center text-xs text-app"
          >
            <EditSvg className="h-2 w-2" />
          </Link>
          <button
            onClick={() => setShowGameModeInfos(true)}
            className="w-5 shrink-0 rounded-full text-xs text-app"
          >
            ?
          </button>
        </div>
      </article>
      <GameInfos
        isOpen={showGameModeInfos}
        game={game}
        hide={() => setShowGameModeInfos(false)}
      />
    </>
  );
};

export default GamePlay;
