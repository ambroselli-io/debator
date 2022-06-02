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
  };
};
