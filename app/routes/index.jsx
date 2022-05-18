import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/le-jeu");
};

const Index = () => null;

export default Index;
