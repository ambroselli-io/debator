import React from "react";
import { Link, useSearchParams } from "@remix-run/react";
import EditSvg from "./icons/EditSvg";
import Star from "./Star";

const TopicSummary = ({
  Component = "h2",
  topic,
  editable = false,
  onlyAuthor = false,
}) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <Component className="relative my-0 flex h-fit min-h-[11.25rem] w-full max-w-md items-center justify-center text-center text-3xl">
        <figure className="flex min-h-min flex-col justify-between">
          <blockquote className="flex h-full flex-col items-center justify-center font-handwritten text-3xl">
            {topic?.title.replace(" ?", "").replace(" !", "")}
            {topic?.title.includes(" ?") ? <>&nbsp;?</> : ""}
            {topic?.title.includes(" !") ? <>&nbsp;!</> : ""}
            {!!editable && (
              <Link to={`../choisir-un-sujet?${searchParams.toString()}`}>
                <EditSvg className="ml-3 h-5 w-5" />
              </Link>
            )}
            {!!topic?.author && (
              <figcaption className="mt-2 text-sm">{topic?.author}</figcaption>
            )}
          </blockquote>
        </figure>
      </Component>
      {!onlyAuthor && (
        <small
          className={`my-auto mb-10 flex flex-col items-center ${
            !topic?._id ? "pointer-events-none invisible" : ""
          }`}
        >
          <p className="text-center">
            Catégorie{topic?.categories.length > 1 ? "s" : ""}&nbsp;:{" "}
            {topic?.categories.map((category, index, array) => (
              <React.Fragment key={category}>
                <b>{category}</b>
                {index < array.length - 1 ? " - " : ""}
              </React.Fragment>
            ))}
          </p>
          <p className="flex items-center text-center">
            Difficulté&nbsp;:
            <span className="ml-1 flex">
              {Array.from(Array(5).keys()).map((difficulty, index) => (
                <Star
                  key={`${difficulty}${topic?.difficulty}${index}`}
                  className={`h-3 w-3 fill-white${
                    difficulty >= topic?.difficulty ? "" : "!important"
                  } fill-app${
                    difficulty < topic?.difficulty ? "" : "!important"
                  } stroke-app`}
                />
              ))}
            </span>
          </p>
          {/* <p className="text-center">
            Âge&nbsp;:{" "}
            {topic?.maxAge ? (
              <>
                de{" "}
                <b>
                  {topic?.minAge} à {topic?.maxAge} ans
                </b>
              </>
            ) : (
              <>
                à partir de <b>{topic?.minAge} ans</b>
              </>
            )}
          </p> */}
        </small>
      )}
    </>
  );
};

export default TopicSummary;
