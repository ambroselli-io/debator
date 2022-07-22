import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => (
  <Question
    title="Pensez-vous que les propositions suivantes font partie de l'éducation citoyenne en démocratie, et doivent s'apprendre d'une manière ou d'une autre&nbsp;? (apprentissage par l'école, l'expérience)"
    options={[
      "« La liberté c'est être révolté, blessé, au moins surpris par les opinions contraires » dit François Sureau. Être éduqué pour exercer la démocratie signifie apprendre à appréhender ces avis contraires.",
      "Éveiller son esprit critique pour entendre, analyser, comprendre et décider doit s'apprendre.",
      "Dans la continuité, savoir changer d'avis, s'en rendre compte et prendre ainsi la décision dans l'urne de changer de vote, est un acte cher à la démocratie et demande aussi un apprentissage.",
    ]}
  />
);

export default QuestionAbstention;
