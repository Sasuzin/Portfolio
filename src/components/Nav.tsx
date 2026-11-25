import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Mode } from '../data/palettes';
import { useT, type L } from '../i18n';

const LINKS: [string, L][] = [
  ['#sobre', { pt: '[01] sobre', en: '[01] about' }],
  ['#projetos', { pt: '[02] projetos', en: '[02] projects' }],
  ['#github', { pt: '[03] github', en: '[03] github' }],
  ['#log', { pt: '[04] log', en: '[04] log' }],
  ['#stack', { pt: '[05] stack', en: '[05] stack' }],
  ['#certificados', { pt: '[06] certificados', en: '[06] certificates' }],
  ['#contato', { pt: '[07] contato', en: '[07] contact' }],
];

interface Props {
  mode: Mode;
  onToggleTheme: (e?: MouseEvent) => void;
}

export default function Nav({ mode, onToggleTheme }: Props) {
  const { t, lang, setLang } = useT();
  const clockRef = useRef<HTMLSpanElement>(null);
  const [menu, setMenu] = useState(false);

  // Relógio de São Paulo ao vivo
  useEffect(() => {
    const clk = () => {
      if (clockRef.current)
        clockRef.current.textContent = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    };
    clk();
    const id = setInterval(clk, 1000);
    return () => clearInterval(id);
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
      {t(label)}
    </a>
  ));

  return (
    <>
      <nav className="nav" aria-label={t({ pt: 'Principal', en: 'Main' })}>
        <a href="#boot" className="nav-logo">
          LFG<span>://</span>
          {t({ pt: 'portfólio', en: 'portfolio' })}
        </a>
        <div className="nav-links">{links}</div>
        <div className="nav-right">
          <span className="nav-clock">
            SP <span ref={clockRef} />
          </span>
          <div className="lang-switch" role="group" aria-label={t({ pt: 'Idioma', en: 'Language' })}>
            {(['pt', 'en'] as const).map(l => (
              <button
                key={l}
                type="button"
                lang={l === 'pt' ? 'pt-BR' : 'en'}
                aria-pressed={lang === l}
                className={lang === l ? 'on' : undefined}
                title={l === 'pt' ? 'Ver em português' : 'View in English'}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="pill-btn theme-btn"
            onClick={onToggleTheme}
            title={t({ pt: 'Alternar modo claro/escuro', en: 'Toggle light/dark mode' })}
          >
            <span className="ic">{light ? '☀' : '☾'}</span>
            <span className="lbl">{light ? t({ pt: 'claro', en: 'light' }) : t({ pt: 'escuro', en: 'dark' })}</span>
          </button>
          <button
            type="button"
            className="pill-btn menu-btn"
            onClick={() => setMenu(m => !m)}
            aria-expanded={menu}
            aria-controls="menu-panel"
            title={menu ? t({ pt: 'Fechar menu', en: 'Close menu' }) : t({ pt: 'Abrir menu', en: 'Open menu' })}
          >
            <span className="ic">{menu ? '✕' : '☰'}</span>
            <span className="lbl">{menu ? t({ pt: 'fechar', en: 'close' }) : 'menu'}</span>
          </button>
        </div>
      </nav>
      <div id="menu-panel" className={`menu-panel${menu ? ' open' : ''}`}>
        {links}
      </div>
    </>
  );
}
