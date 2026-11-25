import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { useT } from '../i18n';

export interface ZoomImage {
  src: string;
  alt: string;
  caption?: { t: string; d: string };
}

interface Props {
  images: ZoomImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}

const MIN = 1;
const MAX = 5;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Visualizador em tela cheia com zoom para os prints.
 * Mouse: roda amplia no ponto do cursor, arrastar move, duplo clique alterna 100% ↔ 250%.
 * Toque: pinça amplia, arrastar move, toque duplo alterna, deslizar (sem zoom) troca de imagem.
 * Teclado: + / − / 0, ← / →, Esc.
 */
export default function ZoomViewer({ images, index, onIndex, onClose }: Props) {
  const { t } = useT();
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [v, setV] = useState({ s: 1, x: 0, y: 0 });
  const [anim, setAnim] = useState(false);
  const [drag, setDrag] = useState(false);
  const vRef = useRef(v);
  vRef.current = v;
  const ptrs = useRef(new Map<number, { x: number; y: number }>());
  const g = useRef({ dist: 0, s0: 1, x0: 0, y0: 0, mx0: 0, my0: 0, panX: 0, panY: 0, downX: 0, downY: 0, moved: false, lastTap: 0 });
  const n = images.length;
  const cur = images[index] ?? images[0];

  // limites do arrasto: a imagem não sai do palco além das bordas
  const fit = (s: number, x: number, y: number) => {
    const st = stageRef.current, im = imgRef.current;
    if (!st || !im || !im.naturalWidth) return { s, x: 0, y: 0 };
    const W = st.clientWidth, H = st.clientHeight;
    const r = Math.min(W / im.naturalWidth, H / im.naturalHeight);
    const bx = Math.max(0, (im.naturalWidth * r * s - W) / 2);
    const by = Math.max(0, (im.naturalHeight * r * s - H) / 2);
    return { s, x: clamp(x, -bx, bx), y: clamp(y, -by, by) };
  };

  // posição relativa ao centro do palco
  const rel = (cx: number, cy: number) => {
    const r = stageRef.current!.getBoundingClientRect();
    return [cx - r.left - r.width / 2, cy - r.top - r.height / 2] as const;
  };

  // amplia mantendo fixo o ponto (px, py) da tela
  const zoomAt = (target: number, px: number, py: number, animate: boolean) => {
    const { s, x, y } = vRef.current;
    const ns = clamp(target, MIN, MAX);
    const k = ns / s;
    setAnim(animate);
    setV(fit(ns, px - (px - x) * k, py - (py - y) * k));
  };

  // troca de imagem volta ao tamanho da tela
  useEffect(() => {
    setAnim(false);
    setV({ s: 1, x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // roda do mouse (listener nativo para poder chamar preventDefault)
  useEffect(() => {
    const st = stageRef.current;
    if (!st) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const [px, py] = rel(e.clientX, e.clientY);
      zoomAt(vRef.current.s * Math.exp(-e.deltaY * 0.0018), px, py, false);
    };
    st.addEventListener('wheel', onWheel, { passive: false });
    const onResize = () => setV(p => fit(p.s, p.x, p.y));
    addEventListener('resize', onResize);
    return () => {
      st.removeEventListener('wheel', onWheel);
      removeEventListener('resize', onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // teclado com prioridade sobre o modal que está por baixo
  useEffect(() => {
    const onK = (e: KeyboardEvent) => {
      let used = true;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && n > 1) onIndex((index + 1) % n);
      else if (e.key === 'ArrowLeft' && n > 1) onIndex((index - 1 + n) % n);
      else if (e.key === '+' || e.key === '=') zoomAt(vRef.current.s * 1.5, 0, 0, true);
      else if (e.key === '-' || e.key === '_') zoomAt(vRef.current.s / 1.5, 0, 0, true);
      else if (e.key === '0') zoomAt(1, 0, 0, true);
      else used = false;
      if (used) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    addEventListener('keydown', onK, true);
    return () => removeEventListener('keydown', onK, true);
  }); // re-registra a cada render para ver o índice atual

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const G = g.current;
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()];
      G.dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      G.s0 = vRef.current.s;
      G.x0 = vRef.current.x;
      G.y0 = vRef.current.y;
      [G.mx0, G.my0] = rel((a.x + b.x) / 2, (a.y + b.y) / 2);
      G.moved = true;
    } else {
      G.downX = e.clientX;
      G.downY = e.clientY;
      G.panX = vRef.current.x;
      G.panY = vRef.current.y;
      G.moved = false;
    }
    setAnim(false);
    setDrag(true);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!ptrs.current.has(e.pointerId)) return;
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const G = g.current;
    if (ptrs.current.size >= 2) {
      // pinça: o ponto entre os dedos acompanha os dedos
      const [a, b] = [...ptrs.current.values()];
      const ns = clamp((G.s0 * Math.hypot(a.x - b.x, a.y - b.y)) / G.dist, MIN, MAX);
      const k = ns / G.s0;
      const [mx, my] = rel((a.x + b.x) / 2, (a.y + b.y) / 2);
      setV(fit(ns, mx - (G.mx0 - G.x0) * k, my - (G.my0 - G.y0) * k));
    } else {
      const dx = e.clientX - G.downX, dy = e.clientY - G.downY;
      if (Math.abs(dx) + Math.abs(dy) > 5) G.moved = true;
      if (vRef.current.s > 1) setV(fit(vRef.current.s, G.panX + dx, G.panY + dy));
    }
  };

  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!ptrs.current.has(e.pointerId)) return;
    const G = g.current;
    const wasPinch = ptrs.current.size >= 2;
    ptrs.current.delete(e.pointerId);
    if (ptrs.current.size === 1) {
      // saiu da pinça com um dedo ainda na tela: continua arrastando a partir daqui
      const [p] = [...ptrs.current.values()];
      G.downX = p.x;
      G.downY = p.y;
      G.panX = vRef.current.x;
      G.panY = vRef.current.y;
      return;
    }
    setDrag(false);
    if (wasPinch || e.type === 'pointercancel') return;
    const dx = e.clientX - G.downX, dy = e.clientY - G.downY;
    if (vRef.current.s === 1 && n > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      onIndex((index + (dx < 0 ? 1 : -1) + n) % n);
      return;
    }
    if (!G.moved) {
      const now = performance.now();
      if (now - G.lastTap < 320) {
        const [px, py] = rel(e.clientX, e.clientY);
        zoomAt(vRef.current.s > 1 ? 1 : 2.5, px, py, true);
        G.lastTap = 0;
      } else G.lastTap = now;
    }
  };

  const stop = (e: PointerEvent) => e.stopPropagation();
  const zoomed = v.s > 1.001;

  return (
    <div className="zv" role="dialog" aria-modal="true" aria-label={`${t({ pt: 'Ampliar', en: 'Zoom' })}: ${cur.alt}`}>
      <div className="zv-top">
        <span className="zv-title">
          {n > 1 && (
            <span className="acc">
              {pad2(index + 1)} / {pad2(n)}
            </span>
          )}
          {n > 1 && ' · '}
          {cur.caption?.t ?? cur.alt}
        </span>
        <button ref={closeRef} type="button" className="ghost-btn" onClick={onClose}>
          <span className="kbd-only">ESC · </span>
          {t({ pt: 'fechar ✕', en: 'close ✕' })}
        </button>
      </div>

      <div
        ref={stageRef}
        className={`zv-stage${zoomed ? ' zoomed' : ''}${drag ? ' dragging' : ''}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <img
          ref={imgRef}
          src={cur.src}
          alt={cur.alt}
          draggable={false}
          onLoad={() => setV(p => fit(p.s, p.x, p.y))}
          style={{
            transform: `translate(${v.x}px, ${v.y}px) scale(${v.s})`,
            transition: anim ? 'transform .32s cubic-bezier(.16,1,.3,1)' : 'none',
          }}
        />
        {n > 1 && (
          <>
            <button
              type="button"
              className="round-btn zv-nav zv-prev"
              title={t({ pt: 'Anterior', en: 'Previous' })}
              onPointerDown={stop}
              onClick={() => onIndex((index - 1 + n) % n)}
            >
              ←
            </button>
            <button
              type="button"
              className="round-btn zv-nav zv-next"
              title={t({ pt: 'Próximo', en: 'Next' })}
              onPointerDown={stop}
              onClick={() => onIndex((index + 1) % n)}
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="zv-bar">
        <button
          type="button"
          className="round-btn sm"
          aria-label={t({ pt: 'Diminuir zoom', en: 'Zoom out' })}
          disabled={!zoomed}
          onClick={() => zoomAt(v.s / 1.5, 0, 0, true)}
        >
          −
        </button>
        <span className="zv-pct" aria-live="polite">
          {Math.round(v.s * 100)}%
        </span>
        <button
          type="button"
          className="round-btn sm"
          aria-label={t({ pt: 'Aumentar zoom', en: 'Zoom in' })}
          disabled={v.s >= MAX}
          onClick={() => zoomAt(v.s * 1.5, 0, 0, true)}
        >
          +
        </button>
        <button type="button" className="ghost-btn zv-fit" disabled={!zoomed} onClick={() => zoomAt(1, 0, 0, true)}>
          {t({ pt: 'ajustar à tela', en: 'fit to screen' })}
        </button>
        <span className="zv-hint">
          <span className="hint-mouse">{t({ pt: 'roda do mouse amplia · arraste para mover · duplo clique alterna', en: 'scroll to zoom · drag to pan · double-click to toggle' })}</span>
          <span className="hint-touch">{t({ pt: 'pinça para ampliar · arraste para mover · toque duplo alterna', en: 'pinch to zoom · drag to pan · double-tap to toggle' })}</span>
        </span>
      </div>
    </div>
  );
}
