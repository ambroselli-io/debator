import { Form, useLoaderData, useTransition } from "@remix-run/react";
import CheckBoxGroup from "app/components/CheckBoxGroup";

export { questionLoader as loader } from "app/utils/questionnaire.server";

const Question = ({ title, options, withOther = true }) => {
  const { questionId, answers, nextQuestionId } = useLoaderData();
  const transition = useTransition();

  return (
    <>
      <h2 className="mt-8 mb-4 text-center text-xl font-bold text-app">{title}</h2>
      <Form method="POST" className="flex w-full max-w-sm flex-col" id={questionId}>
        {/* <RadioButtons name="question-abstention" /> */}
        <input type="hidden" name="questionId" value={questionId} />
        <input type="hidden" name="nextQuestionId" value={nextQuestionId} />
        <CheckBoxGroup
          name="answer"
          withOther={withOther}
          initAnswers={answers}
          options={options.map((option) => ({ value: option, label: option }))}
        />
        <button
          type="submit"
          disabled={transition?.state === "submitting"}
          className="mx-auto mt-8 rounded-lg border border-app bg-app px-4 py-2 text-xl text-white disabled:opacity-50"
        >
          Suivante
        </button>
      </Form>
    </>
  );
};

export default Question;
