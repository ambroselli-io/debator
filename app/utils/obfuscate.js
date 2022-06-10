import { getTodaysTopicSuite } from "app/db/queries/topicsSuite.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { isUserLicenced } from "./isUserLicenced.server";

export const getTopicIdsNotToObfuscate = async (request) => {
  const user = await getUnauthentifiedUserFromCookie(request, { noRedirect: true });
  if (isUserLicenced(user)) return [];
  const todaysTopicsSuite = await getTodaysTopicSuite({
    populate: false,
    environment: user.environment,
  });
  return todaysTopicsSuite.topics.filter((_, i) => i < 3);
};
