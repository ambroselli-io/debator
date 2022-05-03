import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // use locale globally
import tailwindStyles from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import resetStyles from "./styles/reset.css";
import smoothscroll from "smoothscroll-polyfill";
dayjs.locale("fr");

if (typeof document !== "undefined") {
  smoothscroll.polyfill();
}

export const meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  "theme-color": "#0D5295",
  title: "Joradoc | Le Jeu des Joutes Oratoires",
  description: "Joradoc | Le Jeu des Joutes Oratoires",
  "og:title": "Joradoc",
  "og:description": "Le Jeu des Joutes Oratoires",
  "twitter:title": "Joradoc",
  "twitter:description": "Le Jeu des Joutes Oratoires",
  // "og:url": "https://medspot.fr",
  // canonical: "https://medspot.fr",
  // "og:image": metaimg,
  // "twitter:image": metaimg,
  // "og:image:type": "image/png",
  // "og:image:width": "1200",
  // "og:image:height": "630",
  // "og:image:alt": "Copie de la page d'accueil",
  // "twitter:image:alt": "Copie de la page d'accueil",
  "og:type": "website",
});

export const links = () => {
  return [
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      crossOrigin: "true",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
      rel: "stylesheet",
    },
    { rel: "stylesheet", href: resetStyles },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
  ];
};

const App = () => {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
