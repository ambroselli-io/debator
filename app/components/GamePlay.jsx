import games from "app/games";
import useSearchParamState from "app/services/searchParamsUtils";
import { useMemo } from "react";
import { Link, useSearchParams } from "@remix-run/react";
import GameInfos from "./GameInfos";
import EditSvg from "./icons/EditSvg";

const GamePlay = ({ editable }) => {
  const [searchParams] = useSearchParams();
  const game = useMemo(
    () => games.find((g) => g.slug === searchParams.get("mode")),
    [searchParams]
  );
  const { Image, titleForGame } = game;

  const [showGameModeInfos, setShowGameModeInfos] = useSearchParamState(
    "game-mode-infos",
    false
  );

  return (
    <>
      <article className="flex flex-col items-center p-3">
        <h2 className="flex items-center text-center text-2xl font-bold">
          {titleForGame}{" "}
          <button
            onClick={() => setShowGameModeInfos(true)}
            className="ml-2 h-6 w-6 shrink-0 items-center justify-center rounded-full border border-app font-sans text-sm text-app"
          >
            ?
          </button>
        </h2>
        <Image className="min-w-10 my-3 h-16" />
        <div className="flex items-center gap-2 text-center text-xl">
          {editable && (
            <Link
              to={`../choisir-un-mode-de-jeu?${searchParams.toString()}`}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-center text-xs text-app"
            >
              <EditSvg className="h-5 w-5" />
            </Link>
          )}
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
