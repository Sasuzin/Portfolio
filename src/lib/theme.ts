import { AZUL, THEMES, type Mode } from '../data/palettes';

/** O site sempre abre no modo escuro; o botão da nav troca o tema durante a visita. */
export const DEFAULT_MODE: Mode = 'escuro';

/** Cor e modo que a cena 3D deve usar para o tema atual. */
export function sceneColors(mode: Mode) {
  const light = mode === 'claro';
  return { color: light ? AZUL.deep : AZUL.acc, light };
}

/** Aplica o tema como variáveis CSS no <html> (igual ao applyPalette/applyTheme da referência). */
export function applyTheme(mode: Mode) {
  const p = AZUL;
  const light = mode === 'claro';
  const s = document.documentElement.style;

  s.setProperty('--acc', light ? p.deep : p.acc);
  s.setProperty('--deep', p.deep);
  s.setProperty('--onacc', light ? '#FFFFFF' : p.onAcc);
  s.setProperty('--soft', p.soft);
  s.setProperty('--bg', light ? p.light : p.dark);
  s.setProperty('--bg2', light ? p.light2 : p.dark2);
  document.body.style.background = light ? p.light : p.dark;

  Object.entries(THEMES[mode]).forEach(([k, v]) => s.setProperty(k, v));
  s.colorScheme = light ? 'light' : 'dark';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', light ? p.light : p.dark);
}
