import { getUserFromCookie } from "app/services/auth.server";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ChallengeModel from "app/db/models/challenge.server";

export const loader = async ({ request }) => {
  const user = await getUserFromCookie(request, { redirectTo: "/le-jeu" });
  if (user?.role !== "admin") return redirect("/le-jeu");
  const challenges = await ChallengeModel.find();
  return { challenges };
};

const Admin = () => {
  const { challenges } = useLoaderData();

  return (
    <>
      <div className="overflow-scroll p-4">
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Title
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Environments
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Description
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {challenges?.map((challenge) => (
                <tr
                  key={challenge._id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-handwritten font-medium text-gray-900 dark:text-white"
                  >
                    {challenge.title}
                  </th>
                  <td className="px-6 py-4">{challenge.environments.join(", ")}</td>
                  <td className="px-6 py-4">{challenge.description}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`./${challenge._id}`}
                      className="font-medium text-app hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
