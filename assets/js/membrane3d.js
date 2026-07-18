// Live 3D polyurea membrane, the product itself: a sprayed liquid that cures into
// one continuous, elastic, seamless sheet. Rendered as a rippling brand-coloured
// surface so the "325% de alongamento, sem emendas" claim is felt, not just read.
//
// Progressive enhancement: loaded as a module, gated behind reduced-motion, and
// initialised only when its section scrolls into view. Isolated from site.js so a
// WebGL failure can never take the rest of the page down.

import * as THREE from './three.module.min.js';

const canvas = document.getElementById('membrane-canvas');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduced) {
  let started = false;

  const start = () => {
    if (started) return;
    started = true;
    try { run(); } catch (e) { canvas.closest('.membrane-3d')?.classList.add('no-gl'); }
  };

  // Don't pay for WebGL until the section is actually near the viewport.
  new IntersectionObserver((es, io) => {
    if (es.some((e) => e.isIntersecting)) { start(); io.disconnect(); }
  }, { rootMargin: '200px' }).observe(canvas);

  function run() {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 200);
    camera.position.set(0, 7, 26);
    camera.lookAt(0, -1, 0);

    scene.add(new THREE.AmbientLight(0x9fb0ff, 1.5));
    const key = new THREE.DirectionalLight(0xffc400, 3.6);
    key.position.set(10, 16, 14); scene.add(key);
    const rim = new THREE.DirectionalLight(0x4a58ff, 3.2);
    rim.position.set(-13, -4, 11); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffffff, 1.1);
    fill.position.set(0, 8, 22); scene.add(fill);

    // Fewer segments on small screens: same look, far less GPU on a phone.
    const seg = innerWidth < 640 ? 60 : 120;
    const geo = new THREE.PlaneGeometry(70, 44, seg, Math.round(seg * 0.6));
    const base = geo.attributes.position.array.slice();
    const membrane = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      color: 0x2530d8, emissive: 0x0a1060, emissiveIntensity: 0.5,
      roughness: 0.22, metalness: 0.85, side: THREE.DoubleSide,
    }));
    membrane.rotation.x = -Math.PI / 2.6;
    membrane.position.y = -3.5;
    scene.add(membrane);

    // A faint wire skin gives the surface a technical, engineered read.
    const wire = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 44, 48, 30),
      new THREE.MeshBasicMaterial({ color: 0x6a78ff, wireframe: true, transparent: true, opacity: 0.22 })
    );
    wire.rotation.x = membrane.rotation.x;
    wire.position.y = -3.35;
    scene.add(wire);

    // Suspended droplets: the "spray" made literal, drifting above the surface.
    const N = innerWidth < 640 ? 90 : 220;
    const pts = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pts[i * 3] = (Math.random() - 0.5) * 80;
      pts[i * 3 + 1] = Math.random() * 26 - 2;
      pts[i * 3 + 2] = (Math.random() - 0.5) * 44;
    }
    const spray = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)),
      new THREE.PointsMaterial({ color: 0xffc400, size: 0.16, transparent: true, opacity: 0.55 })
    );
    scene.add(spray);

    function resize() {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    addEventListener('resize', resize, { passive: true });
    resize();

    const pointer = { x: 0, y: 0 };
    addEventListener('pointermove', (e) => {
      pointer.x = (e.clientX / innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });

    // Pause when the section leaves the viewport, no wasted frames while the user
    // reads the rest of the page.
    let live = true;
    new IntersectionObserver((es) => { live = es[0].isIntersecting; }, { threshold: 0.01 })
      .observe(canvas);

    const posArr = geo.attributes.position.array;
    const sprayArr = spray.geometry.attributes.position.array;
    const clock = new THREE.Clock();
    const target = new THREE.Vector3();

    function frame() {
      requestAnimationFrame(frame);
      if (!live) return;
      const t = clock.getElapsedTime();

      // Elastic wave train: overlapping sines so the sheet breathes like a stretched
      // elastomer rather than a rigid grid.
      for (let i = 0; i < posArr.length; i += 3) {
        const x = base[i], y = base[i + 1];
        posArr[i + 2] =
          Math.sin(x * 0.15 + t * 0.7) * 1.7 +
          Math.cos(y * 0.19 - t * 0.5) * 1.3 +
          Math.sin((x + y) * 0.08 + t * 0.32) * 0.95;
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();

      for (let i = 1; i < sprayArr.length; i += 3) {
        sprayArr[i] -= 0.02 + (i % 5) * 0.004;      // droplets settle onto the membrane
        if (sprayArr[i] < -3) sprayArr[i] = 24;
      }
      spray.geometry.attributes.position.needsUpdate = true;
      spray.rotation.y = t * 0.02;

      target.set(pointer.x * 3, 7 - pointer.y * 2.5, 26);
      camera.position.lerp(target, 0.04);
      camera.lookAt(0, -1, 0);
      renderer.render(scene, camera);
    }
    frame();
  }
}
