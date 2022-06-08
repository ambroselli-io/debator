import ContactUs from "app/components/ContactUs";
import PetitManifeste from "app/components/PetitManifeste";
import dayjs from "dayjs";
import { Link, useNavigate, useSearchParams } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const unstable_shouldReload = () => false;

export const loader = () => redirect("/le-jeu");

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showContactUs = searchParams.get("contactez-nous") === "true";

  return (
    <>
      <header className="flex min-h-screen-1/2 shrink-0 flex-col items-center justify-around border-b border-gray-100 py-12  px-4">
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
      <section className="flex min-h-screen-1/2 shrink-0 flex-col items-center justify-around border-b border-gray-100 bg-app bg-opacity-10 py-16 px-4 text-2xl">
        <h1 className="font-marker text-4xl text-app">Comment ça marche&nbsp;?</h1>
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
      <section className="flex min-h-screen-1/2 shrink-0 flex-col items-center justify-around border-b border-gray-100 py-16 px-4">
        <PetitManifeste />
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
      <footer className="flex shrink-0 flex-wrap items-center justify-around bg-app bg-opacity-10 p-4 text-app">
        <span className="shrink-0">© Debator - {dayjs().format("YYYY")}</span>
        <Link
          to="/?contactez-nous=true"
          state={{ scroll: false }}
          className="shrink-0 py-2 px-4 text-left"
        >
          Nous contacter
        </Link>
        <Link to="/donation" className="shrink-0 py-2 px-4 text-left">
          Acheter une licence (prix libre)
        </Link>
      </footer>
      {!!showContactUs && (
        <ContactUs isOpen hide={() => navigate(-1, { scroll: false })} />
      )}
    </>
  );
};

export default Index;
