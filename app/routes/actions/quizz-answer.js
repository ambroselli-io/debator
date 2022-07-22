import { json, Response } from "@remix-run/node";
import { catchErrors } from "app/services/catchErrors";
import { getOrCreateUserAndSession } from "app/services/auth.server";
import QuizzAnswer from "app/db/models/quizzAnswer.server";

export const action = catchErrors(async ({ request }) => {
  const { user, setCookieHeader } = await getOrCreateUserAndSession(request);
  const formData = await request.formData();
  const questionId = formData.get("questionId");
  console.log({ questionId });
  if (!questionId) return json({ ok: false });
  const answers = formData.getAll("answer").filter(Boolean);
  console.log({ answers });
  const existingQuizzAnswer = await QuizzAnswer.findOne({ user, questionId });
  if (existingQuizzAnswer) {
    existingQuizzAnswer.set({ answers });
    await existingQuizzAnswer.save();
    console.log({ existingQuizzAnswer, answers });
  } else {
    await QuizzAnswer.create({ user, questionId, answers });
  }
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/questionnaire/question/${formData.get("nextQuestionId")}`,
      "Set-Cookie": setCookieHeader,
    },
  });
});
