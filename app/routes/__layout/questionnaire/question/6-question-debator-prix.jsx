import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionFormat = () => (
  <Question
    title="Dans le cas où cet outil serait sous la forme d'un site web de qualité, est-ce que vous seriez prêt à contribuer financièrement à son développement&nbsp;?"
    subtitle={`Développer un site web comme <em class="font-marker text-app">Debator</em> n'est pas sans frais, nous souhaitons voir s'il y a des débouchés économiques avec un tel outil et quelles seraient-elles.`}
    withOther
    isMultiChoice
    options={[
      "Non",
      "Une licence de moins de 10€ pour un mois d'utilisation : pour un besoin ponctuel, en fin ou milieu d'année, c'est très bien",
      "Entre 10€ et 100€ par an, ça me parait honnête",
      "Une licence à vie de plus de 100€ c'est chouette ! J'aime bien les licences à vie :)",
    ]}
  />
);

export default QuestionFormat;
