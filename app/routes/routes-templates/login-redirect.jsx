import { useSearchParams, redirect } from "@remix-run/node";
import UserModel from "../../db/models/user.server";
import { createMagicLinkEmail } from "../../services/magic-link";
import { sendEmail } from "../../services/sendEmail";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (!email) return { alert: "Veuillez fournir un email" };
  let user = await UserModel.findOne({ email });
  if (!user) user = await UserModel.create({ email });
  const magicLinkEmail = createMagicLinkEmail(user);
  await sendEmail(magicLinkEmail);
  return redirect(`/welcome/login-redirect?email=${email}`);
};

export default function Index() {
  const [searchParams] = useSearchParams();

  return (
    <span>
      Veuillez cliquer sur le lien envoyé à <b>{searchParams.get("email")}</b> pour vous
      connecter
    </span>
  );
}
