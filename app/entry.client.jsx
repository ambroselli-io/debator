import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: window.ENV.SENTRY_XXX,
    environment: "app",
    tracesSampleRate: 1.0,
    integrations: [new Integrations.BrowserTracing()],
  });
}

hydrate(<RemixBrowser />, document);
