import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  maxWidth?: number;
};

export const Modal = ({
  children,
  onClose,
  maxWidth = 700,
}: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={s.backdrop} onClick={onClose}>
      <div
        className={s.modal}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
