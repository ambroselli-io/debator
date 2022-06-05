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
import { useState } from "react";

export { links };

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  // get categories with number of topics
  const categories = await TopicModel.aggregate([
    {
      $unwind: "$categories",
    },
    {
      $group: {
        _id: "$categories",
      },
    },
  ]);
  return { categories: categories.map(({ _id }) => _id), user };
};

const Layout = () => {
  const { categories, user } = useLoaderData();

  const [showProposeTopic, setShowProposeTopic] = useSearchParamState(
    "proposer-un-sujet",
    false,
    { removeParamOnDefaultValue: true }
  );
  const [proposeTopicKey, setProposeTopicKey] = useState(0);
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
      <header className="sticky top-0 -left-0 right-0 z-50 flex items-center justify-between border-b border-gray-100 bg-[#fafbfe] py-2 px-4 text-app">
        <h1 className="font-marker text-xl">
          <Link to="/">Debator</Link>
        </h1>
        <button
          id="add-button-to-destkop-home"
          className="py-2 px-4 text-left"
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
        </BurgerMenu>
      </header>
      <div
        id="root"
        className="flex w-full shrink-0 grow flex-col items-center p-3 pb-60"
      >
        <Outlet />
        {!!showProposeTopic && (
          <ProposeTopic
            key={proposeTopicKey}
            isOpen
            hide={() => setShowProposeTopic(false)}
            showNewForm={() => setProposeTopicKey((k) => k + 1)}
            categories={categories}
          />
        )}
        {!!showProposeChallenge && (
          <ProposeChallenge isOpen hide={() => setShowProposeChallenge(false)} />
        )}
        {!!showProposeGameMode && (
          <ProposeGameMode isOpen hide={() => setShowProposeGameMode(false)} />
        )}
        {!!showContactUs && <ContactUs isOpen hide={() => setShowContactUs(false)} />}
        {!!showPetitManifeste && (
          <Modal isOpen hide={() => setShowPetitManifeste(false)} title="Petit Manifeste">
            <PetitManifeste />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Layout;
