import { Outlet } from "remix";

const GameLayout = () => {
  return (
    <>
      <header className="border-b border-gray-100 py-4 px-6 text-app">
        <h1 className="font-marker text-xl">Pifas</h1>
      </header>
      <main className="flex w-full flex-col items-center p-3">
        <Outlet />
      </main>
    </>
  );
};

export default GameLayout;
