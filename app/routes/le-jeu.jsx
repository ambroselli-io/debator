import { Outlet } from "@remix-run/react";
import BurgerMenu from "app/components/BurgerMenu";
import ProposeTopic from "app/components/ProposeTopic";
import useSearchParamState from "app/services/searchParamsUtils";

const GameLayout = () => {
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

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-100 py-2 px-4 text-app">
        <h1 className="font-marker text-xl">Debat'OR</h1>
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
        </BurgerMenu>
      </header>
      <div id="root" className="flex w-full flex-col items-center p-3">
        <Outlet />
        {!!showProposeTopic && (
          <ProposeTopic isOpen hide={() => setShowProposeTopic(false)} />
        )}
      </div>
    </>
  );
};

export default GameLayout;
