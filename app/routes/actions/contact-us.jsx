import { catchErrors } from "app/services/catchErrors";
import { sendEmail } from "app/services/email.server";
import { json } from "remix";

export const action = catchErrors(async ({ request }) => {
  const formData = await request.formData();
  const response = await sendEmail({
    emails: ["arnaud@ambroselli.io"],
    text: JSON.stringify(Object.fromEntries(formData)),
    from: "Debator",
    subject: formData.get("subject"),
  });
  console.log(response, response.status);
  if (response.status < 300 && response.status >= 200)
    return json({ ok: true, response });
  return json({ ok: false });
});
