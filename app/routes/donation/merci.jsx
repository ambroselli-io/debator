import TransactionModel from "app/db/models/transaction.server";
import { capture } from "app/services/sentry.server";
import dayjs from "dayjs";
import { json, Link, useLoaderData } from "remix";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const fintecture_session_id = url.searchParams.get("session_id");
  const currentStatus = url.searchParams.get("status");
  const provider = url.searchParams.get("provider");

  if (!fintecture_session_id?.length) {
    return json({ ok: false, error: "NO SESSION ID" });
  }
  const transaction = await TransactionModel.findOne({ fintecture_session_id });
  if (!transaction) {
    capture("NO TRANSACTION FOUND", { extra: { url, fintecture_session_id } });
    return json({ ok: false, error: "NO TRANSACTION FOUND" });
  }
  transaction.set({ currentStatus, provider });
  if (!transaction.statuses.length) transaction.statuses.push(currentStatus);
  await transaction.save();
  return json({ ok: true, transaction });
};

const Merci = () => {
  const { transaction } = useLoaderData();
  return (
    <>
      <h1 className="my-8 max-w-sm text-center font-[xkcd] text-2xl uppercase">
        Merci pour votre confiance !
      </h1>
      <p className="mt-4 max-w-[68ch]">
        Votre don de{" "}
        <b>
          {transaction.amount} {transaction.currency}
        </b>{" "}
        est en cours de traitement.
        <br />
        Vous recevrez un reçu de notre part lorsque ça sera confirmé !
      </p>
      <p className="mt-4 max-w-[68ch]">
        Vous bénéficiez désormais d'une{" "}
        {transaction.licence === "lifely" ? (
          <b>licence à vie</b>
        ) : (
          <>
            licence jusqu'au{" "}
            <b>
              {dayjs(transaction.createAd)
                .add(1, transaction.licence === "yearly" ? "year" : "month")
                .format("D MMM YYYY")}
            </b>
          </>
        )}
      </p>
      <Link
        to="/le-jeu"
        className="my-12 rounded-lg border border-app bg-app px-4 py-2 text-white"
      >
        Retour au jeu
      </Link>
    </>
  );
};

export default Merci;
