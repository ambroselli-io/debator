import { Link, useSearchParams } from "remix";
import EditSvg from "./icons/EditSvg";

const ChallengeShowOrChoose = ({ challenge }) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      {!!challenge?.title && (
        <>
          <Link
            to={`../choisir-un-defi?${searchParams.toString()}`}
            className="inline-flex items-center"
          >
            <i className="text-app">Votre défi&nbsp;: </i>
            <EditSvg className="ml-2 h-2 w-2" />
          </Link>
          <br />
          <b className="font-[xkcd] uppercase text-black">{challenge.title}</b>
          <br />
        </>
      )}
      {!challenge?.title && (
        <>
          <Link
            to={`../choisir-un-defi?${searchParams.toString()}`}
            className="inline-flex flex-col items-center"
          >
            <i className="text-app">Vous n'avez pas de défi</i>
            <span className="text-sm text-app underline">En choisir un</span>
          </Link>
          <br />
        </>
      )}
    </>
  );
};

export default ChallengeShowOrChoose;
