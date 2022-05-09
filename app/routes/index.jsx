import { redirect } from "remix";

export const loader = () => {
  return redirect("/le-jeu");
};

const Index = () => null;

export default Index;
