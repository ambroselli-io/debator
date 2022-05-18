import { Outlet } from "@remix-run/react";

const GameLayout = () => {
  return (
    <>
      <header className="border-b border-gray-100 py-4 px-6 text-app">
        <h1 className="font-marker text-xl">Debat'OR</h1>
      </header>
      <div id="root" className="flex w-full flex-col items-center p-3">
        <Outlet />
      </div>
    </>
  );
};

export default GameLayout;
