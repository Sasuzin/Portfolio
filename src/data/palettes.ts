export type Mode = 'escuro' | 'claro';

/** Paleta única do site: Azul HKTC. */
export const AZUL = {
  acc: '#4C8FE0',
  deep: '#1B5BA0',
  onAcc: '#06101C',
  soft: '#DBE5F0',
  dark: '#07101C',
  dark2: '#0E1A2B',
  light: '#EDF0F4',
  light2: '#FFFFFF',
};

export const THEMES: Record<Mode, Record<string, string>> = {
  escuro: { '--ink': '#E9EDF2', '--mut': '#AEB8C5', '--mut2': '#C9D1DB', '--fg': '255,255,255', '--pn': '10,14,20', '--ov': '4,6,10', '--card': '#0B0F15', '--sunk': '#06080C', '--sunk2': '#11161E', '--ok': '#6EE7A8' },
  claro: { '--ink': '#1B2733', '--mut': '#586675', '--mut2': '#3B4654', '--fg': '27,39,51', '--pn': '255,255,255', '--ov': '237,240,244', '--card': '#FFFFFF', '--sunk': '#EDF0F4', '--sunk2': '#E4E9EF', '--ok': '#247A48' },
};
