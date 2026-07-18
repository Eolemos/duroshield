// Generates one page per system datasheet, from the PDFs the old site hid behind
// "Baixe aqui o catálogo" Google Drive links. Everything here is transcribed from
// those PDFs, no figure is invented.

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');

const SYSTEMS = [
  {
    slug: 'spr092',
    name: 'DUROSHIELD® SPR 092',
    kicker: 'Poliureia estrutural',
    claim: 'Onde não pode vazar.',
    title: 'DUROSHIELD SPR 092: Impermeabilização em Poliureia | Duroshield',
    desc: 'Revestimento de poliureia 100% sólido, zero VOC, sem emendas, aplicado por spray '
        + 'sobre o substrato existente. Espessura de 1,5 mm (tráfego leve) a 3,0 mm (tráfego pesado).',
    photo: 'aplicacao-planta-operacao',
    photoAlt: 'Aplicador da Duroshield aplicando poliureia SPR 092 a spray em planta industrial em operação.',
    spec: 'O Sistema DUROSHIELD® SPR 092 é um revestimento de alto desempenho, de poliureia. '
        + 'Este sistema de alta tecnologia substitui as impermeabilizações tradicionais. A partir '
        + 'de suas propriedades diferenciadas, o SPR 092 é totalmente flexível, podendo ser '
        + 'utilizado em qualquer tipo de substrato, além de exercer o papel de proteção especial. '
        + 'É um sistema moderno, de rápida aplicação e alta durabilidade.',
    props: [
      'Sistema 100% sólido', 'Zero VOC', 'Baixa sobrecarga', 'Aplicação por spray',
      'Sistema totalmente sem emendas', 'Aderido ao substrato',
      'Pode ser aplicado sobre piso existente', 'Secagem ultrarrápida',
    ],
    uses: [
      'Impermeabilização de projetos em concreto novo ou existente, pelo método não destrutivo',
      'Edifícios industriais', 'Edifícios comerciais', 'Shopping centers',
      'Lajes, bacias de contenção, helipontos e estacionamentos',
    ],
    highlights: [
      { k: 'Aderência', v: 'Excelente aderência ao aço, alumínio, concreto e diversas superfícies.' },
      { k: 'Resistência mecânica', v: 'Superfícies revestidas tornam-se excepcionalmente resistentes à abrasão e a impactos.' },
      { k: 'Resistência a intempéries', v: 'Excelente resistência ao ozônio, raios UV e intempéries diversas.' },
      { k: 'Isolamento sonoro', v: 'As propriedades do revestimento elastomérico propiciam a redução de ruídos e vibrações.' },
    ],
    numbers: [
      { v: '1,5 a 3,0', k: 'mm de espessura, conforme o tráfego' },
      { v: '100%', k: 'sólido · zero VOC' },
      { v: '0', k: 'emendas na membrana' },
    ],
    source: 'Ficha técnica DUROSHIELD® SPR 092',
  },
  {
    slug: 'flex',
    name: 'DUROSHIELD® FLEX',
    kicker: 'Revestimento protetivo para coberturas',
    claim: 'Onde o sol destrói.',
    title: 'DUROSHIELD FLEX: Revestimento Protetivo para Coberturas | Duroshield',
    desc: 'Sistema elastomérico de alta espessura, à base de resinas acrílicas de última geração, '
        + 'isento de solventes. Alta refletividade, cura ao toque em 1 hora. Certificado GBC Brasil.',
    photo: 'bayer-cobertura',
    photoAlt: 'Aplicador da Duroshield com EPI completo aplicando DUROSHIELD FLEX em cobertura metálica.',
    spec: 'DUROSHIELD® FLEX é um sistema elastomérico de alta espessura, à base de resinas '
        + 'acrílicas de última geração, isento de solventes. É um revestimento de proteção do '
        + 'substrato, com excelente refletividade, alta flexibilidade e alongamento, garantindo '
        + 'a estanqueidade e impermeabilidade da superfície.',
    props: [
      'Alto teor de sólido', 'Baixo VOC', 'Alta elasticidade', 'Baixa sobrecarga',
      'Aplicação por spray', 'Não agride a camada de ozônio',
      'Filme lavável e antiaderente a fuligem e poeira', 'Cura ao toque em 1 hora',
      'Cura final em 4 horas',
    ],
    uses: [
      'Lajes de concreto', 'Abóbadas', 'Coberturas em fibrocimento', 'Coberturas metálicas',
      'Coberturas em concreto', 'Supermercados', 'Shopping centers', 'Galpões em geral',
    ],
    highlights: [
      { k: 'Refletividade', v: 'Excelente refletividade, protege o substrato da degradação por raios solares.' },
      { k: 'Filme lavável', v: 'Antiaderente a fuligem e poeira: a cobertura mantém a refletividade ao longo do tempo.' },
      { k: 'Liberação rápida', v: 'Cura ao toque em 1 hora e cura final em 4 horas.' },
      { k: 'Selo verde', v: 'Sistema reconhecido pelo Green Building Council Brasil (GBC Brasil).' },
    ],
    numbers: [
      { v: '1h', k: 'para cura ao toque' },
      { v: '4h', k: 'para cura final' },
      { v: 'GBC', k: 'Green Building Council Brasil' },
    ],
    source: 'Ficha técnica DUROSHIELD® FLEX',
  },
  {
    slug: 'cool',
    name: 'DUROSHIELD® COOL',
    kicker: 'Revestimento protetivo e isolante térmico',
    claim: 'Onde o calor custa caro.',
    title: 'DUROSHIELD COOL: Isolante Térmico para Coberturas | Duroshield',
    desc: 'Reflete mais de 90% dos raios solares e reduz de 8 a 12 graus a temperatura interna. '
        + 'Medição por termografia: 58,9 °C sem aplicação contra 25,8 °C com aplicação.',
    photo: 'obra-detalhe',
    photoAlt: 'Cobertura metálica revestida com sistema refletivo Duroshield, membrana contínua branca.',
    spec: 'DUROSHIELD® COOL é um sistema elastomérico de alta espessura, à base de resinas '
        + 'acrílicas de última geração e microesferas poliméricas ocas, isento de solventes. '
        + 'É um revestimento de proteção do substrato, com excelente refletividade, alta '
        + 'flexibilidade e alongamento, garantindo a redução térmica, estanqueidade e '
        + 'impermeabilidade da superfície.',
    props: [
      'Altíssima refletividade: reflete mais de 90% dos raios solares',
      'Reduz de 8 a 12 graus a temperatura interna', 'Alto teor de sólido', 'Baixo VOC',
      'Alta elasticidade', 'Baixa sobrecarga', 'Proteção contra corrosão',
      'Proteção contra bactérias e fungos', 'Aplicação por spray',
    ],
    uses: [
      'Lajes de concreto', 'Abóbadas', 'Coberturas em fibrocimento', 'Coberturas metálicas',
      'Coberturas em concreto', 'Supermercados', 'Shopping centers', 'Galpões em geral',
    ],
    highlights: [
      { k: 'Medido por termografia', v: 'Na mesma cobertura e no mesmo instante: 58,9 °C na área sem aplicação e 25,8 °C na área com DUROSHIELD® COOL.' },
      { k: 'Conta de energia', v: 'Menos carga térmica na cobertura significa menos consumo de climatização dentro da planta.' },
      { k: 'Proteção biológica', v: 'Proteção contra corrosão, bactérias e fungos.' },
      { k: 'Selo verde', v: 'Sistema reconhecido pelo Green Building Council Brasil (GBC Brasil).' },
    ],
    numbers: [
      { v: '90%', k: 'dos raios solares refletidos' },
      { v: '8 a 12°', k: 'de redução na temperatura interna' },
      { v: '33,1°', k: 'de diferença medida por termografia' },
    ],
    thermal: true,
    source: 'Ficha técnica DUROSHIELD® COOL',
  },
];

const head = (s) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.title}</title>
<meta name="description" content="${s.desc}">
<link rel="canonical" href="https://duroshield.com.br/sistemas/${s.slug}.html">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${s.name}: ${s.claim}">
<meta property="og:description" content="${s.desc}">
<meta property="og:image" content="https://duroshield.com.br/assets/img/obras/${s.photo}.webp">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23FFC400'/><text x='16' y='23' font-size='20' font-weight='bold' font-family='Arial' fill='%231A22C8' text-anchor='middle'>D</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap">
<link rel="stylesheet" href="../assets/css/site.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "${s.name}",
  "brand": { "@type": "Brand", "name": "Duroshield Spray Systems" },
  "category": "Impermeabilização e revestimento de alto desempenho",
  "description": "${s.desc}"
}
</script>
</head>
<body>
<header class="hdr stuck" id="hdr">
  <div class="shell">
    <a class="brand" href="../index.html">DURO<b>SHIELD</b> <span>SPRAY SYSTEMS</span></a>
    <nav class="nav" id="nav" aria-label="Navegação principal">
      <a href="spr092.html">SPR 092</a>
      <a href="flex.html">FLEX</a>
      <a href="cool.html">COOL</a>
      <a href="../index.html#obras">Obras</a>
      <a href="../index.html#portfolio">Portfólio</a>
    </nav>
    <a class="btn btn-primary" href="../index.html#contato">Solicitar diagnóstico</a>
    <button class="burger" id="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

const foot = `
<footer class="ftr">
  <div class="shell">
    <div class="ftr-top">
      <div>
        <a class="brand" href="../index.html">DURO<b>SHIELD</b> <span>SPRAY SYSTEMS</span></a>
        <p style="margin-top:14px;max-width:40ch">Empresa nacional de engenharia especializada
          em sistemas de revestimento de alto desempenho. Sede em São Paulo, execução em
          território nacional.</p>
        <div class="ftr-sig">Ninguém protege melhor.</div>
      </div>
      <div>
        <h5>SISTEMAS</h5>
        <ul>
          <li><a href="spr092.html">DUROSHIELD® SPR 092</a></li>
          <li><a href="flex.html">DUROSHIELD® FLEX</a></li>
          <li><a href="cool.html">DUROSHIELD® COOL</a></li>
          <li><a href="../index.html#sistemas">DUROSHIELD® CR</a></li>
        </ul>
      </div>
      <div>
        <h5>CONTATO</h5>
        <ul>
          <li><a href="https://wa.me/5511941341776" target="_blank" rel="noopener">(11) 3103-8300</a></li>
          <li><a href="https://wa.me/5511941341776">(11) 94134-1776</a></li>
          <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=projeto@duroshield.com.br&su=Solicita%C3%A7%C3%A3o%20de%20diagn%C3%B3stico%20t%C3%A9cnico" target="_blank" rel="noopener">projeto@duroshield.com.br</a></li>
          <li><a href="../index.html#obras">Obras executadas</a></li>
        </ul>
      </div>
    </div>
    <div class="ftr-btm">
      <span>© 2026 Duroshield Spray Systems · Todos os direitos reservados</span>
      <span>Poliureia · Impermeabilização de alto desempenho · São Paulo, SP</span>
    </div>
  </div>
</footer>
<div class="mobile-cta">
  <a class="btn btn-primary" href="../index.html#contato">Solicitar diagnóstico técnico</a>
</div>
<script src="../assets/js/site.js" defer></script>
</body>
</html>`;

const li = (arr) => arr.map((x) => `<li>${x}</li>`).join('\n        ');

function page(s) {
  const others = SYSTEMS.filter((o) => o.slug !== s.slug);
  return `${head(s)}

<main class="sys-page">
<section class="sys-hero">
  <picture class="hero-photo">
    <source media="(max-width:720px)" srcset="../assets/img/obras/${s.photo}@800.webp">
    <img src="../assets/img/obras/${s.photo}.webp" fetchpriority="high" alt="${s.photoAlt}">
  </picture>
  <div class="shell">
    <nav class="crumb" aria-label="Você está aqui">
      <a href="../index.html">Início</a> <span>/</span>
      <a href="../index.html#sistemas">Sistemas</a> <span>/</span>
      <b>${s.name.replace('DUROSHIELD® ', '')}</b>
    </nav>
    <div class="eyebrow on-dark">${s.kicker}</div>
    <h1>${s.claim}</h1>
    <p class="sub">${s.spec}</p>
    <div class="acts">
      <a class="btn btn-primary" href="../index.html#contato">Solicitar diagnóstico técnico</a>
      <a class="btn btn-ghost" href="../index.html#obras">Ver obras executadas</a>
    </div>
  </div>
</section>

<section class="dark tight">
  <div class="shell">
    <div class="band">
      ${s.numbers.map((n) => `<div class="bd"><div class="v">${n.v}</div><div class="k">${n.k}</div></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section>
  <div class="shell grid2">
    <div>
      <div class="eyebrow rv">Principais propriedades</div>
      <h2 class="rv" data-d="1">O que o sistema entrega.</h2>
      <ul class="ticks rv" data-d="2">
        ${li(s.props)}
      </ul>
    </div>
    <div class="rv" data-d="2">
      <div class="eyebrow">Aplicações</div>
      <h3 style="margin-bottom:16px">Onde ele é indicado.</h3>
      <ul class="ticks">
        ${li(s.uses)}
      </ul>
    </div>
  </div>
</section>

<section class="dark">
  <div class="shell">
    <div class="eyebrow on-dark rv">Características e vantagens</div>
    <h2 class="rv" data-d="1">Por que ele resolve.</h2>
    <div class="sys rv" data-d="2" style="margin-top:36px">
      ${s.highlights.map((h) => `<article class="sy sy-dark">
        <div class="n">${h.k}</div>
        <p class="w">${h.v}</p>
      </article>`).join('\n      ')}
    </div>
    ${s.thermal ? `
    <div class="thermal rv" data-d="2">
      <div class="th-h">MEDIÇÃO POR TERMOGRAFIA · MESMA COBERTURA, MESMO INSTANTE</div>
      <div class="th-g">
        <div class="th-c hot"><div class="t">58,9<span>°C</span></div><div class="l">Sem aplicação</div></div>
        <div class="th-arrow" aria-hidden="true">→</div>
        <div class="th-c cold"><div class="t">25,8<span>°C</span></div><div class="l">Com DUROSHIELD® COOL</div></div>
      </div>
      <p class="th-n">Diferença de <b>33,1 °C</b> na superfície da cobertura. Menos carga térmica
        significa menos energia de climatização dentro da planta.</p>
    </div>` : ''}
  </div>
</section>

<section>
  <div class="shell">
    <div class="eyebrow rv">Outros sistemas</div>
    <h2 class="rv" data-d="1">Um para cada tipo de agressão.</h2>
    <div class="sys rv" data-d="2" style="margin-top:32px">
      ${others.map((o) => `<a class="sy" href="${o.slug}.html">
        <div class="n">${o.name}</div>
        <h3>${o.claim}</h3>
        <p class="w">${o.kicker}.</p>
        <div class="for">Ver ficha técnica →</div>
      </a>`).join('\n      ')}
      <div class="sy">
        <div class="n">DUROSHIELD® CR</div>
        <h3>Onde o químico ataca.</h3>
        <p class="w">Epóxi modificado aplicado a spray, camada única de 0,4 a 4 mm.
          Alta resistência química, mecânica e a altas temperaturas.</p>
        <div class="for">Áreas de processo · contenção · piso industrial</div>
      </div>
    </div>
  </div>
</section>

<section class="dark" id="contato-cta">
  <div class="shell" style="text-align:center">
    <h2 class="rv">Sua planta não precisa parar<br>para ser protegida.</h2>
    <p class="lead on-dark rv" data-d="1" style="margin:18px auto 28px">
      Diagnóstico técnico sem custo. Um engenheiro avalia sua estrutura e apresenta
      o sistema, o cronograma e o prazo de garantia, por escrito.</p>
    <a class="btn btn-primary rv" data-d="2" href="../index.html#contato">Solicitar diagnóstico técnico</a>
    <p class="src-note rv" data-d="3">Conteúdo técnico desta página transcrito da ${s.source},
      publicada pela Duroshield Spray Systems.</p>
  </div>
</section>
</main>
${foot}`;
}

const dir = path.join(BASE, 'sistemas');
fs.mkdirSync(dir, { recursive: true });
for (const s of SYSTEMS) {
  const f = path.join(dir, `${s.slug}.html`);
  fs.writeFileSync(f, page(s), 'utf8');
  console.log(`  sistemas/${s.slug}.html  (${s.name})`);
}
console.log(`\n${SYSTEMS.length} paginas geradas.`);
