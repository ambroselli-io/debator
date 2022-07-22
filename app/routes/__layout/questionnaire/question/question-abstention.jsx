import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import CheckBoxGroup from "app/components/CheckBoxGroup";

export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => {
  const { questionId, answers } = useLoaderData();
  const answer = useFetcher();
  const navigate = useNavigate();
  useEffect(() => {
    if (answer?.data?.ok) return navigate("../2");
  }, [answer?.data?.ok, navigate]);
  return (
    <>
      <h1 className="mt-8 mb-4 text-center text-3xl font-bold text-app">
        Quelle(s) raison(s) donnez-vous au taux d'abstention des jeunes aux
        élections&nbsp;?
      </h1>
      <p className="-mt-2 mb-4">
        <small>
          Présidentielles 2022:{" "}
          <a
            href="https://www.lemonde.fr/les-decodeurs/article/2022/04/11/sept-cartes-et-graphiques-pour-comprendre-l-abstention-au-premier-tour-de-la-presidentielle-2022_6121706_4355770.html"
            target="_blank"
            rel="noreferrer"
            className="font-bold"
          >
            45% pour les moins de 35 ans,{" "}
          </a>
          26% globalement
          <br />
          Législatives 2022:{" "}
          <a
            href="https://www.francetvinfo.fr/elections/legislatives/infographies-elections-legislatives-2022-jeunes-ouvriers-visualisez-le-profil-des-abstentionnistes-du-second-tour_5205847.html"
            target="_blank"
            rel="noreferrer"
            className="font-bold"
          >
            71% pour les moins de 35 ans,{" "}
          </a>
          53% globalement
          <br />
        </small>
      </p>
      <answer.Form
        method="POST"
        className="flex w-full max-w-sm flex-col"
        id="question-1"
        action="/actions/quizz-answer"
      >
        <input type="hidden" name="questionId" value={questionId} />
        <CheckBoxGroup
          name="answer"
          withOther
          initAnswers={answers}
          options={[
            "Ils ne se sentent pas concernés",
            "La politique ne les intéresse pas",
            "La politique les intéresse peut-être, mais pas la politique politicienne contemporaine",
            "Ils pensent que voter ne changera rien",
            "Ils s'abstiennent volontairement pour protester, ils savent ce qu'ils font",
            "Ils ont mieux à faire, piscine par exemple",
            "Ils n'ont pas de respect pour la démocratie",
          ].map((option) => ({ value: option, label: option }))}
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

export default QuestionAbstention;
