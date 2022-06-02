import { json } from "@remix-run/node";
import { capture } from "./sentry.server";

export const catchErrors = (fn) => {
  console.log("CACAPIPI");
  return function (object) {
    try {
      return fn(object);
    } catch (e) {
      console.log("PUTIN DE CROTTE");
      capture(e, { extra: object });
    }
    console.log("MERDE ALORS");
    return json({
      ok: false,
      error:
        "Désolé une erreur est survenue, l'équipe technique est prévenue et reviendra vers vous dans les plus brefs délais !",
    });
  };
};
