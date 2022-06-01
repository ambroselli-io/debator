import { Link } from "@remix-run/react";
import { useLoaderData } from "@remix-run/node";
import { validateMagicLink } from "app/services/magic-link";
import { createUserSession } from "app/services/auth.server";
import UserModel from "app/db/models/user.server";

export const loader = async ({ request }) => {
  try {
    const email = validateMagicLink(request.url);
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Sign in link invalid. Please request a new one.");
    }
    return createUserSession(request, user, "/le-jeu");
  } catch (error) {
    return {
      ok: false,
      error: error.toString().includes("Please request a new one")
        ? "Le lien est expiré, veuillez en demander un nouveau"
        : null,
    };
  }
};

const Magic = () => {
  const loaderData = useLoaderData();
  return (
    <>
      <div>{typeof loaderData.error === "string" ? loaderData.error : "Plouf"}</div>
      <Link to="/" className="mt-14 block text-xs text-sky-800">
        Accueil
      </Link>
    </>
  );
};

export default Magic;
