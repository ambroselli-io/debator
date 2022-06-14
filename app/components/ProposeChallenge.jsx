import environments from "app/assets/environments";
import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import Challenge from "./Challenge";
import ContributionRule from "./ContributionRule";
import Input from "./Input";
import Modal from "./Modal";
import { SelectAutofill } from "./Selects";

const ProposeChallenge = ({ isOpen, hide, challenge, id, method, action }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.error) alert(fetcher.data.error);
  }, [fetcher.data?.error]);

  if (fetcher?.type === "done" && fetcher?.data?.ok === true) {
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
        method={method}
        action={action}
        id={id}
        className="flex w-full flex-col items-center gap-8"
      >
        <Input
          type="text"
          name="title"
          id={`${id}-title`}
          label="💡Énoncé du défi"
          placeholder="Se pincer le nez"
          required
          defaultValue={challenge?.title}
        />
        <Input
          textarea
          type="text"
          name="description"
          id={`${id}-description`}
          label="🥸 Description"
          placeholder="Vous devez faire votre argumentation en vous pinçant le nez 👃"
          defaultValue={challenge?.description}
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
          defaultValue={challenge?.environments.map((name) => ({
            value: name,
            label: name,
          }))}
        />
        <Input
          type="text"
          name="userName"
          autoComplete="name"
          id={`${id}-name`}
          label="🐒 Votre nom"
          placeholder="Votre nom"
          required
          defaultValue={challenge?.userName}
        />
        <Input
          type="email"
          name="userEmail"
          autoComplete="email"
          inputMode="email"
          id={`${id}-email`}
          label="＠ Votre Email"
          placeholder="Pour que nous puissions discuter de votre proposition !"
          required
          defaultValue={challenge?.userEmail}
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
        <ContributionRule />
      </fetcher.Form>
    </Modal>
  );
};

export default ProposeChallenge;
