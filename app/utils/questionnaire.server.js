import fs from "fs";
import { json, redirect } from "@remix-run/node";
import QuizzAnswer from "app/db/models/quizzAnswer.server";
import {
  getOrCreateUserAndSession,
  getUnauthentifiedUserFromCookie,
} from "app/services/auth.server";
import { catchErrors } from "app/services/catchErrors";

export const questionsOrder = fs
  .readdirSync("./app/routes/__layout/questionnaire/question", { withFileTypes: false })
  .filter((file) => !file.startsWith("_"))
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
    user,
    nextQuestionId:
      questionIndex < questionsOrder.length - 1
        ? questionsOrder[questionIndex + 1]
        : null,
  };
};

export const questionAction = catchErrors(async ({ request }) => {
  const { user, setCookieHeader } = await getOrCreateUserAndSession(request);
  const formData = await request.formData();
  const questionId = formData.get("questionId");
  if (!questionId) return json({ ok: false });
  const answers = formData.getAll("answer").filter(Boolean);
  const existingQuizzAnswer = await QuizzAnswer.findOne({ user, questionId });
  if (existingQuizzAnswer) {
    existingQuizzAnswer.set({ answers });
    await existingQuizzAnswer.save();
  } else {
    await QuizzAnswer.create({ user, questionId, answers });
  }
  if (formData.get("email")?.length) user.set({ email: formData.get("email") });
  if (formData.get("name")?.length) user.set({ name: formData.get("name") });
  if (formData.get("job")?.length) user.set({ job: formData.get("job") });
  await user.save();
  if (formData.get("nextQuestionId")) {
    return redirect(`questionnaire/question/${formData.get("nextQuestionId")}`, {
      status: 303,
      headers: {
        "Set-Cookie": setCookieHeader,
      },
    });
  } else {
    return redirect(`/`, {
      status: 303,
      headers: {
        "Set-Cookie": setCookieHeader,
      },
    });
  }
});
