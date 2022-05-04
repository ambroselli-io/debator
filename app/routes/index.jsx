import dayjs from "dayjs";
import { redirect } from "remix";

export const loader = () => {
  return redirect("/le-jeu");
};

export default function Index() {
  return null;
}
