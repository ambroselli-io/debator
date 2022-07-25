import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => (
  <Question
    title="Pensez-vous que les qualités et techniques suivantes soient utiles, voire nécessaires, au citoyen pour accomplir un rôle efficient en démocratie&nbsp;?"
    subtitle="Nous pensons de notre côté qu'elles seraient bien utiles 🥸"
    isMultiChoice
    withOther
    options={[
      "«&nbsp;La liberté c'est être révolté, blessé, au moins surpris par les opinions contraires&nbsp;» dit François Sureau. En d'autres termes, savoir appréhender des avis contraires.",
      "Éveiller son esprit critique pour entendre, analyser, comprendre et décider doit s'apprendre.",
      "Dans la continuité, savoir changer d'avis, s'en rendre compte jusqu'à pouvoir, dans l'urne, changer de vote en fonction de ses convictions.",
    ]}
  />
);

export default QuestionAbstention;
