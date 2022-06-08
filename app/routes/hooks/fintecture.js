import { json } from "@remix-run/node";
import { ENVIRONMENT } from "app/config";
import TransactionLogModel from "app/db/models/transactionLog.server";
import FintectureAPI from "app/services/fintecture.server";
import { capture } from "app/services/sentry.server";

export const action = async ({ request }) => {
  const headers = Object.fromEntries(request.headers);
  const formData = await request.formData();
  const url = new URL(request.url);
  capture("webhook fintecture", { extra: { request, formData, headers } });
  const body = Object.fromEntries(formData);
  console.log({ body });
  try {
    // get the body
    // get a param from query
    // option 1
    const session_id = url.searchParams.get("session_id");
    // option 2
    // const query = Object.fromEntries(urlSearchParams.entries());
    // const session_id = query.session_id;
    const log = await TransactionLogModel.create({
      name: "fintecture",
      environment: ENVIRONMENT,
      content: JSON.stringify({ headers, body }),
      route: "/fintecture",
    });

    const accessToken = await FintectureAPI.getAccessToken();
    const payment = await FintectureAPI.getPayments(
      accessToken["access_token"],
      session_id
    );
    const verification = payment.meta.status === request.query.status;
    log.set({ content: JSON.stringify({ headers, body, verification, payment }) });
    await log.save();
  } catch (e) {
    console.log(e);
    capture(e, { extra: { headers, body, url } });
  }
  return json({ ok: true });
};
