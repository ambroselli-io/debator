import mongoose from "mongoose";
import CategoryModel from "./models/category.server";
import TopicModel from "./models/topic.server";

console.log("Migration script imported");

// https://prixmirabeau.fr/les-sujets

export const migrate = async () => {
  console.log("migration started");
  const newCategories = [
    "Philosophie",
    "Justice",
    "Politique",
    "Corruption",
    "Jeunesse",
    "Liberté",
    "Amour",
    "Humour",
  ];

  const categories = [];
  for (const category of newCategories) {
    let categoryDoc = await CategoryModel.findOne({ fr: category });
    if (!categoryDoc) {
      try {
        categoryDoc = await CategoryModel.create({ fr: category });
      } catch (e) {
        categoryDoc = await CategoryModel.findOne({ fr: category });
      }
    }
    categories.push({ fr: category, _id: categoryDoc._id });
  }

  const newTopics = [
    {
      fr: "Les désirs sont désordres",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      difficulty: 5,
      minAge: 17,
    },
    {
      fr: "Les rêves donnent du travail",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      difficulty: 3,
      minAge: 13,
    },
    {
      fr: "La loi s'applique à tous sauf à ceux qui la font",
      categories: [
        categories.find((c) => c.fr === "Justice")._id,
        categories.find((c) => c.fr === "Politique")._id,
        categories.find((c) => c.fr === "Corruption")._id,
      ],
      author: "Coluche",
      difficulty: 4,
      minAge: 15,
    },
    {
      fr: "La liberté n'a pas toujours les mains propres",
      categories: [
        categories.find((c) => c.fr === "Justice")._id,
        categories.find((c) => c.fr === "Politique")._id,
        categories.find((c) => c.fr === "Liberté")._id,
      ],
      author: "Malraux",
      difficulty: 4,
      minAge: 15,
    },
    {
      fr: "La vraie vie est ailleurs",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      author: "Rimbaud",
      difficulty: 5,
      minAge: 15,
    },
    {
      fr: "L'amour, c'est comme au poker, et c'est presque toujours le moins menteur qui perd",
      categories: [categories.find((c) => c.fr === "Amour")._id],
      author: "Joe Dassin",
      difficulty: 4,
      minAge: 13,
    },
    {
      fr: "Vouloir être de son temps c'est déjà être dépassé",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      difficulty: 4,
      minAge: 15,
    },
    {
      fr: "Tout peut-il s'oublier ?",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      author: "Jack Brel",
      difficulty: 3,
      minAge: 13,
    },
    {
      fr: "On résiste par les mots",
      categories: [categories.find((c) => c.fr === "Philosophie")._id],
      author: "Tanella Boni",
      difficulty: 5,
      minAge: 14,
    },
    {
      fr: "Jeunesse seule ne pourra",
      categories: [
        categories.find((c) => c.fr === "Philosophie")._id,
        categories.find((c) => c.fr === "Politique")._id,
        categories.find((c) => c.fr === "Jeunesse")._id,
      ],
      author: "Christiane Taubira",
      difficulty: 3,
      minAge: 13,
    },
    {
      fr: "L'humour, c'est l'arme blanche des hommes désarmés",
      categories: [
        categories.find((c) => c.fr === "Philosophie")._id,
        categories.find((c) => c.fr === "Humour")._id,
      ],
      author: "Romain Gary",
      difficulty: 3,
      minAge: 13,
    },
    {
      fr: "Qui ne sait pas mentir ne sait pas agir",
      categories: [
        categories.find((c) => c.fr === "Philosophie")._id,
        categories.find((c) => c.fr === "Humour")._id,
        categories.find((c) => c.fr === "Politique")._id,
      ],
      author: "Alexandre Dumas",
      difficulty: 2,
      minAge: 13,
    },
    {
      fr: "L'homme marié devient-il un seigneur parano ?",
      categories: [categories.find((c) => c.fr === "Amour")._id],
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

  const topics = await TopicModel.find();
  for (const topic of topics) {
    if (topic.maxAge === 107) {
      topic.set({ maxAge: null });
      await topic.save();
    }
  }
  console.log("DONE");
};
