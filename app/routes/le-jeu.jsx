import { NavLink, Outlet } from "@remix-run/react";
import BurgerMenu from "app/components/BurgerMenu";

const GameLayout = () => {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-100 py-2 px-4 text-app">
        <h1 className="font-marker text-xl">Debat'OR</h1>
        <BurgerMenu>
          <NavLink className="py-2 px-4" to="/choisir-un-jeu">
            <small>Ajouter un thème</small>
          </NavLink>
          <NavLink className="py-2 px-4" to="/choisir-un-jeu">
            <small>Ajouter un défi</small>
          </NavLink>
        </BurgerMenu>
      </header>
      <div id="root" className="flex w-full flex-col items-center p-3">
        <Outlet />
      </div>
    </>
  );
};

export default GameLayout;
