import React from "react";
import Modal from "./Modal";

const ChallengeInfos = ({ isOpen = true, challenge, hide }) => (
  <Modal title={challenge?.title} isOpen={isOpen} hide={hide}>
    <p>{challenge?.description}</p>
  </Modal>
);

export default ChallengeInfos;
