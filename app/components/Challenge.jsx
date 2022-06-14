const Challenge = ({ challenge, hideQuestionMark = false }) => (
  <>
    <h2 className="relative my-0 flex h-fit min-h-[11.25rem] w-full max-w-md items-center justify-center text-center text-3xl">
      <p className="flex min-h-min items-center justify-center font-[xkcd] text-3xl">
        {challenge.title.toUpperCase().replace(" ?", "").replace(" !", "")}
        {challenge.title.includes(" ?") ? <>&nbsp;?</> : ""}
        {challenge.title.includes(" !") ? <>&nbsp;!</> : ""}
        {challenge.description && !hideQuestionMark && (
          <>
            <a
              href="#challenge-description"
              title="Cliquez sur ce lien qui vous dirigera vers l'explication en bas de page. Si rien ne se passe, regardez en bas de la page, l'explication est déjà là !"
              className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-app text-sm text-app"
            >
              ?
            </a>
          </>
        )}
      </p>
    </h2>
  </>
);

export default Challenge;
