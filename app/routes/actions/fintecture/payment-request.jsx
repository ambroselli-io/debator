import TransactionModel from "app/db/models/transaction.server";
import UserModel from "app/db/models/user.server";
import { getUnauthentifiedUserFromCookie } from "app/services/auth.server";
import { catchErrors } from "app/services/catchErrors";
import FintectureAPI from "app/services/fintecture.server";
import { capture } from "app/services/sentry.server";
import { json } from "@remix-run/node";
import { getClientIPAddress, getClientLocales } from "remix-utils";

// https://help.fintecture.com/en/articles/5843235-how-to-test-the-module-before-going-into-production
export const action = catchErrors(async ({ request }) => {
  const registeredUser = await getUnauthentifiedUserFromCookie(request);
  const formData = await request.formData();
  // get locale
  let locales = getClientLocales(request);
  if (!locales) locales = ["en"];
  if (typeof locales === "string") locales = [locales];
  const twoLettersLocales = locales?.map((local) => local.split("-")[0]);
  const locale = twoLettersLocales?.[0] || "en";

  let { firstName, lastName, amount, email, country, currency, licence } =
    Object.fromEntries(formData);

  if (registeredUser?.email) email = registeredUser?.email;
  if (registeredUser?.licence === "lifely") licence = "lifely";

  if (!licence?.length && registeredUser?.licence !== "lifely") {
    return json(
      {
        ok: false,
        error: "Please choose a licence, if not you would pay for nothing !",
      },
      { status: 400 }
    );
  }
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

  if (user) {
    if (!!user.firstName && user.firstName !== formData.get("firstName")) {
      capture("NOT SAME FIRST NAME", { extra: { request, formData }, user });
    }
    if (!!user.lastName && user.lastName !== formData.get("lastName")) {
      capture("NOT SAME LAST NAME", { extra: { request, formData }, user });
    }
    user.set({ firstName, lastName });
    await user.save();
  }
  if (!user) {
    user = await UserModel.create({
      email,
      firstName,
      lastName,
    });
  }

  // create transaction
  const transaction = await TransactionModel.create({
    user,
    amount,
    currency,
    country,
    licence,
  });

  let tokens = await FintectureAPI.getAccessToken();
  const config = {
    amount,
    currency: currency.toLocaleUpperCase(),
    communication: `DEBATOR${transaction._id}`,
    customer_full_name: `${user.firstName} ${user.lastName}`,
    customer_email: user.email,
    customer_ip: getClientIPAddress(request) || "127.0.0.1",
    state: "noneed",
    language: "FR",
    country,
    redirect_uri: `https://debator.cleverapps.io/donation/merci`,
  };
  let connect = await FintectureAPI.getPisConnect(tokens.access_token, config);
  transaction.set({
    fintecture_session_id: connect.session_id,
    fintecture_url: connect.url,
  });
  await transaction.save();
  if (user.licence !== "lifely") {
    user.set({
      licence,
      licenceStartedAt: Date.now(),
    });
    await user.save();
  }

  return json({ ok: true, connect });
});
