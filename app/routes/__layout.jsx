import { useState } from "react";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import BurgerMenu from "app/components/BurgerMenu";
import ContactUs from "app/components/ContactUs";
import Modal from "app/components/Modal";
import PetitManifeste from "app/components/PetitManifeste";
import ProposeChallenge from "app/components/ProposeChallenge";
import ProposeGameMode from "app/components/ProposeGameMode";
import ProposeTopic, { links } from "app/components/ProposeTopic";
import TopicModel from "app/db/models/topic.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import useSearchParamState from "app/services/searchParamsUtils";
import { useLocalStorage } from "app/services/useLocalStorage";
import dayjs from "dayjs";
import { isUserLicenced } from "app/utils/isUserLicenced.server";
import { getCategories } from "app/db/queries/categories.server";

export { links };

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const licenceIsValid = isUserLicenced(user);

  const categories = await getCategories();
  return { categories: categories.map(({ _id }) => _id), user, licenceIsValid };
};

const Layout = ({ children }) => {
  const { categories, user, licenceIsValid } = useLoaderData();

  const [showProposeTopic, setShowProposeTopic] = useSearchParamState(
    "proposer-un-sujet",
    false,
    { removeParamOnDefaultValue: true }
  );
  const [showIntro, setShowIntro] = useLocalStorage("show-intro", true);
  const [showProposeChallenge, setShowProposeChallenge] = useSearchParamState(
    "proposer-un-defi",
    false,
    { removeParamOnDefaultValue: true }
  );
  const [showProposeGameMode, setShowProposeGameMode] = useSearchParamState(
    "proposez-un-mode-de-jeu",
    false,
    {
      removeParamOnDefaultValue: true,
    }
  );
  const [showContactUs, setShowContactUs] = useSearchParamState("contactez-nous", false, {
    removeParamOnDefaultValue: true,
  });

  const [showPetitManifeste, setShowPetitManifeste] = useSearchParamState(
    "petit-manifeste",
    false,
    {
      removeParamOnDefaultValue: true,
    }
  );

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between  border-b border-gray-100 bg-[#fafbfe] py-2 px-4 text-app">
        <h1 className="font-marker text-xl">
          <Link to="/">Debator</Link>
        </h1>
        <button className="ml-auto py-2 px-4" onClick={() => setShowContactUs(true)}>
          Nous contacter
        </button>
        <button
          id="add-button-to-destkop-home"
          className="hidden py-2 px-4 text-left"
          suppressHydrationWarning
        >
          Add to home screen
        </button>
        <BurgerMenu>
          <Link to="/le-jeu" className="py-2 px-4 text-left">
            <span className="mr-6">🗣</span>Le jeu
          </Link>
          <hr className="my-2 border-none" />
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowProposeTopic(true)}
          >
            <span className="mr-6">💬</span>Proposer un nouveau sujet
          </button>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowProposeGameMode(true)}
          >
            <span className="mr-6">🎳</span>Proposer un mode de jeu
          </button>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowProposeChallenge(true)}
          >
            <span className="mr-6">🥸</span>Proposer un défi
          </button>
          <hr className="my-2 border-none" />
          <button className="py-2 px-4 text-left" onClick={() => setShowContactUs(true)}>
            <span className="mr-6">✉️</span>Nous contacter
          </button>
          <hr className="my-2 border-none" />
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowPetitManifeste(true)}
          >
            <span className="mr-6">📣</span>Petit manifeste
          </button>
          <hr className="my-2 border-none" />
          <Link to="/donation" className="py-2 px-4 text-left">
            <span className="mr-6">🪙</span>Acheter une licence (prix libre)
          </Link>
          <hr className="my-2 border-none" />
          <Link to="/profil" className="py-2 px-4 text-left">
            {user?.email ? (
              <>
                <span className="mr-6">😬</span>Mon profil
              </>
            ) : (
              <>
                <span className="mr-6">🗝</span>Se connecter
              </>
            )}
          </Link>
          <hr className="my-2 border-none" />
          <button className="py-2 px-4 text-left" onClick={() => setShowIntro(true)}>
            <span className="mr-6">🤗</span>Accueil
          </button>
          {/* <hr className="my-6 grow border-none" />
          <span className="py-2 px-4 text-left">
            © Debator - {dayjs().format("YYYY")}
          </span> */}
        </BurgerMenu>
      </header>
      <div
        id="root"
        className={`flex w-full shrink grow flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth p-3 ${
          licenceIsValid ? "pb-24" : "pb-72"
        }`}
      >
        {children ? children : <Outlet />}
        {!!showProposeTopic && (
          <ProposeTopic
            isOpen
            hide={() => setShowProposeTopic(false)}
            categories={categories}
            action="/actions/proposer-un-sujet"
            method="POST"
            id="propose-topic"
          />
        )}
        {!!showProposeChallenge && (
          <ProposeChallenge isOpen hide={() => setShowProposeChallenge(false)} />
        )}
        {!!showProposeGameMode && (
          <ProposeGameMode isOpen hide={() => setShowProposeGameMode(false)} />
        )}
        {!!showContactUs && (
          <ContactUs isOpen hide={() => setShowContactUs(false)} user={user} />
        )}
        {!!showPetitManifeste && (
          <Modal isOpen hide={() => setShowPetitManifeste(false)} title="Petit Manifeste">
            <PetitManifeste />
          </Modal>
        )}
        {!!showIntro && (
          <Modal isOpen hide={() => setShowIntro(false)} title="Bienvenue sur Debator !">
            <section className="flex flex-col items-center justify-around gap-4 bg-opacity-10 py-4">
              <h1 className="font-[xkcd] text-2xl uppercase text-app">
                Comment ca marche&nbsp;?
              </h1>
              <ol>
                <li className="mb-2 text-center">
                  <em className="font-bold not-italic text-app">I.</em> Je choisis un
                  sujet 🥸
                </li>
                <li className="mb-2 text-center">
                  <em className="font-bold not-italic text-app">II.</em> Je choisis le
                  mode de jeu 💁 (joute a deux, en arene...)
                </li>
                <li className="mb-2 text-center">
                  <em className="font-bold not-italic text-app">III.</em> Je choisis un
                  defi ! 😎 (en rimes, en se pincant le nez...)
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
        )}
      </div>
    </>
  );
};

export function ErrorBoundary({ error }) {
  console.error(error);
  return <Layout>Une erreur est survenue, désolé on s'en occupe !</Layout>;
}

export default Layout;
