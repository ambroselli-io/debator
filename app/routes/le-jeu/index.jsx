import { redirect } from "remix";

export const loader = () => redirect("/le-jeu/choisir-un-sujet");

const Index = () => null;

export default Index;
