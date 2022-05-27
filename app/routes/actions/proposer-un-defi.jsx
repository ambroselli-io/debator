import ChallengeModel from "app/db/models/challenge.server";
import { json } from "remix";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const newChallenge = Object.fromEntries(formData);
  newChallenge.validated = false;
  const existingChallenge = await ChallengeModel.findOne({ title: newChallenge.title });
  if (existingChallenge) return json({ ok: false, error: "Ce défi existe déjà !" });
  const challenge = await ChallengeModel.create(newChallenge);
  return json({ ok: true, challenge });
};
