/* Efeitos portados de referencia/portfolio-fx.js */

export const EASE = 'cubic-bezier(.16,1,.3,1)';

export const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Chama `cb(el)` uma vez quando cada elemento entra na tela (topo acima de (1 - frac) da viewport). */
export function onView(els: Iterable<Element>, cb: (el: HTMLElement) => void, frac = 0.12) {
  let list = [...els] as HTMLElement[];
  let stopped = false;
  const check = () => {
    if (stopped) return;
    const vh = innerHeight;
    list = list.filter(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * (1 - frac) && r.bottom > 0) {
        cb(el);
        return false;
      }
      return true;
    });
    if (!list.length) stop();
  };
  const t = setInterval(check, 300);
  const stop = () => {
    stopped = true;
    clearInterval(t);
    removeEventListener('scroll', check);
    removeEventListener('resize', check);
  };
  addEventListener('scroll', check, { passive: true });
  addEventListener('resize', check);
  check();
  return stop;
}

/** [data-reveal] → fade + translateY(48px) (ou translateX(-40px) com data-reveal="left"), 1.1s. */
export function reveal(root: HTMLElement) {
  if (prefersReducedMotion()) return () => {};
  const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  els.forEach(el => {
    el.style.opacity = '0';
  });
  const stop = onView(els, el => {
    const d = +(el.dataset.delay || 0);
    const kind = el.dataset.reveal;
    const kf: Keyframe[] =
      kind === 'clip'
        ? [{ clipPath: 'inset(0 0 100% 0)', transform: 'translateY(30px)' }, { clipPath: 'inset(0 0 0% 0)', transform: 'none' }]
        : kind === 'left'
          ? [{ opacity: 0, transform: 'translateX(-40px)' }, { opacity: 1, transform: 'none' }]
          : [{ opacity: 0, transform: 'translateY(48px)' }, { opacity: 1, transform: 'none' }];
    el.style.opacity = '';
    el.animate(kf, { duration: 1100, delay: d, easing: EASE, fill: 'backwards' });
  });
  return () => {
    stop();
    els.forEach(el => {
      el.style.opacity = '';
    });
  };
}

const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*<>/_';
const runs = new WeakMap<HTMLElement, number>();

/**
 * Embaralha o primeiro nó de texto de `el` até resolver no texto final.
 * `final` explícito serve para textos que mudam (título do carrossel).
 */
export function scramble(el: HTMLElement, dur = 1100, final?: string) {
  const tn = [...el.childNodes].find((n): n is Text => n.nodeType === 3);
  if (!tn) return;
  const fin = final ?? (el.dataset.final ||= tn.nodeValue ?? '');
  const id = (runs.get(el) ?? 0) + 1;
  runs.set(el, id);
  if (prefersReducedMotion()) {
    tn.nodeValue = fin;
    return;
  }
  const t0 = performance.now();
  const step = () => {
    if (runs.get(el) !== id) return;
    const p = Math.min((performance.now() - t0) / dur, 1);
    let s = '';
    for (let i = 0; i < fin.length; i++) {
      s += i < p * fin.length || fin[i] === ' ' ? fin[i] : CH[(Math.random() * CH.length) | 0];
    }
    tn.nodeValue = s;
    if (p < 1) requestAnimationFrame(step);
  };
  step();
}

/** [data-scramble] embaralha quando 30% visível (data-dur em ms, padrão 900). */
export function scrambleOnView(root: HTMLElement) {
  return onView(root.querySelectorAll('[data-scramble]'), el => scramble(el, +(el.dataset.dur || 900)), 0.3);
}

/** Cursor quadrado que segue o mouse com lerp e cresce sobre links/botões. Desligado em touch. */
export function cursor(el: HTMLElement | null) {
  if (!el || matchMedia('(pointer:coarse)').matches) return () => {};
  let x = innerWidth / 2,
    y = innerHeight / 2,
    tx = x,
    ty = y,
    s = 1,
    ts = 1,
    raf = 0;
  const mv = (e: PointerEvent) => {
    tx = e.clientX;
    ty = e.clientY;
    const t = (e.target as Element | null)?.closest?.('a,button,[data-hover]');
    ts = t ? 3.4 : 1;
    el.style.opacity = '1';
  };
  addEventListener('pointermove', mv);
  const loop = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    s += (ts - s) * 0.14;
    el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${s})`;
    raf = requestAnimationFrame(loop);
  };
  loop();
  return () => {
    removeEventListener('pointermove', mv);
    cancelAnimationFrame(raf);
  };
}

/* Trava de rolagem compartilhada pelos modais (lightbox e projeto). */
let locks = 0;
export function lockScroll() {
  locks++;
  document.documentElement.style.overflow = 'hidden';
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (!locks) document.documentElement.style.overflow = '';
}
export const isScrollLocked = () => locks > 0;
