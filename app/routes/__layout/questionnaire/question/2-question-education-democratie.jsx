import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => (
  <Question
    title="Pensez-vous que la démocratie nécessite de ses citoyens et électeurs une éducation
spécifique&nbsp;?"
    options={["Oui", "Non"]}
    withOther={false}
  />
);

export default QuestionAbstention;
