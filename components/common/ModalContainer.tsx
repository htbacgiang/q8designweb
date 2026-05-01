import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useId,
} from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  visible?: boolean;
  onClose?(): void;
}

interface Props extends ModalProps {
  children: ReactNode;
}

const ModalContainer: FC<Props> = ({
  visible,
  children,
  onClose,
}): JSX.Element | null => {
  const containerId = useId();
  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleClick = ({ target }: any) => {
    if (target.id === containerId) handleClose();
  };

  useEffect(() => {
    const closeModal = ({ key }: any) => key === "Escape" && handleClose();

    document.addEventListener("keydown", closeModal);
    return () => document.removeEventListener("keydown", closeModal);
  }, [handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (visible) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [visible]);

  if (!visible) return null;
  
  const modalContent = (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[4px] z-[99999] overflow-y-auto"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="min-h-full flex items-center justify-center p-4 py-8">
        {children}
      </div>
    </div>
  );

  // Render modal directly to body using portal to avoid z-index and positioning issues
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return modalContent;
};

export default ModalContainer;
