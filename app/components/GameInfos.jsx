import React from "react";
import Modal from "./Modal";

const GameInfos = ({ isOpen = true, game, hide }) => (
  <Modal title={game?.title} isOpen={isOpen} hide={hide}>
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

export default GameInfos;
