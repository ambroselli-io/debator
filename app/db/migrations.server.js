import ChallengeModel from "./models/challenge.server";
import TopicModel from "./models/topic.server";

console.log("Migration script imported");

// https://prixmirabeau.fr/les-sujets

export const migrate = async () => {
  console.log("migration started");

  const newTopics = [
    {
      title: "Les désirs sont désordres",
      categories: ["Philosophie"],
      difficulty: 5,
      minAge: 17,
    },
    {
      title: "Les rêves donnent du travail",
      categories: ["Philosophie"],
      difficulty: 3,
      minAge: 13,
    },
    {
      title: "La loi s'applique à tous sauf à ceux qui la font",
      categories: ["Justice", "Politique", "Corruption"],
      author: "Coluche",
      difficulty: 4,
      minAge: 15,
    },
    {
      title: "La liberté n'a pas toujours les mains propres",
      categories: ["Justice", "Politique", "Liberté"],
      author: "Malraux",
      difficulty: 4,
      minAge: 15,
    },
    {
      title: "La vraie vie est ailleurs",
      categories: ["Philosophie"],
      author: "Rimbaud",
      difficulty: 5,
      minAge: 15,
    },
    {
      title:
        "L'amour, c'est comme au poker, et c'est presque toujours le moins menteur qui perd",
      categories: ["Amour"],
      author: "Joe Dassin",
      difficulty: 4,
      minAge: 13,
    },
    {
      title: "Vouloir être de son temps c'est déjà être dépassé",
      categories: ["Philosophie"],
      difficulty: 4,
      minAge: 15,
    },
    {
      title: "Tout peut-il s'oublier ?",
      categories: ["Philosophie"],
      author: "Jack Brel",
      difficulty: 3,
      minAge: 13,
    },
    {
      title: "On résiste par les mots",
      categories: ["Philosophie"],
      author: "Tanella Boni",
      difficulty: 5,
      minAge: 14,
    },
    {
      title: "Jeunesse seule ne pourra",
      categories: ["Philosophie", "Politique", "Jeunesse"],
      author: "Christiane Taubira",
      difficulty: 3,
      minAge: 13,
    },
    {
      title: "L'humour, c'est l'arme blanche des hommes désarmés",
      categories: ["Philosophie", "Humour"],
      author: "Romain Gary",
      difficulty: 3,
      minAge: 13,
    },
    {
      title: "Qui ne sait pas mentir ne sait pas agir",
      categories: ["Philosophie", "Humour", "Politique"],
      author: "Alexandre Dumas",
      difficulty: 2,
      minAge: 13,
    },
    {
      title: "L'homme marié devient-il un seigneur parano ?",
      categories: ["Amour"],
      difficulty: 3,
      minAge: 17,
    },
  ];

  for (const topic of newTopics) {
    let topicDoc = await TopicModel.findOne(topic);
    if (!topicDoc) {
      try {
        await TopicModel.create(topic);
      } catch (e) {}
    }
  }

  const newChallenges = [
    { title: "En poésie", excludeEnvironment: [] },
    { title: "En alexandrin", excludeEnvironment: [] },
    {
      title: "Interdire un mot",
      description:
        "Comme le jeu Taboo, vous ne devez pas dire un certain nombre de mots définis à l'avance par le jury ou l'équipe adverse",
      excludeEnvironment: [],
    },
    {
      title: "Obliger un mot",
      description:
        "Vous devez obligatoirement placer un mot dans votre argumentation, défini par un membre du jury ou de l'équipe adverse, qui ne sera pas connu des autres et qui vous donne un bonus si les autres ne s'aperçoivent pas que vous avez réussi à le placer",
      excludeEnvironment: [],
    },
    { title: "En une seule phrase", excludeEnvironment: [] },
    { title: "En trois mots", excludeEnvironment: [] },
    {
      title: "Strip Debat'or",
      description:
        "À chaque victoire ou à chaque argument qui fait mouche, c'est selon, vous demandez à votre adversaire d'enlever un vêtement, ou c'est vous qui enlevez un de vos vêtements, c'est selon",
      excludeEnvironment: ["Éducation", "Famille"],
    },
    {
      title: "Debat'or shots",
      description:
        "À chaque victoire ou à chaque argument qui fait mouche, c'est selon, vous demandez à votre adversaire de prendre un shot, ou c'est vous qui trinquez, ou tout le monde, c'est selon",
      excludeEnvironment: ["Éducation", "Famille"],
    },
    {
      title: "Seul(e) contre tous",
      description:
        "Sans que ça soit la pagaille, l'équipe dans laquelle se trouve le reste des participants peut se trouver ainsi plus forte, avec une plus grande diversité d'arguments",
      excludeEnvironment: [],
    },
    {
      title: "Raconte-moi une histoire",
      description:
        "Votre argumentation doit reposer sur une histoire sortie de votre imagination",
      excludeEnvironment: [],
    },
  ];

  for (const challenge of newChallenges) {
    let challengeDoc = await ChallengeModel.findOne(challenge);
    if (!challengeDoc) {
      try {
        await ChallengeModel.create(challenge);
      } catch (e) {}
    }
  }

  console.log("DONE");
};
