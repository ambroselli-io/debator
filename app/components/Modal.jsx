import { useEffect, useRef } from "react";
import { useNavigate } from "@remix-run/react";
// https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/

const Modal = ({ title, children, isOpen = true, hide = null }) => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const currentOverflow = useRef(null);
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      import("dialog-polyfill").then((dialogPolyfill) => {
        if (!dialogRef.current) return;
        dialogPolyfill.default.registerDialog(dialogRef.current);
        dialogRef.current?.showModal();
        currentOverflow.current = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      });
    }
  }, [isOpen]);

  const onCancel = () => {
    document.body.style.overflow = currentOverflow.current;
    // clear inputs storage
    window.sessionStorage.clear();
    if (!hide) return navigate(-1);
    hide(false); // for setShowModal(false)
    dialogRef.current.close();
  };

  const onClose = () => {
    // clear inputs storage
    // not working...
    window.sessionStorage.clear();
  };

  return (
    <dialog
      onCancel={onCancel}
      onClose={onClose}
      ref={dialogRef}
      className="fixed !inset-0 flex w-[90vw] max-w-[68ch] !transform-none flex-col items-center justify-start overflow-y-scroll rounded bg-white !p-0"
    >
      <div className="w-full p-4 pt-20">{children}</div>
      <h4 className="absolute top-0 left-0 flex w-full justify-between bg-white p-4 pb-5 text-xl font-bold">
        {title}
        <button
          type="button"
          onClick={onCancel}
          aria-label="fermer les infos"
        >{`\u00D7`}</button>
      </h4>
    </dialog>
  );
};

export default Modal;
