import { memo, useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/fx';

const TAGLINE = 'desenvolvedor full-stack · agentes de IA · automação de processos';

function Hero() {
  const typeRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const caret = caretRef.current?.animate(
      [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.51 }, { opacity: 0 }],
      { duration: 1000, iterations: Infinity },
    );

    // Máquina de escrever: começa após 900ms, 28–68ms por caractere
    const el = typeRef.current;
    const tn = el && [...el.childNodes].find((n): n is Text => n.nodeType === 3);
    let timer = 0;
    if (tn) {
      let i = 0;
      tn.nodeValue = '';
      const step = () => {
        i++;
        tn.nodeValue = TAGLINE.slice(0, i);
        if (i < TAGLINE.length) timer = window.setTimeout(step, 28 + Math.random() * 40);
      };
      timer = window.setTimeout(step, 900);
    }
    return () => {
      caret?.cancel();
      clearTimeout(timer);
      if (tn) tn.nodeValue = TAGLINE;
    };
  }, []);

  return (
    <section id="boot" className="hero" aria-label="Início">
      <div className="hero-prompt">&gt; whoami</div>
      <h1>
        <div data-scramble="" data-dur="1200">
          Luis Felipe
        </div>
        <div data-scramble="" data-dur="1600" className="outline">
          Galvão Torrado
        </div>
      </h1>
      <div className="hero-type">
        <span className="gt">&gt;</span>
        <span ref={typeRef} aria-label={TAGLINE}>
          {TAGLINE}
        </span>
        <span ref={caretRef} className="caret" aria-hidden="true" />
      </div>
      <div className="badges">
        <span className="badge-ok">
          <i />
          ONLINE · DISPONÍVEL
        </span>
        <span className="badge-n">SÃO PAULO · BR</span>
        <span className="badge-n">REMOTO / HÍBRIDO</span>
      </div>
    </section>
  );
}

export default memo(Hero);
