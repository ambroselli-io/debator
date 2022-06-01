import TransactionModel from "app/db/models/transaction.server";
import { capture } from "app/services/sentry.server";
import { json } from "remix";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const fintecture_session_id = url.searchParams.get("session_id");
  const status = url.searchParams.get("status");
  const provider = url.searchParams.get("provider");

  if (!fintecture_session_id?.length) {
    return json({ ok: false, error: "NO SESSION ID" });
  }
  const transaction = await TransactionModel.findOne({ fintecture_session_id });
  if (!transaction) {
    capture("NO TRANSACTION FOUND", { extra: { url, fintecture_session_id } });
    return json({ ok: false, error: "NO TRANSACTION FOUND" });
  }
  transaction.set({ status, provider });
  transaction.statuses.push(status);
  await transaction.save();
  return json({ ok: true });
};

const Merci = () => {
  return <span>Merci !</span>;
};

export default Merci;
