import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionnaireFinito = () => (
  <Question
    title=" Avez-vous une suggestion, un commentaire&nbsp;? Pouvons-nous rester en contact pour en discuter&nbsp;?"
    subtitle={`Merci beaucoup pour votre temps&nbsp;!`}
    isEndOfQuizz
  />
);

export default QuestionnaireFinito;
