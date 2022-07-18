import { Link } from "@remix-run/react";

const Questionnaire = () => {
  return (
    <>
      <h1 className="mt-8 mb-4 text-3xl font-bold text-app">
        Debator: questionnaire de recherche
      </h1>
      <p className="mt-4 max-w-[68ch] indent-4">
        Nous avons une idée en tête en pensant Debator, mais nous souhaitons créer un
        produit le plus proche des besoins de ses potentiels utilisateurs.
      </p>
      <ul className="mt-4 max-w-[68ch]">
        Ce questionnaire a donc pour buts&nbsp;:
        <li className="mt-1">👂 de vérifier si vous partagez nos constats</li>
        <li className="mt-1">💡 de voir si le fond de notre idée vous parle</li>
        <li className="mt-1">
          🎳 de vous proposer le cas échéant les plusieurs formes que pourrait prendre
          Debator, et voir laquelle vous plait le plus
        </li>
      </ul>
      <Link
        to="/2"
        className="mt-4 rounded-lg border border-app bg-app px-4 py-2 text-xl text-white"
      >
        Suivante
      </Link>
    </>
  );
};

export default Questionnaire;
