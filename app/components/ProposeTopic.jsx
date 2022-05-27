import categories from "app/assets/categories";
import { useEffect } from "react";
import { useFetcher } from "remix";
import CheckBoxGroup from "./CheckBoxGroup";
import Input from "./Input";
import Modal from "./Modal";
import RangeInput from "./RangeInput";
import Required from "./Required";
import TopicSummary from "./TopicSummary";

const ProposeTopic = ({ isOpen, hide }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  if (fetcher.type === "done" && fetcher.data.ok === true) {
    return (
      <Modal isOpen={isOpen} hide={hide} title="Proposer un sujet">
        <div className="flex flex-col items-center">
          <p className="text-center">Merci ! Voici le sujet que vous avez proposé :</p>
          <TopicSummary topic={fetcher.data.topic} />
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
    <Modal isOpen={isOpen} hide={hide} title="Proposer un sujet">
      <fetcher.Form
        method="POST"
        action="/actions/proposer-un-sujet"
        id="propose-topic"
        className="flex w-full flex-col items-center gap-8"
      >
        <Input
          type="text"
          name="title"
          id="propose-topic-title"
          label="💡Énoncé du sujet"
          placeholder="Être ou ne pas être ?"
          required
        />
        <label htmlFor="propose-topic-difficulty" className="-mb-6 w-full">
          🍬 Difficulté <Required />
        </label>
        <RangeInput
          type="range"
          id="propose-topic-difficulty"
          name="difficulty"
          min={0}
          max={5}
          step={1}
          className="w-full bg-app text-app accent-app"
          required
        />
        <CheckBoxGroup
          values={categories?.map((name) => ({ value: name, label: name })) || []}
          name="categories"
          legend="📚 Catégories"
          required
        />
        <Input
          type="number"
          name="minAge"
          id="propose-topic-minAge"
          label="👶 Âge minimum"
          placeholder="15"
          required
        />
        <Input
          type="number"
          name="maxAge"
          id="propose-topic-maxAge"
          label="🧓 Âge maximum (facultatif)"
          placeholder="15"
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

export default ProposeTopic;
