import React from "react";
import { Link, useSearchParams } from "remix";
import EditSvg from "./icons/EditSvg";
import Star from "./Star";

const TopicSummary = ({ topic, editable = false, onlyAuthor = false }) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <h2 className="min-h-8 relative my-0 w-full text-center text-3xl">
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          just
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          to
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          make
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          five
        </div>
        <div
          className="pointer-events-none invisible w-full opacity-0"
          aria-hidden={true}
        >
          lines
        </div>
        <figure className="absolute inset-0 flex flex-col justify-between">
          <blockquote className="h-full">
            <p className="flex h-full items-center justify-center font-[xkcd] text-3xl">
              {topic.title.toUpperCase().replace(" ?", "").replace(" !", "")}
              {topic.title.includes(" ?") ? <>&nbsp;?</> : ""}
              {topic.title.includes(" !") ? <>&nbsp;!</> : ""}
              {!!editable && (
                <Link to={`../choisir-un-sujet?${searchParams.toString()}`}>
                  <EditSvg className="ml-3 h-3 w-3" />
                </Link>
              )}
            </p>
          </blockquote>
          <figcaption className="text-sm">{topic.author}</figcaption>
        </figure>
      </h2>
      {!onlyAuthor && (
        <small className="my-auto mb-10 flex flex-col items-center">
          <p className="text-center">
            Catégorie{topic.categories.length > 1 ? "s" : ""}&nbsp;:{" "}
            {topic.categories.map((category, index, array) => (
              <React.Fragment key={category}>
                <b>{category}</b>
                {index < array.length - 1 ? " - " : ""}
              </React.Fragment>
            ))}
          </p>
          <p className="flex items-center text-center">
            Difficulté&nbsp;:
            <span className="ml-1 flex">
              {Array.from(Array(5).keys()).map((difficulty) => (
                <Star
                  key={difficulty + topic.difficulty}
                  className={`h-3 w-3 fill-white${
                    difficulty >= topic.difficulty ? "" : "!important"
                  } fill-app${
                    difficulty < topic.difficulty ? "" : "!important"
                  } stroke-app`}
                />
              ))}
            </span>
          </p>
          <p className="text-center">
            Âge&nbsp;:{" "}
            {topic.maxAge ? (
              <>
                de{" "}
                <b>
                  {topic.minAge} à {topic.maxAge} ans
                </b>
              </>
            ) : (
              <>
                à partir de <b>{topic.minAge} ans</b>
              </>
            )}
          </p>
        </small>
      )}
    </>
  );
};

export default TopicSummary;
