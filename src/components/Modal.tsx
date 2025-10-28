import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  open,
  children,
  onClose,
}: {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="w-[30rem] mx-auto my-auto bg-[#d5c7bc] p-0 shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-lg animate-[slide-down-fade-in_0.3s_ease-out_forwards] z-2 backdrop:fixed backdrop:top-0 backdrop:left-0 backdrop:z-1 backdrop:w-full backdrop:h-[100vh] backdrop:bg-[rgba(0,0,0,0.6)]"
      ref={dialogRef}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("root-modal")
  );
}
