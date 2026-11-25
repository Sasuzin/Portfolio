export type StackGroup = [label: string, items: [name: string, tag: string][]];

export const STACK: StackGroup[] = [
  ['IA & LLMs', [['Claude API', 'Anthropic'], ['OpenAI', 'API'], ['Gemini', 'Google'], ['RAG', 'pgvector'], ['LLMOps', 'prod'], ['Whisper', 'voz'], ['Deepgram', 'voz'], ['ElevenLabs', 'voz'], ['Claude Code', 'dev']]],
  ['Frontend', [['React', 'TS'], ['Next.js', 'App Router'], ['Vite', 'build'], ['TanStack', 'Query/Router'], ['Tailwind', 'css'], ['shadcn/ui', 'ui'], ['Zod', 'forms'], ['Angular', 'fw'], ['Vue.js', 'fw']]],
  ['Backend', [['Edge Functions', 'Deno'], ['Node.js', 'runtime'], ['Server Actions', 'Next'], ['Vercel Cron', 'jobs'], ['Python', 'lang'], ['C# / .NET', 'lang'], ['PHP / Laravel', 'lang'], ['REST', 'webhooks']]],
  ['Dados', [['PostgreSQL', 'Supabase'], ['RLS', 'segurança'], ['pg_cron', 'jobs'], ['pgvector', 'IA'], ['Realtime', 'ws'], ['Drizzle', 'ORM'], ['SQL Server', 'db'], ['MongoDB', 'db']]],
  ['Integrações', [['Microsoft Graph', 'M365'], ['WhatsApp Cloud', 'Meta'], ['Instagram Graph', 'Meta'], ['Pipedrive', 'CRM'], ['Clicksign', 'assinatura'], ['Resend', 'e-mail'], ['LiveKit', 'vídeo'], ['Api4Com', 'telefonia']]],
  ['DevOps', [['GitHub Actions', 'CI/CD'], ['Vercel', 'deploy'], ['Docker', 'infra'], ['Caddy', 'VPS'], ['Cloudflare', 'edge'], ['Playwright', 'E2E'], ['Vitest', 'unit'], ['Dependabot', 'deps']]],
  ['Segurança', [['SSO Microsoft', 'Entra ID'], ['MFA', 'TOTP'], ['Cofre de segredos', 'vault'], ['CSP', 'web'], ['AES-GCM', 'cripto'], ['Argon2id', 'hash'], ['ICP-Brasil', 'assinatura']]],
];
