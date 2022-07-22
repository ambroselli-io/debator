import { Outlet } from "@remix-run/react";
import React from "react";

const QuestionnaireLayout = () => {
  return (
    <>
      <section className="my-4 flex w-full items-center">
        {["Constats", "Idée", "Jeu"].map((section, index) => (
          <React.Fragment key={section}>
            {index > 0 && <div className="h-0.5 grow bg-app" />}
            <div className="h-4 w-4 shrink-0 grow-0 basis-4 rounded-full bg-app" />
          </React.Fragment>
        ))}
      </section>
      <Outlet />
    </>
  );
};

export default QuestionnaireLayout;
