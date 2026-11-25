import { memo } from 'react';
import { fmtMonth, useT, type L } from '../i18n';
import SectionHead from './SectionHead';

interface Job {
  hash: string;
  dot: 'head' | 'on' | 'dim';
  from?: string;
  to?: string;
  role: L;
  org: string;
  d: L;
}

const JOBS: Job[] = [
  {
    hash: '7f3a9c2', dot: 'head', to: '2026-10',
    role: { pt: 'Analista de TI', en: 'IT Analyst' }, org: 'HKTC And Business Limited',
    d: {
      pt: 'Agentes de IA por setor, revisor de estimativas de importação, CRM pelo WhatsApp, kit versionado para agentes e segurança padronizada em todos os sistemas. Mentor na Academia interna.',
      en: 'Department-level AI agents, an import estimate reviewer, a CRM over WhatsApp, a versioned toolkit for agents and standardized security across every system. Mentor at the internal Academy.',
    },
  },
  {
    hash: '2b81d04', dot: 'on', from: '2025-12', to: '2026-10',
    role: { pt: 'Assistente de TI', en: 'IT Assistant' }, org: 'HKTC And Business Limited',
    d: {
      pt: 'Full-stack em mais de 20 sistemas web: Janus, CRM comercial, Torre de Controle, SGI ISO 9001, RH, Compras, Financeiro, Logística e Comex.',
      en: 'Full-stack work on more than 20 web systems: Janus, the sales CRM, the Control Tower, the ISO 9001 quality system, HR, Purchasing, Finance, Logistics and Foreign Trade.',
    },
  },
  {
    hash: 'e94c5a1', dot: 'dim', from: '2024-04', to: '2025-12',
    role: { pt: 'Analista de Implantação', en: 'Implementation Analyst' }, org: 'Tecla T',
    d: {
      pt: 'Implantação de sistemas hospitalares (PEP, SIGA, SIGO e BioCC), treinamento de equipes médicas e suporte.',
      en: 'Rollout of hospital systems (electronic health records, SIGA, SIGO and BioCC), training for medical teams and support.',
    },
  },
  {
    hash: '0c1f7b8', dot: 'dim', from: '2022-09', to: '2023-12',
    role: { pt: 'Desenvolvedor Full-stack', en: 'Full-stack Developer' }, org: 'Serget Mobilidade Viária',
    d: {
      pt: 'C#, .NET, React, Angular e Vue.js; relatórios em SQL Server e Crystal Reports.',
      en: 'C#, .NET, React, Angular and Vue.js; reports in SQL Server and Crystal Reports.',
    },
  },
];

function Trajetoria() {
  const { t, lang } = useT();
  return (
    <section id="log" className="sec log" aria-label={t({ pt: 'Trajetória', en: 'Career' })}>
      <SectionHead n="04">{t({ pt: 'GIT LOG --CARREIRA', en: 'GIT LOG --CAREER' })}</SectionHead>
      <h2 data-scramble="" className="h2-big">
        {t({ pt: 'Trajetória', en: 'Career' })}
      </h2>
      <div className="tl">
        <span className="tl-line" />

        {JOBS.map(j => (
          <div key={j.hash} data-reveal="left" className="tl-item">
            <span className={`tl-dot ${j.dot}`} />
            <div className="tl-meta">
              <span className="c">commit {j.hash}</span>
              {j.dot === 'head' && <span className="tl-head-badge">{t({ pt: 'HEAD → atual', en: 'HEAD → current' })}</span>}
              <span className="d">{j.from ? `${fmtMonth(j.from, lang)} — ${fmtMonth(j.to!, lang)}` : fmtMonth(j.to!, lang)}</span>
            </div>
            <h3>
              {t(j.role)} <span>· {j.org}</span>
            </h3>
            <p>{t(j.d)}</p>
          </div>
        ))}

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot dim sq" />
          <div className="tl-init">init · {fmtMonth('2023-12', lang)}</div>
          <h3>
            {t({ pt: 'Tecnologia em Sistemas para Internet', en: 'Internet Systems Technology (associate degree)' })} <span>· Faculdade Senac</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default memo(Trajetoria);
