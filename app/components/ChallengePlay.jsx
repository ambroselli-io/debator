import useSearchParamState from "app/services/searchParamsUtils";
import { Link, useSearchParams } from "@remix-run/react";
import EditSvg from "./icons/EditSvg";
import Modal from "./Modal";

const ChallengePlay = ({ challenge }) => {
  const [searchParams] = useSearchParams();

  const [showChallengeInfos, setShowChallengeInfos] = useSearchParamState(
    "challenge-infos",
    false,
    { removeParamOnDefaultValue: true }
  );

  if (!challenge?.title)
    return (
      <>
        {!challenge?.title && (
          <>
            <Link
              to={`../choisir-un-defi?${searchParams.toString()}`}
              className="inline-flex flex-col items-center"
            >
              <i className="text-xs text-app">Choisir un défi</i>
            </Link>
            <br />
          </>
        )}
      </>
    );
  return (
    <>
      <div className="flex flex-col items-center p-3">
        <h2 className="flex flex-col items-center text-center text-xl">
          Le défi&nbsp;:
          <b>{challenge?.title}</b>
        </h2>
        <div className="flex items-center gap-2 text-center text-xl">
          <Link
            to={`../choisir-un-defi?${searchParams.toString()}`}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-center text-xs text-app"
          >
            <EditSvg className="h-2 w-2" />
          </Link>
          {!!showChallengeInfos && (
            <button
              onClick={() => setShowChallengeInfos(true)}
              className="w-5 shrink-0 rounded-full text-xs text-app"
            >
              ?
            </button>
          )}
        </div>
        <div className="flex w-full items-center justify-center"></div>
      </div>
      <Modal
        title={challenge?.title}
        isOpen={showChallengeInfos}
        hide={() => setShowChallengeInfos(false)}
      >
        <p>{challenge?.description}</p>
      </Modal>
    </>
  );
};

export default ChallengePlay;
