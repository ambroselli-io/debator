import { useState } from "react";

const BurgerMenu = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        className={`relative z-20 h-10 w-10 shrink-0 text-app ${
          showMenu ? "opacity-50" : ""
        }`}
        onClick={() => setShowMenu((s) => !s)}
      >
        <span className="sr-only">Ouvrir le menu</span>
        <div className="absolute left-1/2 top-1/2 block w-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-full transform bg-current transition duration-500 ease-in-out ${
              showMenu ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute block  h-0.5 w-full transform   bg-current transition duration-500 ease-in-out ${
              showMenu ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-full transform bg-current transition duration-500 ease-in-out ${
              showMenu ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>
      <nav
        className={`max-w-screen absolute top-0 right-0 z-10 flex h-screen w-56 max-w-full flex-col border-l border-app border-opacity-30 bg-[#fafbfe] pt-12 transition-all ${
          !showMenu ? "invisible translate-x-full opacity-0" : "opacity-1"
        }`}
        onClick={() => setShowMenu((s) => !s)}
      >
        {children}
      </nav>
    </>
  );
};

export default BurgerMenu;
