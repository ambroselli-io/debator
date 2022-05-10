const GameModeCard = ({ Image, title, shortExplanation }) => (
  <article className="flex-0 flex max-w-[90w] basis-80 flex-col items-center rounded bg-white p-3 drop-shadow">
    <Image className="min-w-10 h-10" />
    <h3 className="text-center font-bold">{title}</h3>
    <p className="text-center text-sm opacity-80">{shortExplanation}</p>
  </article>
);

export default GameModeCard;
