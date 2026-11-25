import type { ReactNode } from 'react';

/** Cabeçalho padrão de seção: [NN] ——— RÓTULO */
export default function SectionHead({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="sec-head">
      <span className="n">[{n}]</span>
      <span className="ln" />
      {typeof children === 'string' ? <span className="lb">{children}</span> : children}
    </div>
  );
}
