import { getUserFromCookie } from "app/services/auth.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeModel from "app/db/models/challenge.server";

export const loader = async ({ request }) => {
  const user = await getUserFromCookie(request, { redirectTo: "/le-jeu" });
  if (!user.role === "admin") return redirect("/le-jeu");
  const challenges = await ChallengeModel.find();
  return { challenges };
};

const Admin = () => {
  const { challenges } = useLoaderData;

  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Difficulty</th>
          <th>Categories</th>
          <th>Min Age</th>
          <th>Min Age</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Admin;
