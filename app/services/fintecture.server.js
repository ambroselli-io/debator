import {
  FINTECTURE_APP_ID,
  FINTECTURE_APP_SECRET,
  FINTECTURE_ENV,
  FINTECTURE_PRIVATE_KEY,
} from "app/config";
import { FintectureClient } from "fintecture-client";

let FintectureAPI = new FintectureClient({
  app_id: FINTECTURE_APP_ID,
  app_secret: FINTECTURE_APP_SECRET,
  private_key: FINTECTURE_PRIVATE_KEY,
  env: FINTECTURE_ENV,
});

console.log({
  app_id: FINTECTURE_APP_ID,
  app_secret: FINTECTURE_APP_SECRET,
  private_key: FINTECTURE_PRIVATE_KEY,
  env: FINTECTURE_ENV,
});

export default FintectureAPI;
