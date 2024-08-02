import { cloneElement } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactElement;
  isOpen: boolean;
}

function Portal({ children, isOpen }: PortalProps) {
  return isOpen ? createPortal(cloneElement(children), document.getElementById('portal') as HTMLElement) : null;
}

export default Portal;
// cloneElement를 하는 이유
