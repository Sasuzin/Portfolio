import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';
/** Texto nos dois idiomas. */
export type L = { pt: string; en: string };
/** Texto bilíngue ou igual nos dois idiomas. */
export type Txt = L | string;

const STORAGE_KEY = 'lfg-lang';

/** Ordem: ?lang= na URL → escolha salva → idioma do navegador. */
function initialLang(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'pt') return q;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {
    /* sem storage */
  }
  return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const META: Record<Lang, { title: string; desc: string; html: string }> = {
  pt: {
    title: 'Luis Felipe Galvão Torrado · Portfólio',
    desc: 'Desenvolvedor full-stack · agentes de IA · automação de processos. Portfólio de Luis Felipe Galvão Torrado.',
    html: 'pt-BR',
  },
  en: {
    title: 'Luis Felipe Galvão Torrado · Portfolio',
    desc: 'Full-stack developer · AI agents · process automation. Portfolio of Luis Felipe Galvão Torrado.',
    html: 'en',
  },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}
const LangCtx = createContext<Ctx>({ lang: 'pt', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      // mantém a URL coerente se ela tinha ?lang=
      const u = new URL(location.href);
      if (u.searchParams.has('lang')) {
        u.searchParams.set('lang', l);
        history.replaceState(null, '', u);
      }
    } catch {
      /* ignora */
    }
  }, []);

  // <html lang>, título e descrição acompanham o idioma
  useEffect(() => {
    const m = META[lang];
    document.documentElement.lang = m.html;
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.desc);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const tr = (x: Txt, lang: Lang) => (typeof x === 'string' ? x : x[lang]);

/** `t(texto)` devolve o texto no idioma atual. */
export function useT() {
  const { lang, setLang } = useContext(LangCtx);
  const t = useCallback((x: Txt) => tr(x, lang), [lang]);
  return { lang, setLang, t };
}

const MONTHS: Record<Lang, string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

/** '2026-11-19' → '19 nov 2026' | 'Nov 19, 2026' */
export function fmtDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split('-').map(Number);
  const mon = MONTHS[lang][m - 1];
  return lang === 'pt' ? `${String(d).padStart(2, '0')} ${mon} ${y}` : `${mon} ${d}, ${y}`;
}

/** '2025-12' → 'dez/2025' | 'Dec 2025' */
export function fmtMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split('-').map(Number);
  const mon = MONTHS[lang][m - 1];
  return lang === 'pt' ? `${mon}/${y}` : `${mon} ${y}`;
}
