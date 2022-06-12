import { useEffect, useState } from "react";
import Modal from "./Modal";

const Legal = ({ showLegal, setShowLegal }) => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(window?.atob("YXJuYXVkQGFtYnJvc2VsbGkuaW8="));
  }, []);

  if (!showLegal) return null;
  return (
    <Modal isOpen hide={() => setShowLegal(false)} title="Mentions légales">
      <p>
        <span className="font-marker text-app">Debator</span> est un jeu de société
        développé par Arnaud Ambroselli, développeur d'applications sur ordinateur et
        smartphones.
        <br />
        <br />
        La société qui déploie ce jeu est&nbsp;:
        <br />
        SASU AMBROSELLI.IO
        <br />
        15 rue des Halles
        <br />
        75001 Paris
        <br />
        France
        <br />
        <br />
        Contact: {email}
      </p>
    </Modal>
  );
};

export default Legal;
