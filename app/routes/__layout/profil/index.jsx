import Input from "app/components/Input";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
  Link,
} from "@remix-run/react";

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  return { user };
};

export default function Index() {
  const { user } = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();

  const licenceValidUntil = useMemo(
    () =>
      user?.licenceStartedAt
        ? dayjs(user.licenceStartedAt).add(1, user.licence.replace("ly", ""))
        : null,
    [user?.licenceStartedAt, user?.licence]
  );

  useEffect(() => {
    if (actionData?.alert) window.alert(actionData.alert);
  }, [actionData?.alert]);

  if (!user?._id) {
    return (
      <>
        <h1 className="text-2xl text-app">Connectez-vous.</h1>
        <p className="mb-6 text-2xl text-app opacity-75">Ou créez un nouveau compte.</p>
        <Form
          action="/profil/login-redirect"
          method="POST"
          className="flex h-full w-full max-w-md flex-shrink flex-grow flex-col py-4"
        >
          <Input
            label="Votre email"
            id="email-connect"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="super@debator.com"
            required
          />
          <button
            className="mx-auto mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
            type="submit"
            disabled={transition.state !== "idle"}
          >
            {transition.state !== "idle" ? "Connection..." : "Se connecter"}
          </button>
          <span className="mx-auto mt-2 text-center text-xs text-app opacity-75">
            Un email vous sera envoyé
            <br /> avec un lien de connection
          </span>
        </Form>
      </>
    );
  }

  return (
    <>
      <h1 className="mt-8 mb-4 text-3xl font-bold text-app">Mon profil</h1>
      <div className="flex w-full max-w-[68ch] flex-col items-start">
        {user.firstName && (
          <p className="mt-4">
            Votre nom&nbsp;:{" "}
            <b>
              {user.firstName} {user.lastName}
            </b>
          </p>
        )}
        <p className="mt-4">
          Votre email&nbsp;: <b>{user.email}</b>
        </p>
        {user.licence && (
          <>
            <p className="mt-4">
              Votre licence&nbsp;:{" "}
              <b>
                {user.licence === "monthly"
                  ? "Mensuelle"
                  : user.licence === "yearly"
                  ? "Annuelle"
                  : "À vie"}
              </b>
            </p>
            <p className="mt-4">
              Date d'achat&nbsp;:{" "}
              <b>{dayjs(user.licenceStartedAt).format("Do MMMM YYYY")}</b>
            </p>
            {user.licence !== "lifely" && (
              <p className="mt-4">
                Valide jusqu'au&nbsp;:{" "}
                <b
                  className={`${
                    dayjs(licenceValidUntil).isBefore(dayjs()) ? "text-red-500" : ""
                  }`}
                >
                  {licenceValidUntil.format("Do MMMM YYYY")}
                </b>
              </p>
            )}
          </>
        )}
        <Link
          className="mx-auto mt-4 rounded-lg border border-app bg-app px-4 py-2 text-white disabled:opacity-50"
          to="/donation"
        >
          {user.licence === "lifely" ? "Faire un nouveau don" : "Renouveler"}
        </Link>
        <Form action="/profil/logout" className="mx-auto" method="POST">
          <button
            className="mt-4 rounded-lg border border-app bg-white px-4 py-2 text-app"
            type="submit"
          >
            Se déconnecter
          </button>
        </Form>
      </div>
    </>
  );
}
