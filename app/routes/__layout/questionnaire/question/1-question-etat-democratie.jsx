import Question from "app/components/Question";

export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionAbstention = () => (
  <Question
    title="Avec quelles propositions êtes-vous plutôt d'accord concernant notre démocratie&nbsp;?"
    options={[
      "L'abstention en général, et chez les jeunes en particulier, est trop importante",
      "Les débats entre élus se situent trop souvent entre haine, insulte et impossibilité de communiquer paisiblement",
      "Il y a un désintérêt envers la politique d'une partie toujours plus importante de la population",
      // "Il n'est pas simple d'une part de changer d'avis, de conviction, et de changer de vote en conséquence",
      "Il faut faire quelque chose pour aider, si ce n'est sauver, la démocratie",
    ]}
  />
);

export default QuestionAbstention;
