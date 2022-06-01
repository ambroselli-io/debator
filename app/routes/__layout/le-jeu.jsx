import { Link, Outlet, useLoaderData } from "@remix-run/react";
import TopicModel from "app/db/models/topic.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { isUserLicenced } from "app/utils/isUserLicenced.server";

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const licenceIsValid = isUserLicenced(user);
  const totalTopics = await TopicModel.count();
  return { licenceIsValid, totalTopics };
};

const GameLayout = () => {
  const { totalTopics, licenceIsValid } = useLoaderData();
  return (
    <>
      <Outlet />
      {!licenceIsValid && (
        <footer className="fixed bottom-0 w-full bg-app px-4 py-2 text-center text-white">
          <p className="text-sm">
            Vous êtes limités à trois sujets par jour, nous avons brouillé les autres.
            <br />
            Pour débloquer les {totalTopics} sujets 👉
            <Link
              to="/donation"
              className="inline-block rounded-lg bg-white p-2 text-app"
            >
              Achetez&nbsp;<em className="font-marker">Debator</em>
              <sup>*</sup>
            </Link>
            <br />
            <p className="mt-2 text-xs">
              * prix libre selon votre bon vouloir, gratuit si vous n'avez pas les moyens
            </p>
          </p>
        </footer>
      )}
    </>
  );
};

export default GameLayout;
