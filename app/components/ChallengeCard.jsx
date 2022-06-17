const ChallengeCard = ({ challenge }) => {
  return (
    <article className="mb-4 w-full rounded-xl border bg-white py-4 px-2">
      <div className="flex flex-col justify-between text-center">
        <p className="flex h-full items-center justify-center font-handwritten text-xl">
          {challenge.title.replace(" ?", "").replace(" !", "")}
          {challenge.title.includes(" ?") ? <>&nbsp;?</> : ""}
          {challenge.title.includes(" !") ? <>&nbsp;!</> : ""}
        </p>
        {challenge.description && (
          <small className="mt-4 text-center opacity-60">{challenge.description}</small>
        )}
      </div>
    </article>
  );
};

export default ChallengeCard;
