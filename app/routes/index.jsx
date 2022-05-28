import { Link } from "remix";

const Index = () => {
  return (
    <>
      <header className="flex h-screen-1/2 flex-col items-center justify-around border-b border-gray-100 py-2 px-4">
        <h1 className="font-marker text-6xl text-app">Debat'OR</h1>
        <p className="mt-4 -rotate-12 font-[xkcd] text-3xl uppercase">
          🤪 Debattre en s'amusant
        </p>
        <Link
          to="le-jeu"
          className="rounded-lg border border-app bg-app px-4 py-2 text-2xl text-white"
        >
          Jouons !
        </Link>
        <p className="rotate-6 font-[xkcd] text-3xl uppercase">S'amuser a debattre 📣</p>
      </header>
      <section className="flex h-screen-1/2 flex-col items-center justify-around border-b border-gray-100 bg-app bg-opacity-10 py-2 px-4 text-2xl">
        <h1 className="font-marker text-4xl text-app">Comment ça marche ?</h1>
        <ol>
          <li className="mb-2 text-center font-[xkcd]">
            <em className="font-bold not-italic text-app">I.</em> Je choisis un sujet 🥸
          </li>
          <li className="mb-2 text-center font-[xkcd]">
            <em className="font-bold not-italic text-app">II.</em> Je choisis le mode de
            jeu 💁 (joute a deux, en arene...)
          </li>
          <li className="mb-2 text-center font-[xkcd]">
            <em className="font-bold not-italic text-app">III.</em> Je choisis un defi !
            😎 (en alexandrin, en se pincant le nez...)
          </li>
        </ol>
        <Link
          to="le-jeu"
          className="rounded-lg border border-app bg-app px-4 py-2 text-xl text-white"
        >
          C'est parti !
        </Link>
      </section>
      <section className="min-h-screen-1/2 flex flex-col items-center justify-around border-b border-gray-100 py-2 px-4">
        <h1 className="mt-4 font-marker text-4xl text-app">Manifeste</h1>
        <p className="mt-4">
          Débattre, c'est le coeur de la démocratie.
          <br />
          Être citoyen électeur, c'est savoir réfléchir, choisir, considérer les avis
          contraires, savoir et pouvoir changer d'avis... Cette gymnastique cérébrale
          n'est pas évidente, elle demande une technique qui s'apprend, mais qui
          aujourd'hui ne s'enseigne pas encore assez, et pour laquelle on ne s'entraine
          pas assez.
          <br />
          Nous pensons que c'est en donnant envie qu'on apprend plus facilement, et nous
          parions que c'est en rendant la pratique du débat plus accessible et plus
          amusante que les techniques du débat seront le mieux assimilées.
          <br />
          Débat'or est un jeu simple - on choisit un sujet parmi des centaines, on choisit
          un mode de jeu parmi 5 disponibles, on rajoute un défi si on le souhaite pour un
          peu plus de piquant. Il est disponible pour l'éducation, mais aussi pour un jeu
          en famille ou entre amis, avec des sujets et défis adaptés.
        </p>
        <Link
          to="le-jeu"
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-xl  text-white"
        >
          C'est parti !
        </Link>
      </section>
    </>
  );
};

export default Index;
