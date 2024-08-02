import React, { cloneElement, useEffect } from 'react';
import styled from './Modal.module.scss';
import Portal from '../Portal';

interface ModalProps {
  isOpen: boolean;
  close: VoidFunction;
  children: React.ReactElement;
}

function Modal({ isOpen, close, children }: ModalProps) {
  const $modalContentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 얘는 공통으로 뺴야겠다.
    function keyDownEscapeHandler(event: KeyboardEvent) {
      if (event.key === 'Escape') close();
    }

    document.addEventListener('keydown', keyDownEscapeHandler);

    return () => {
      document.removeEventListener('keydown', keyDownEscapeHandler);
    };
  }, []);

  return (
    <Portal isOpen={isOpen}>
      <div className={styled.modalWrapper}>
        <div className={styled.modalOverlay} onClick={close} />
        <div className={styled.modalContent} ref={$modalContentRef}>
          {cloneElement(children, { $modalContentRef })}
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
