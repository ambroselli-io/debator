import { useParams } from "@remix-run/react";
import Modal from "app/components/Modal";
import games from "app/games";
import React, { useMemo } from "react";

const GameInfos = () => {
  const params = useParams();
  const game = useMemo(
    () => games.find((game) => game.slug === params.game),
    [params.game]
  );

  return (
    <Modal>
      <h4 className="mb-5 text-xl font-bold">{game.title}</h4>
      {game?.explanation?.map((item, index) => (
        <React.Fragment key={index}>
          {!!item.title && <h5 className="mt-3 mb-2 mr-auto font-bold">{item.title}</h5>}
          {!!item.content && typeof item.content === "string" && (
            <p dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
          {!!item.content && typeof item.content !== "string" && (
            <ul>
              {item.content.map((li, i) => (
                <li
                  className="ml-4 list-disc"
                  key={i}
                  dangerouslySetInnerHTML={{ __html: li }}
                />
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
    </Modal>
  );
};

export default GameInfos;
