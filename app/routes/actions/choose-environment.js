import { json } from "@remix-run/node";
import { catchErrors } from "app/services/catchErrors";
import { getUserFromCookie } from "app/services/auth.server";

export const action = catchErrors(async ({ request }) => {
  const formData = await request.formData();
  const user = await getUserFromCookie(request, { noRedirect: true });
  user.set({ environment: formData.get("environment") });
  await user.save();
  return json({ ok: true, user });
});
