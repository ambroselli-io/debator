import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionDisciplines = () => (
  <Question
    title={`<em class="font-marker text-app">Debator</em> se propose d'être un outil pour apprendre à débattre, et ainsi acquérir les techniques décrites dans la question précédente<br />Pensez-vous que cet apprentissage puisse être utile&nbsp;?<br />Pensez-vous à d'autres disciplines (nous en citons deux en exemple)&nbsp;?`}
    subtitle={`Nous pensons que - appréhender les avis contraires, - éveiller un esprit critique et - être capable de changer d'avis sont des techniques qui peuvent être apprises&nbsp;: <em class="font-marker text-app">Debator</em> se propose d'être un outil pour apprendre à débattre en s'amusant, et ainsi acquérir qualités.`}
    isMultiChoice
    withOther
    options={[
      "Il serait effectivement utile d'apprendre à débattre",
      "Il faudrait aussi enseigner l'art oratoire ?",
      "Et la culture générale ?",
    ]}
  />
);

export default QuestionDisciplines;
