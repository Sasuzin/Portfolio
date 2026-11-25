import { memo, useCallback, useState } from 'react';
import { PROJ } from '../data/projects';
import { useT } from '../i18n';
import { lockScroll, unlockScroll } from '../lib/fx';
import Portal from './Portal';
import SectionHead from './SectionHead';
import ShowcaseModal from './ShowcaseModal';

const shot = (img: string, size: '' | '-sm' = '') => `assets/work/${img}${size}.jpg`;

function Projetos() {
  const { t } = useT();
  const [open, setOpen] = useState(0);
  const [gallery, setGallery] = useState(-1);

  const openGallery = (i: number) => {
    lockScroll();
    setGallery(i);
  };
  const closeGallery = useCallback(() => {
    unlockScroll();
    setGallery(-1);
  }, []);

  const g = PROJ[gallery];
  const screensLabel = (n: number) =>
    n > 1 ? t({ pt: `Ver ${n} telas`, en: `View ${n} screens` }) : t({ pt: 'Ver tela', en: 'View screen' });

  return (
    <section id="projetos" className="sec projetos" aria-label={t({ pt: 'Projetos', en: 'Projects' })}>
      <SectionHead n="02">{t({ pt: `${String(PROJ.length).padStart(2, '0')} REGISTROS`, en: `${String(PROJ.length).padStart(2, '0')} RECORDS` })}</SectionHead>
      <h2 data-scramble="" className="h2-big">
        {t({ pt: 'Projetos', en: 'Projects' })}
      </h2>
      <div data-reveal="" className="panel">
        <div className="prow-grid ptable-head">
          <span>ID</span>
          <span>{t({ pt: 'Sistema', en: 'System' })}</span>
          <span>{t({ pt: 'Área', en: 'Area' })}</span>
          <span>Status</span>
        </div>
        {PROJ.map((p, i) => {
          const isOpen = open === i;
          const cover = p.screens[0];
          return (
            <div key={p.id} className="prow">
              <button
                type="button"
                className={`prow-grid prow-btn${isOpen ? ' open' : ''}`}
                onClick={() => setOpen(o => (o === i ? -1 : i))}
                aria-expanded={isOpen}
                aria-controls={`proj-${p.id}`}
              >
                <span className="prow-id">{p.id}</span>
                <span className="prow-t">{t(p.t)}</span>
                <span className="prow-a">{t(p.a)}</span>
                <span className="badge-prod">{t({ pt: 'EM PRODUÇÃO', en: 'IN PRODUCTION' })}</span>
              </button>
              <div id={`proj-${p.id}`} className={`prow-exp${isOpen ? ' open' : ''}`} inert={!isOpen}>
                <div>
                  <div className="prow-body">
                    <span />
                    <div className={`prow-detail${cover ? '' : ' solo'}`}>
                      <div className="prow-text">
                        <p>{t(p.d)}</p>
                        <ul className="prow-feats">
                          {p.feats.map(f => (
                            <li key={f.pt}>
                              <span>›</span>
                              <span>{t(f)}</span>
                            </li>
                          ))}
                        </ul>
                        <span className="prow-stack">stack: {t(p.s)}</span>
                      </div>
                      {cover && (
                        <button type="button" className="prow-shot" onClick={() => openGallery(i)} data-hover="">
                          <img src={shot(cover.img, '-sm')} alt={`${t(p.t)}: ${t(cover.t)}`} loading="lazy" />
                          <span className="prow-shot-cta">
                            <span>{screensLabel(p.screens.length)}</span>⤢
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {g && (
        <Portal>
          <ShowcaseModal
            key={g.id}
            meta={`${g.id} · ${t(g.a)}`}
            kind={t({ pt: 'Sistema interno · HKTC', en: 'Internal system · HKTC' })}
            title={t(g.t)}
            description={t(g.d)}
            feats={g.feats.map(t)}
            stack={t(g.s).split(' · ')}
            images={g.screens.map(s => ({ src: shot(s.img), thumb: shot(s.img, '-sm'), caption: { t: t(s.t), d: t(s.d) } }))}
            note={t({
              pt: 'Sistema interno: nomes, clientes, valores, contagens e datas aparecem borrados nos prints.',
              en: 'Internal system: names, clients, amounts, counts and dates are blurred in the screenshots.',
            })}
            onClose={closeGallery}
          />
        </Portal>
      )}
    </section>
  );
}

export default memo(Projetos);
