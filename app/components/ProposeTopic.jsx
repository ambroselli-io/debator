import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { SelectAutofill, links } from "app/components/Selects";
import Input from "./Input";
import Modal from "./Modal";
import RangeInput from "./RangeInput";
import Required from "./Required";
import TopicSummary from "./TopicSummary";
import environments from "app/assets/environments";
import ContributionRule from "./ContributionRule";

export { links };

const ProposeTopic = ({ isOpen, hide, categories, topic, id, action, method }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  useEffect(() => {
    if (fetcher?.type === "done" && fetcher?.data?.ok === true) alert("Merci !");
  }, [fetcher?.type, fetcher.data?.ok]);

  // if (fetcher?.type === "done" && fetcher?.data?.ok === true) {
  //   return (
  //     <Modal isOpen={isOpen} hide={hide} title="Proposer un sujet">
  //       <div className="flex flex-col items-center">
  //         <p className="text-center">Merci ! Voici le sujet que vous avez proposé :</p>
  //         <TopicSummary topic={fetcher.data.topic} />
  //         <button
  //           type="button"
  //           onClick={hide}
  //           className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white"
  //         >
  //           Fermer
  //         </button>
  //       </div>
  //     </Modal>
  //   );
  // }

  return (
    <Modal
      isOpen={isOpen}
      hide={hide}
      title={topic?.title ? "Modifier un sujet" : "Proposer un sujet"}
    >
      <fetcher.Form
        method={method}
        id={id}
        action={action}
        className="flex w-full flex-col items-center gap-8"
      >
        <Input
          type="text"
          name="title"
          id={`${id}-title`}
          label="💡Énoncé du sujet"
          placeholder="Être ou ne pas être ?"
          required
          defaultValue={topic?.title}
        />
        <Input
          type="text"
          name="author"
          id={`${id}-author`}
          label="✍️ Auteur de la citation"
          placeholder="Si c'est une citation !"
          defaultValue={topic?.author}
        />
        <label htmlFor={`${id}-difficulty`} className="-mb-6 w-full">
          🍬 Difficulté <Required />
        </label>
        <RangeInput
          type="range"
          id={`${id}-difficulty`}
          name="difficulty"
          min={0}
          max={5}
          step={1}
          className="w-full bg-app text-app accent-app"
          required
          defaultValue={topic?.difficulty}
        />
        <SelectAutofill
          options={
            categories?.map((name) => ({
              value: name,
              label: name,
            })) || []
          }
          name="categories"
          legend="📚 Catégories"
          form={id}
          required
          className="w-full"
          isCreatable
          defaultValue={topic?.categories.map((name) => ({
            value: name,
            label: name,
          }))}
        />
        <SelectAutofill
          options={
            environments?.map((name) => ({
              value: name,
              label: name,
            })) || []
          }
          name="environments"
          legend="🧂 Environnement de jeu"
          form={id}
          required
          className="w-full"
          defaultValue={topic?.environments.map((name) => ({
            value: name,
            label: name,
          }))}
        />
        {/* <Input
          type="number"
          name="minAge"
          id={`${id}-minAge`}
          label="👶 Âge minimum"
          placeholder="15"
          required
          defaultValue={topic?.minAge}
        />
        <Input
          type="number"
          name="maxAge"
          id={`${id}-maxAge`}
          label="🧓 Âge maximum (facultatif)"
          placeholder="15"
          defaultValue={topic?.maxAge}
        /> */}
        <Input
          type="text"
          name="userName"
          autoComplete="name"
          id={`${id}-name`}
          label="🐒 Nom"
          placeholder="Votre nom"
          defaultValue={topic?.userName}
          required
        />
        <Input
          type="email"
          name="userEmail"
          autoComplete="email"
          inputMode="email"
          id={`${id}-email`}
          label="＠ Email"
          placeholder="Email"
          defaultValue={topic?.userEmail}
          required
        />
        <button
          type="submit"
          disabled={["loading", "submitting"].includes(fetcher.state)}
          className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
        >
          {["loading", "submitting"].includes(fetcher.state)
            ? "Envoi en cours"
            : topic?.title
            ? "Modifier"
            : "Proposer"}
        </button>
        <ContributionRule />
      </fetcher.Form>
    </Modal>
  );
};

export default ProposeTopic;
