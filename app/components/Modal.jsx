import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";

// https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

const Modal = ({ children }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  useEffect(() => {
    import("dialog-polyfill").then((dialogPolyfill) => {
      dialogPolyfill.default.registerDialog(dialogRef.current);
      dialogRef.current.showModal();
      document.body.style.overflow = "hidden";
    });
  }, []);
  return (
    <dialog
      onCancel={() => {
        document.body.style.overflow = "visible";
        navigate(-1);
      }}
      ref={dialogRef}
      className="fixed !inset-0 flex w-[90vw] max-w-md !transform-none flex-col items-center justify-start overflow-y-visible rounded bg-white"
    >
      {children}
    </dialog>
  );
};

export default Modal;
