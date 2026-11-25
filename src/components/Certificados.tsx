import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { CERTS, CERT_CATS, TOTAL_MIN, fmtMin, type Cert } from '../data/certs';
import { EASE, centerTab, isScrollLocked, lockScroll, prefersReducedMotion, scramble, unlockScroll } from '../lib/fx';
import { useSwipe } from '../lib/useSwipe';
import Portal from './Portal';
import SectionHead from './SectionHead';

const AUTOPLAY_MS = 5200;
const pad2 = (n: number) => String(n).padStart(2, '0');

function Certificados() {
  const [ctab, setCtab] = useState(0);
  const [ci, setCi] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [lb, setLb] = useState(-1);

  const list = useMemo(() => (ctab ? CERTS.filter(c => c.cat === ctab) : CERTS), [ctab]);
  const n = list.length;
  const cur = Math.min(ci, n - 1);
  const curCert = list[cur];

  const gridRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progAnim = useRef<Animation | null>(null);
  // estado "vivo" lido pelos handlers globais (teclado, onfinish)
  const live = useRef({ hover: false, dragged: false, dx0: 0, lbDir: 0, list, playing, lb });
  live.current.list = list;
  live.current.playing = playing;
  live.current.lb = lb;

  const go = useCallback((d: number) => {
    const len = live.current.list.length;
    setCi(c => (Math.min(c, len - 1) + d + len) % len);
  }, []);

  const syncProg = useCallback(() => {
    const a = progAnim.current;
    if (!a) return;
    const s = live.current;
    if (s.playing && !s.hover && s.lb < 0) a.play();
    else a.pause();
  }, []);

  const startProg = useRef<() => void>(() => {});
  startProg.current = () => {
    progAnim.current?.cancel();
    const el = progRef.current;
    if (!el) return;
    const a = el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: AUTOPLAY_MS,
      easing: 'linear',
      fill: 'forwards',
    });
    progAnim.current = a;
    a.onfinish = () => {
      if (progAnim.current !== a) return;
      const r = gridRef.current?.getBoundingClientRect();
      // só avança se a seção estiver visível
      if (r && r.bottom > 0 && r.top < innerHeight) go(1);
      else startProg.current();
    };
    syncProg();
  };

  // Troca de certificado/aba → reinicia o autoplay e embaralha o título
  const firstTitle = useRef(true);
  useLayoutEffect(() => {
    startProg.current();
    if (firstTitle.current) {
      firstTitle.current = false;
      return;
    }
    const t = titleRef.current;
    if (t && curCert) scramble(t, 520, curCert.t);
  }, [cur, ctab]);

  // Troca de aba → bloco entra com fade
  const firstTab = useRef(true);
  useLayoutEffect(() => {
    if (firstTab.current) {
      firstTab.current = false;
      return;
    }
    gridRef.current?.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], {
      duration: 700,
      easing: EASE,
    });
  }, [ctab]);

  useEffect(() => syncProg(), [playing, lb, syncProg]);
  useEffect(() => () => progAnim.current?.cancel(), []);

  const openCur = () => {
    live.current.lbDir = 0;
    lockScroll();
    setLb(CERTS.indexOf(list[cur]));
  };
  const closeLb = useCallback(() => {
    unlockScroll();
    setLb(-1);
  }, []);
  const stepCert = useCallback((d: number) => {
    const { list: l, lb: cur } = live.current;
    const i = l.indexOf(CERTS[cur]);
    const next = l[(i + d + l.length) % l.length];
    live.current.lbDir = d;
    setCi(l.indexOf(next));
    setLb(CERTS.indexOf(next));
  }, []);

  // Teclado: ←/→ no carrossel (seção centralizada) ou no visualizador; Esc fecha
  useEffect(() => {
    const onK = (e: KeyboardEvent) => {
      if (live.current.lb >= 0) {
        if (e.key === 'Escape') closeLb();
        else if (e.key === 'ArrowRight') stepCert(1);
        else if (e.key === 'ArrowLeft') stepCert(-1);
        return;
      }
      if (isScrollLocked() || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const r = gridRef.current?.getBoundingClientRect();
      if (r && r.top < innerHeight * 0.7 && r.bottom > innerHeight * 0.3) go(e.key === 'ArrowRight' ? 1 : -1);
    };
    addEventListener('keydown', onK);
    return () => removeEventListener('keydown', onK);
  }, [closeLb, stepCert, go]);

  const onDown = (e: PointerEvent) => {
    live.current.dx0 = e.clientX;
    live.current.dragged = false;
  };
  const onUp = (e: PointerEvent) => {
    const dx = e.clientX - live.current.dx0;
    if (Math.abs(dx) > 40) {
      live.current.dragged = true;
      go(dx < 0 ? 1 : -1);
      setTimeout(() => {
        live.current.dragged = false;
      }, 50);
    }
  };

  return (
    <section id="certificados" className="sec" aria-label="Certificados">
      <SectionHead n="06">VIVER DE IA · ALURA</SectionHead>
      <div className="cert-top">
        <h2 data-scramble="" className="h2-big">
          Certificados
        </h2>
        <div className="metrics">
          <div className="metric">
            <b>{CERTS.length}</b>
            <span>CERTIFICADOS</span>
          </div>
          <div className="metric">
            <b className="acc">{fmtMin(TOTAL_MIN)}</b>
            <span>DE FORMAÇÃO</span>
          </div>
        </div>
      </div>

      <div className="tabs cert-tabs" role="tablist">
        {CERT_CATS.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={ctab === i}
            className={`tab${ctab === i ? ' on' : ''}`}
            onClick={e => {
              setCtab(i);
              setCi(0);
              centerTab(e.currentTarget);
            }}
          >
            {label}
            <span className="cnt">{i ? CERTS.filter(c => c.cat === i).length : CERTS.length}</span>
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="car-wrap"
        onMouseEnter={() => {
          live.current.hover = true;
          syncProg();
        }}
        onMouseLeave={() => {
          live.current.hover = false;
          syncProg();
        }}
      >
        <div className="car-stage" onPointerDown={onDown} onPointerUp={onUp}>
          <div className="car-glow" />
          {list.map((c, i) => {
            const o = i - cur,
              a = Math.min(Math.abs(o), 4),
              sg = Math.sign(o);
            const x = sg * (a <= 1 ? a * 62 : 62 + (a - 1) * 34);
            const ry = -sg * Math.min(a, 1.4) * 26;
            const sc = 1 - Math.min(a, 3) * 0.07;
            return (
              <div
                key={c.s}
                className={`car-card${a === 0 ? ' on' : ''}`}
                role="button"
                tabIndex={a === 0 ? 0 : -1}
                aria-label={a === 0 ? `Ver certificado: ${c.t}` : c.t}
                onKeyDown={e => a === 0 && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openCur())}
                onClick={() => {
                  if (live.current.dragged) {
                    live.current.dragged = false;
                    return;
                  }
                  if (o === 0) openCur();
                  else setCi(i);
                }}
                style={{
                  transform: `translateX(${x}%) translateZ(${-a * 170}px) rotateY(${ry}deg) scale(${sc})`,
                  opacity: a === 0 ? 1 : a <= 2 ? 1 - a * 0.22 : 0,
                  zIndex: 100 - a * 10,
                  filter: `brightness(${1 - Math.min(a, 3) * 0.25}) saturate(${1 - Math.min(a, 3) * 0.2})`,
                  pointerEvents: a <= 2 ? 'auto' : 'none',
                  boxShadow: a === 0 ? '0 50px 90px -30px rgba(0,0,0,.85)' : '0 20px 40px -20px rgba(0,0,0,.6)',
                }}
              >
                <img src={c.img} alt={c.t} loading="lazy" draggable={false} />
                <div className="car-glare" style={{ opacity: a === 0 ? 1 : 0 }} />
              </div>
            );
          })}
        </div>

        <div className="car-bar">
          <div className="car-prog">
            <div ref={progRef} />
          </div>
          <div className="ticks">
            {list.map((c, i) => (
              <button
                key={c.s}
                type="button"
                title={c.t}
                aria-label={c.t}
                className={`tick${i === cur ? ' on' : i < cur ? ' past' : ''}`}
                onClick={() => setCi(i)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>

        <div className="car-info">
          <div className="car-text">
            <div className="car-pos">
              <span className="acc">{`${pad2(cur + 1)} / ${pad2(n)}`}</span> · {curCert.cat === 5 ? 'Alura' : 'Viver de IA'}
            </div>
            <h3 ref={titleRef} aria-live="polite">
              {curCert.t}
            </h3>
            <div className="car-meta">
              {curCert.code} · {curCert.date} · <span className="acc">{fmtMin(curCert.min)}</span>
            </div>
          </div>
          <div className="car-ctrls">
            <button type="button" className="round-btn" title="Anterior" onClick={() => go(-1)}>
              ←
            </button>
            <button
              type="button"
              className="round-btn sm"
              title={playing ? 'Pausar' : 'Reproduzir'}
              onClick={() => setPlaying(p => !p)}
            >
              {playing ? '❚❚' : '▶'}
            </button>
            <button type="button" className="round-btn" title="Próximo" onClick={() => go(1)}>
              →
            </button>
            <button type="button" className="cta" onClick={openCur}>
              Ver certificado ⤢
            </button>
          </div>
        </div>
      </div>

      {lb >= 0 && (
        <Portal>
          <Lightbox
            cert={CERTS[lb]}
            pos={`${pad2(list.indexOf(CERTS[lb]) + 1)} / ${pad2(n)}`}
            index={lb}
            dir={live.current.lbDir}
            onPrev={() => stepCert(-1)}
            onNext={() => stepCert(1)}
            onClose={closeLb}
          />
        </Portal>
      )}
    </section>
  );
}

interface LightboxProps {
  cert: Cert;
  pos: string;
  index: number;
  dir: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

function Lightbox({ cert, pos, index, dir, onPrev, onNext, onClose }: LightboxProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const prev = useRef(-1);

  useLayoutEffect(() => {
    const p = prev.current;
    prev.current = index;
    const d = p < 0 ? 0 : (dir || 1) * 60;
    imgRef.current?.animate(
      [{ opacity: 0, transform: `translateX(${d}px) scale(${p < 0 ? 0.92 : 1})` }, { opacity: 1, transform: 'none' }],
      { duration: 550, easing: EASE },
    );
  }, [index]);

  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
  }, []);

  const swipe = useSwipe(d => (d > 0 ? onNext() : onPrev()));

  return (
    <div
      className="overlay lbox"
      data-close=""
      role="dialog"
      aria-modal="true"
      aria-label={`Certificado: ${cert.t}`}
      onClick={e => !swipe.wasSwiped() && (e.target as HTMLElement).hasAttribute('data-close') && onClose()}
    >
      <div className="lb-top">
        <span>
          CERTIFICADO <span className="acc">{pos}</span>
        </span>
        <button ref={closeBtn} type="button" className="ghost-btn lb-close" data-close="">
          <span className="kbd-only">ESC · </span>fechar ✕
        </button>
      </div>
      <div className="lb-mid" data-close="" {...swipe.handlers}>
        <button type="button" className="round-btn lb-nav" title="Anterior" onClick={onPrev}>
          ←
        </button>
        <div className="lb-img" data-close="">
          <img ref={imgRef} src={cert.img} alt={cert.t} draggable={false} />
        </div>
        <button type="button" className="round-btn lb-nav" title="Próximo" onClick={onNext}>
          →
        </button>
      </div>
      <div className="lb-bot">
        <div>
          <span className="lb-t">{cert.t}</span>
          <span className="lb-m">
            {cert.code} · {cert.date} · {fmtMin(cert.min)}
          </span>
        </div>
        <div className="lb-actions">
          <a href={cert.pdf} target="_blank" rel="noreferrer" className="btn-acc sm">
            Abrir PDF ↗
          </a>
          <a href={cert.val} target="_blank" rel="noreferrer" className="btn-line sm">
            Validar certificado ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default memo(Certificados);
