import { TIPIMAIL_API_USER, TIPIMAIL_API_KEY, APP_NAME } from "../config";

export const sendEmail = ({
  emails = ["arnaud@ambroselli.io"],
  text,
  html,
  subject,
  from = "contact@docriton.com",
}) =>
  fetch("https://api.tipimail.com/v1/messages/send", {
    method: "POST",
    headers: {
      "X-Tipimail-ApiUser": TIPIMAIL_API_USER,
      "X-Tipimail-ApiKey": TIPIMAIL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: TIPIMAIL_API_KEY,
      to: emails.map((address) => ({ address })),
      msg: {
        from: {
          address: "arnaud@ambroselli.io",
          personalName: APP_NAME,
        },
        subject,
        text,
        html,
      },
    }),
  });
