import { useEffect, useMemo, useState } from "react";

const BurgerMenu = ({ children, duration = 150 }) => {
  const [activateMenu, setActivateMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (activateMenu) {
      setShowMenu(true);
    } else {
      setTimeout(() => {
        setShowMenu(false);
      }, duration + 10);
    }
  }, [activateMenu, duration]);

  const className = useMemo(() => {
    if (!activateMenu) {
      if (!showMenu) return "hidden";
      if (showMenu) return "translate-x-full opacity-0";
    }
    if (activateMenu) {
      if (!showMenu) return "translate-x-full opacity-0";
      if (showMenu) return "opacity-1";
    }
  }, [activateMenu, showMenu]);

  return (
    <>
      <button
        className={`relative z-20 h-10 w-10 shrink-0 text-app ${
          showMenu ? "opacity-50" : ""
        }`}
        onClick={() => {
          setActivateMenu((s) => !s);
        }}
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
        className={`max-w-screen absolute top-0 right-0 z-10 flex h-screen w-80 max-w-full flex-col overflow-y-auto border-l border-app border-opacity-30 bg-[#fafbfe] pt-12 transition-all duration-${duration} ${className}`}
        onClick={() => setActivateMenu((s) => !s)}
      >
        {children}
      </nav>
    </>
  );
};

export default BurgerMenu;
