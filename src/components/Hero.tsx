import { memo, useLayoutEffect, useRef } from 'react';
import { useT } from '../i18n';
import { prefersReducedMotion } from '../lib/fx';

const TAGLINE = {
  pt: 'desenvolvedor full-stack · agentes de IA · automação de processos',
  en: 'full-stack developer · AI agents · process automation',
};

function Hero() {
  const { t } = useT();
  const tagline = t(TAGLINE);
  const typeRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);
  const first = useRef(true);

  // Máquina de escrever na primeira carga: começa após 900ms, 28–68ms por caractere
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const caret = caretRef.current?.animate(
      [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.51 }, { opacity: 0 }],
      { duration: 1000, iterations: Infinity },
    );
    const el = typeRef.current;
    const tn = el && [...el.childNodes].find((n): n is Text => n.nodeType === 3);
    const full = tagline;
    if (tn) {
      let i = 0;
      tn.nodeValue = '';
      const step = () => {
        i++;
        tn.nodeValue = full.slice(0, i);
        if (i < full.length) timer.current = window.setTimeout(step, 28 + Math.random() * 40);
      };
      timer.current = window.setTimeout(step, 900);
    }
    return () => {
      caret?.cancel();
      clearTimeout(timer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Troca de idioma: interrompe a digitação e mostra o texto completo
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    clearTimeout(timer.current);
    const tn = typeRef.current && [...typeRef.current.childNodes].find((n): n is Text => n.nodeType === 3);
    if (tn) tn.nodeValue = tagline;
  }, [tagline]);

  return (
    <section id="boot" className="hero" aria-label={t({ pt: 'Início', en: 'Home' })}>
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
        <span ref={typeRef} aria-label={tagline}>
          {tagline}
        </span>
        <span ref={caretRef} className="caret" aria-hidden="true" />
      </div>
      <div className="badges">
        <span className="badge-ok">
          <i />
          {t({ pt: 'ONLINE · DISPONÍVEL', en: 'ONLINE · AVAILABLE' })}
        </span>
        <span className="badge-n">{t({ pt: 'SÃO PAULO · BR', en: 'SÃO PAULO · BRAZIL' })}</span>
        <span className="badge-n">{t({ pt: 'REMOTO / HÍBRIDO', en: 'REMOTE / HYBRID' })}</span>
      </div>
    </section>
  );
}

export default memo(Hero);
