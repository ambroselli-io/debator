import { useEffect } from "react";
import { useFetcher } from "remix";
import Challenge from "./Challenge";
import Input from "./Input";
import Modal from "./Modal";

const ProposeChallenge = ({ isOpen, hide }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  if (fetcher.type === "done" && fetcher.data.ok === true) {
    return (
      <Modal isOpen={isOpen} hide={hide} title="Proposer un défi">
        <div className="flex flex-col items-center">
          <p className="text-center">Merci ! Voici le défi que vous avez proposé :</p>
          <Challenge challenge={fetcher.data.challenge} hideQuestionMark />
          {fetcher.data.challenge.description && (
            <small className="mt-4 text-center opacity-60">
              {fetcher.data.challenge.description}
            </small>
          )}
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
    <Modal isOpen={isOpen} hide={hide} title="Proposer un défi">
      <fetcher.Form
        method="POST"
        action="/actions/proposer-un-defi"
        id="propose-challenge"
        className="flex w-full flex-col items-center gap-8"
      >
        <Input
          type="text"
          name="title"
          id="propose-challenge-title"
          label="💡Énoncé du défi"
          placeholder="Se pincer le nez"
          required
        />
        <Input
          textarea
          type="text"
          name="description"
          id="propose-challenge-description"
          label="🥸 Description"
          placeholder="Vous devez faire votre argumentation en vous pinçant le nez 👃"
        />
        <button
          type="submit"
          disabled={["loading", "submitting"].includes(fetcher.state)}
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
        >
          {["loading", "submitting"].includes(fetcher.state)
            ? "Envoi en cours"
            : "Proposer"}
        </button>
      </fetcher.Form>
    </Modal>
  );
};

export default ProposeChallenge;
