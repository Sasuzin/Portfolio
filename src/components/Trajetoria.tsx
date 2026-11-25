import { memo } from 'react';
import SectionHead from './SectionHead';

function Trajetoria() {
  return (
    <section id="log" className="sec log" aria-label="Trajetória">
      <SectionHead n="04">GIT LOG --CARREIRA</SectionHead>
      <h2 data-scramble="" className="h2-big">
        Trajetória
      </h2>
      <div className="tl">
        <span className="tl-line" />

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot head" />
          <div className="tl-meta">
            <span className="c">commit 7f3a9c2</span>
            <span className="tl-head-badge">HEAD → atual</span>
            <span className="d">out/2026</span>
          </div>
          <h3>
            Analista de TI <span>· HKTC And Business Limited</span>
          </h3>
          <p>
            Agentes de IA por setor, revisor de estimativas de importação, CRM pelo WhatsApp, kit versionado para agentes
            e segurança padronizada em todos os sistemas. Mentor na Academia interna.
          </p>
        </div>

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot on" />
          <div className="tl-meta">
            <span className="c">commit 2b81d04</span>
            <span className="d">dez/2025 — out/2026</span>
          </div>
          <h3>
            Assistente de TI <span>· HKTC And Business Limited</span>
          </h3>
          <p>
            Full-stack em mais de 20 sistemas web: Janus, CRM comercial, Torre de Controle, SGI ISO 9001, RH, Compras,
            Financeiro, Logística e Comex.
          </p>
        </div>

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot dim" />
          <div className="tl-meta">
            <span className="c">commit e94c5a1</span>
            <span className="d">abr/2024 — dez/2025</span>
          </div>
          <h3>
            Analista de Implantação <span>· Tecla T</span>
          </h3>
          <p>Implantação de sistemas hospitalares (PEP, SIGA, SIGO e BioCC), treinamento de equipes médicas e suporte.</p>
        </div>

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot dim" />
          <div className="tl-meta">
            <span className="c">commit 0c1f7b8</span>
            <span className="d">set/2022 — dez/2023</span>
          </div>
          <h3>
            Desenvolvedor Full-stack <span>· Serget Mobilidade Viária</span>
          </h3>
          <p>C#, .NET, React, Angular e Vue.js; relatórios em SQL Server e Crystal Reports.</p>
        </div>

        <div data-reveal="left" className="tl-item">
          <span className="tl-dot dim sq" />
          <div className="tl-init">init · dez/2023</div>
          <h3>
            Tecnologia em Sistemas para Internet <span>· Faculdade Senac</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default memo(Trajetoria);
