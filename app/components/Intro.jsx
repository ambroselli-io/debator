import { Link } from "@remix-run/react";
import Modal from "app/components/Modal";
import dayjs from "dayjs";

const Intro = ({ showIntro, setShowIntro }) => {
  if (!showIntro) return null;

  return (
    <Modal isOpen hide={() => setShowIntro(false)} title="Bienvenue sur Debator !">
      <section className="flex flex-col items-center justify-around gap-4 bg-opacity-10 py-4">
        <h1 className="font-handwritten text-2xl uppercase text-app">
          Comment ca marche&nbsp;?
        </h1>
        <ol>
          <li className="mb-2 text-center">
            <em className="font-bold not-italic text-app">I.</em> Je choisis un sujet 🥸
          </li>
          <li className="mb-2 text-center">
            <em className="font-bold not-italic text-app">II.</em> Je choisis le mode de
            jeu 💁 (joute a deux, en arene...)
          </li>
          <li className="mb-2 text-center">
            <em className="font-bold not-italic text-app">III.</em> Je choisis un defi !
            😎 (en rimes, en se pincant le nez...)
          </li>
        </ol>
        <button
          type="button"
          onClick={() => setShowIntro(false)}
          to="le-jeu"
          className="rounded-lg border border-app bg-app px-4 py-2 text-xl text-white"
        >
          C'est parti !
        </button>
      </section>
      <footer className="mt-4 flex shrink-0 flex-wrap items-center justify-evenly gap-2 text-sm text-app">
        <span className="shrink-0">© Debator - {dayjs().format("YYYY")}</span>
        <button onClick={() => setShowPetitManifeste(true)} className="underline">
          Petit manifeste
        </button>
        <button
          onClick={() => {
            setShowIntro(false);
            setShowContactUs(true);
          }}
          className="underline"
        >
          Nous contacter
        </button>
        <Link
          to="/donation"
          onClick={() => setShowIntro(false)}
          className="text-center underline"
        >
          Acheter une licence (prix&nbsp;libre)
        </Link>
      </footer>
    </Modal>
  );
};

export default Intro;
