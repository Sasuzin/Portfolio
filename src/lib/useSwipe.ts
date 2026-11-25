import { useRef, type PointerEvent } from 'react';

/**
 * Gesto de deslizar na horizontal (toque ou arrastar com o mouse).
 * `onSwipe(1)` = deslizou para a esquerda (próximo), `onSwipe(-1)` = para a direita (anterior).
 * `wasSwiped()` permite ignorar o clique que o navegador dispara logo após o gesto.
 */
export function useSwipe(onSwipe: (dir: 1 | -1) => void, threshold = 40) {
  const st = useRef({ x: 0, y: 0, swiped: false });
  return {
    handlers: {
      onPointerDown: (e: PointerEvent) => {
        st.current.x = e.clientX;
        st.current.y = e.clientY;
        st.current.swiped = false;
      },
      onPointerUp: (e: PointerEvent) => {
        const dx = e.clientX - st.current.x,
          dy = e.clientY - st.current.y;
        if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
          st.current.swiped = true;
          onSwipe(dx < 0 ? 1 : -1);
          setTimeout(() => {
            st.current.swiped = false;
          }, 50);
        }
      },
    },
    wasSwiped: () => st.current.swiped,
  };
}
