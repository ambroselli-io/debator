import { Form, useLoaderData, useTransition } from "@remix-run/react";
import CheckBoxGroup from "app/components/CheckBoxGroup";
import Input from "./Input";
import RadioButtons from "./RadioButtons";

export { questionLoader as loader } from "app/utils/questionnaire.server";

const Question = ({
  title,
  subtitle,
  options,
  withOther = false,
  isRadio = false,
  isMultiChoice = false,
  isEndOfQuizz = false,
}) => {
  const { questionId, answers, nextQuestionId, user } = useLoaderData();
  const transition = useTransition();

  return (
    <>
      <h2
        className="mt-8 mb-4 text-center text-xl font-bold text-app"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {!!subtitle && (
        <small
          className="-mt-2 mb-4 text-center"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}

      <Form method="POST" className="flex w-full max-w-sm flex-col" id={questionId}>
        {/* <RadioButtons name="question-abstention" /> */}
        <input
          className="font-marker"
          type="hidden"
          name="questionId"
          value={questionId}
        />
        <input type="hidden" name="nextQuestionId" value={nextQuestionId} />
        {isRadio && (
          <RadioButtons
            options={options.map((option) => ({ value: option, label: option }))}
            initAnswers={answers}
            name="answer"
          />
        )}
        {isMultiChoice && (
          <CheckBoxGroup
            name="answer"
            withOther={withOther}
            initAnswers={answers}
            options={options.map((option) => ({ value: option, label: option }))}
          />
        )}
        {isEndOfQuizz && (
          <div className="flex w-full flex-col items-center gap-8">
            <Input
              type="text"
              name="name"
              autoComplete="name"
              id="contact-us-name"
              label="🐒 Votre nom"
              placeholder="Votre nom"
              defaultValue={user?.name}
            />
            <Input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              id="contact-us-email"
              label="＠ Votre Email"
              placeholder="Votre email"
              defaultValue={user?.email}
            />
            <Input
              textarea
              type="text"
              name="answer"
              id="questionnaire-end-answer"
              label="🎙 Une suggestion, un commentaire ?"
              placeholder="Allez-y !"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={transition?.state === "submitting"}
          className="mx-auto mt-8 rounded-lg border border-app bg-app px-4 py-2 text-xl text-white disabled:opacity-50"
        >
          {isEndOfQuizz ? "Merci !" : "Question suivante"}
        </button>
      </Form>
    </>
  );
};

export default Question;
