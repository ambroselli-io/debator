import { removeDiacritics } from "app/services/formatSearch.server";

export const challengeFormat = (challenge) => ({
  _id: challenge._id,
  title: removeDiacritics(challenge.title),
  description: challenge.description,
  excludeEnvironment: challenge.excludeEnvironment,
});