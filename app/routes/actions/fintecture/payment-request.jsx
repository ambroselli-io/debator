import { APP_URL } from "app/config";
import TransactionModel from "app/db/models/transaction.server";
import UserModel from "app/db/models/user.server";
import FintectureAPI from "app/services/fintecture.server";
import { capture } from "app/services/sentry";
import { json } from "remix";
import { getClientIPAddress } from "remix-utils";

export const action = async ({ request }) => {
  console.log("ON EST LA");
  const formData = await request.formData();
  const { firstName, lastName, amount, email, country, language, currency } =
    Object.fromEntries(formData);
  console.log({ firstName, lastName, amount, email, country, language, currency });
  if (!firstName?.length)
    return json(
      {
        ok: false,
        error: "Please provide your first name, required for any payment",
      },
      { status: 400 }
    );
  if (!lastName?.length)
    return json(
      {
        ok: false,
        error: "Please provide your last/family name, required for any payment",
      },
      { status: 400 }
    );
  if (!email?.length)
    return json(
      {
        ok: false,
        error: "Please provide your email, required for any payment",
      },
      { status: 400 }
    );
  if (!amount || amount <= 0)
    return json(
      {
        ok: false,
        error: "Please provide an amount, otherwise I can ask for a million dollar !",
      },
      { status: 400 }
    );
  if (!currency?.length)
    return json(
      {
        ok: false,
        error: "Please provide a currency, otherwise I can ask for gold kilograms !",
      },
      { status: 400 }
    );
  if (!country?.length)
    return json(
      {
        ok: false,
        error: "Please provide your country, required for any payment",
      },
      { status: 400 }
    );

  // check if user first
  let user = await UserModel.findOne({ email });

  console.log({ user });

  if (user) {
    if (user.firstName !== formData.get("firstName")) {
      capture("NOT SAME FIRST NAME", { extra: { request, formData }, user });
      return json(
        {
          ok: false,
          error:
            "Your first name doesn't correspond to the one already registered. We'll get back to you soon to solve this issue !",
        },
        { status: 400 }
      );
    }
    if (user.lastName !== formData.get("lastName")) {
      capture("NOT SAME LAST NAME", { extra: { request, formData }, user });
      return json(
        {
          ok: false,
          error:
            "Your last name doesn't correspond to the one already registered. We'll get back to you soon to solve this issue !",
        },
        { status: 400 }
      );
    }
  }
  if (!user) {
    user = await UserModel.create({ email, firstName, lastName });
  }
  console.log({ user });

  // create transaction
  const transaction = await TransactionModel.create({ user, amount, currency, country });

  let tokens = await FintectureAPI.getAccessToken();
  let connect = await FintectureAPI.getPisConnect(tokens.access_token, {
    amount,
    currency,
    communication: `MON-CROISSANT-${transaction._id}`,
    customer_full_name: `${user.firstName} ${user.lastName}`,
    customer_email: user.email,
    customer_ip: getClientIPAddress(request),
    state: JSON.stringify({ user, transaction }),
    country,
    language: language || "en",
    redirect_uri: `${APP_URL}/transaction/redirect`,
  });

  console.log({ connect, transaction });

  return json({ ok: true, connect });
};
