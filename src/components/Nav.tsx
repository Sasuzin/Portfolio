import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Mode } from '../data/palettes';

const LINKS = [
  ['#sobre', '[01] sobre'],
  ['#projetos', '[02] projetos'],
  ['#github', '[03] github'],
  ['#log', '[04] log'],
  ['#stack', '[05] stack'],
  ['#certificados', '[06] certificados'],
  ['#contato', '[07] contato'],
] as const;

interface Props {
  mode: Mode;
  onToggleTheme: (e?: MouseEvent) => void;
}

export default function Nav({ mode, onToggleTheme }: Props) {
  const clockRef = useRef<HTMLSpanElement>(null);
  const [menu, setMenu] = useState(false);

  // Relógio de São Paulo ao vivo
  useEffect(() => {
    const clk = () => {
      if (clockRef.current)
        clockRef.current.textContent = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    };
    clk();
    const t = setInterval(clk, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onK = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    const onR = () => innerWidth >= 900 && setMenu(false);
    addEventListener('keydown', onK);
    addEventListener('resize', onR);
    return () => {
      removeEventListener('keydown', onK);
      removeEventListener('resize', onR);
    };
  }, [menu]);

  const light = mode === 'claro';
  const links = LINKS.map(([href, label]) => (
    <a key={href} href={href} className={href === '#certificados' ? 'hl' : undefined} onClick={() => setMenu(false)}>
      {label}
    </a>
  ));

  return (
    <>
      <nav className="nav" aria-label="Principal">
        <a href="#boot" className="nav-logo">
          LFG<span>://</span>portfólio
        </a>
        <div className="nav-links">{links}</div>
        <div className="nav-right">
          <span className="nav-clock">
            SP <span ref={clockRef} />
          </span>
          <button type="button" className="pill-btn" onClick={onToggleTheme} title="Alternar modo claro/escuro">
            <span className="ic">{light ? '☀' : '☾'}</span>
            {light ? 'claro' : 'escuro'}
          </button>
          <button
            type="button"
            className="pill-btn menu-btn"
            onClick={() => setMenu(m => !m)}
            aria-expanded={menu}
            aria-controls="menu-panel"
            title={menu ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className="ic">{menu ? '✕' : '☰'}</span>
            <span className="lbl">{menu ? 'fechar' : 'menu'}</span>
          </button>
        </div>
      </nav>
      <div id="menu-panel" className={`menu-panel${menu ? ' open' : ''}`}>
        {links}
      </div>
    </>
  );
}
