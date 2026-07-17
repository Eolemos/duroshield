// Scroll-driven foreground 3D: a living polyurea droplet that floats over the page,
// reacts to scroll and touch, and changes meaning per section.
//
// Why a droplet: water is the through-line of the whole site — infiltration is the
// enemy, polyurea is the liquid-applied defence. A single liquid blob stays on-topic
// in every section. It STRETCHES with scroll velocity (the 325% elongation, felt),
// SETTLES into a sealed sphere when idle, and shifts colour + caption per section so
// it always agrees with the copy on screen.

import * as THREE from './three.module.min.js';

const host = document.getElementById('scroll3d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (host && !reduced) {
  try { boot(); } catch (e) { host.remove(); }
}

function boot() {
  const canvas = host.querySelector('canvas');
  const label = host.querySelector('.s3d-label');
  const small = innerWidth < 720;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.AmbientLight(0xaab6ff, 1.7));
  const key = new THREE.DirectionalLight(0xffc400, 4.4); key.position.set(5, 6, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0x5a68ff, 4.2); rim.position.set(-6, -3, 4); scene.add(rim);
  const back = new THREE.DirectionalLight(0xffffff, 2.0); back.position.set(-2, 3, -6); scene.add(back);

  // Higher subdivision = smoother blob; dialled back on phones.
  const geo = new THREE.IcosahedronGeometry(1.7, small ? 6 : 9);
  const base = geo.attributes.position.array.slice();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x2d3ae8, emissive: 0x1220a0, emissiveIntensity: 0.8,
    roughness: 0.12, metalness: 0.86,
  });
  const blob = new THREE.Mesh(geo, mat);
  scene.add(blob);

  // A yellow inner core glows through — reads as the reactive polyurea component.
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 3),
    new THREE.MeshBasicMaterial({ color: 0xffc400, transparent: true, opacity: 0.16 })
  );
  scene.add(core);

  function size() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', size, { passive: true });
  size();

  // Scroll velocity drives elongation; it decays so the blob re-seals when you stop.
  let lastY = scrollY, vel = 0;
  addEventListener('scroll', () => {
    vel += Math.min(Math.abs(scrollY - lastY) * 0.006, 1.4);
    lastY = scrollY;
  }, { passive: true });

  // Pointer / touch nudges the blob and wakes a ripple.
  const ptr = { x: 0, y: 0, active: 0 };
  const move = (x, y) => {
    ptr.x = (x / innerWidth - 0.5) * 2;
    ptr.y = (y / innerHeight - 0.5) * 2;
    ptr.active = 1;
  };
  addEventListener('pointermove', (e) => move(e.clientX, e.clientY), { passive: true });
  addEventListener('touchmove', (e) => {
    if (e.touches[0]) { move(e.touches[0].clientX, e.touches[0].clientY); vel += 0.35; }
  }, { passive: true });

  // Per-section identity: colour + caption that agree with the copy in view.
  const SECTIONS = {
    topo:       { c: 0x1f2ad2, t: 'POLIUREIA · MEMBRANA LÍQUIDA' },
    membrana:   { c: 0x1f2ad2, t: 'CONTÍNUA · SEM EMENDAS' },
    obras:      { c: 0x2233c8, t: 'OBRA REAL · EXECUTADA' },
    problema:   { c: 0x2a6bd8, t: 'ÁGUA · A INFILTRAÇÃO' },
    contrato:   { c: 0x1f2ad2, t: 'UM CONTRATO · UM RESPONSÁVEL' },
    portfolio:  { c: 0x2233c8, t: 'QUEM NÃO PODE PARAR' },
    sistemas:   { c: 0x16b090, t: 'QUATRO SISTEMAS' },
    metodologia:{ c: 0x1f2ad2, t: 'APLICAÇÃO SEM PARADA' },
    contato:    { c: 0xffc400, t: 'DIAGNÓSTICO TÉCNICO' },
  };
  const ids = Object.keys(SECTIONS);
  let cur = 'topo';
  const targetColor = new THREE.Color(SECTIONS.topo.c);
  new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting && SECTIONS[e.target.id]) {
        cur = e.target.id;
        targetColor.set(SECTIONS[cur].c);
        if (label) label.textContent = SECTIONS[cur].t;
      }
    });
  }, { threshold: 0.5 }).observe;
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          cur = id; targetColor.set(SECTIONS[id].c);
          if (label) label.textContent = SECTIONS[id].t;
        }
      });
    }, { threshold: 0.4 }).observe(el);
  });

  // Only render while the tab is visible.
  let visible = true;
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

  const pos = geo.attributes.position.array;
  const v = new THREE.Vector3();
  const clock = new THREE.Clock();
  let stretch = 0;

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = clock.getElapsedTime();

    vel *= 0.92;                       // scroll energy decays -> blob re-seals
    stretch += (vel - stretch) * 0.1;
    ptr.active *= 0.96;

    // Displace each vertex along its normal with layered sine "noise", plus a
    // vertical stretch tied to scroll velocity — elongation you can watch happen.
    for (let i = 0; i < pos.length; i += 3) {
      const bx = base[i], by = base[i + 1], bz = base[i + 2];
      v.set(bx, by, bz);
      const n =
        Math.sin(bx * 2.1 + t * 1.3) * 0.10 +
        Math.cos(by * 2.4 - t * 1.1) * 0.10 +
        Math.sin(bz * 2.0 + t * 0.9) * 0.08 +
        Math.sin((bx + by + bz) * 1.5 + t * 0.6) * 0.06;
      const s = 1 + n + stretch * 0.14 * by * by;   // taller when scrolling fast
      pos[i] = bx * s * (1 - stretch * 0.05);
      pos[i + 1] = by * (s + stretch * 0.18);
      pos[i + 2] = bz * s * (1 - stretch * 0.05);
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();

    mat.color.lerp(targetColor, 0.05);
    core.material.color.lerp(new THREE.Color(cur === 'contato' ? 0xffffff : 0xffc400), 0.05);

    // Scroll spins it; pointer tilts it.
    blob.rotation.y += 0.004 + vel * 0.01;
    blob.rotation.x += 0.0016;
    blob.rotation.z = ptr.x * 0.25 * ptr.active;
    blob.position.x = ptr.x * 0.35 * ptr.active;
    blob.position.y = -ptr.y * 0.3 * ptr.active + Math.sin(t * 0.6) * 0.12;
    core.rotation.copy(blob.rotation);
    core.position.copy(blob.position);
    core.scale.setScalar(1 + stretch * 0.1 + Math.sin(t * 1.4) * 0.02);

    renderer.render(scene, camera);
  }
  frame();
  if (label) label.textContent = SECTIONS.topo.t;
}
