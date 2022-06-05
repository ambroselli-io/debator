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
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/fr"; // use locale globally
import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import resetStyles from "./styles/reset.css";
import fontFace from "./styles/font.css";
import smoothscroll from "smoothscroll-polyfill";
import dialogPolyfillCSS from "dialog-polyfill/dist/dialog-polyfill.css";
import { APP_DESCRIPTION, APP_NAME } from "./services/appName";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
const fullConfig = resolveConfig(tailwindConfig);

dayjs.locale("fr");
dayjs.extend(advancedFormat);

if (typeof document !== "undefined") {
  smoothscroll.polyfill();
}

export const meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": fullConfig.theme.colors.app,
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
    { rel: "manifest", type: "text/css", href: "/debator.webmanifest" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/assets/icons/icon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/assets/icons/icon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/assets/icons/icon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "128x128",
      href: "/assets/icons/icon-128x128.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "196x196",
      href: "/assets/icons/icon-196x196.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "228x228",
      href: "/assets/icons/icon-228x228.png",
    },
    {
      rel: "apple-touch-icon-precomposed",
      sizes: "152x152",
      href: "/assets/icons/icon-152x152.png",
    },
    {
      rel: "apple-touch-icon-precomposed",
      sizes: "167x167",
      href: "/assets/icons/icon-167x167.png",
    },
    {
      rel: "apple-touch-icon-precomposed",
      sizes: "180x180",
      href: "/assets/icons/icon-180x180.png",
    },
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
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
            // https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#javascript_for_handling_the_install
            let deferredPrompt;
            const addBtn = document.getElementById('add-button-to-destkop-home');
            if (!!addBtn) {
              addBtn.classList.add('hidden');

              window.addEventListener('beforeinstallprompt', (e) => {
              // Prevent Chrome 67 and earlier from automatically showing the prompt
              e.preventDefault();
              // Stash the event so it can be triggered later.
              deferredPrompt = e;
              // Update UI to notify the user they can add to home screen
              addBtn.classList.remove('hidden');

              addBtn.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                addBtn.classList.add('hidden');
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                      console.log('User accepted the A2HS prompt');
                    } else {
                      console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                  });
                });
              });
            }
            `,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
