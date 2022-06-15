import { Link, Outlet, useLoaderData } from "@remix-run/react";
import TopicModel from "app/db/models/topic.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { isUserLicenced } from "app/utils/isUserLicenced.server";

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const licenceIsValid = isUserLicenced(user);
  const totalTopics = await TopicModel.count();
  return { licenceIsValid, totalTopics, user };
};

const GameLayout = () => {
  const { totalTopics, licenceIsValid, user } = useLoaderData();
  return (
    <>
      <Outlet />
      {!licenceIsValid && (
        <footer className="fixed bottom-0 z-50 w-screen bg-app px-4 py-2 text-center text-white">
          <p className="text-sm">
            Vous êtes limité(es) à trois sujets par jour, nous avons brouillé les autres.
            <br />
            Pour débloquer les {totalTopics} sujets 👉
            <Link
              to="/donation"
              className="mb-2 inline-block rounded-lg bg-white p-2 text-app"
            >
              Achetez&nbsp;<em className="font-marker">Debator</em>
              <sup>*</sup>
            </Link>
            <br />
            {!user?._id && (
              <>
                Offre de lancement: 1 mois gratuit lors de votre inscription 👉{" "}
                <Link
                  to="/profil"
                  className="inline-block rounded-lg border border-white bg-app px-2 py-1 text-white"
                >
                  Connectez-vous
                </Link>
                <br />
              </>
            )}
            <span className="mt-2 text-xs">
              * prix libre selon votre bon vouloir, gratuit si vous n'avez pas les moyens
            </span>
          </p>
        </footer>
      )}
    </>
  );
};

export default GameLayout;
