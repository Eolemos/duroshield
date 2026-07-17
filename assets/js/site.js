/* Duroshield — site behaviour
   No framework on purpose: the old site shipped 338 KB of HTML and 33 scripts.
   Speed is conversion for a buyer comparing suppliers on a plant floor. */

import * as THREE from './three.module.min.js';

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

  /* Metrics are left explicitly pending rather than invented. An empty case reads as
     honest; a fabricated number ends the engagement. */
  const CASES = [
    { logo: 'TAK.png', client: 'Takeda Pharma', loc: 'UNIDADE FABRIL',
      title: 'Membrana contínua em planta farmacêutica',
      body: 'Sistema de poliureia formando membrana contínua, homogênea e sem emendas, totalmente aderida — evitando percolação de água entre a membrana e o substrato.',
      metrics: [] },
    { logo: 'heineken.png', client: 'Heineken', loc: 'IGREJINHA / RS',
      title: 'Bacias de contenção de soda cáustica',
      body: 'As bacias de contenção da unidade foram revestidas com a linha SPR092, aplicada sobre a superfície existente — sem interromper o envase.',
      metrics: [] },
    { logo: 'Bayer-300x243-1.png', client: 'Bayer', loc: 'PLANTA INDUSTRIAL',
      title: 'Retrofit e proteção de cobertura',
      body: 'Retrofit aliado à impermeabilização e proteção da cobertura da planta, com o Sistema DUROSHIELD® Flex — refletividade, flexibilidade e estanqueidade.',
      metrics: [] },
    { logo: 'Unilever.png', client: 'Unilever', loc: 'FORNECEDORA HÁ 5+ ANOS',
      title: 'Retrofit de impermeabilização em poliureia',
      body: 'Mais um projeto de retrofit em uma das unidades. Método não destrutivo: revestimento de alto desempenho aplicado sem demolição do sistema existente.',
      metrics: [{ v: '5+', k: 'anos de fornecimento' }] },
    { logo: 'royal.png', client: 'Royal Palm Plaza', loc: 'CAMPINAS / SP',
      title: 'Estacionamento revestido em poliureia',
      body: 'Toda a área do estacionamento de veículos do hotel recebeu revestimento e impermeabilização pelos sistemas de poliureia DUROSHIELD®.',
      metrics: [{ v: '~3.000', k: 'm² aplicados' }, { v: '0', k: 'dias de operação parada' }] },
    { logo: 'ABB.png', client: 'ABB', loc: 'UNIDADE INDUSTRIAL',
      title: 'Impermeabilização de alto desempenho',
      body: 'Projeto executado com os sistemas Duroshield de revestimento e impermeabilização de alto desempenho.',
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

  /* ── cases ─────────────────────────────────────────────── */
  const cases = $('#cases');
  if (cases) CASES.forEach((c) => {
    const a = el('article', 'case');
    const metrics = c.metrics.length
      ? c.metrics.map((m) => '<div><div class="v">' + m.v + '</div><div class="k">' + m.k + '</div></div>').join('')
      : '<span class="pending">Números do projeto em levantamento</span>';
    a.innerHTML =
      '<div class="case-h"><img src="' + L + c.logo + '" alt="' + c.client + '" loading="lazy">' +
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

  /* ── hero membrane (WebGL) ─────────────────────────────── */
  const cv = $('#membrane');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cv && !reduced) {
    const T = THREE;
    const renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new T.Scene();
    const cam = new T.PerspectiveCamera(50, 1, .1, 200);
    cam.position.set(0, 1, 24);

    scene.add(new T.AmbientLight(0x8899ff, 1.1));
    const k = new T.DirectionalLight(0xffc400, 2.6); k.position.set(8, 11, 14); scene.add(k);
    const r2 = new T.DirectionalLight(0x2a35ff, 2.2); r2.position.set(-11, -6, 8); scene.add(r2);

    // One continuous elastic sheet — the product argument, shown rather than claimed.
    const geo = new T.PlaneGeometry(62, 38, 84, 52);
    const base = geo.attributes.position.array.slice();
    const sheet = new T.Mesh(geo, new T.MeshStandardMaterial({
      color: 0x1a22c8, roughness: .3, metalness: .75,
      transparent: true, opacity: .62, side: T.DoubleSide,
    }));
    sheet.rotation.x = -Math.PI / 2.5; sheet.position.y = -6; scene.add(sheet);

    const wire = new T.Mesh(new T.PlaneGeometry(62, 38, 40, 26), new T.MeshBasicMaterial({
      color: 0x4d5aff, wireframe: true, transparent: true, opacity: .18,
    }));
    wire.rotation.x = -Math.PI / 2.5; wire.position.y = -5.9; scene.add(wire);

    const N = 700, p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      p[i * 3] = (Math.random() - .5) * 120;
      p[i * 3 + 1] = (Math.random() - .5) * 70;
      p[i * 3 + 2] = (Math.random() - .5) * 60;
    }
    const dust = new T.Points(
      new T.BufferGeometry().setAttribute('position', new T.BufferAttribute(p, 3)),
      new T.PointsMaterial({ color: 0xffc400, size: .12, transparent: true, opacity: .45 })
    );
    scene.add(dust);

    function size() {
      const w = cv.clientWidth || innerWidth, h = cv.clientHeight || innerHeight;
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
    }
    addEventListener('resize', size); size();

    const m = { x: 0, y: 0 };
    addEventListener('pointermove', (e) => {
      m.x = (e.clientX / innerWidth - .5) * 2; m.y = (e.clientY / innerHeight - .5) * 2;
    }, { passive: true });

    // The hero canvas is the only always-on animation; pausing it offscreen keeps
    // the rest of the page cheap to scroll.
    let live = true;
    new IntersectionObserver((es) => { live = es[0].isIntersecting; }).observe(cv);

    const clock = new T.Clock();
    const tgt = new T.Vector3();
    (function tick() {
      requestAnimationFrame(tick);
      if (!live) return;
      const t = clock.getElapsedTime();
      const pos = geo.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = base[i], y = base[i + 1];
        pos[i + 2] = Math.sin(x * .16 + t * .7) * 1.5
                   + Math.cos(y * .2 - t * .5) * 1.15
                   + Math.sin((x + y) * .09 + t * .32) * .85;
      }
      geo.attributes.position.needsUpdate = true; geo.computeVertexNormals();
      dust.rotation.y = t * .015;
      tgt.set(m.x * 2.2, 1 - m.y * 1.5, 24);
      cam.position.lerp(tgt, .04); cam.lookAt(0, -3, 0);
      renderer.render(scene, cam);
    })();
  }
})();
