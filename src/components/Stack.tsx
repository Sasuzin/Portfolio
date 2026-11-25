import { memo, useLayoutEffect, useRef, useState } from 'react';
import { STACK } from '../data/stack';
import { EASE, centerTab, prefersReducedMotion } from '../lib/fx';
import SectionHead from './SectionHead';

function Stack() {
  const [tab, setTab] = useState(0);
  const chipsRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Chips entram em cascata ao trocar de aba
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!chipsRef.current || prefersReducedMotion()) return;
    [...chipsRef.current.children].forEach((c, i) =>
      c.animate([{ opacity: 0, transform: 'translateY(16px) scale(.97)' }, { opacity: 1, transform: 'none' }], {
        duration: 500,
        delay: i * 35,
        easing: EASE,
        fill: 'backwards',
      }),
    );
  }, [tab]);

  return (
    <section id="stack" className="sec stack" aria-label="Stack">
      <SectionHead n="05">FILTRAR POR ÁREA</SectionHead>
      <h2 data-scramble="" className="h2-big">
        Stack
      </h2>
      <div className="tabs" role="tablist">
        {STACK.map(([label], i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`tab${tab === i ? ' on' : ''}`}
            onClick={e => {
              setTab(i);
              centerTab(e.currentTarget);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div ref={chipsRef} className="chips" role="tabpanel">
        {STACK[tab][1].map(([n, tag]) => (
          <div key={`${tab}-${n}`} className="chip">
            {n}
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default memo(Stack);
