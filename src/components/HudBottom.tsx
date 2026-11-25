import { useEffect, useRef } from 'react';

/** HUD fixo no canto inferior esquerdo: progresso da rolagem + posição do mouse. */
export default function HudBottom() {
  const pctRef = useRef<HTMLSpanElement>(null);
  const xyRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onS = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (pctRef.current)
        pctRef.current.textContent = String(Math.round(h > 0 ? (scrollY / h) * 100 : 0)).padStart(3, '0') + '%';
    };
    const onM = (e: PointerEvent) => {
      if (xyRef.current)
        xyRef.current.textContent = `${(e.clientX / innerWidth).toFixed(2)} · ${(e.clientY / innerHeight).toFixed(2)}`;
    };
    addEventListener('scroll', onS, { passive: true });
    addEventListener('resize', onS);
    addEventListener('pointermove', onM);
    onS();
    return () => {
      removeEventListener('scroll', onS);
      removeEventListener('resize', onS);
      removeEventListener('pointermove', onM);
    };
  }, []);

  return (
    <div className="hud-bottom" aria-hidden="true">
      <span>
        SCROLL <span ref={pctRef} className="acc" />
      </span>
      <span className="pos">
        POS <span ref={xyRef} className="v" />
      </span>
    </div>
  );
}
