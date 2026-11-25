export interface WorkProject {
  id: string;
  t: string;
  a: string;
  d: string;
  s: string;
}

export const PROJ: WorkProject[] = [
  { id: 'P-01', t: 'Agentes de IA do SGI', a: 'Qualidade · ISO 9001', d: 'Agentes por setor que consultam os documentos controlados do SGI, com roteador, guardas de segurança e central de skills com aprovação e auditoria de uso.', s: 'Claude API · RAG/pgvector · Supabase' },
  { id: 'P-02', t: 'CRM pelo WhatsApp', a: 'Comercial', d: 'Vendedores registram visitas, reuniões e anotações direto no CRM, com regras determinísticas e bateria de testes antes de cada liberação.', s: 'WhatsApp Cloud API · Edge Functions · Postgres' },
  { id: 'P-03', t: 'Revisor de estimativas de importação', a: 'Comex', d: 'Agente que revisa premissas fiscais, antidumping e Incoterms e aponta ao comercial o que precisa ser confirmado.', s: 'LLMs · Python · Supabase' },
  { id: 'P-04', t: 'Torre de Controle', a: 'Operações', d: 'Painel em tempo real com modo TV para telões: comex, compras, telefonia e metas.', s: 'Supabase Realtime · React · Recharts' },
  { id: 'P-05', t: 'Janus', a: 'Plataforma interna', d: 'Sistema de demandas com indicadores, portal de sugestões de melhoria ligado a 13 sistemas e Academia interna com aulas, avaliações e certificados.', s: 'React · TypeScript · Supabase · Vercel' },
  { id: 'P-06', t: 'Robô INPI + assistentes jurídicos', a: 'Jurídico · Regulatório', d: 'Assistentes de IA sobre os documentos do Jurídico e do Regulatório e robô semanal que acompanha a Revista da Propriedade Industrial e avisa sobre marcas.', s: 'LLMs · pg_cron · Microsoft Graph' },
];
