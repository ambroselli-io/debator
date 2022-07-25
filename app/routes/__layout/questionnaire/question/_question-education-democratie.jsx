import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => (
  <Question
    title="Pensez-vous que ces techniques peuvent être apportées via une éducation, spécifique à l'exercice de la démocratie&nbsp;?"
    subtitle="Nous pensons de notre côté qu'elles seraient bien utiles 🥸"
    options={["Oui", "Non"]}
    isRadio
    withOther={false}
  />
);

export default QuestionAbstention;
