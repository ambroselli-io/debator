import TopicModel from "app/db/models/topic.server";
import { getUserFromCookie } from "app/services/auth.server";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import RangeInput from "app/components/RangeInput";

export const loader = async ({ request }) => {
  const user = await getUserFromCookie(request, { redirectTo: "/le-jeu" });
  if (user?.role !== "admin") return redirect("/le-jeu");
  const topics = await TopicModel.find();
  return { topics };
};

const AdminTopics = () => {
  const { topics } = useLoaderData();

  return (
    <>
      <div className="overflow-scroll p-4">
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Title
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Environments
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Author
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Difficulty
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Categories
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Min Age
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  Max Age
                </th>
                <th scope="col" className="sticky top-0 bg-white px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {topics?.map((topic) => (
                <tr
                  key={topic._id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-handwritten font-medium text-gray-900 dark:text-white"
                  >
                    {topic.title}
                  </th>
                  <td className="px-6 py-4">{topic.environments.join(", ")}</td>
                  <td className="px-6 py-4">{topic.author}</td>
                  <td className="px-6 py-4">
                    <RangeInput
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      className="w-full bg-app text-app accent-app"
                      defaultValue={topic?.difficulty}
                      disabled
                    />
                  </td>
                  <td className="px-6 py-4">{topic.categories.join(", ")}</td>
                  <td className="px-6 py-4">{topic.minAge}</td>
                  <td className="px-6 py-4">{topic.maxAge}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`./${topic._id}`}
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

export default AdminTopics;
