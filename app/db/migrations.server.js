import ChallengeModel from "./models/challenge.server";
import TopicModel from "./models/topic.server";
import UserModel from "./models/user.server";

console.log("Migration script imported");

// https://prixmirabeau.fr/les-sujets

export const migrate = async () => {
  console.log("migration started");

  // const topics = await TopicModel.find();
  // for (const topic of topics) {
  //   topic.set({
  //     environments: topic.environments.map((c) => (c === "Tout" ? "Classique" : c)),
  //   });
  //   await topic.save();
  // }

  // const challenges = await ChallengeModel.find();
  // for (const challenge of challenges) {
  //   challenge.set({
  //     environments: challenge.environments.map((c) => (c === "Tout" ? "Classique" : c)),
  //   });
  //   await challenge.save();
  // }

  // const users = await UserModel.find();
  // for (const user of users) {
  //   user.set({
  //     environment: user.environment === "Tout" ? "Classique" : user.environment,
  //   });
  //   await user.save();
  // }

  console.log("DONE");
};
