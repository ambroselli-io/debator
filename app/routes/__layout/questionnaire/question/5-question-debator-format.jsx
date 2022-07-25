import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionFormat = () => (
  <Question
    title="Quel format souhaiteriez-vous pour cet outil/ce jeu&nbsp;?"
    subtitle={`<em class="font-marker text-app">Debator</em> est actuellement un site web qui propose - une liste de sujets de débats, classés par catégorie et recherchables par mot-clé, - 5 modes de jeu (un contre un, dos à dos, par équipe, arène, procès) - une liste de défis à ajouter pour pimenter un peu le jeu, - un chronomètre pour suivre le débat`}
    isMultiChoice
    withOther
    options={[
      "Non, j'ai déjà dit qu'il n'y avait pas besoin d'outil",
      "Un jeu de société, comme Trivial Pursuit par exemple, avec des cartes et un plateau de jeu et un but final",
      "Un jeu de société, juste avec des cartes : une carte = un sujet de débat. Et un sablier, allez pourquoi pas",
      "Une application/site web, plutôt en support à l'organisateur (liste infinie de sujets augmentée tous les jours, une possibilité de mise-à-jour immédiate pour coller au mieux aux attentes des utilisateurs, une flexibilité inégalable)",
    ]}
  />
);

export default QuestionFormat;
