import { memo } from 'react';
import SectionHead from './SectionHead';

const INFO: [string, string][] = [
  ['função', 'Desenvolvedor full-stack'],
  ['empresa', 'HKTC · importação China–Brasil'],
  ['foco', 'Agentes de IA · automação · segurança'],
  ['formação', 'TSI · Faculdade Senac (2023)'],
];

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
              {INFO.map(([k, v]) => (
                <div key={k} className="kv">
                  <b>{k}</b>
                  <span>{v}</span>
                </div>
              ))}
              <a href="#certificados" className="kv">
                <b>certificados</b>
                <span>26 · Viver de IA + Alura ↗</span>
              </a>
              <div className="kv">
                <b>idiomas</b>
                <span>PT nativo · EN avançado · ES intermediário</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Sobre);
