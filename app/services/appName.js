import { name, description } from "../../package.json";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const APP_NAME = capitalizeFirstLetter(name);
const APP_DESCRIPTION = description;

export { APP_NAME, APP_DESCRIPTION };
