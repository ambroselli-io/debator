import { Outlet, useLoaderData } from "@remix-run/react";
import BurgerMenu from "app/components/BurgerMenu";
import ContactUs from "app/components/ContactUs";
import Modal from "app/components/Modal";
import PetitManifeste from "app/components/PetitManifeste";
import ProposeChallenge from "app/components/ProposeChallenge";
import ProposeTopic, { links } from "app/components/ProposeTopic";
import TopicModel from "app/db/models/topic.server";
import useSearchParamState from "app/services/searchParamsUtils";

export { links };

export const loader = async () => {
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

  return { categories: categories.map(({ _id }) => _id) };
};

const GameLayout = () => {
  const { categories } = useLoaderData();

  const [showProposeTopic, setShowProposeTopic] = useSearchParamState(
    "proposer-un-sujet",
    false,
    { removeParamOnDefaultValue: true }
  );
  const [showProposeChallenge, setShowProposeChallenge] = useSearchParamState(
    "proposer-un-defi",
    false,
    { removeParamOnDefaultValue: true }
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
      <header className="flex items-center justify-between border-b border-gray-100 py-2 px-4 text-app">
        <h1 className="font-marker text-xl">Debator</h1>
        <BurgerMenu>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowProposeTopic(true)}
          >
            <small>Proposer un nouveau sujet</small>
          </button>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowProposeChallenge(true)}
          >
            <small>Proposer un défi</small>
          </button>
          <button className="py-2 px-4 text-left" onClick={() => setShowContactUs(true)}>
            <small>Nous contacter</small>
          </button>
          <button
            className="py-2 px-4 text-left"
            onClick={() => setShowPetitManifeste(true)}
          >
            <small>Petit manifeste</small>
          </button>
        </BurgerMenu>
      </header>
      <div id="root" className="flex w-full shrink-0 grow flex-col items-center p-3">
        <Outlet />
        {!!showProposeTopic && (
          <ProposeTopic
            isOpen
            hide={() => setShowProposeTopic(false)}
            hideAndOpen={() => {
              setShowProposeTopic(false);
              setShowProposeTopic(true);
            }}
            categories={categories}
          />
        )}
        {!!showProposeChallenge && (
          <ProposeChallenge isOpen hide={() => setShowProposeChallenge(false)} />
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

export default GameLayout;
