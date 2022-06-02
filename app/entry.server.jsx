import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import "./db/mongo.server";
import { capture } from "./services/sentry.server";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  responseHeaders.set("Content-Type", "text/html");

  if (responseStatusCode >= 400) {
    console.log("LA ON EST BON");
    if (process.env.NODE_ENV === "production") {
      capture(remixContext.appState.error, {
        extra: {
          request,
          responseStatusCode,
          responseHeaders,
          remixContext,
        },
      });
    } else {
      capture(remixContext.appState.error, {
        extra: {
          request,
          responseStatusCode,
          responseHeaders,
          remixContext,
        },
      });
    }
  }

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
