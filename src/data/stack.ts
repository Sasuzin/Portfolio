import type { Txt } from '../i18n';

export type StackGroup = [label: Txt, items: [name: Txt, tag: Txt][]];

const VOZ: Txt = { pt: 'voz', en: 'voice' };
const META: Txt = 'Meta';

export const STACK: StackGroup[] = [
  [{ pt: 'IA & LLMs', en: 'AI & LLMs' }, [['Claude API', 'Anthropic'], ['OpenAI', 'API'], ['Gemini', 'Google'], ['RAG', 'pgvector'], ['LLMOps', 'prod'], ['Whisper', VOZ], ['Deepgram', VOZ], ['ElevenLabs', VOZ], ['Claude Code', 'dev']]],
  ['Frontend', [['React', 'TS'], ['Next.js', 'App Router'], ['Vite', 'build'], ['TanStack', 'Query/Router'], ['Tailwind', 'css'], ['shadcn/ui', 'ui'], ['Zod', 'forms'], ['Angular', 'fw'], ['Vue.js', 'fw']]],
  ['Backend', [['Edge Functions', 'Deno'], ['Node.js', 'runtime'], ['Server Actions', 'Next'], ['Vercel Cron', 'jobs'], ['Python', 'lang'], ['C# / .NET', 'lang'], ['PHP / Laravel', 'lang'], ['REST', 'webhooks']]],
  [{ pt: 'Dados', en: 'Data' }, [['PostgreSQL', 'Supabase'], ['RLS', { pt: 'segurança', en: 'security' }], ['pg_cron', 'jobs'], ['pgvector', { pt: 'IA', en: 'AI' }], ['Realtime', 'ws'], ['Drizzle', 'ORM'], ['SQL Server', 'db'], ['MongoDB', 'db']]],
  [{ pt: 'Integrações', en: 'Integrations' }, [['Microsoft Graph', 'M365'], ['WhatsApp Cloud', META], ['Instagram Graph', META], ['Pipedrive', 'CRM'], ['Clicksign', { pt: 'assinatura', en: 'e-signature' }], ['Resend', 'e-mail'], ['LiveKit', { pt: 'vídeo', en: 'video' }], ['Api4Com', { pt: 'telefonia', en: 'telephony' }]]],
  ['DevOps', [['GitHub Actions', 'CI/CD'], ['Vercel', 'deploy'], ['Docker', 'infra'], ['Caddy', 'VPS'], ['Cloudflare', 'edge'], ['Playwright', 'E2E'], ['Vitest', 'unit'], ['Dependabot', 'deps']]],
  [{ pt: 'Segurança', en: 'Security' }, [['SSO Microsoft', 'Entra ID'], ['MFA', 'TOTP'], [{ pt: 'Cofre de segredos', en: 'Secrets vault' }, 'vault'], ['CSP', 'web'], ['AES-GCM', { pt: 'cripto', en: 'crypto' }], ['Argon2id', 'hash'], ['ICP-Brasil', { pt: 'assinatura', en: 'e-signature' }]]],
];
