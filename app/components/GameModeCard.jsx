import React from "react";
import { Link } from "remix";

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
}) => (
  <Link
    to={`../choisir-un-mode-de-jeu`}
    className="flex-0 max-w-[90w] basis-80 rounded bg-white drop-shadow"
  >
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
      <Link
        aria-disabled
        className="mt-1 text-xs text-app underline"
        to="../rechercher-un-sujet"
      >
        Plus d'infos
      </Link>
    </article>
  </Link>
);

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
