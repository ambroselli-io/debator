const Challenge = ({ challenge, hideQuestionMark = false }) => (
  <>
    <h2 className="min-h-8 relative my-0 w-full text-center text-3xl">
      <div className="pointer-events-none invisible w-full opacity-0" aria-hidden={true}>
        just
      </div>
      <div className="pointer-events-none invisible w-full opacity-0" aria-hidden={true}>
        to
      </div>
      <div className="pointer-events-none invisible w-full opacity-0" aria-hidden={true}>
        make
      </div>
      <div className="pointer-events-none invisible w-full opacity-0" aria-hidden={true}>
        five
      </div>
      <div className="pointer-events-none invisible w-full opacity-0" aria-hidden={true}>
        lines
      </div>
      <p className="absolute inset-0 flex items-center justify-center font-[xkcd] text-3xl">
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
