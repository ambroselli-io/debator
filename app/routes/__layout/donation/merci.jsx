import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ContributionRule from "app/components/ContributionRule";
import TransactionModel from "app/db/models/transaction.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { useMergeSearchParams } from "app/services/searchParamsUtils";
import { capture } from "app/services/sentry.server";
import dayjs from "dayjs";

export const loader = async ({ request }) => {
  const user = await getUnauthentifiedUserFromCookie(request);
  const url = new URL(request.url);
  const fintecture_session_id = url.searchParams.get("session_id");
  const currentStatus = url.searchParams.get("status");
  const provider = url.searchParams.get("provider");

  if (!fintecture_session_id?.length) {
    return json({ ok: false, error: "NO SESSION ID", user });
  }
  const transaction = await TransactionModel.findOne({ fintecture_session_id });
  if (!transaction) {
    capture("NO TRANSACTION FOUND", { extra: { url, fintecture_session_id } });
    return json({ ok: false, error: "NO TRANSACTION FOUND", user });
  }
  transaction.set({ currentStatus, provider });
  if (!transaction.statuses.length) transaction.statuses.push(currentStatus);
  await transaction.save();
  return json({ ok: true, transaction, user });
};

const Merci = () => {
  const { transaction, user } = useLoaderData();
  const mergeSearchParams = useMergeSearchParams();
  return (
    <>
      <h1 className="my-8 max-w-sm text-center font-handwritten text-2xl uppercase">
        Merci pour votre confiance !
      </h1>
      <p className="mt-4 w-full">
        Votre don de{" "}
        <b>
          {transaction.amount} {transaction.currency}
        </b>{" "}
        est en cours de traitement.
        <br />
        Vous recevrez un reçu de notre part lorsque ça sera confirmé !
      </p>
      <p className="mt-4 w-full">
        Vous bénéficiez désormais d'une{" "}
        {transaction.licence === "lifely" ? (
          <b>licence à vie</b>
        ) : (
          <>
            licence jusqu'au{" "}
            <b>
              {dayjs(transaction.createAd)
                .add(1, transaction.licence === "yearly" ? "year" : "month")
                .format("Do MMM YYYY")}
            </b>
          </>
        )}
      </p>
      <p className="mt-4">
        Avoir une licence valide vous permet aussi de faire partie de la{" "}
        <b>communauté Debator</b>, qui vous permettra de participer à l'avenir aux choix
        stratégiques de l'entreprise. Nous vous contacterons quand l'occasion se
        présentera.
        <br />
        De même que{" "}
        <button
          className="underline"
          onClick={() => mergeSearchParams({ "proposer-un-sujet": true })}
        >
          proposer des sujets
        </button>{" "}
        et{" "}
        <button
          className="underline"
          onClick={() => mergeSearchParams({ "proposer-un-defi": true })}
        >
          des défis
        </button>{" "}
        vous permet d'obtenir des actions et une part des dividendes lorsqu'il y en aura
        <sup>*</sup>.
      </p>
      <Link
        to={user?._id ? "/le-jeu" : "/profil"}
        className="my-12 rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        {user?._id ? "Retour au jeu" : "Se connecter"}
      </Link>
      <ContributionRule startWithStar />
    </>
  );
};

export default Merci;
