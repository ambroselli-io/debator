const MONGO_URL =
  process.env.MONGODB_ADDON_URI ||
  "***REMOVED***";
const MONGODB_DB_NAME = "Debator";
const APP_URL = process.env.APP_URL;
const APP_NAME = "Debator";
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || "not_so_secret";
const ENVIRONMENT = process.env.NODE_ENV;
const SENTRY_DSN = process.env.SENTRY_DSN;
const WHITE_LIST_DOMAINS = process.env.WHITE_LIST_DOMAINS;
const TIPIMAIL_API_USER = process.env.TIPIMAIL_API_USER;
const TIPIMAIL_API_KEY = process.env.TIPIMAIL_API_KEY;
const CELLAR_ADDON_HOST = process.env.CELLAR_ADDON_HOST;
const CELLAR_ADDON_KEY_ID = process.env.CELLAR_ADDON_KEY_ID;
const CELLAR_ADDON_KEY_SECRET = process.env.CELLAR_ADDON_KEY_SECRET;
const PUBLIC_BUCKET_NAME = "debator";

export {
  MONGO_URL,
  APP_URL,
  APP_NAME,
  PORT,
  SECRET,
  ENVIRONMENT,
  SENTRY_DSN,
  WHITE_LIST_DOMAINS,
  TIPIMAIL_API_USER,
  TIPIMAIL_API_KEY,
  CELLAR_ADDON_HOST,
  CELLAR_ADDON_KEY_ID,
  CELLAR_ADDON_KEY_SECRET,
  PUBLIC_BUCKET_NAME,
  MONGODB_DB_NAME,
};
