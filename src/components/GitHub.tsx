import { memo, useCallback, useState } from 'react';
import { REPOS } from '../data/repos';
import { useT } from '../i18n';
import { lockScroll, unlockScroll } from '../lib/fx';
import Portal from './Portal';
import SectionHead from './SectionHead';
import ShowcaseModal from './ShowcaseModal';

function GitHub() {
  const { t } = useT();
  const [pm, setPm] = useState(-1);

  const open = (i: number) => {
    lockScroll();
    setPm(i);
  };
  const close = useCallback(() => {
    unlockScroll();
    setPm(-1);
  }, []);

  const r = REPOS[pm];

  return (
    <section id="github" className="sec" aria-label={t({ pt: 'Projetos abertos no GitHub', en: 'Open projects on GitHub' })}>
      <SectionHead n="03">
        <a href="https://github.com/Sasuzin" target="_blank" rel="noreferrer" className="lb">
          GITHUB.COM/SASUZIN ↗
        </a>
      </SectionHead>
      <div className="gh-top">
        <h2 data-scramble="" className="h2-big">
          {t({ pt: 'Projetos abertos', en: 'Open projects' })}
        </h2>
        <p>
          {t({
            pt: 'Projetos pessoais e acadêmicos publicados no GitHub — clique para ver detalhes, telas e o link do site.',
            en: 'Personal and academic projects published on GitHub — click to see details, screens and the live link.',
          })}
        </p>
      </div>
      <div className="gh-grid">
        {REPOS.map((repo, i) => (
          <button key={repo.repo} type="button" className="gh-card" onClick={() => open(i)}>
            <div className="gh-cover" style={{ background: repo.bg }}>
              <img src={repo.cover} alt={t(repo.t)} loading="lazy" style={{ objectFit: repo.fit, padding: repo.pad }} />
              <span className="gh-kind">{t(repo.kind)}</span>
            </div>
            <div className="gh-body">
              <div className="gh-meta">
                <span>{repo.repo}</span>
                <span>{t(repo.year)}</span>
              </div>
              <span className="gh-t">{t(repo.t)}</span>
              <span className="gh-short">{t(repo.short)}</span>
              <div className="gh-foot">
                <span className="gh-stack">{repo.stack.slice(0, 3).map(t).join(' · ')}</span>
                <span className="gh-more">{t({ pt: 'Ver detalhes →', en: 'View details →' })}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {r && (
        <Portal>
          <ShowcaseModal
            key={r.repo}
            meta={`${r.repo} · ${t(r.year)}`}
            kind={t(r.kind)}
            title={t(r.t)}
            description={t(r.d)}
            feats={r.feats.map(t)}
            stack={r.stack.map(t)}
            images={r.imgs.map(src => ({ src }))}
            onClose={close}
            actions={
              r.live && r.liveLabel ? (
                <>
                  <a href={r.live} target="_blank" rel="noreferrer" className="btn-acc">
                    {t(r.liveLabel)}
                  </a>
                  <a href={r.url} target="_blank" rel="noreferrer" className="btn-line">
                    {t({ pt: 'Repositório no GitHub ↗', en: 'GitHub repository ↗' })}
                  </a>
                </>
              ) : (
                <a href={r.url} target="_blank" rel="noreferrer" className="btn-acc">
                  {t({ pt: 'Ver código no GitHub ↗', en: 'View code on GitHub ↗' })}
                </a>
              )
            }
          />
        </Portal>
      )}
    </section>
  );
}

export default memo(GitHub);
