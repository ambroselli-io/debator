import TopicModel from "../models/topic.server";

export const getCategories = async () => {
  // get categories with number of topics
  const topicsGroupedByCategory = await TopicModel.aggregate([
    {
      $unwind: "$categories",
    },
    {
      $group: {
        _id: "$categories",
        category: { $first: "$categories" },
        count: { $sum: 1 },
      },
    },
  ]);

  const categories = topicsGroupedByCategory.map(({ _id, category }) => ({
    _id,
    category,
    categoryWithCount: `${category} (${
      topicsGroupedByCategory.find((t) => t.category === category)?.count
    })`,
  }));

  return categories;
};
