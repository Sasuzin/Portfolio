import { memo } from 'react';
import SectionHead from './SectionHead';

function Sobre() {
  return (
    <section id="sobre" className="sec sobre" aria-label="Sobre">
      <SectionHead n="01">SOBRE</SectionHead>
      <div className="sobre-grid">
        <h2 data-reveal="">
          Quatro anos construindo software de ponta a ponta. Hoje, <span>mais de 20 sistemas</span> rodando em produção
          com IA, automação e segurança.
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
              <div><b>função</b>{'      Desenvolvedor full-stack'}</div>
              <div><b>empresa</b>{'     HKTC · importação China–Brasil'}</div>
              <div><b>foco</b>{'        Agentes de IA · automação · segurança'}</div>
              <div><b>formação</b>{'    TSI · Faculdade Senac (2023)'}</div>
              <a href="#certificados"><b>certificados</b>{' 26 · Viver de IA + Alura ↗'}</a>
              <div><b>idiomas</b>{'     PT nativo · EN avançado · ES intermediário'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Sobre);
