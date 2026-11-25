import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { REPOS } from '../data/repos';
import { EASE, lockScroll, unlockScroll } from '../lib/fx';
import Portal from './Portal';
import SectionHead from './SectionHead';

function GitHub() {
  const [pm, setPm] = useState(-1);
  const [pimg, setPimg] = useState(0);

  const open = (i: number) => {
    lockScroll();
    setPimg(0);
    setPm(i);
  };
  const close = useCallback(() => {
    unlockScroll();
    setPm(-1);
  }, []);

  return (
    <section id="github" className="sec" aria-label="Projetos abertos no GitHub">
      <SectionHead n="03">
        <a href="https://github.com/Sasuzin" target="_blank" rel="noreferrer" className="lb">
          GITHUB.COM/SASUZIN ↗
        </a>
      </SectionHead>
      <div className="gh-top">
        <h2 data-scramble="" className="h2-big">
          Projetos abertos
        </h2>
        <p>Projetos pessoais e acadêmicos publicados no GitHub — clique para ver detalhes, telas e o link do site.</p>
      </div>
      <div className="gh-grid">
        {REPOS.map((r, i) => (
          <button key={r.repo} type="button" className="gh-card" onClick={() => open(i)}>
            <div className="gh-cover" style={{ background: r.bg }}>
              <img src={r.cover} alt={r.t} loading="lazy" style={{ objectFit: r.fit, padding: r.pad }} />
              <span className="gh-kind">{r.kind}</span>
            </div>
            <div className="gh-body">
              <div className="gh-meta">
                <span>{r.repo}</span>
                <span>{r.year}</span>
              </div>
              <span className="gh-t">{r.t}</span>
              <span className="gh-short">{r.short}</span>
              <div className="gh-foot">
                <span className="gh-stack">{r.stackLine}</span>
                <span className="gh-more">Ver detalhes →</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {pm >= 0 && (
        <Portal>
          <ProjectModal index={pm} img={pimg} setImg={setPimg} onClose={close} />
        </Portal>
      )}
    </section>
  );
}

interface ModalProps {
  index: number;
  img: number;
  setImg: (fn: (i: number) => number) => void;
  onClose: () => void;
}

function ProjectModal({ index, img, setImg, onClose }: ModalProps) {
  const r = REPOS[index];
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // Entrada do painel
  useLayoutEffect(() => {
    panelRef.current?.animate(
      [{ opacity: 0, transform: 'translateY(40px) scale(.98)' }, { opacity: 1, transform: 'none' }],
      { duration: 650, easing: EASE },
    );
    closeBtn.current?.focus({ preventScroll: true });
  }, []);

  // Troca de imagem
  useLayoutEffect(() => {
    imgRef.current?.animate([{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], {
      duration: 450,
      easing: EASE,
    });
  }, [index, img]);

  useEffect(() => {
    const n = r.imgs.length;
    const onK = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') setImg(i => (i + 1) % n);
      else if (e.key === 'ArrowLeft') setImg(i => (i - 1 + n) % n);
    };
    addEventListener('keydown', onK);
    return () => removeEventListener('keydown', onK);
  }, [r, onClose, setImg]);

  return (
    <div
      className="overlay pm-overlay"
      data-pclose=""
      role="dialog"
      aria-modal="true"
      aria-label={r.t}
      onClick={e => (e.target as HTMLElement).hasAttribute('data-pclose') && onClose()}
    >
      <div ref={panelRef} className="pm">
        <div className="pm-media">
          <div className="pm-stage">
            <img ref={imgRef} src={r.imgs[img] || r.imgs[0]} alt={r.t} />
          </div>
          <div className="pm-thumbs">
            {r.imgs.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`pm-thumb${i === img ? ' on' : ''}`}
                onClick={() => setImg(() => i)}
                aria-label={`Imagem ${i + 1}`}
              >
                <img src={src} alt="Miniatura" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <div className="pm-info">
          <div className="pm-top">
            <span>
              {r.repo} · {r.year}
            </span>
            <button ref={closeBtn} type="button" className="ghost-btn" data-pclose="">
              ESC ✕
            </button>
          </div>
          <div className="pm-title">
            <span className="badge-acc">{r.kind}</span>
            <h3>{r.t}</h3>
          </div>
          <p className="pm-d">{r.d}</p>
          <ul className="pm-feats">
            {r.feats.map(f => (
              <li key={f}>
                <span>›</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="chips-sm">
            {r.stack.map(s => (
              <span key={s} className="chip-sm">
                {s}
              </span>
            ))}
          </div>
          <div className="pm-actions">
            <a href={r.live} target="_blank" rel="noreferrer" className="btn-acc">
              {r.liveLabel}
            </a>
            <a href={r.url} target="_blank" rel="noreferrer" className="btn-line">
              Repositório no GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(GitHub);
