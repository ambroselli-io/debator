import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import BurgerMenu from "app/components/BurgerMenu";
import ContactUs from "app/components/ContactUs";
import Modal from "app/components/Modal";
import PetitManifeste from "app/components/PetitManifeste";
import ProposeChallenge from "app/components/ProposeChallenge";
import ProposeGameMode from "app/components/ProposeGameMode";
import ProposeTopic, { links } from "app/components/ProposeTopic";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import useSearchParamState, {
  useMergeSearchParams,
} from "app/services/searchParamsUtils";
import { useLocalStorage } from "app/services/useLocalStorage";
import dayjs from "dayjs";
import { isUserLicenced } from "app/utils/isUserLicenced.server";
import { getCategories } from "app/db/queries/categories.server";
import { useState } from "react";
import Intro from "app/components/Intro";
import ChooseEnvironment from "app/components/ChooseEnvironment";
import Legal from "app/components/Legal";

export { links };

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const licenceIsValid = isUserLicenced(user);

  const categories = await getCategories();
  return { categories: categories.map(({ _id }) => _id), user, licenceIsValid };
};

const Layout = ({ children }) => {
  const { categories, user, licenceIsValid } = useLoaderData();
  const [_, mergeSearchParams] = useMergeSearchParams();
  const fetcher = useFetcher();
  const environment =
    fetcher.submission?.formData?.get("environment") || user.environment;

  const [showProposeTopic, setShowProposeTopic] = useSearchParamState(
    "proposer-un-sujet",
    false
  );
  const [showProposeChallenge, setShowProposeChallenge] = useSearchParamState(
    "proposer-un-defi",
    false
  );
  const [showChooseEnvironment, setShowChooseEnvironment] = useSearchParamState(
    "choisir-environment",
    false
  );
  const [showProposeGameMode, setShowProposeGameMode] = useSearchParamState(
    "proposez-un-mode-de-jeu",
    false
  );
  const [showContactUs, setShowContactUs] = useSearchParamState("contactez-nous", false);

  const [showPetitManifeste, setShowPetitManifeste] = useSearchParamState(
    "petit-manifeste",
    false
  );

  const [showIntro, setShowIntro] = useLocalStorage("show-intro", true);
  const [showLegal, setShowLegal] = useState(false);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between  border-b border-gray-100 bg-[#fafbfe] py-2 px-4 text-app">
        <h1 className="font-marker text-xl">
          <Link to="/">Debator</Link>
        </h1>
        {environment && (
          <button
            className={`mr-auto ml-2 rounded-full py-1 px-2 text-xs ${
              environment === "Éducation"
                ? "bg-blue-500 text-white"
                : environment === "Absurde"
                ? "bg-black text-white"
                : "bg-[#ff1345] text-white"
            } `}
            onClick={() => mergeSearchParams({ "choisir-environment": true })}
          >
            {environment === "Tout" ? "Classique" : environment}
          </button>
        )}
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
          <hr className="my-6 grow border-none" />
          <p className="flex justify-between py-2 px-4 text-xs">
            <span>© Debator - {dayjs().format("YYYY")}</span>
            <button className="ml-2 text-left" onClick={() => setShowLegal(true)}>
              Mentions légales
            </button>
          </p>
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
          <ProposeChallenge
            isOpen
            hide={() => setShowProposeChallenge(false)}
            method="POST"
            action="/actions/proposer-un-defi"
            id="propose-challenge"
          />
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
        <Legal showLegal={showLegal} setShowLegal={setShowLegal} />
        <ChooseEnvironment fetcher={fetcher} />
        <Intro showIntro={showIntro} setShowIntro={setShowIntro} />
      </div>
    </>
  );
};

export function ErrorBoundary({ error }) {
  console.error(error);
  return <Layout>Une erreur est survenue, désolé on s'en occupe !</Layout>;
}

export default Layout;
