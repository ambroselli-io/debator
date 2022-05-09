import React from "react";
import { Link } from "remix";
import Star from "./Star";

const TopicCard = ({ topic }) => {
  return (
    <Link to={`/le-jeu?id=${topic._id}`}>
      <article className="mb-4 w-full rounded-xl border bg-white py-4 px-2">
        <figure className="flex flex-col justify-between text-center">
          <blockquote className="h-full">
            <p className="flex h-full items-center justify-center font-[xkcd] text-xl">
              {topic.name.toUpperCase().replace(" ?", "").replace(" !", "")}
              {topic.name.includes(" ?") ? <>&nbsp;?</> : ""}
              {topic.name.includes(" !") ? <>&nbsp;!</> : ""}
            </p>
          </blockquote>
          {!!topic.author && (
            <figcaption className="text-sm opacity-70">{topic.author}</figcaption>
          )}
        </figure>
        <small className="my-auto flex items-center justify-center opacity-25">
          <span className="text-center">
            {topic.categories.map((c, index, array) => (
              <React.Fragment key={c._id}>
                <b>{c.name || c.fr}</b>
                {index < array.length - 1 ? " - " : ""}
              </React.Fragment>
            ))}
          </span>
          <div className="mx-2 h-4 w-[2px] bg-gray-500" />
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
          <div className="mx-2 h-4 w-[2px] bg-gray-500" />
          <span className="text-center">
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
          </span>
        </small>
      </article>
    </Link>
  );
};

export default TopicCard;
