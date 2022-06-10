import { useLoaderData } from "@remix-run/react";
import { links } from "app/components/Selects";
import { redirect } from "@remix-run/node";
import { capitalizeFirstLetter } from "app/services/strings";
import { useEffect } from "react";
import ChallengeModel from "app/db/models/challenge.server";
import ProposeChallenge from "app/components/ProposeChallenge";

export { links };

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const challenge = Object.fromEntries(formData);
  challenge.environments = formData.getAll("environments").map(capitalizeFirstLetter);
  challenge.validated = true;
  await ChallengeModel.updateOne({ _id: params.challengeId }, challenge);
  return redirect("/admin/challenges");
};

export const loader = async ({ params }) => {
  const challenge = await ChallengeModel.findById(params.challengeId);
  return { challenge };
};

const EditTopic = () => {
  const { challenge } = useLoaderData();

  useEffect(() => {
    for (const key of Object.keys(window.sessionStorage)) {
      if (key.includes("edit-challenge")) window.sessionStorage.removeItem(key);
    }
  });

  return (
    <ProposeChallenge
      isOpen
      action={undefined}
      method="PUT"
      id="edit-challenge"
      challenge={challenge}
    />
  );
};

export default EditTopic;
