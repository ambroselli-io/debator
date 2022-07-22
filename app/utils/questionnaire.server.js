import fs from "fs";
import QuizzAnswer from "app/db/models/quizzAnswer.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";

export const questionsOrder = fs
  .readdirSync("./app/routes/__layout/questionnaire/question", { withFileTypes: false })
  .map((file) => file.replace(".jsx", ""))
  .sort();

export const questionLoader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const questionId = new URL(request.url).pathname.split("/").filter(Boolean).at(-1);
  const questionIndex = questionsOrder.findIndex((id) => id === questionId);

  const quizzAnswer =
    (await QuizzAnswer.findOne({ user, questionId })) ??
    (await QuizzAnswer.create({ user, questionId }));

  return {
    ...quizzAnswer.toJSON(),
    nextQuestionId:
      questionIndex < questionsOrder.length - 1
        ? questionsOrder[questionIndex + 1]
        : null,
  };
};
