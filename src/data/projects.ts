/*
 * Projetos de trabalho (sistemas internos da HKTC).
 * Os prints em public/assets/work/ foram tirados com nomes, clientes, valores, contagens
 * e datas borrados. Os textos descrevem o objetivo e a engenharia, nunca dados do negócio.
 */
import type { L, Txt } from '../i18n';

export interface Screen {
  /** nome do arquivo em assets/work/ (sem extensão); existe também a versão <img>-sm.jpg */
  img: string;
  t: L;
  d: L;
}

export interface WorkProject {
  id: string;
  t: L;
  a: L;
  d: L;
  s: Txt;
  feats: L[];
  screens: Screen[];
}

export const PROJ: WorkProject[] = [
  {
    id: 'P-01',
    t: { pt: 'Agentes de IA do SGI', en: 'AI agents for the quality system' },
    a: { pt: 'Qualidade · ISO 9001', en: 'Quality · ISO 9001' },
    d: {
      pt: 'Um agente de IA por setor tira dúvidas de procedimento usando só os documentos controlados e aprovados do SGI, e toda resposta cita o código e a revisão do documento. Quando o acervo não cobre a pergunta, o agente recusa em vez de inventar.',
      en: 'One AI agent per department answers procedure questions using only the controlled, approved documents of the ISO 9001 management system, and every answer cites the document code and revision. When the library does not cover the question, the agent declines instead of making things up.',
    },
    s: { pt: 'LLMs · RAG por skills · Next.js · Supabase', en: 'LLMs · skill-based RAG · Next.js · Supabase' },
    feats: [
      { pt: 'Roteador fail-closed: só atende o setor depois de confirmar que as guardas e o acervo estão íntegros', en: 'Fail-closed router: a department is only served after its guards and document library are verified' },
      { pt: 'Guardas a cada turno: escopo do setor, bloqueio de documentos de outros setores e citação obrigatória', en: 'Per-turn guards: department scope, blocking of other departments’ documents and mandatory citations' },
      { pt: 'Central de skills com governança: pedido, teste cego, revisão independente e decisão humana', en: 'Governed skills hub: request, blind test, independent review and a human decision' },
      { pt: 'Acervo regenerado todo dia a partir das versões vigentes, com auditoria de cada atendimento', en: 'Library rebuilt daily from the current versions, with an audit trail for every answer' },
    ],
    screens: [
      { img: 'sgi-mapa', t: { pt: 'Mapa de agentes', en: 'Agent map' }, d: { pt: 'Rede dos agentes setoriais ligados ao agente principal, com zoom, minimapa e busca.', en: 'Network of department agents linked to the main agent, with zoom, minimap and search.' } },
      { img: 'sgi-aprovacoes', t: { pt: 'Aprovações de skills', en: 'Skill approvals' }, d: { pt: 'Cada skill nova passa por teste cego e revisão independente antes da decisão humana.', en: 'Every new skill goes through a blind test and an independent review before a human decides.' } },
      { img: 'sgi-minerva', t: { pt: 'Assistente no SGI', en: 'In-app assistant' }, d: { pt: 'Chat flutuante que responde sobre procedimentos e mostra código e revisão das fontes.', en: 'Floating chat that answers about procedures and shows the code and revision of each source.' } },
    ],
  },
  {
    id: 'P-02',
    t: { pt: 'CRM pelo WhatsApp', en: 'CRM over WhatsApp' },
    a: { pt: 'Comercial', en: 'Sales' },
    d: {
      pt: 'O vendedor de rua manda texto ou áudio pelo WhatsApp e a visita, ligação ou anotação entra no CRM sem ele abrir a tela. A IA só propõe um cartão com o que vai gravar: nada é salvo sem o SIM do vendedor, e dá para desfazer em até 30 minutos.',
      en: 'Field sales reps send a text or voice note on WhatsApp and the visit, call or note lands in the CRM without opening the app. The AI only proposes a card with what it will save: nothing is stored until the rep replies YES, and it can be undone for up to 30 minutes.',
    },
    s: 'Claude · Whisper · Next.js · Postgres',
    feats: [
      { pt: 'Comandos determinísticos, sem IA: SIM, NÃO, DESFAZER, HOJE e AMANHÃ', en: 'Deterministic commands with no AI involved: YES, NO, UNDO, TODAY and TOMORROW' },
      { pt: 'A IA tem só três ferramentas; quem grava no CRM é um "porteiro" com credencial própria', en: 'The AI has only three tools; writes to the CRM go through a "gatekeeper" with its own credentials' },
      { pt: 'Cada vendedor só mexe na própria carteira, com as mesmas regras da tela', en: 'Each rep can only touch their own accounts, under the same rules as the web app' },
      { pt: 'Baterias de cenários de aceite e testes automatizados antes de cada liberação', en: 'Acceptance-scenario suites and automated tests before every release' },
    ],
    screens: [
      { img: 'crm-negociacoes', t: { pt: 'Funil de negociações', en: 'Deals pipeline' }, d: { pt: 'Kanban por estágio, onde caem as visitas e anotações registradas pelo WhatsApp.', en: 'Kanban by stage, where the visits and notes logged over WhatsApp show up.' } },
      { img: 'crm-estagios', t: { pt: 'Estágios do funil', en: 'Pipeline stages' }, d: { pt: 'Colunas configuráveis por frente de negócio: ordem, cor e cadência de contato.', en: 'Configurable columns per business line: order, color and contact cadence.' } },
      { img: 'crm-campos', t: { pt: 'Campos da negociação', en: 'Deal fields' }, d: { pt: 'Cada equipe renomeia e esconde campos sem mexer nas regras já configuradas.', en: 'Each team renames and hides fields without touching the rules already in place.' } },
    ],
  },
  {
    id: 'P-03',
    t: { pt: 'Revisor de estimativas de importação', en: 'Import estimate reviewer' },
    a: { pt: 'Comex', en: 'Foreign trade' },
    d: {
      pt: 'O agente Midas confere a premissa comercial de cada estimativa (NCM e descrição, portos, Incoterm, antidumping, ICMS-ST e anuências) e recomenda aceitar ou recusar, já com o texto das pendências para o comercial. Uma pessoa do Pricing sempre valida a recomendação.',
      en: 'The Midas agent checks the commercial assumptions behind each import estimate (tariff code and description, ports, Incoterm, anti-dumping, state tax substitution and regulatory permits) and recommends accepting or rejecting it, with the open items already written for the sales team. A pricing analyst always validates the recommendation.',
    },
    s: 'LLMs · Python · React · Supabase',
    feats: [
      { pt: 'Motor de conferência determinístico: os valores vêm do código, o LLM só redige e julga o sentido', en: 'Deterministic checking engine: values come from code, the LLM only writes and judges meaning' },
      { pt: '"Ensinar" vira uma revisão versionada da regra, com teste cego antes de valer', en: '"Teach" becomes a versioned revision of the rule, blind-tested before it takes effect' },
      { pt: 'Fontes regulatórias sincronizadas todo dia, com trava se alguma fonte cair', en: 'Regulatory sources synced daily, with a lock if any source goes down' },
      { pt: 'Reserva atômica no banco antes de qualquer efeito e diário de cada ação', en: 'Atomic reservation in the database before any side effect, plus a journal of every action' },
    ],
    screens: [
      { img: 'midas-painel', t: { pt: 'Painel técnico', en: 'Technical panel' }, d: { pt: 'Onde o Pricing ensina o agente, responde dúvidas de regra e acompanha eficácia e tempos.', en: 'Where the pricing team teaches the agent, answers rule questions and tracks accuracy and timing.' } },
      { img: 'midas-etapas', t: { pt: 'Etapas do Pricing', en: 'Pricing steps' }, d: { pt: 'O roteiro de conferência que o Midas segue, da premissa à proposta, com decisão humana no fim.', en: 'The checklist Midas follows, from the assumptions to the proposal, with a human decision at the end.' } },
    ],
  },
  {
    id: 'P-04',
    t: { pt: 'Torre de Controle', en: 'Control Tower' },
    a: { pt: 'Operações', en: 'Operations' },
    d: {
      pt: 'Painel único da operação: comex, compras, comercial e demandas lado a lado, atualizados a cada minuto. O modo TV gira sozinho entre os painéis no telão da sala, sem login e só com dados agregados.',
      en: 'A single operations dashboard: foreign trade, purchasing, sales and requests side by side, refreshed every minute. TV mode cycles through the panels on the office wall screen on its own, with no login and only aggregated data.',
    },
    s: 'Supabase Realtime · React · Recharts',
    feats: [
      { pt: 'Telas desenhadas em 1920×1080 e escaladas para qualquer monitor, sem "carregando" entre as trocas', en: 'Screens designed at 1920×1080 and scaled to any display, with no "loading" between rotations' },
      { pt: 'As rotas públicas do telão passam por um único ponto que remove dados pessoais', en: 'Public wall-screen routes go through a single entry point that strips personal data' },
      { pt: 'Configuração em tempo real: desligar um gráfico muda todos os telões na hora', en: 'Real-time configuration: turning a chart off updates every screen instantly' },
      { pt: 'Atualização automática de versão e recarga diária para TVs antigas', en: 'Automatic version updates and a daily reload for older smart TVs' },
    ],
    screens: [
      { img: 'torre-dash', t: { pt: 'Visão geral', en: 'Overview' }, d: { pt: 'Indicadores de cada fonte, com gráficos de processos por fase e por modal.', en: 'Indicators for each source, with charts of shipments by stage and by transport mode.' } },
      { img: 'torre-tv-comex', t: { pt: 'Telão do Comex', en: 'Foreign trade wall screen' }, d: { pt: 'Tela de TV com prazos, atrasos e processos por fase, pensada para leitura à distância.', en: 'TV screen with deadlines, delays and shipments by stage, designed to be read from a distance.' } },
      { img: 'torre-tv', t: { pt: 'Modo TV', en: 'TV mode' }, d: { pt: 'Escolha do painel que vai para o monitor, ou rodízio automático entre todos.', en: 'Pick the panel to show on the screen, or rotate through all of them automatically.' } },
    ],
  },
  {
    id: 'P-05',
    t: { pt: 'Janus', en: 'Janus' },
    a: { pt: 'Plataforma interna', en: 'Internal platform' },
    d: {
      pt: 'Plataforma de demandas no modelo 5W2H, com prioridade pela matriz GUT, controle de tempo e indicadores de produtividade. Reúne ainda a fila de sugestões de melhoria de 14 sistemas da empresa e a Academia, com aulas internas em vídeo e slides.',
      en: 'A request-management platform based on the 5W2H model, with GUT-matrix prioritization, time tracking and productivity indicators. It also hosts the improvement-suggestion queue for 14 company systems and the Academy, with internal video and slide lessons.',
    },
    s: 'React · TypeScript · Supabase · Vercel',
    feats: [
      { pt: 'Roda embutido em 10 outros sistemas, com login único validado no servidor', en: 'Embedded in 10 other systems, with single sign-on validated on the server' },
      { pt: 'Cada sugestão de melhoria gera um prompt pronto para o Claude Code resolver', en: 'Every improvement suggestion generates a ready-made prompt for Claude Code to solve' },
      { pt: 'Presença e comentários em tempo real dentro das demandas', en: 'Real-time presence and comments inside each request' },
      { pt: 'Migrations com testes de RLS aplicadas pelo GitHub Actions a cada merge', en: 'Migrations with row-level-security tests applied by GitHub Actions on every merge' },
    ],
    screens: [
      { img: 'janus-indicadores', t: { pt: 'Indicadores de desempenho', en: 'Performance indicators' }, d: { pt: 'SLA, lead time, backlog e saúde do sistema, com filtros por período e departamento.', en: 'SLA, lead time, backlog and system health, filtered by period and department.' } },
      { img: 'janus-melhorias', t: { pt: 'Melhorias', en: 'Improvements' }, d: { pt: 'Sugestões de todos os sistemas numa fila só, com indicadores por colaborador e por sistema.', en: 'Suggestions from every system in a single queue, with indicators per person and per system.' } },
      { img: 'janus-academia', t: { pt: 'Academia', en: 'Academy' }, d: { pt: 'Vitrine de aulas internas em estilo streaming, organizada em temporadas.', en: 'Streaming-style catalog of internal lessons, organized in seasons.' } },
    ],
  },
  {
    id: 'P-06',
    t: { pt: 'Robô INPI + assistentes jurídicos', en: 'Trademark bot + legal assistants' },
    a: { pt: 'Jurídico · Regulatório', en: 'Legal · Regulatory' },
    d: {
      pt: 'Toda semana o robô lê a Revista da Propriedade Industrial, encontra os despachos das marcas da empresa, atualiza o status de cada uma, cria os prazos no calendário e manda um resumo por e-mail. No Jurídico e no Regulatório, assistentes de IA respondem sobre os documentos citando as fontes e ajudam a redigir peças e procedimentos.',
      en: 'Every week the bot reads the gazette of Brazil’s trademark office (INPI), finds the decisions on the company’s trademarks, updates each one’s status, creates the deadlines in the calendar and emails a summary. In Legal and Regulatory, AI assistants answer questions about the documents citing their sources and help draft filings and procedures.',
    },
    s: 'LLMs · Vercel Cron · Supabase · Entra ID',
    feats: [
      { pt: 'Download e leitura do XML da revista rodando no Brasil, com nova tentativa se vier incompleto', en: 'Downloads and parses the gazette XML from a Brazilian region, retrying if the file is incomplete' },
      { pt: 'Cada despacho é aplicado uma vez só, com prévia sem gravar e registro de antes e depois', en: 'Each decision is applied exactly once, with a dry-run preview and a before/after log' },
      { pt: 'Tabela de despachos editável na tela: código, status, ação e prazo', en: 'Decision table editable in the UI: code, status, action and deadline' },
      { pt: 'Peças geradas por modelo com saída estruturada e controle de tokens e custo', en: 'Template-based drafting with structured output and token and cost tracking' },
    ],
    screens: [
      { img: 'reg-rpi', t: { pt: 'Robô da RPI', en: 'Gazette bot' }, d: { pt: 'Cada edição da revista processada, com status, despachos encontrados, envio do e-mail e tentativas.', en: 'Every processed gazette issue, with status, decisions found, email delivery and retries.' } },
      { img: 'reg-inpi', t: { pt: 'Marcas e prazos', en: 'Trademarks and deadlines' }, d: { pt: 'Marcas agrupadas pela situação no INPI e calendário com os prazos que o robô cria.', en: 'Trademarks grouped by status at the trademark office and a calendar with the deadlines the bot creates.' } },
      { img: 'reg-docs', t: { pt: 'Documentos do Regulatório', en: 'Regulatory documents' }, d: { pt: 'Fluxo de elaboração, verificação e aprovação, com assistente de IA para redigir e revisar.', en: 'Drafting, verification and approval workflow, with an AI assistant to write and review.' } },
      { img: 'jur-modelos', t: { pt: 'Nova petição', en: 'New filing' }, d: { pt: 'Catálogo de modelos com o papel timbrado, prontos para preencher e revisar com a IA.', en: 'Catalog of letterhead templates, ready to fill in and review with AI.' } },
    ],
  },
];
