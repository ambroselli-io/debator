import slugify from "slugify";
import ArenaGameSvg from "./components/icons/ArenaGameSvg";
import BackToBackGameSvg from "./components/icons/BackToBack";
import IndividualGameSvg from "./components/icons/IndividualGameSvg";
import TeamDebateSvg from "./components/icons/TeamDebateSvg";
import TrialGameSvg from "./components/icons/TrialGameSvg";

const basicRule = {
  title: "Règle générale pour tout mode de jeu",
  content:
    "Pour tous les jeux, la règle de base est la suivante : on choisit un sujet, et on tire au sort l'équipe/le joueur qui défendra le «&nbsp;pour&nbsp;» ou le «&nbsp;contre&nbsp;». Lorsqu'on joue sans préparation, des temps de parole entre 1 à 3 minutes sont conseillés - à moduler en fonction de vos expériences. Le camp du «&nbsp;pour&nbsp;» a toujours l'honneur de commencer. À la fin du débat, la délibération décide du vainqueur (voir le dernier paragraphe tout en bas de cette page).",
};

const classicExplanation = [
  {
    title: "Durées des différentes étapes du jeu",
    content: [
      "<u>Préparation</u> : facultative, durée aléatoire. Pour introduire le jeu, vous pouvez commencer par aucune préparation, et vous pourrez l'introduire lorsque vous sentirez que l'envie de préparer existe chez les participants.",
      "<u>Débat</u> : durée qui vous appartient, en fonction de ce que vous souhaitez faire ou du but recherché. Pour s'amuser, une seule minute est suffisant pour avoir de la réactivité dans le jeu. En mode éducatif, pour commencer, <b>5 minutes</b> (2,5 minutes par personne) est déjà relativement long, c'est possible que les débatteurs aient quelques blancs, mais c'est justement une bonne durée pour se rendre compte des défis que présentent l'exercice.",
      "<u>Délibération</u> : il ne faut jamais négliger cette partie, la plus importante de toutes, même si elle est très brève. Réservez-lui au moins <b>10 minutes</b>, quitte à ce qu'elle soit finalement bien plus courte.",
    ],
  },
  {
    title: "Préparation",
    content:
      "La préparation, comme dans tout les modes de jeu, à pour but d'arriver au jeu avec des arguments travaillés, une tactique tracée. Gardez donc en tête que jouer avec ou sans préparation donne un jeu complètement différent ! Aucune préparation permet de travailler sur la vivacité de réflexion, l'instinct, la gestion du stress de l'imprévu. Une préparation courte de quelques minutes retire la partie imprévue, et permet de poser quelques arguments, là ou une préparation longue peut ajouter une considération tactique : que va dire l'adversaire ? comment le contrer ?",
  },
  {
    title: "Débat",
    content:
      "C'est <b>toujours</b> la thèse qui commence, le camp du Pour. En fonction de la durée choisie, le déroulé peut être différent, mais nous conseillons dans tous les cas de définir à l'avance combien d'allers-retours entre les débatteurs, et donc de veiller à ce que chacun ait le temps qu'il ou elle souhaite pour avancer ses arguments. Pour un temps de débat de 5 minutes, on peut choisir 3 allers-retours, ou 10 si vous le souhaitez pour un débat toujours plus vif ! Mais si vous laissez libres les débatteurs, cela peut partir au pugilat ce qui n'est pas le but recherché; un des participants peut aussi perdre la partie parce qu'à court d'arguments, ce qui n'est pas non plus l'objectif dans le contexte éducatif (voir la partie \"Délibération et fin du jeu\" plus bas.",
  },
  {
    title: "Délibération",
    content:
      "En mode jeu, vous êtes seuls maîtres de vos critères de jugement. En mode éducatif, les participants peuvent être jugés sur le contenu de leurs arguments, mais cela ne doit pas être la plus grande considération : parce qu'on ne choisit pas de défendre la thèse ou l'antithèse et que certains sujets se prêtent plus à l'une qu'à l'autre, ça serait injuste. Il ne faut pas non plus juger sur la prestation oratoire : nous ne sommes pas tous égaux dans ce domaine, et le but de l'exercice n'est pas de former des tribuns, mais des citoyens en démocratie. Il est donc bon de jauger les participants sur leur apprentissage en ce sens : leur capacité à construire un raisonnement, à se mettre à la place de ceux qui pensent différement de soi, à réagir aux arguments de l'autre.<br><br>Vous pouvez délibérer avec l'ensemble de la classe, discuter de ce qu'ils ont trouvé de bien ou de moins bien, aimé ou moins aimé.",
  },
];

const games = [
  {
    Image: IndividualGameSvg,
    title: "Le face à face",
    titleNoDiacritics: "Le face a face",
    titleForGame: "Face à face",
    shortExplanation: "Deux participants, un jury, un public",
    preparationMinimum: "Aucune",
    preparationAdvised: "10 minutes",
    preparation: null,
    gameDuration: "10 minutes ou +",
    numberOfPlayers: "3+",
    explanation: [
      basicRule,
      {
        title: "Le face à face : résumé",
        content:
          "Le face à face est une confrontation d'arguments entre deux personnes, tout simplement. En mode éducatif, cela peut être pratiqué en binôme en entrainement, par triplette de trois élèves dispersées dans la classe  (deux débatteurs et un jury), ou bien en public, avec deux participants devant l'ensemble de la classe.",
      },
      ...classicExplanation,
    ],
  },
  {
    Image: ArenaGameSvg,
    title: "L'arène",
    titleNoDiacritics: "L'arene",
    titleForGame: "Arène",
    shortExplanation:
      "Deux participants pour commencer, le public se joint à eux dans l'arène",
    preparation: "Aucune",
    preparationMinimum: null,
    preparationAdvised: null,
    gameDuration: "10 minutes ou +",
    numberOfPlayers: "8+",
    explanation: [
      basicRule,
      {
        title: "L'arène : résumé",
        content:
          "L'arène est une façon très ludique de débattre : le débat commence entre deux personnes, viennet s'ajouter au fil de l'eau des membres du public. À vous de décider si vous limitez à un nombre maximum de participants, ou si vous imposez que tout le monde doit intervenir au moins une fois.",
      },
      ...classicExplanation,
    ],
  },
  {
    Image: BackToBackGameSvg,
    title: "Le dos à dos",
    titleNoDiacritics: "Le dos a dos",
    titleForGame: "Dos à dos",
    shortExplanation:
      "Pas de jeu de corps ni de regard: la voix et l'écoute seules pour débattre",
    preparationMinimum: "Aucune",
    preparationAdvised: "10 minutes",
    preparation: null,
    gameDuration: "10 minutes ou +",
    numberOfPlayers: "3+",
    explanation: [
      basicRule,
      {
        title: "Le dos à dos : résumé",
        content:
          "Le dos à dos a les mêmes règles que le face à face... mais dos à dos. Idéalement, les deux débatteurs s'assoient chacun sur une chaise, au centre d'un cercle composé par leurs camarades. Pas de jeu de corps ni de regard: la voix et l'écoute seules pour débattre. Il faudra probablement parler fort et écouter attentivement sans se laisser distraire par le brouhaha et les réactions de leurs camarades",
      },
      ...classicExplanation,
    ],
  },
  {
    Image: TeamDebateSvg,
    title: "Par équipes",
    titleNoDiacritics: "Par equipes",
    titleForGame: "Par équipes",
    shortExplanation: "Débat par équipe avec préparation",
    preparationMinimum: "5 minutes",
    preparationAdvised: "1 heure ou quelques jours",
    preparation: null,
    gameDuration: "1 heure ou plus",
    numberOfPlayers: "5+",
    explanation: [
      basicRule,
      {
        title: "Par équipes : résumé",
        content:
          "Formez des équipes de 2 à 4 membres. Le jeu par équipe se prête particulièrement bien à une préparation lourde, de quelques heures voire de quelques jours - classe contre classe par exemple - mais il se pratique tout aussi bien avec un temps de préparation court. Le débat fait alterner les différents participants grâce à un joueur Président dont c'est le rôle, à vous de voir ensuite si vous limitez à 1 ou 2 apparition(s) par personne, au droit de réponse...",
      },
      ...classicExplanation,
    ],
  },
  {
    Image: TrialGameSvg,
    title: "Le procès",
    titleNoDiacritics: "Le proces",
    titleForGame: "Procès",
    shortExplanation: "Un jeu de rôles en même temps qu'une technique de débat",
    preparationMinimum: "15 minutes",
    preparationAdvised: "1 heure ou quelques jours",
    preparation: null,
    gameDuration: "1 heure ou plus",
    numberOfPlayers: "10+",
    explanation: [
      {
        content:
          "Tous les modes de jeu décrits ici ont été inspirés par le site https://www.ecolecitoyenne.org/, que je tiens à remercier ici. Vous pourrez trouver le détail du Procès sur leur site internet: https://www.ecolecitoyenne.org/fiche/le-proces. Profitez-en pour visiter l'ensemble de leur site, vraiment très intéressant !",
      },
    ],
  },
].map((game) => ({
  ...game,
  slug: slugify(game.title, {
    lower: true,
    locale: "fr",
    strict: true,
    trim: true,
  }),
}));

export default games;
