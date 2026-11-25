import type { L } from '../i18n';

export interface Cert {
  /** slug: nome do arquivo em assets/certs/<s>.jpg e certificados/<s>.pdf */
  s: string;
  t: string;
  /** índice em CERT_CATS (1–5) */
  cat: number;
  code: string;
  /** ISO, ex.: '2026-11-19' (formatada por idioma com fmtDate) */
  date: string;
  /** duração em minutos */
  min: number;
  val: string;
  img: string;
  pdf: string;
}

export const CERT_CATS: L[] = [
  { pt: 'Todos', en: 'All' },
  { pt: 'IA & LLMs', en: 'AI & LLMs' },
  { pt: 'Claude', en: 'Claude' },
  { pt: 'Automação & APIs', en: 'Automation & APIs' },
  { pt: 'Desenvolvimento', en: 'Development' },
  { pt: 'Alura', en: 'Alura' },
];

const VIVER_DE_IA = 'https://app.viverdeia.ai/certificado/validar';

type Row = [s: string, t: string, cat: number, code: string, date: string, min: number, val?: string];

const ROWS: Row[] = [
  ['conceitos-de-ai', 'Conceitos de AI', 1, 'CERT-96C918B6', '2026-11-19', 72],
  ['comece-por-aqui-cultura-e-estrategia-de-ia', 'Comece por Aqui: Cultura e Estratégia de IA', 1, 'CERT-58387AD0', '2026-11-19', 34],
  ['formacao-de-engenharia-de-prompt', 'Formação de Engenharia de Prompt', 1, 'CERT-1A5DEBBE', '2026-04-13', 62],
  ['formacao-de-chatgpt', 'Formação de ChatGPT', 1, 'CERT-69137A57', '2026-03-30', 93],
  ['formacao-de-gemini', 'Formação de Gemini', 1, 'CERT-C0AC6257', '2026-11-19', 56],
  ['formacao-de-notebooklm', 'Formação de NotebookLM', 1, 'CERT-048DFEAA', '2026-04-14', 81],
  ['formacao-de-claude-ai', 'Formação de Claude AI', 2, 'CERT-A2937211', '2026-11-19', 50],
  ['formacao-de-claude-api', 'Formação de Claude API', 2, 'CERT-C1F08121', '2026-11-19', 48],
  ['formacao-de-claude-code', 'Formação de Claude Code', 2, 'CERT-03DEA18F', '2026-05-05', 51],
  ['formacao-de-claude-design', 'Formação de Claude Design', 2, 'CERT-383F059F', '2026-11-19', 46],
  ['formacao-de-claude-in-chrome', 'Formação de Claude in Chrome', 2, 'CERT-7B57F175', '2026-11-19', 50],
  ['formacao-de-n8n', 'Formação de N8N', 3, 'CERT-A8485390', '2026-11-19', 305],
  ['n8n', 'N8N', 3, 'CERT-A3B9CC8E', '2026-11-19', 3],
  ['formacao-api-openai', 'Formação API OpenAI', 3, 'CERT-1F6BB64A', '2026-11-19', 43],
  ['formacao-de-whatsapp-api', 'Formação de WhatsApp API', 3, 'CERT-5AA1B965', '2026-11-19', 84],
  ['formacao-de-openclaw', 'Formação de OpenClaw', 3, 'CERT-9E18FE24', '2026-11-19', 93],
  ['formacao-de-lovable', 'Formação de Lovable', 4, 'CERT-ED7F7D27', '2026-01-27', 247],
  ['lovable-na-pratica', 'Lovable na Prática', 4, 'CERT-EABD1C92', '2026-11-19', 262],
  ['formacao-de-supabase', 'Formação de Supabase', 4, 'CERT-084554B5', '2026-11-19', 171],
  ['formacao-de-sql-com-ai', 'Formação de SQL com AI', 4, 'CERT-916F030B', '2026-04-13', 54],
  ['formacao-de-github', 'Formação de GitHub', 4, 'CERT-5D29E62D', '2026-06-03', 68],
  ['alura-angular-material', 'Angular: componentização e design com Angular Material', 5, 'ALURA-87BF55A5', '2024-05-11', 480, 'https://cursos.alura.com.br/certificate/87bf55a5-13f6-4f6f-bfad-c848ed5aab90'],
  ['alura-bootstrap5', 'Bootstrap5: crie uma landing page responsiva', 5, 'ALURA-C4DD591E', '2024-03-08', 480, 'https://cursos.alura.com.br/certificate/c4dd591e-e4a6-44da-930b-e8fbdbf107a1'],
  ['alura-logica-javascript', 'Lógica de programação: mergulhe em programação com JavaScript', 5, 'ALURA-B419B115', '2023-10-30', 360, 'https://cursos.alura.com.br/certificate/b419b115-fe51-4ed5-8a0e-886dd24198cc'],
  ['alura-csharp-oo', 'C#: aplicando a Orientação a Objetos', 5, 'ALURA-5F7799D1', '2023-09-30', 480, 'https://cursos.alura.com.br/certificate/5f7799d1-e522-42d4-a3fd-ca13af53ecab'],
  ['alura-csharp-primeira-aplicacao', 'C#: criando sua primeira aplicação', 5, 'ALURA-6CDB2841', '2023-08-23', 480, 'https://cursos.alura.com.br/certificate/6cdb2841-96bb-4baf-9826-02b2d54cc12d'],
];

export const CERTS: Cert[] = ROWS.map(([s, t, cat, code, date, min, val]) => ({
  s, t, cat, code, date, min,
  val: val || VIVER_DE_IA,
  img: `assets/certs/${s}.jpg`,
  pdf: `certificados/${s}.pdf`,
}));

export function fmtMin(m: number): string {
  const h = Math.floor(m / 60), r = m % 60;
  return h ? `${h}h${String(r).padStart(2, '0')}` : `${r}min`;
}

export const TOTAL_MIN = CERTS.reduce((a, c) => a + c.min, 0);
