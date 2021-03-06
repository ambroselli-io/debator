import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "app/services/auth.server";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/le-jeu", {
    status: 303,
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default () => null;
