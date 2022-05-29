import ContactUs from "app/components/ContactUs";
import useSearchParamState from "app/services/searchParamsUtils";
import dayjs from "dayjs";
import { Link, useNavigate, useSearchParams } from "remix";

export const unstable_shouldReload = () => false;

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showContactUs = searchParams.get("contactez-nous") === "true";

  return (
    <>
      <header className="flex min-h-screen-1/2 flex-col items-center justify-around border-b border-gray-100 py-12 px-4">
        <h1 className="font-marker text-6xl text-app">Debator</h1>
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
      <section className="flex min-h-screen-1/2 flex-col items-center justify-around border-b border-gray-100 bg-app bg-opacity-10 py-16 px-4 text-2xl">
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
      <section className="flex min-h-screen-1/2 flex-col items-center justify-around border-b border-gray-100 py-16 px-4">
        <h1 className="mt-4 font-marker text-4xl text-app">Petit Manifeste</h1>
        <p className="mt-4 max-w-[68ch]">
          Débattre, c'est le coeur de la démocratie. C'est savoir s'intéresser, réfléchir,
          choisir, considérer les avis contraires, savoir et pouvoir changer d'avis...
          <br />
          <br />
          Cette gymnastique cérébrale n'est pas évidente : elle demande une technique, qui
          s'apprend et pour laquelle il faut s'entrainer.
          <br />
          <br />
          <em className="font-marker not-italic text-app">Debator</em> c'est d'abord une
          mine de sujets inépuisable, autant de simples que d'érudits. C'est bien sûr
          aussi un guide sur différents type de joutes verbales pour s'entraîner au débat.
          Enfin et surtout, c'est une proposition de défis des plus idiots aux plus
          difficiles, sensés rendre le débat plus épicé !
          <br />
          <br />
          Car nous pensons que c'est en donnant envie qu'on apprend plus facilement, et
          nous parions que c'est en rendant la pratique du débat plus accessible et plus
          amusante qu'on deviendra toutes et tous de meilleurs acteurs en démocratie :
          plus réfléchis, plus confiants dans nos choix, plus à l'écoute des pensées
          différentes.
          <br />
          <br />
          Parce que d'entrainer à débattre n'est pas réservé qu'à l'école,{" "}
          <em className="font-marker not-italic text-app">Debator</em> est disponible pour
          l'éducation, mais aussi pour un jeu en famille ou entre amis, avec des sujets et
          défis adaptés.
        </p>
        {/* <button
          className="mt-4 rounded-lg border border-app bg-white px-4 py-2 text-app"
          type="submit"
        >
          Voir le grand manifeste
        </button> */}
        <Link
          to="le-jeu"
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-xl  text-white"
        >
          C'est parti !
        </Link>
      </section>
      <footer className="flex flex-wrap items-center justify-around bg-app bg-opacity-10 p-4 text-app">
        <span className="shrink-0">© Debator - {dayjs().format("YYYY")}</span>
        <Link
          to="/?contactez-nous=true"
          state={{ scroll: false }}
          className="shrink-0 py-2 px-4 text-left"
        >
          Nous contacter
        </Link>
      </footer>
      {!!showContactUs && (
        <ContactUs isOpen hide={() => navigate(-1, { scroll: false })} />
      )}
    </>
  );
};

export default Index;
