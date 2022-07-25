import Question from "app/components/Question";

export { questionAction as action } from "app/utils/questionnaire.server";
export { questionLoader as loader } from "app/utils/questionnaire.server";

const QuestionDisciplines = () => (
  <Question
    title="Dans l'hypothèse que vous soyez convaincu(e) qu'apprendre à débattre est utile, verriez-vous l'utilité d'un outil dédié pour cela&nbsp;?<br />Si oui, quelle aide pourrait-il fournir&nbsp;?"
    subtitle={`<em class="font-marker text-app">Debator</em> propose actuellement - une liste de sujets de débats, classés par catégorie et recherchables par mot-clé, - 5 modes de jeu (un contre un, dos à dos, par équipe, arène, procès) - une liste de défis à ajouter pour pimenter un peu le jeu, - un chronomètre pour suivre le débat`}
    isMultiChoice
    withOther
    options={[
      "Non, pas besoin d'outil",
      "Il faudrait avoir une liste de débats à portée de main",
      "Il faudrait pouvoir rechercher dans cette liste, par thème et/ou par mot-clé et/ou par classe d'âge",
      "Il faudrait qu'on nous explique comment organiser le débat",
      "Il faudrait un chronomètre ou un sablier pour compter les temps de parole",
    ]}
  />
);

export default QuestionDisciplines;
