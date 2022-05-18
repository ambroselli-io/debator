import { redirect } from "@remix-run/node";

export const loader = () => redirect("/le-jeu/choisir-un-sujet");

const Index = () => null;

export default Index;
