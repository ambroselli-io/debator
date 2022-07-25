import { Link, useLoaderData } from "@remix-run/react";
import { questionsOrder } from "app/utils/questionnaire.server";

export const loader = () => ({
  firstQuestionId: questionsOrder[0],
});

const Questionnaire = () => {
  const { firstQuestionId } = useLoaderData();
  return (
    <>
      <h1 className="mt-8 mb-4 text-3xl font-bold text-app">
        <em className="font-marker font-normal text-app">Debator</em>&nbsp;: questionnaire
        de recherche
      </h1>
      <p className="mt-4 indent-4">
        Nous avons une idée en tête en pensant{" "}
        <em className="font-marker text-app">Debator</em>, mais nous souhaitons créer un
        produit le plus proche de vos besoins, que vous soyez instituteur, professeur,
        éducateur, élève, parent d'élève... mais aussi débatteur amateur, ou amateur de
        débat !
      </p>
      <ul className="mt-4 list-inside indent-4">
        Ce questionnaire a donc pour buts&nbsp;:
        <li className="mt-1 pl-8 -indent-8">
          👂&nbsp;&nbsp;de vérifier si vous partagez nos constats
        </li>
        <li className="mt-1 pl-8 -indent-8">
          💡&nbsp;&nbsp;de voir si le fond de notre idée vous parle et vous intéresse
        </li>
        <li className="mt-1 pl-8 -indent-8">
          🎳&nbsp;&nbsp;de vous proposer le cas échéant les plusieurs formes que pourrait
          prendre <em className="font-marker font-normal text-app">Debator</em>, voir
          laquelle vous plait le plus, et voir aussi <b>vos propositions</b>... pour en
          débattre ! 🗣
        </li>
      </ul>
      <Link
        to={`question/${firstQuestionId}`}
        className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-xl text-white"
      >
        C'est parti !
      </Link>
    </>
  );
};

export default Questionnaire;
