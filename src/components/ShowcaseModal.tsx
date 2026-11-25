import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useT } from '../i18n';
import { EASE } from '../lib/fx';
import { useSwipe } from '../lib/useSwipe';
import ZoomViewer from './ZoomViewer';

export interface ShowcaseImage {
  src: string;
  /** miniatura (opcional; senão usa a própria imagem) */
  thumb?: string;
  /** legenda da tela: nome e o que ela mostra */
  caption?: { t: string; d: string };
}

interface Props {
  meta: string;
  kind: string;
  title: string;
  description: string;
  feats: string[];
  stack: string[];
  images: ShowcaseImage[];
  actions?: ReactNode;
  note?: ReactNode;
  onClose: () => void;
}

/** Modal com galeria + detalhes, usado pelos projetos do GitHub e pelos sistemas de trabalho. */
export default function ShowcaseModal({ meta, kind, title, description, feats, stack, images, actions, note, onClose }: Props) {
  const { t } = useT();
  const [img, setImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const zoomRef = useRef(false);
  zoomRef.current = zoom;
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = images.length;
  const cur = images[img] ?? images[0];

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
  }, [img]);

  const swipe = useSwipe(d => setImg(i => (i + d + n) % n));

  useEffect(() => {
    const onK = (e: KeyboardEvent) => {
      if (zoomRef.current) return; // o visualizador com zoom cuida do teclado
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') setImg(i => (i + 1) % n);
      else if (e.key === 'ArrowLeft') setImg(i => (i - 1 + n) % n);
    };
    addEventListener('keydown', onK);
    return () => removeEventListener('keydown', onK);
  }, [n, onClose]);

  return (
    <div
      className="overlay pm-overlay"
      data-pclose=""
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={e => !swipe.wasSwiped() && (e.target as HTMLElement).hasAttribute('data-pclose') && onClose()}
    >
      <div ref={panelRef} className="pm">
        <button type="button" className="pm-x" data-pclose="" aria-label={t({ pt: 'Fechar', en: 'Close' })}>
          ✕
        </button>
        <div className="pm-media">
          <div className="pm-stage" {...swipe.handlers}>
            {cur && (
              <img
                ref={imgRef}
                src={cur.src}
                alt={cur.caption ? `${title}: ${cur.caption.t}` : title}
                draggable={false}
                onClick={() => !swipe.wasSwiped() && setZoom(true)}
              />
            )}
            {cur && (
              <button type="button" className="pm-zoom" onPointerDown={e => e.stopPropagation()} onClick={() => setZoom(true)}>
                <span aria-hidden="true">⤢</span> {t({ pt: 'ampliar', en: 'zoom' })}
              </button>
            )}
          </div>
          {cur?.caption && (
            <div className="pm-cap" aria-live="polite">
              <b>
                <span className="acc">{String(img + 1).padStart(2, '0')}</span> · {cur.caption.t}
              </b>
              <span>{cur.caption.d}</span>
            </div>
          )}
          {n > 1 && (
            <div className="pm-thumbs">
              {images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  className={`pm-thumb${i === img ? ' on' : ''}`}
                  onClick={() => setImg(i)}
                  aria-label={im.caption ? im.caption.t : `${t({ pt: 'Imagem', en: 'Image' })} ${i + 1}`}
                  title={im.caption?.t}
                >
                  <img src={im.thumb || im.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pm-info">
          <div className="pm-top">
            <span>{meta}</span>
            <button ref={closeBtn} type="button" className="ghost-btn" data-pclose="">
              <span className="kbd-only">ESC </span>✕
            </button>
          </div>
          <div className="pm-title">
            <span className="badge-acc">{kind}</span>
            <h3>{title}</h3>
          </div>
          <p className="pm-d">{description}</p>
          <ul className="pm-feats">
            {feats.map(f => (
              <li key={f}>
                <span>›</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="chips-sm">
            {stack.map(s => (
              <span key={s} className="chip-sm">
                {s}
              </span>
            ))}
          </div>
          {actions && <div className="pm-actions">{actions}</div>}
          {note && <p className="pm-note">{note}</p>}
        </div>
      </div>
      {zoom && (
        <ZoomViewer
          images={images.map(im => ({ src: im.src, alt: im.caption ? `${title}: ${im.caption.t}` : title, caption: im.caption }))}
          index={img}
          onIndex={setImg}
          onClose={() => setZoom(false)}
        />
      )}
    </div>
  );
}
