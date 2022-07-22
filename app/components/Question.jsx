import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CheckBoxGroup from "app/components/CheckBoxGroup";

export { questionLoader as loader } from "app/utils/questionnaire.server";

const Question = ({ title, options, withOther = true }) => {
  const { questionId, answers, nextQuestionId } = useLoaderData();
  const answer = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (answer?.data?.ok) return navigate(`../${nextQuestionId}`);
  }, [answer?.data?.ok, navigate, nextQuestionId]);
  return (
    <>
      <h2 className="mt-8 mb-4 text-center text-xl font-bold text-app">{title}</h2>
      <answer.Form
        method="POST"
        className="flex w-full max-w-sm flex-col"
        id={questionId}
        action="/actions/quizz-answer"
      >
        {/* <RadioButtons name="question-abstention" /> */}
        <input type="hidden" name="questionId" value={questionId} />
        <CheckBoxGroup
          name="answer"
          withOther={withOther}
          initAnswers={answers}
          options={options.map((option) => ({ value: option, label: option }))}
        />
        <button
          type="submit"
          disabled={answer?.state === "submitting"}
          className="mx-auto mt-8 rounded-lg border border-app bg-app px-4 py-2 text-xl text-white disabled:opacity-50"
        >
          Suivante
        </button>
      </answer.Form>
    </>
  );
};

export default Question;
