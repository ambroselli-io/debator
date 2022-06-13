import { redirect } from "@remix-run/node";
import { useSearchParams } from "@remix-run/react";
import UserModel from "app/db/models/user.server";
import { sendEmail } from "app/services/email.server";
import { createMagicLinkEmail } from "app/services/magic-link";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (!email) return { alert: "Veuillez fournir un email" };
  let newUser = false;
  let user = await UserModel.findOne({ email });
  if (!user) {
    user = await UserModel.create({
      email,
      licence: "monthly",
      licenceStartedAt: Date.now(),
    });
    newUser = true;
  }
  const magicLinkEmail = createMagicLinkEmail(user, newUser);
  await sendEmail(magicLinkEmail);
  return redirect(`/profil/login-redirect?email=${email}`);
};

const Index = () => {
  const [searchParams] = useSearchParams();

  return (
    <span>
      Veuillez cliquer sur le lien envoyé à <b>{searchParams.get("email")}</b> pour vous
      connecter
    </span>
  );
};

export default Index;
