import { Link, useSearchParams } from "remix";
import EditSvg from "./icons/EditSvg";

const TopciShowOrChoose = ({ topic }) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      {!!topic?.title && (
        <>
          <Link
            to={`../choisir-un-sujet?${searchParams.toString()}`}
            className="inline-flex items-center"
          >
            <i className="text-app">Votre sujet&nbsp;: </i>
            <EditSvg className="ml-2 h-2 w-2" />
          </Link>
          <br />
          <b className="font-[xkcd] uppercase text-black">{topic.title}</b>
          <br />
        </>
      )}
      {!topic?.title && (
        <>
          <Link to="../choisir-un-sujet" className="inline-flex flex-col items-center">
            <i className="text-app">Vous n'avez pas de sujet</i>
            <span className="text-sm text-app underline" to="../rechercher-un-sujet">
              En choisir un
            </span>
          </Link>
          <br />
        </>
      )}
    </>
  );
};

export default TopciShowOrChoose;
