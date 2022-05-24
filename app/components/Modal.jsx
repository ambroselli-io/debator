import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";

// https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

const Modal = ({ title, children }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  useEffect(() => {
    import("dialog-polyfill").then((dialogPolyfill) => {
      dialogPolyfill.default.registerDialog(dialogRef.current);
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    });
  }, []);

  const onCancel = () => {
    document.body.style.overflow = "visible";
    navigate(-1);
  };

  return (
    <dialog
      onCancel={onCancel}
      ref={dialogRef}
      className="fixed !inset-0 flex w-[90vw] max-w-md !transform-none flex-col items-center justify-start overflow-y-visible  rounded bg-white !p-0"
    >
      <h4 className="sticky inset-0 flex w-full justify-between bg-white bg-gradient-to-t from-transparent to-white p-4 pb-5 text-xl font-bold">
        {title}
        <button type="button" onClick={onCancel} aria-label="fermer les infos">{`\u00D7`}</button>
      </h4>
      <div className="p-4">{children}</div>
    </dialog>
  );
};

export default Modal;
