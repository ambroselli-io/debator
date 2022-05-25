import React from "react";
import { useNavigate } from "remix";

const GameModeCard = ({
  Image,
  title,
  shortExplanation,
  preparation,
  preparationMinimum,
  preparationAdvised,
  gameDuration,
  numberOfPlayers,
  material,
  moreInfosLink,
  nextStepLink,
}) => {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col items-center p-3">
      <Image className="min-w-10 my-3 h-10" />
      <h3 className="text-center font-bold">{title}</h3>
      <p className="text-center text-sm opacity-80">{shortExplanation}</p>
      <ul className="mt-3 list-none text-center text-xs opacity-50">
        {!!preparation && (
          <li>
            <b>Préparation:</b> {preparation}
          </li>
        )}
        {!!preparationMinimum && (
          <li>
            <b>Préparation minimum:</b> {formatNbsp(preparationMinimum)}
          </li>
        )}
        {!!preparationAdvised && (
          <li>
            <b>Préparation conseillée:</b> {formatNbsp(preparationAdvised)}
          </li>
        )}
        <li>
          <b>Durée de jeu minimum:</b> {formatNbsp(gameDuration)}
        </li>
        <li>
          <b>Nombre de joueurs:</b> {formatNbsp(numberOfPlayers)}
        </li>
        {!!material && (
          <li>
            <b>Matériel:</b> {formatNbsp(material)}
          </li>
        )}
      </ul>
      <div className="flex w-full items-center justify-center">
        <button
          onClick={() => navigate(moreInfosLink)}
          state={{ scroll: false }}
          className="mt-1 mr-4 text-xs text-app underline"
        >
          Plus d'infos
        </button>
        <button
          className="mt-2 rounded-lg border border-app bg-app px-2 py-1 text-xs text-white disabled:opacity-50"
          onClick={() => navigate(nextStepLink)}
        >
          Choisir
        </button>
      </div>
    </article>
  );
};

const formatNbsp = (sentence) =>
  sentence
    ?.split(" ")
    .map((word, index) =>
      index > 0 ? (
        <React.Fragment key={word + index}>&nbsp;{word}</React.Fragment>
      ) : (
        <React.Fragment key={word + index}>{word}</React.Fragment>
      )
    );

export default GameModeCard;
