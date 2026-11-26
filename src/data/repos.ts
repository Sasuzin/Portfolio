import type { L, Txt } from '../i18n';

export interface Repo {
  repo: string;
  t: Txt;
  year: Txt;
  kind: Txt;
  bg: string;
  fit: 'contain' | 'cover';
  pad: string;
  short: L;
  d: L;
  feats: L[];
  stack: Txt[];
  imgs: string[];
  /** site no ar / download; sem isso o botão principal vira o repositório */
  live?: string;
  liveLabel?: L;
  url: string;
  cover: string;
}

type RepoInput = Omit<Repo, 'url' | 'cover'>;

const OPEN_SITE: L = { pt: 'Abrir o site ↗', en: 'Open the site ↗' };

const RAW: RepoInput[] = [
  {
    repo: 'owl-vault', t: 'Owl Vault', year: '2026', kind: { pt: 'App desktop · Windows', en: 'Desktop app · Windows' },
    bg: 'radial-gradient(circle at 50% 40%, #1A2330, #080B10)', fit: 'contain', pad: '18px',
    short: {
      pt: 'Tranca pastas do Windows com criptografia — os arquivos ficam no lugar, mas só abrem pelo app com PIN ou senha mestra.',
      en: 'Locks Windows folders with encryption — files stay where they are, but only open through the app with a PIN or master password.',
    },
    d: {
      pt: 'Aplicativo desktop que protege pastas no Windows 10/11 com criptografia. A pasta trancada continua no mesmo lugar, com o ícone da coruja, e os arquivos só abrem pelo Owl Vault com o seu PIN ou a senha mestra.',
      en: 'Desktop app that protects folders on Windows 10/11 with encryption. A locked folder stays in the same place, with the owl icon, and its files only open through Owl Vault with your PIN or master password.',
    },
    feats: [
      { pt: 'Criptografia verificável das pastas, no próprio lugar', en: 'Verifiable in-place encryption of folders' },
      { pt: 'PIN por computador + senha mestra para recuperação em outra máquina', en: 'Per-computer PIN + master password to recover on another machine' },
      { pt: 'Trava sozinho após 5 min sem uso, no Win+L e ao suspender', en: 'Locks itself after 5 idle minutes, on Win+L and on sleep' },
      { pt: 'Nada é apagado antes de estar guardado, conferido e testado', en: 'Nothing is deleted before it is stored, checked and tested' },
      { pt: 'Instalador próprio, sem precisar de administrador', en: 'Its own installer, no administrator rights needed' },
    ],
    stack: ['Python', 'PySide6', { pt: 'Criptografia', en: 'Cryptography' }, 'Inno Setup', 'PowerShell'],
    imgs: ['assets/projects/owl-shield.png'],
    live: 'https://github.com/Sasuzin/owl-vault/releases/tag/v0.6.1-build19',
    liveLabel: { pt: 'Baixar v0.6.1 ↗', en: 'Download v0.6.1 ↗' },
  },
  {
    repo: 'PokeDex---JS', t: 'Pokédex', year: '2022 · v2 2026', kind: { pt: 'Web app · PokéAPI', en: 'Web app · PokéAPI' },
    bg: '#1B5BA0', fit: 'cover', pad: '0',
    short: {
      pt: 'Pokédex interativa com 3 modelos de aparelho, os 1.025 Pokémon da PokéAPI, modo Shiny, gritos e animação de captura.',
      en: 'Interactive Pokédex with 3 device styles, all 1,025 Pokémon from PokéAPI, Shiny mode, cries and a capture animation.',
    },
    d: {
      pt: 'Pokédex que roda direto no navegador, com os 1.025 Pokémon de Kanto a Paldea. Você escolhe o modelo do aparelho (Clássica, Catálogo ou Scanner), captura o seu favorito e monta uma equipe de seis na mochila. Começou como um exercício de classes e herança em JavaScript e virou uma Pokédex completa.',
      en: 'A Pokédex that runs right in the browser, with all 1,025 Pokémon from Kanto to Paldea. Pick a device style (Classic, Catalog or Scanner), capture your favorite and build a team of six in your bag. It started as a JavaScript classes-and-inheritance exercise and grew into a full Pokédex.',
    },
    feats: [
      { pt: '3 modelos: Clássica em 7 cores, Catálogo com ficha lateral e Scanner com radar de atributos', en: '3 styles: Classic in 7 colors, Catalog with a side sheet and Scanner with a stats radar' },
      { pt: 'Busca e filtros por nome, número, geração (I a IX) e os 18 tipos', en: 'Search and filters by name, number, generation (I to IX) and all 18 types' },
      { pt: 'Modo Shiny, grito de cada Pokémon e linha evolutiva clicável', en: 'Shiny mode, each Pokémon’s cry and a clickable evolution chain' },
      { pt: 'Mochila com equipe de 6 e cobertura de tipos, e animação de captura com Pokébola feita em CSS', en: 'Bag with a team of 6 and type coverage, plus a capture animation with a pure-CSS Poké Ball' },
      { pt: 'Atalhos de teclado, escolhas salvas no navegador e respeito ao "reduzir movimento"', en: 'Keyboard shortcuts, choices saved in the browser and support for "reduce motion"' },
    ],
    stack: ['JavaScript', 'Preact + htm', 'PokéAPI', 'ES Modules', 'CSS'],
    imgs: ['assets/projects/pokedex-1.jpg', 'assets/projects/pokedex-2.jpg', 'assets/projects/pokedex-3.jpg', 'assets/projects/pokedex-4.jpg', 'assets/projects/pokedex-5.jpg', 'assets/projects/pokedex-6.jpg'],
    live: 'https://sasuzin.github.io/PokeDex---JS/',
    liveLabel: { pt: 'Abrir a Pokédex ↗', en: 'Open the Pokédex ↗' },
  },
  {
    repo: 'JS-Pedra-Papel-e-Tesoura', t: 'JoKenPô', year: '2022 · v2 2026', kind: { pt: 'Jogo · Online', en: 'Game · Online' },
    bg: '#140F2E', fit: 'cover', pad: '0',
    short: {
      pt: 'Pedra, papel e tesoura com visual neon, muitas animações e modo online para desafiar um amigo em tempo real, sem backend.',
      en: 'Rock, paper, scissors with a neon look, lots of animation and an online mode to challenge a friend in real time, with no back end.',
    },
    d: {
      pt: 'Pedra, papel e tesoura com placar, melhor de 3 ou de 5, efeitos e estatísticas. No modo online, os dois navegadores jogam direto entre si por WebRTC, com salas públicas ou privadas listadas ao vivo, tudo rodando no GitHub Pages, sem servidor próprio. Começou como trabalho do 2º semestre de TSI no Senac.',
      en: 'Rock, paper, scissors with a scoreboard, best-of-3 or best-of-5 matches, effects and stats. In online mode the two browsers play directly against each other over WebRTC, with public or private rooms listed live, all running on GitHub Pages with no server of its own. It started as a 2nd-semester project of the Internet Systems program at Senac.',
    },
    feats: [
      { pt: 'Animação "Jo… Ken… Pô!" com onda de choque, faíscas e confete em Canvas 2D', en: '"Jo… Ken… Pô!" animation with a shockwave, sparks and confetti on Canvas 2D' },
      { pt: 'Modo online P2P por WebRTC (PeerJS), com salas públicas e privadas por código ou link', en: 'Peer-to-peer online mode over WebRTC (PeerJS), with public and private rooms by code or link' },
      { pt: 'Lista de salas ao vivo por MQTT em dois servidores públicos, para continuar funcionando se um cair', en: 'Live room list over MQTT on two public brokers, so it keeps working if one goes down' },
      { pt: 'Jogadas lacradas com SHA-256: ninguém vê a escolha do outro antes da hora', en: 'Moves sealed with SHA-256: nobody sees the other player’s choice too early' },
      { pt: 'Sons sintetizados com Web Audio, atalhos de teclado e suporte a leitor de tela', en: 'Sounds synthesized with Web Audio, keyboard shortcuts and screen-reader support' },
    ],
    stack: ['JavaScript', 'WebRTC', 'MQTT', 'Web Audio', 'Canvas 2D', 'CSS'],
    imgs: ['assets/projects/jokenpo-1.jpg', 'assets/projects/jokenpo-2.jpg', 'assets/projects/jokenpo-3.jpg', 'assets/projects/jokenpo-4.jpg', 'assets/projects/jokenpo-5.jpg'],
    live: 'https://sasuzin.github.io/JS-Pedra-Papel-e-Tesoura/',
    liveLabel: { pt: 'Jogar agora ↗', en: 'Play now ↗' },
  },
  {
    repo: 'Pi-Shounen-Store', t: 'Shonen Store', year: '2023', kind: 'E-commerce · Laravel', bg: '#000000', fit: 'contain', pad: '0',
    short: {
      pt: 'E-commerce de mangás e cultura japonesa com catálogo por categorias e tags, carrinho, pedidos e painel de administração.',
      en: 'Manga and Japanese culture e-commerce with a catalog by category and tag, cart, orders and an admin panel.',
    },
    d: {
      pt: 'Loja virtual de mangás e produtos da cultura japonesa, feita em equipe de cinco pessoas no Projeto Integrador do 5º semestre de TSI no Senac. O cliente cria a conta, filtra o catálogo, monta o carrinho e acompanha os pedidos; o administrador cuida de produtos, categorias, tags e usuários.',
      en: 'Online store for manga and Japanese culture products, built by a team of five as the capstone project of the 5th semester of the Internet Systems program at Senac. Customers sign up, filter the catalog, fill their cart and track orders; the admin manages products, categories, tags and users.',
    },
    feats: [
      { pt: 'Catálogo com busca e filtros por categoria, tipo e tag', en: 'Catalog with search and filters by category, type and tag' },
      { pt: 'Carrinho com ajuste de quantidades e checkout com endereço de entrega', en: 'Cart with quantity controls and checkout with a delivery address' },
      { pt: 'Cadastro, login com validação de senha e histórico de pedidos', en: 'Sign-up, login with password rules and order history' },
      { pt: 'Painel admin com cadastro de produtos, categorias, tags e tipos', en: 'Admin panel to manage products, categories, tags and types' },
      { pt: 'Arquitetura MVC com banco MySQL modelado do zero', en: 'MVC architecture with a MySQL database designed from scratch' },
      { pt: 'Documentação completa: requisitos, personas, análise SWOT e modelo de negócio', en: 'Full documentation: requirements, personas, SWOT analysis and business model' },
    ],
    stack: ['PHP', 'Laravel', 'Blade', 'MySQL', 'Bootstrap'],
    imgs: ['assets/projects/shonen-1.jpg', 'assets/projects/shonen-2.jpg', 'assets/projects/shonen-3.jpg', 'assets/projects/shonen-4.jpg', 'assets/projects/shonen-5.jpg', 'assets/projects/shonen-6.jpg'],
  },
  {
    repo: 'MidiaSocial', t: 'Bem Social', year: '2022 · v2 2026', kind: { pt: 'PWA · Rede social', en: 'PWA · Social network' },
    bg: '#F1EEFA', fit: 'cover', pad: '0',
    short: {
      pt: 'Rede social que roda 100% no navegador: textos, fotos, vídeos, áudios, localização e desenhos feitos à mão.',
      en: 'A social network that runs 100% in the browser: text, photos, videos, audio, location and hand-made drawings.',
    },
    d: {
      pt: 'Rede social que roda inteira no navegador, sem back-end nem dependências. Publique textos, fotos, vídeos, áudios, sua localização e desenhos feitos à mão. Projeto de Web Standards (Aplicações Ricas) no Senac.',
      en: 'A social network that runs entirely in the browser, with no back end or dependencies. Post text, photos, videos, audio, your location and hand-made drawings. Web Standards (Rich Applications) project at Senac.',
    },
    feats: [
      { pt: 'Tela de desenho com pincel, borracha, cores, espessura e desfazer', en: 'Drawing canvas with brush, eraser, colors, stroke width and undo' },
      { pt: 'Posts com foto, vídeo, áudio e localização', en: 'Posts with photo, video, audio and location' },
      { pt: 'Cadastro com máscaras e validação dos dígitos do CPF', en: 'Sign-up with input masks and Brazilian ID (CPF) check-digit validation' },
      { pt: 'Tema claro e escuro, layout responsivo', en: 'Light and dark themes, responsive layout' },
      { pt: 'PWA instalável que funciona offline (IndexedDB)', en: 'Installable PWA that works offline (IndexedDB)' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas 2D', 'IndexedDB', 'PWA'],
    imgs: ['assets/projects/social-1.jpg', 'assets/projects/social-2.jpg', 'assets/projects/social-3.jpg'],
    live: 'https://sasuzin.github.io/MidiaSocial/', liveLabel: OPEN_SITE,
  },
  {
    repo: 'Calculadora-de-IMC', t: { pt: 'Calculadora de IMC', en: 'BMI Calculator' }, year: '2022 · v2 2026', kind: 'Web app',
    bg: '#EAF6F0', fit: 'cover', pad: '0',
    short: {
      pt: 'Calcula o IMC com a classificação da OMS, a faixa de peso saudável e um tema que muda de cor conforme o resultado.',
      en: 'Calculates BMI with the WHO classification, the healthy weight range and a theme that changes color with the result.',
    },
    d: {
      pt: 'Calculadora de IMC responsiva em HTML, CSS e JavaScript puro. Mostra em qual faixa da OMS você está, qual é o peso saudável para a sua altura e quanto falta para chegar nele.',
      en: 'Responsive BMI calculator in plain HTML, CSS and JavaScript. It shows which WHO range you are in, the healthy weight for your height and how far you are from it.',
    },
    feats: [
      { pt: 'Classificação OMS com barra de escala e marcador animado', en: 'WHO classification with a scale bar and an animated marker' },
      { pt: 'Faixa de peso saudável para a altura informada', en: 'Healthy weight range for the given height' },
      { pt: 'Tema dinâmico: cores mudam conforme a faixa do resultado', en: 'Dynamic theme: colors change with the result range' },
      { pt: 'Entrada flexível: vírgula, ponto, unidades e altura em cm', en: 'Flexible input: comma, dot, units and height in cm' },
      { pt: 'Acessível e respeita a preferência de movimento reduzido', en: 'Accessible and respects the reduced-motion preference' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    imgs: ['assets/projects/imc-1.jpg', 'assets/projects/imc-2.jpg', 'assets/projects/imc-3.jpg'],
    live: 'https://sasuzin.github.io/Calculadora-de-IMC/', liveLabel: OPEN_SITE,
  },
  {
    repo: 'Projeto-Banco', t: 'UNIBanco', year: '2022', kind: 'Landing page', bg: '#FFFFFF', fit: 'cover', pad: '0',
    short: {
      pt: 'Landing page de um banco digital fictício para universitários — projeto do 2º semestre de TSI no Senac.',
      en: 'Landing page for a fictional digital bank for college students — a 2nd-semester project of the Internet Systems program at Senac.',
    },
    d: {
      pt: 'Landing page de um banco digital fictício pensado para universitários, com páginas de início, perguntas frequentes e cadastro. Projeto acadêmico do curso de Tecnologia em Sistemas para Internet do Senac.',
      en: 'Landing page for a fictional digital bank designed for college students, with home, FAQ and sign-up pages. Academic project of the Internet Systems Technology program at Senac.',
    },
    feats: [
      { pt: 'Layout responsivo com o grid do Bootstrap e breakpoints próprios', en: 'Responsive layout with the Bootstrap grid and custom breakpoints' },
      { pt: 'Menu hambúrguer em tela cheia no celular', en: 'Full-screen hamburger menu on mobile' },
      { pt: 'FAQ em accordion com o Collapse do Bootstrap', en: 'FAQ accordion with Bootstrap Collapse' },
      { pt: 'Formulário com validação nativa do HTML5', en: 'Form with native HTML5 validation' },
      { pt: 'Ilustrações vetoriais em SVG', en: 'Vector illustrations in SVG' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'],
    imgs: ['assets/projects/banco-1.jpg', 'assets/projects/banco-2.jpg', 'assets/projects/banco-3.jpg'],
    live: 'https://sasuzin.github.io/Projeto-Banco/', liveLabel: OPEN_SITE,
  },
];

export const REPOS: Repo[] = RAW.map(r => ({
  ...r,
  url: `https://github.com/Sasuzin/${r.repo}`,
  cover: r.imgs[0],
}));
