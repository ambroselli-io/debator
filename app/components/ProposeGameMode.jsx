import { useEffect } from "react";
import { useFetcher } from "remix";
import Input from "./Input";
import Modal from "./Modal";

const ProposeGameMode = ({ isOpen, hide }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  if (fetcher.type === "done" && fetcher.data.ok === true) {
    return (
      <Modal isOpen={isOpen} hide={hide} title="Nous contacter">
        <div className="flex flex-col items-center">
          <p className="text-center">Merci !</p>
          <button
            type="button"
            onClick={hide}
            className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
          >
            Fermer
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} hide={hide} title="Proposer un mode de jeu">
      <fetcher.Form
        method="POST"
        action="/actions/contact-us"
        id="contact-us"
        className="flex w-full flex-col items-center gap-8"
      >
        <input type="hidden" name="subject" defaultValue="Proposition de mode de jeu" />
        <Input
          type="text"
          name="name"
          autoComplete="name"
          id="contact-us-name"
          label="🎳 Nom du mode de jeu "
          placeholder="Face à face"
          required
        />
        <Input
          textarea
          type="text"
          name="description"
          id="contact-us-description"
          label="🎙 Comment fonctionne ce jeu ?"
          placeholder="Décrivez le mode de jeu"
          required
        />
        <Input
          type="text"
          name="name"
          autoComplete="name"
          id="contact-us-name"
          label="🐒 Votre nom"
          placeholder="Votre nom"
          required
        />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          id="contact-us-email"
          label="＠ Votre Email"
          placeholder="Pour que nous puissions discuter de votre proposition !"
          required
        />
        <button
          type="submit"
          disabled={["loading", "submitting"].includes(fetcher.state)}
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
        >
          {["loading", "submitting"].includes(fetcher.state)
            ? "Envoi en cours"
            : "Envoyer"}
        </button>
        <button type="button" onClick={hide} className="mt-2 underline">
          Annuler
        </button>
      </fetcher.Form>
    </Modal>
  );
};

export default ProposeGameMode;
