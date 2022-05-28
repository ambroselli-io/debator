import { useEffect } from "react";
import { useFetcher } from "remix";
import Challenge from "./Challenge";
import Input from "./Input";
import Modal from "./Modal";

const ContactUs = ({ isOpen, hide }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  if (fetcher.type === "done" && fetcher.data.ok === true) {
    return (
      <Modal isOpen={isOpen} hide={hide} title="Proposer un défi">
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
    <Modal isOpen={isOpen} hide={hide} title="Nous contacter">
      <fetcher.Form
        method="POST"
        action="/actions/contact-us"
        id="contact-us"
        className="flex w-full flex-col items-center gap-8"
      >
        <Input
          type="text"
          name="name"
          autoComplete="name"
          id="contact-us-name"
          label="🐒 Votre nom"
          placeholder="Votre email"
          required
        />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          id="contact-us-email"
          label="＠ Votre Email"
          placeholder="Votre email"
          required
        />
        <Input
          textarea
          type="text"
          name="description"
          id="contact-us-description"
          label="🎙 Que voulez-vous nous dire ?"
          placeholder="Une demande particulière ? Un message de soutien ? Une critique ? Allez-y !"
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
      </fetcher.Form>
    </Modal>
  );
};

export default ContactUs;
