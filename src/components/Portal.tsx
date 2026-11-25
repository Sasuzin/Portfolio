import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Renderiza no #modal-root (dentro de .root, acima das seções). */
export default function Portal({ children }: { children: ReactNode }) {
  const target = document.getElementById('modal-root');
  return target ? createPortal(children, target) : <>{children}</>;
}
