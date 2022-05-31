import { APP_URL } from "app/config";
import FintectureAPI from "app/services/fintecture.server";
import { json } from "remix";
import { getClientIPAddress } from "remix-utils";

export const loader = async ({ request }) => {
  let tokens = await FintectureAPI.getAccessToken();
  let connect = await FintectureAPI.getPisConnect(tokens.access_token, {
    amount: "125",
    currency: "EUR",
    communication: "Thanks mom!",
    customer_full_name: "Bob Smith",
    customer_email: "bob.smith@gmail.com",
    customer_ip: getClientIPAddress(request),
    state: "somestate",
    country: "fr",
    redirect_uri: `${APP_URL}/transaction/redirect`,
  });
  console.log({ connect });

  return json({ ok: true, connect });
};
