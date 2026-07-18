/* Duroshield, site behaviour
   No framework on purpose: the old site shipped 338 KB of HTML and 33 scripts.
   Speed is conversion for a buyer comparing suppliers on a plant floor. */

(function () {
  'use strict';

  /* ── portfolio data ──────────────────────────────────────
     Logos are grouped by sector because "who else like me trusts them" is the
     question the buyer is actually asking. A flat carousel cannot answer it. */

  const L = 'assets/img/logos/';
  const SECTORS = [
    { id: 'farma', name: 'Farmacêutica & Saúde', logos: [
      ['TAK.png', 'Takeda'], ['Bayer-300x243-1.png', 'Bayer'],
      ['albert-einstein-hospital-logo-BD2D0B41B7-seeklogo.co_.jpg', 'Albert Einstein'],
      ['logo-sirio-libanes.png', 'Sírio-Libanês'], ['RedeDOr_Drupal8logo.png', "Rede D'Or"],
      ['fleury.png', 'Fleury'], ['dasa.png', 'Dasa'], ['unimed.png', 'Unimed'],
      ['santa-casa.png', 'Santa Casa'], ['sao-camilo.png', 'São Camilo'],
      ['DROGA-RAIA.png', 'Droga Raia'], ['vivalle.jpg', 'Vivalle'],
    ]},
    { id: 'alimentos', name: 'Alimentos & Bebidas', logos: [
      ['heineken.png', 'Heineken'], ['Ambev2.png', 'Ambev'], ['Coca-Cola-logo.png', 'Coca-Cola'],
      ['Bauducco-logo-9890473269-seeklogo.com_.png', 'Bauducco'], ['Ajinomoto128.png', 'Ajinomoto'],
      ['Campari.png_.png', 'Campari'],
    ]},
    { id: 'industria', name: 'Automotivo & Indústria', logos: [
      ['Ford.jpg', 'Ford'], ['GM-MOTORSS.png', 'GM'], ['HondA.png', 'Honda'],
      ['toyota.png', 'Toyota'], ['Subaru.png', 'Subaru'], ['CUMMINS.png', 'Cummins'],
      ['VALOUREC.jpg', 'Vallourec'], ['votorantim-pq.png', 'Votorantim'], ['rohr.png', 'Rohr'],
    ]},
    { id: 'energia', name: 'Energia & Infraestrutura', logos: [
      ['petrrobras.png', 'Petrobras'], ['gru-portfolio.png', 'GRU Airport'],
      ['Viracopos_Airport_Logo.jpg', 'Viracopos'], ['cesp.png', 'CESP'],
    ]},
    { id: 'consumo', name: 'Consumo & Varejo', logos: [
      ['Unilever.png', 'Unilever'], ['NATURA.png', 'Natura'], ['LOreal_logo.svg.png', "L'Oréal"],
      ['PG.jpg', 'P&G'], ['nike-1.png', 'Nike'], ['Logo-casas-bahia.png', 'Casas Bahia'],
      ['gpa_.png', 'GPA'],
    ]},
    { id: 'servicos', name: 'Financeiro & Serviços', logos: [
      ['Itau_Unibanco_logo_2023.svg.png', 'Itaú'], ['bradesco.png', 'Bradesco'],
      ['logo-santander.png', 'Santander'], ['bbrasil_.png', 'Banco do Brasil'],
      ['jll_.png', 'JLL'], ['Cushman.png_.png', 'Cushman'], ['iss_.jpg', 'ISS'],
      ['logo-goodstorage.png', 'GoodStorage'], ['Globo_logo_and_wordmark.svg.png', 'Globo'],
      ['CLARO.png', 'Claro'], ['TIM.png', 'TIM'], ['VIVO.png', 'Vivo'],
      ['CINEMARK.png', 'Cinemark'], ['MULTIPLAN.png', 'Multiplan'],
      ['PARK-SHOPPING.png', 'Park Shopping'], ['VillaLobos.png', 'Villa-Lobos'],
      ['BARRASHOP.png', 'Barra Shopping'], ['accor_.png', 'Accor'],
      ['holiday-inn.png', 'Holiday Inn'], ['royal.png', 'Royal Palm Plaza'],
      ['band_.png', 'Band'],
    ]},
    { id: 'publico', name: 'Educação & Público', logos: [
      ['USP.jpg', 'USP'], ['mackenzie-logo.png', 'Mackenzie'], ['fuvest_logo.png', 'Fuvest'],
      ['senac.png', 'Senac'], ['logo-governo-do-estado-sp.png', 'Governo do Estado de SP'],
    ]},
  ];

  /* ── obras gallery ───────────────────────────────────────
     Every frame is a real Duroshield job, recovered from the company's own media
     library, none of it had ever been published. */
  const P = 'assets/img/obras/';
  const GALLERY = [
    { f: 'heliponto-concluido', k: 'HELIPONTO · CONCLUÍDO',
      c: 'Poliureia SPR092 com sinalização executada no próprio acabamento do sistema, sem pintura sobreposta.',
      alt: 'Heliponto em cobertura revestido em poliureia azul com marcação de sinalização amarela, cidade ao fundo.' },
    { f: 'bayer-cobertura', k: 'BAYER · COBERTURA',
      c: 'Linha FLEX aplicada em telha metálica, com equipe própria e EPI completo.',
      alt: 'Aplicador com macacão, capacete, respirador e cinto de segurança aplicando revestimento branco em telhado metálico.' },
    { f: 'heineken-bacia-1', k: 'HEINEKEN · IGREJINHA/RS',
      c: 'Bacia de contenção revestida em SPR092 e testada com lâmina d’água.',
      alt: 'Bacia de contenção revestida em poliureia cinza, preenchida com água em teste de estanqueidade.' },
    { f: 'estacionamento-laje', k: 'ESTACIONAMENTO EM LAJE',
      c: 'Laje de estacionamento revestida e sinalizada, liberada para uso.',
      alt: 'Laje de estacionamento revestida em poliureia cinza com demarcação amarela e dezenas de carros estacionados.' },
    { f: 'heineken-bacia-3', k: 'HEINEKEN · DETALHE',
      c: 'Tratamento de junta e canto vivo, onde a manta tradicional falha primeiro.',
      alt: 'Detalhe de canto e junta de bacia de contenção revestida em poliureia.' },
    { f: 'cobertura-fuvest', k: 'COBERTURA INSTITUCIONAL',
      c: 'Retrofit de cobertura com sistema refletivo, sem interromper a operação do prédio.',
      alt: 'Cobertura de prédio institucional durante aplicação de revestimento Duroshield.' },
    { f: 'obra-detalhe', k: 'CALHA E TELHA · DETALHE',
      c: 'Membrana contínua sobre telha metálica e calha, sem emenda no ponto onde a manta falha primeiro.',
      alt: 'Detalhe de calha e telha metálica revestidas com membrana contínua branca, sem emendas.' },
  ];

  /* Case metrics are left explicitly pending rather than invented. An empty slot reads
     as honest; a fabricated number on a Bayer case ends the engagement. */
  const CASES = [
    { logo: 'heineken.png', client: 'Heineken', loc: 'IGREJINHA / RS',
      photo: 'heineken-bacia-2',
      alt: 'Bacia de contenção da Heineken revestida em poliureia Duroshield.',
      title: 'Bacias de contenção de soda cáustica',
      body: 'As bacias de contenção da unidade foram revestidas com a linha SPR092, aplicada sobre a superfície existente, sem interromper o envase.',
      metrics: [] },
    { logo: 'Bayer-300x243-1.png', client: 'Bayer', loc: 'SÃO JOSÉ DOS CAMPOS / SP',
      photo: 'bayer-cobertura',
      alt: 'Equipe Duroshield aplicando revestimento na cobertura da planta da Bayer.',
      title: 'Retrofit e proteção de cobertura',
      body: 'Retrofit aliado à impermeabilização e proteção da cobertura da planta, com o Sistema DUROSHIELD® Flex, refletividade, flexibilidade e estanqueidade.',
      metrics: [] },
    { logo: 'royal.png', client: 'Royal Palm Plaza', loc: 'CAMPINAS / SP',
      photo: 'estacionamento-laje',
      alt: 'Estacionamento em laje revestido e sinalizado.',
      title: 'Estacionamento revestido em poliureia',
      body: 'Toda a área do estacionamento de veículos do hotel recebeu revestimento e impermeabilização pelos sistemas de poliureia DUROSHIELD®.',
      metrics: [{ v: '~3.000', k: 'm² aplicados' }, { v: '0', k: 'dias de operação parada' }] },
    { logo: 'TAK.png', client: 'Takeda Pharma', loc: 'UNIDADE FABRIL',
      photo: 'aplicacao-planta-operacao',
      alt: 'Aplicação de poliureia em torno de tubulação industrial em operação.',
      title: 'Membrana contínua em planta farmacêutica',
      body: 'Poliureia formando membrana contínua, homogênea e sem emendas, totalmente aderida, evitando percolação de água entre a membrana e o substrato.',
      metrics: [] },
    { logo: 'Unilever.png', client: 'Unilever', loc: 'FORNECEDORA HÁ 5+ ANOS',
      photo: 'hidrojateamento',
      alt: 'Preparo de substrato por hidrojateamento antes da aplicação.',
      title: 'Retrofit de impermeabilização em poliureia',
      body: 'Método não destrutivo: preparo por hidrojateamento e revestimento de alto desempenho aplicado sem demolição do sistema existente.',
      metrics: [{ v: '5+', k: 'anos de fornecimento' }] },
    // No client logo here: the source material never names whose heliponto this is,
    // and attributing a job to the wrong client is not a risk worth taking.
    { logo: null, client: 'Heliponto', loc: 'COBERTURA / SP',
      photo: 'heliponto-concluido',
      alt: 'Heliponto concluído em poliureia azul com sinalização amarela.',
      title: 'Heliponto: impermeabilização e sinalização',
      body: 'Área exposta a intempéries e à frequência de pousos e decolagens. A sinalização foi executada no acabamento do próprio sistema, sem camada adicional.',
      metrics: [] },
  ];

  const $ = (s, r) => (r || document).querySelector(s);
  const el = (t, c) => { const n = document.createElement(t); if (c) n.className = c; return n; };

  /* ── hero proof strip ──────────────────────────────────── */
  const HERO_LOGOS = [
    ['petrrobras.png', 'Petrobras'], ['gru-portfolio.png', 'GRU Airport'],
    ['Bayer-300x243-1.png', 'Bayer'], ['heineken.png', 'Heineken'],
    ['Unilever.png', 'Unilever'], ['TAK.png', 'Takeda'], ['Coca-Cola-logo.png', 'Coca-Cola'],
  ];
  const strip = $('#proofStrip');
  if (strip) HERO_LOGOS.forEach(([f, n]) => {
    const sp = el('span'); sp.title = n;
    const i = new Image(); i.src = L + f; i.alt = n; i.loading = 'eager';
    sp.appendChild(i); strip.appendChild(sp);
  });

  /* ── portfolio wall + sector filter ────────────────────── */
  const wall = $('#wall'), chips = $('#sectors');
  if (wall && chips) {
    const all = [];
    SECTORS.forEach((s) => s.logos.forEach(([f, n]) => all.push({ sector: s.id, file: f, name: n })));

    all.forEach((l) => {
      const sp = el('span'); sp.dataset.sector = l.sector; sp.title = l.name;
      const im = new Image(); im.src = L + l.file; im.alt = l.name; im.loading = 'lazy';
      sp.appendChild(im); wall.appendChild(sp);
    });

    const mk = (id, label) => {
      const b = el('button', 'chip'); b.type = 'button'; b.textContent = label;
      b.dataset.f = id; b.setAttribute('aria-pressed', id === 'all');
      if (id === 'all') b.classList.add('on');
      b.onclick = () => {
        chips.querySelectorAll('.chip').forEach((c) => {
          const on = c === b;
          c.classList.toggle('on', on); c.setAttribute('aria-pressed', on);
        });
        wall.querySelectorAll('span').forEach((sp) => {
          sp.hidden = id !== 'all' && sp.dataset.sector !== id;
        });
      };
      chips.appendChild(b);
    };
    mk('all', 'Todos (' + all.length + ')');
    SECTORS.forEach((s) => mk(s.id, s.name));
  }

  /* ── obras gallery ─────────────────────────────────────── */
  const gal = $('#gal');
  if (gal) GALLERY.forEach((g) => {
    const fig = el('figure');
    fig.innerHTML =
      '<img src="' + P + g.f + '@800.webp" alt="' + g.alt + '" loading="lazy" decoding="async"' +
        ' srcset="' + P + g.f + '@800.webp 800w, ' + P + g.f + '@1200.webp 1200w"' +
        ' sizes="(max-width:900px) 100vw, 50vw">' +
      '<figcaption><b>' + g.k + '</b>' + g.c + '</figcaption>';
    gal.appendChild(fig);
  });

  /* ── cases ─────────────────────────────────────────────── */
  const cases = $('#cases');
  if (cases) CASES.forEach((c) => {
    const a = el('article', 'case');
    const metrics = c.metrics.length
      ? c.metrics.map((m) => '<div><div class="v">' + m.v + '</div><div class="k">' + m.k + '</div></div>').join('')
      : '<span class="pending">Números do projeto em levantamento</span>';
    a.innerHTML =
      '<div class="case-im"><img src="' + P + c.photo + '@800.webp" alt="' + c.alt + '"' +
        ' loading="lazy" decoding="async"' +
        ' srcset="' + P + c.photo + '@800.webp 800w, ' + P + c.photo + '@1200.webp 1200w"' +
        ' sizes="(max-width:640px) 100vw, 33vw"></div>' +
      '<div class="case-h">' +
        (c.logo
          ? '<span class="plate"><img src="' + L + c.logo + '" alt="' + c.client + '" loading="lazy"></span>'
          : '<span class="plate plate-txt">' + c.client + '</span>') +
        '<span class="loc">' + c.loc + '</span></div>' +
      '<div class="case-b"><h4>' + c.title + '</h4><p>' + c.body + '</p></div>' +
      '<div class="case-m">' + metrics + '</div>';
    cases.appendChild(a);
  });

  /* ── header, menu, reveal, counters ────────────────────── */
  const hdr = $('#hdr');
  addEventListener('scroll', () => hdr.classList.toggle('stuck', scrollY > 40), { passive: true });

  const burger = $('#burger'), nav = $('#nav');
  if (burger) {
    burger.onclick = () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    };
    nav.querySelectorAll('a').forEach((a) => a.onclick = () => {
      nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
    });
  }

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .15 });
  document.querySelectorAll('.rv').forEach((n) => io.observe(n));

  const cio = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      const end = +e.target.dataset.count, t0 = performance.now(), D = 1300;
      (function step(now) {
        const k = Math.min((now - t0) / D, 1);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach((n) => cio.observe(n));

  /* ── pointer 3D tilt ───────────────────────────────────
     Adds real depth on hover for mouse users. Skipped entirely on touch and
     reduced-motion, where it would only jitter. */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine && !calm) {
    document.querySelectorAll('.gal figure, #sistemas .sy, .case').forEach((card) => {
      card.classList.add('tilt');
      card.parentElement.classList.add('tilt-wrap');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ── form ──────────────────────────────────────────────── */
  const form = $('#form');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('input[required], select[required]').forEach((f) => {
      const bad = !f.value.trim() || (f.id === 'fone' && f.value.replace(/\D/g, '').length < 10);
      f.closest('.field').classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) { form.querySelector('.field.invalid input, .field.invalid select').focus(); return; }

    // No backend yet: hand the qualified lead straight to the sales WhatsApp so no
    // enquiry is lost while the form endpoint is being wired up.
    const d = new FormData(form);
    const msg = 'Solicitacao de diagnostico tecnico%0A%0A'
      + 'Nome: ' + d.get('nome') + '%0A'
      + 'Empresa: ' + d.get('empresa') + '%0A'
      + 'WhatsApp: ' + d.get('fone') + '%0A'
      + 'Tipo de area: ' + d.get('area');
    open('https://wa.me/5511941341776?text=' + msg, '_blank', 'noopener');
  });

})();
