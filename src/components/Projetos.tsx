import { memo, useState } from 'react';
import { PROJ } from '../data/projects';
import SectionHead from './SectionHead';

function Projetos() {
  const [open, setOpen] = useState(0);

  return (
    <section id="projetos" className="sec projetos" aria-label="Projetos">
      <SectionHead n="02">{`${String(PROJ.length).padStart(2, '0')} REGISTROS`}</SectionHead>
      <h2 data-scramble="" className="h2-big">
        Projetos
      </h2>
      <div data-reveal="" className="panel">
        <div className="prow-grid ptable-head">
          <span>ID</span>
          <span>Sistema</span>
          <span>Área</span>
          <span>Status</span>
        </div>
        {PROJ.map((p, i) => {
          const isOpen = open === i;
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
                <span className="prow-t">{p.t}</span>
                <span className="prow-a">{p.a}</span>
                <span className="badge-prod">EM PRODUÇÃO</span>
              </button>
              <div id={`proj-${p.id}`} className={`prow-exp${isOpen ? ' open' : ''}`} inert={!isOpen}>
                <div>
                  <div className="prow-body">
                    <span />
                    <div>
                      <p>{p.d}</p>
                      <span className="prow-stack">stack: {p.s}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default memo(Projetos);
