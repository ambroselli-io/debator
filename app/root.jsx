import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // use locale globally
import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import resetStyles from "./styles/reset.css";
import fontFace from "./styles/font.css";
import smoothscroll from "smoothscroll-polyfill";
import dialogPolyfillCSS from "dialog-polyfill/dist/dialog-polyfill.css";
import { APP_DESCRIPTION, APP_NAME } from "./services/appName";
dayjs.locale("fr");

if (typeof document !== "undefined") {
  smoothscroll.polyfill();
}

export const meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": "#e700e7",
  title: `${APP_NAME} | ${APP_DESCRIPTION}`,
  description: `${APP_NAME} | ${APP_DESCRIPTION}`,
  "og:title": `${APP_NAME}`,
  "og:description": APP_DESCRIPTION,
  "twitter:title": `${APP_NAME}`,
  "twitter:description": APP_DESCRIPTION,
  // "og:url": "https://debator.cleverapps.fr",
  // canonical: "https://debator.cleverapps.fr",
  // "og:image": metaimg,
  // "twitter:image": metaimg,
  // "og:image:type": "image/png",
  // "og:image:width": "1200",
  // "og:image:height": "630",
  // "og:image:alt": "Copie de la page d'accueil",
  // "twitter:image:alt": "Copie de la page d'accueil",
  "og:type": "website",
});

// load browser env variables here, the inject in the script below
export const loader = () => ({
  ENV: JSON.stringify({
    SENTRY_XXX: process.env.SENTRY_XXX,
  }),
});

export const links = () => {
  return [
    { rel: "stylesheet", href: fontFace },
    { rel: "stylesheet", href: resetStyles },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", type: "text/css", href: dialogPolyfillCSS },
  ];
};

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        We fucked up, it's coming !
        <Scripts />
      </body>
    </html>
  );
}

const App = () => {
  const data = useLoaderData();
  return (
    <html lang="en" className="h-screen w-screen scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen w-screen flex-col overflow-x-hidden bg-[#fafbfe] outline-app">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.ENV=${data.ENV};`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
