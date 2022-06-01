import { getTodaysTopicSuite } from "app/db/queries/topicsSuite.server";
import { getUserFromCookie } from "app/services/auth.server";
import { isUserLicenced } from "./isUserLicenced.server";

export const getTopicIdsNotToObfuscate = async (request) => {
  const user = await getUserFromCookie(request, { noRedirect: true });
  if (isUserLicenced(user)) return [];
  const todaysTopicsSuite = await getTodaysTopicSuite({ populate: false });
  return todaysTopicsSuite.topics.filter((_, i) => i < 3);
};
