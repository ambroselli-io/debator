import { useLoaderData } from "@remix-run/react";
import TopicModel from "../db/models/topic.server";

export const loader = async ({ request }) => {
  const topics = await TopicModel.find();
  return topics;
};

const Game = () => {
  const loaderData = useLoaderData();
  return (
    <>
      <header className="py-4 px-6">
        <p className="font-marker text-xl">Pifas</p>
      </header>
      <main>
        <pre>{JSON.stringify(loaderData, null, 2)}</pre>
      </main>
    </>
  );
};

export default Game;
