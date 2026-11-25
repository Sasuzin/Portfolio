import { memo } from 'react';
import { useT, type L } from '../i18n';
import SectionHead from './SectionHead';

const INFO: [L, L][] = [
  [{ pt: 'função', en: 'role' }, { pt: 'Desenvolvedor full-stack', en: 'Full-stack developer' }],
  [{ pt: 'empresa', en: 'company' }, { pt: 'HKTC · importação China–Brasil', en: 'HKTC · China–Brazil imports' }],
  [{ pt: 'foco', en: 'focus' }, { pt: 'Agentes de IA · automação · segurança', en: 'AI agents · automation · security' }],
  [{ pt: 'formação', en: 'education' }, { pt: 'TSI · Faculdade Senac (2023)', en: 'Internet Systems Technology · Senac (2023)' }],
];

function Sobre() {
  const { t } = useT();
  return (
    <section id="sobre" className="sec sobre" aria-label={t({ pt: 'Sobre', en: 'About' })}>
      <SectionHead n="01">{t({ pt: 'SOBRE', en: 'ABOUT' })}</SectionHead>
      <div className="sobre-grid">
        <h2 data-reveal="">
          {t({ pt: 'Quatro anos construindo software de ponta a ponta. Hoje, ', en: 'Four years building software end to end. Today, ' })}
          <span>{t({ pt: 'mais de 20 sistemas', en: 'more than 20 systems' })}</span>
          {t({ pt: ' rodando em produção com IA, automação e segurança.', en: ' running in production with AI, automation and security.' })}
        </h2>
        <div className="sobre-side">
          <div data-reveal="" data-hover="" className="avatar">
            <div className="win-bar">
              <span>avatar.jpg</span>
              <span className="rec">● REC</span>
            </div>
            <div className="avatar-img">
              <img src="assets/luis.jpg" alt="Luis Felipe Galvão" width={900} height={1200} />
              <div className="avatar-id">ID · LFG-001</div>
            </div>
          </div>
          <div data-reveal="" data-delay="120" className="panel sysinfo">
            <div className="win-bar">sys.info</div>
            <div className="sysinfo-body">
              {INFO.map(([k, v]) => (
                <div key={k.pt} className="kv">
                  <b>{t(k)}</b>
                  <span>{t(v)}</span>
                </div>
              ))}
              <a href="#certificados" className="kv">
                <b>{t({ pt: 'certificados', en: 'certificates' })}</b>
                <span>26 · Viver de IA + Alura ↗</span>
              </a>
              <div className="kv">
                <b>{t({ pt: 'idiomas', en: 'languages' })}</b>
                <span>{t({ pt: 'PT nativo · EN avançado · ES intermediário', en: 'PT native · EN advanced · ES intermediate' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Sobre);
