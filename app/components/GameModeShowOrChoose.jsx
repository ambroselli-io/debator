import games from "app/games";
import { Link, useSearchParams } from "remix";
import EditSvg from "./icons/EditSvg";

const GameModeShowOrChoose = () => {
  const [searchParams] = useSearchParams();
  const gameMode = games.find((g) => g.slug === searchParams.get("mode"));
  return (
    <>
      {!!gameMode && (
        <>
          <Link
            to={`../choisir-un-mode-de-jeu?${searchParams.toString()}`}
            className="inline-flex items-center"
          >
            <i className="text-app">Votre mode de jeu&nbsp;: </i>
            <EditSvg className="ml-2 h-2 w-2" />
          </Link>
          <br />
          <b className="font-[xkcd] uppercase text-black">{gameMode.titleNoDiacritics}</b>
          <br />
        </>
      )}
      {!gameMode && (
        <>
          <Link
            to={`../choisir-un-mode-de-jeu?${searchParams.toString()}`}
            className="inline-flex flex-col items-center"
          >
            <i className="text-app">Vous n'avez pas de sujet</i>
            <span className="text-sm text-app underline" to="../rechercher-un-sujet">
              En choisir un
            </span>
          </Link>
          <br />
        </>
      )}
    </>
  );
};

export default GameModeShowOrChoose;
