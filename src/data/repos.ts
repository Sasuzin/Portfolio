export interface Repo {
  repo: string;
  t: string;
  year: string;
  kind: string;
  bg: string;
  fit: 'contain' | 'cover';
  pad: string;
  short: string;
  d: string;
  feats: string[];
  stack: string[];
  imgs: string[];
  live: string;
  liveLabel: string;
  url: string;
  cover: string;
  stackLine: string;
}

type RepoInput = Omit<Repo, 'url' | 'cover' | 'stackLine'>;

const RAW: RepoInput[] = [
  {
    repo: 'owl-vault', t: 'Owl Vault', year: '2026', kind: 'App desktop · Windows', bg: 'radial-gradient(circle at 50% 40%, #1A2330, #080B10)', fit: 'contain', pad: '18px',
    short: 'Tranca pastas do Windows com criptografia — os arquivos ficam no lugar, mas só abrem pelo app com PIN ou senha mestra.',
    d: 'Aplicativo desktop que protege pastas no Windows 10/11 com criptografia. A pasta trancada continua no mesmo lugar, com o ícone da coruja, e os arquivos só abrem pelo Owl Vault com o seu PIN ou a senha mestra.',
    feats: ['Criptografia verificável das pastas, no próprio lugar', 'PIN por computador + senha mestra para recuperação em outra máquina', 'Trava sozinho após 5 min sem uso, no Win+L e ao suspender', 'Nada é apagado antes de estar guardado, conferido e testado', 'Instalador próprio, sem precisar de administrador'],
    stack: ['Python', 'PySide6', 'Criptografia', 'Inno Setup', 'PowerShell'], imgs: ['assets/projects/owl-logo.png', 'assets/projects/owl-shield.png'],
    live: 'https://github.com/Sasuzin/owl-vault/releases/tag/v0.6.1-build19', liveLabel: 'Baixar v0.6.1 ↗',
  },
  {
    repo: 'MidiaSocial', t: 'Bem Social', year: '2022 · v2 2026', kind: 'PWA · Rede social', bg: '#F1EEFA', fit: 'cover', pad: '0',
    short: 'Rede social que roda 100% no navegador: textos, fotos, vídeos, áudios, localização e desenhos feitos à mão.',
    d: 'Rede social que roda inteira no navegador, sem back-end nem dependências. Publique textos, fotos, vídeos, áudios, sua localização e desenhos feitos à mão. Projeto de Web Standards (Aplicações Ricas) no Senac.',
    feats: ['Tela de desenho com pincel, borracha, cores, espessura e desfazer', 'Posts com foto, vídeo, áudio e localização', 'Cadastro com máscaras e validação dos dígitos do CPF', 'Tema claro e escuro, layout responsivo', 'PWA instalável que funciona offline (IndexedDB)'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas 2D', 'IndexedDB', 'PWA'], imgs: ['assets/projects/social-1.jpg', 'assets/projects/social-2.jpg', 'assets/projects/social-3.jpg'],
    live: 'https://sasuzin.github.io/MidiaSocial/', liveLabel: 'Abrir o site ↗',
  },
  {
    repo: 'Calculadora-de-IMC', t: 'Calculadora de IMC', year: '2022 · v2 2026', kind: 'Web app', bg: '#EAF6F0', fit: 'cover', pad: '0',
    short: 'Calcula o IMC com a classificação da OMS, a faixa de peso saudável e um tema que muda de cor conforme o resultado.',
    d: 'Calculadora de IMC responsiva em HTML, CSS e JavaScript puro. Mostra em qual faixa da OMS você está, qual é o peso saudável para a sua altura e quanto falta para chegar nele.',
    feats: ['Classificação OMS com barra de escala e marcador animado', 'Faixa de peso saudável para a altura informada', 'Tema dinâmico: cores mudam conforme a faixa do resultado', 'Entrada flexível: vírgula, ponto, unidades e altura em cm', 'Acessível e respeita a preferência de movimento reduzido'],
    stack: ['HTML', 'CSS', 'JavaScript'], imgs: ['assets/projects/imc-1.jpg', 'assets/projects/imc-2.jpg', 'assets/projects/imc-3.jpg'],
    live: 'https://sasuzin.github.io/Calculadora-de-IMC/', liveLabel: 'Abrir o site ↗',
  },
  {
    repo: 'Projeto-Banco', t: 'UNIBanco', year: '2022', kind: 'Landing page', bg: '#FFFFFF', fit: 'cover', pad: '0',
    short: 'Landing page de um banco digital fictício para universitários — projeto do 2º semestre de TSI no Senac.',
    d: 'Landing page de um banco digital fictício pensado para universitários, com páginas de início, perguntas frequentes e cadastro. Projeto acadêmico do curso de Tecnologia em Sistemas para Internet do Senac.',
    feats: ['Layout responsivo com o grid do Bootstrap e breakpoints próprios', 'Menu hambúrguer em tela cheia no celular', 'FAQ em accordion com o Collapse do Bootstrap', 'Formulário com validação nativa do HTML5', 'Ilustrações vetoriais em SVG'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'], imgs: ['assets/projects/banco-1.jpg', 'assets/projects/banco-2.jpg', 'assets/projects/banco-3.jpg'],
    live: 'https://sasuzin.github.io/Projeto-Banco/', liveLabel: 'Abrir o site ↗',
  },
];

export const REPOS: Repo[] = RAW.map(r => ({
  ...r,
  url: `https://github.com/Sasuzin/${r.repo}`,
  cover: r.imgs[0],
  stackLine: r.stack.slice(0, 3).join(' · '),
}));
