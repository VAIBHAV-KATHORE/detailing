/* ==================== CONFIG — edit content here ==================== */
const WA_NUMBER = "919999999999"; // <-- REPLACE with client WhatsApp number (country code + number, no + or spaces)
const COLORS = [
  ["OBSIDIAN BLACK", "#0d0d0f"],
  ["DEVILS RED", "#b1000e"],
  ["PEARL WHITE", "#ececf0"],
  ["GRAPHITE GREY", "#3b3e44"],
  ["ELECTRIC BLUE", "#0b47ff"],
  ["MIDNIGHT PURPLE", "#2b0c66"],
];
const FINISHES = {
  GLOSS: {
    roughness: 0.06,
    metalness: 0.25,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
  },
  SATIN: {
    roughness: 0.35,
    metalness: 0.3,
    clearcoat: 0.35,
    clearcoatRoughness: 0.3,
  },
  MATTE: {
    roughness: 0.85,
    metalness: 0.05,
    clearcoat: 0,
    clearcoatRoughness: 0.6,
  },
  METALLIC: {
    roughness: 0.22,
    metalness: 0.95,
    clearcoat: 0.8,
    clearcoatRoughness: 0.08,
  },
};
// [card title, description, icon glyph, value in booking form dropdown]
const SERVICES = [
  [
    "PPF",
    "Self-healing paint protection film against chips, UV and scratches.",
    "◈",
    "PPF",
  ],
  [
    "WRAPPING",
    "Colour-change wraps in gloss, satin, matte and metallic finishes.",
    "❖",
    "Vehicle Wrapping",
  ],
  [
    "CERAMIC COATING",
    "Hydrophobic nano-coating for depth, gloss and easy maintenance.",
    "◇",
    "Ceramic Coating",
  ],
  [
    "DETAILING",
    "Meticulous full-vehicle detailing, inside and out.",
    "✦",
    "Detailing",
  ],
  [
    "PAINT CORRECTION",
    "Multi-stage polishing removes swirls, haze and oxidation.",
    "◎",
    "Paint Correction",
  ],
  [
    "INTERIOR DETAILING",
    "Deep clean, leather care and odour removal.",
    "▣",
    "Interior",
  ],
  [
    "EXTERIOR DETAILING",
    "Decontamination, clay, polish and sealant finish.",
    "◆",
    "Exterior",
  ],
];
const STATS = [
  [10, "+", "YEARS EXPERIENCE"],
  [5, "K+", "VEHICLES TRANSFORMED"],
  [20, "K+", "SERVICES COMPLETED"],
  [100, "%", "PASSION FOR CARS"],
];
const STANDARD = [
  ["PRECISION", "Every panel measured, every edge finished.", "◎"],
  ["PREMIUM MATERIALS", "Only certified films, coatings and compounds.", "◈"],
  ["EXPERT TECHNICIANS", "Trained hands with years behind the buffer.", "✦"],
  [
    "ADVANCED TECHNOLOGY",
    "Paint-depth gauges, inspection lighting, curing lamps.",
    "❖",
  ],
  ["QUALITY CONTROL", "A final inspection before every handover.", "▣"],
];
const STEPS = [
  ["CONSULTATION", "We listen to what you want for your car."],
  ["INSPECTION", "Paint depth and condition checked under studio light."],
  ["PREPARATION", "Wash, decontaminate and correct the surface."],
  ["APPLICATION", "Film, wrap or coating applied in a controlled bay."],
  ["QUALITY CHECK", "Every panel inspected against our checklist."],
  ["FINAL REVEAL", "You collect a car that looks better than new."],
];
const GALLERY = [
  ["PPF", "Full-front PPF"],
  ["WRAPPING", "Satin midnight wrap"],
  ["CERAMIC", "9H ceramic finish"],
  ["DETAILING", "Showroom detail"],
  ["INTERIOR", "Leather restoration"],
  ["EXTERIOR", "Exterior decontamination"],
  ["PPF", "Track-day PPF"],
  ["WRAPPING", "Colour-shift wrap"],
  ["CERAMIC", "Graphene layer"],
  ["DETAILING", "Paint correction"],
  ["INTERIOR", "Cabin deep clean"],
  ["EXTERIOR", "Alloy refinish"],
];
const TESTI = [
  [
    "Absolutely incredible transformation. The car looks better than new.",
    "Premium Vehicle Owner",
  ],
  ["The PPF is invisible and the gloss is unreal.", "Sports Car Owner"],
  ["They treated my car like their own. Flawless work.", "Luxury SUV Owner"],
  ["My wrap looks factory-painted. Worth every rupee.", "Wrap Customer"],
  [
    "Ceramic coating water beads like nothing I have seen.",
    "Detailing Customer",
  ],
];
/* ==================================================================== */

(() => {
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  if (!window.gsap || !window.ScrollTrigger) {
    document.body.classList.remove("lock");
    const p = $("#pre");
    if (p) p.remove();
    document.body.classList.add("nogl");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  const mob = innerWidth < 768;
  const low =
    (navigator.hardwareConcurrency || 4) <= 2 ||
    (navigator.deviceMemory || 4) <= 2;
  const hasGL = () => {
    try {
      const c = document.createElement("canvas");
      return !!(
        window.THREE &&
        (c.getContext("webgl2") || c.getContext("webgl"))
      );
    } catch (e) {
      return false;
    }
  };
  const use3d = hasGL() && !(low && mob);
  const cfg = { color: 1, finish: "GLOSS" };
  let paint = null,
    auto = true,
    lights = false,
    zoom = 1,
    run = true,
    rotY = 0,
    vel = 0;
  const cam = { az: 0.6, d: 8, y: 1.7 },
    fx = { ppf: 0, drop: 0 },
    I = { z: 1 };

  /* ---------- generated content ---------- */
  $$(".sws").forEach((w) =>
    COLORS.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "sw";
      b.dataset.i = i;
      b.title = c[0];
      b.setAttribute("aria-label", c[0]);
      b.style.setProperty("--c", c[1]);
      w.appendChild(b);
    }),
  );
  $("#cards").innerHTML = SERVICES.map(
    ([n, d, g, v], i) =>
      `<article class="card tilt"><div class="img" style="--h:${i * 40}"><span class="ic">${g}</span><svg viewBox="0 0 400 150" role="img" aria-label="${n}"><use href="#car"/></svg></div><h3>${n}</h3><p>${d}</p><a href="#book" class="btn sm" data-s="${v}">EXPLORE</a></article>`,
  ).join("");
  $("#std").innerHTML = STANDARD.map(
    ([n, d, g]) =>
      `<div class="std tilt"><span class="ic">${g}</span><h3>${n}</h3><p>${d}</p></div>`,
  ).join("");
  $("#stats").innerHTML = STATS.map(
    ([n, s, l]) =>
      `<div class="stat tilt"><span class="num" data-n="${n}" data-s="${s}">0</span><em>${l}</em></div>`,
  ).join("");
  $("#tl").insertAdjacentHTML(
    "beforeend",
    STEPS.map(
      ([n, d], i) =>
        `<div class="step"><i>0${i + 1}</i><h3>${n}</h3><p>${d}</p></div>`,
    ).join(""),
  );
  $("#grid").innerHTML = GALLERY.map(
    ([c, t], i) =>
      `<figure class="tile" data-cat="${c}" data-cur="VIEW" style="--paint:hsl(${i * 31} 70% 38%)"><svg viewBox="0 0 400 150" role="img" aria-label="${t}"><use href="#car"/></svg><figcaption>${t}</figcaption></figure>`,
  ).join("");
  $("#tt").innerHTML = TESTI.map(
    ([q, c]) =>
      `<div class="t"><span class="s">★★★★★</span><q>${q}</q><cite>— ${c}</cite></div>`,
  ).join("");
  const wa =
    "https://wa.me/" +
    WA_NUMBER +
    "?text=" +
    encodeURIComponent("Hi Detailing Devils, I would like to book a service.");
  $$(".wal").forEach((a) => (a.href = wa));

  /* ---------- colour / finish ---------- */
  function setLook(ci, fin) {
    if (ci != null) cfg.color = ci;
    if (fin) cfg.finish = fin;
    const [n, h] = COLORS[cfg.color];
    document.documentElement.style.setProperty("--paint", h);
    $$(".sw").forEach((b) =>
      b.classList.toggle("on", +b.dataset.i === cfg.color),
    );
    $$(".fn").forEach((b) =>
      b.classList.toggle("on", b.dataset.f === cfg.finish),
    );
    $("#cur").textContent = n + " · " + cfg.finish;
      if (paint) gsap.fromTo(I, { z: .93 }, { z: 1, duration: 1.4, ease: 'power3.out', overwrite: 'auto' });
    if (paint) {
      const c = new THREE.Color(h);
      gsap.to(paint.color, {
        r: c.r,
        g: c.g,
        b: c.b,
        duration: 0.9,
        ease: "power2.inOut",
      });
      gsap.to(paint, { ...FINISHES[cfg.finish], duration: 0.9 });
    }
  }
  document.addEventListener("click", (e) => {
    const s = e.target.closest(".sw");
    if (s) setLook(+s.dataset.i);
    const f = e.target.closest(".fn");
    if (f) setLook(null, f.dataset.f);
    const d = e.target.closest("[data-s]");
    if (d) $("#svc").value = d.dataset.s;
  });
  $("#bRot").onclick = (e) => {
    auto = !auto;
    e.currentTarget.classList.toggle("on", auto);
  };
  $("#zoom").oninput = (e) => (zoom = +e.target.value);
  $("#bCol").onclick = () => setLook((cfg.color + 1) % COLORS.length);
  $("#bLit").onclick = (e) => {
    lights = !lights;
    e.currentTarget.classList.toggle("on", lights);
  };

  /* ---------- THREE.js showroom ---------- */
  function init3d() {
    const cv = $("#gl"),
      R = new THREE.WebGLRenderer({
        canvas: cv,
        antialias: !mob,
        powerPreference: "high-performance",
      });
    R.setPixelRatio(Math.min(devicePixelRatio, mob ? 1.25 : 2));
    R.outputEncoding = THREE.sRGBEncoding;
    R.toneMapping = THREE.ACESFilmicToneMapping;
    R.toneMappingExposure = 1.05;
    const S = new THREE.Scene();
    S.background = new THREE.Color(0x050505);
    S.fog = new THREE.FogExp2(0x050505, 0.045);
    const C = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    // studio reflections (procedural environment)
    const E = new THREE.Scene();
    E.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(30, 14, 30),
        new THREE.MeshBasicMaterial({ color: 0x080808, side: THREE.BackSide }),
      ),
    );
    [
      [0, 6, 0, 10, 0.2, 3, 1],
      [-10, 3, 0, 0.2, 4, 10, 0],
      [10, 3, 0, 0.2, 4, 10, 1],
      [0, 3, -10, 10, 3, 0.2, 0],
    ].forEach(([x, y, z, w, h, d, wh]) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshBasicMaterial({
          color: wh
            ? new THREE.Color(1, 1, 1).multiplyScalar(5)
            : new THREE.Color(1, 0.05, 0.08).multiplyScalar(4),
        }),
      );
      m.position.set(x, y, z);
      E.add(m);
    });
    S.environment = new THREE.PMREMGenerator(R).fromScene(E, 0.02).texture;
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(3, 6, 4);
    S.add(key);
    const r1 = new THREE.PointLight(0xff1a2b, 2, 14);
    r1.position.set(-4, 2.5, 3);
    const r2 = r1.clone();
    r2.position.set(4, 2.5, -3);
    S.add(r1, r2);
    const ug = new THREE.PointLight(0xff1a2b, 0, 6);
    ug.position.set(0, 0.2, 0);
    S.add(ug);
    const fl = new THREE.Mesh(
      new THREE.CircleGeometry(14, 64),
      new THREE.MeshStandardMaterial({
        color: 0x070707,
        roughness: 0.18,
        metalness: 0.85,
      }),
    );
    fl.rotation.x = -Math.PI / 2;
    S.add(fl);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(3.3, 3.36, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff1a2b,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    S.add(ring);
    const glow = new THREE.Mesh(
      new THREE.RingGeometry(3.2, 4, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff1a2b,
        transparent: true,
        opacity: 0.07,
        side: THREE.DoubleSide,
      }),
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.01;
    S.add(glow);

    /* ===== MODEL: procedural car. To use a real GLB, load it with GLTFLoader, add it to `car`
     (remove the meshes below) and assign `paint` to the body material — see README notes. ===== */
    const rot = new THREE.Group(),
      car = new THREE.Group();
    car.rotation.y = -Math.PI / 2;
    rot.add(car);
    S.add(rot);
    const seg = mob ? 3 : 6;
    const ex = (pts, w, b) => {
      const s = new THREE.Shape();
      pts.forEach((p, i) => (i ? s.lineTo(p[0], p[1]) : s.moveTo(p[0], p[1])));
      const g = new THREE.ExtrudeGeometry(s, {
        depth: w,
        bevelEnabled: true,
        bevelSize: b,
        bevelThickness: b,
        bevelSegments: seg,
        curveSegments: 8,
      });
      g.translate(0, 0, -w / 2);
      return g;
    };
    paint = new THREE.MeshPhysicalMaterial({
      color: COLORS[1][1],
      ...FINISHES.GLOSS,
      envMapIntensity: 1.4,
    });
    const bodyG = ex(
      [
        [-2.15, 0.3],
        [-2.2, 0.55],
        [-2.05, 0.9],
        [-1.2, 0.98],
        [0.6, 0.98],
        [1.5, 0.92],
        [2.05, 0.78],
        [2.2, 0.55],
        [2.15, 0.3],
      ],
      1.7,
      0.14,
    );
    const glass = new THREE.Mesh(
      ex(
        [
          [-1.25, 0.98],
          [-0.65, 1.34],
          [0.15, 1.4],
          [0.9, 0.98],
        ],
        1.35,
        0.05,
      ),
      new THREE.MeshPhysicalMaterial({
        color: 0x05070a,
        roughness: 0.05,
        metalness: 0.9,
        clearcoat: 1,
      }),
    );
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 1.3), paint);
    roof.position.set(-0.25, 1.395, 0);
    roof.rotation.z = 0.075;
    car.add(new THREE.Mesh(bodyG, paint), glass, roof);
    const tire = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.7,
      }),
      rim = new THREE.MeshStandardMaterial({
        color: 0xc8ccd2,
        metalness: 1,
        roughness: 0.2,
      });
    [
      [1.4, 1],
      [1.4, -1],
      [-1.4, 1],
      [-1.4, -1],
    ].forEach(([x, z]) => {
      const w = new THREE.Group();
      w.add(
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.44, 0.44, 0.32, mob ? 20 : 36),
          tire,
        ),
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 0.34, mob ? 8 : 16),
          rim,
        ),
      );
      w.rotation.x = Math.PI / 2;
      w.position.set(x, 0.44, z * 0.92);
      car.add(w);
    });
    const hl = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.4,
      }),
      tl = new THREE.MeshStandardMaterial({
        color: 0x330000,
        emissive: 0xff0010,
        emissiveIntensity: 1.2,
      });
    [0.62, -0.62].forEach((z) => {
      const a = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.4), hl);
      a.position.set(2.32, 0.7, z);
      car.add(a);
    });
    const tb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 1.5), tl);
    tb.position.set(-2.33, 0.75, 0);
    car.add(tb);

      /* ===== ADD-ON 1: extra 3D detail, glow, beams, dust, mirror floor ===== */
  const upd = [];
  const dark = new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: .4, metalness: .6 });
  const cf = new THREE.MeshStandardMaterial({ color: 0x14141a, roughness: .35, metalness: .9 });
  const redM = new THREE.MeshBasicMaterial({ color: 0xff1a2b });
  const add = (g, m, x, y, z, rx = 0, ry = 0, rz = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.rotation.set(rx, ry, rz); car.add(o); return o; };
  add(new THREE.BoxGeometry(.5, .05, 1.9), cf, 2.25, .3, 0);                 // front splitter
  add(new THREE.BoxGeometry(.6, .06, 1.5), cf, -2.2, .32, 0, 0, 0, .2);      // diffuser
  add(new THREE.BoxGeometry(.5, .04, 1.9), cf, -2.05, 1.12, 0, 0, 0, .12);   // wing blade
  add(new THREE.BoxGeometry(.04, .12, .9), dark, 2.345, .52, 0);             // grille
  [.98, -.98].forEach(z => add(new THREE.BoxGeometry(2.6, .06, .06), cf, 0, .34, z));           // side skirts
  [.7, -.7].forEach(z => add(new THREE.BoxGeometry(.06, .2, .05), cf, -2.02, 1.02, z));         // wing supports
  [1, -1].forEach(s => {
    add(new THREE.BoxGeometry(.18, .1, .2), paint, .85, 1.02, s * 1.08);                        // mirrors
    [-.55, .5].forEach(x => add(new THREE.BoxGeometry(.015, .62, .01), dark, x, .62, s * .995)); // door lines
    add(new THREE.BoxGeometry(.5, .12, .01), dark, -1, .6, s * .995);                           // side intake
  });
  const wheelsG = [];
  [[1.4, 1], [1.4, -1], [-1.4, 1], [-1.4, -1]].forEach(([x, z]) => {
    const g = new THREE.Group(); g.position.set(x, .44, z * 1.1);
    for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(.56, .05, .02), cf); s.rotation.z = i * Math.PI / 5; g.add(s); }
    g.add(new THREE.Mesh(new THREE.TorusGeometry(.3, .02, 8, 32), redM)); car.add(g); wheelsG.push(g); });
  upd.push((t, dt) => wheelsG.forEach(g => g.rotation.z -= dt * (auto ? 1.2 : .2) + vel * .3));
  // glow sprites
  const gc = document.createElement('canvas'); gc.width = gc.height = 64; const gx = gc.getContext('2d'), gr = gx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.3, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); gx.fillStyle = gr; gx.fillRect(0, 0, 64, 64);
  const gt = new THREE.CanvasTexture(gc);
  const spr = (c, x, y, z, s) => { const p = new THREE.Sprite(new THREE.SpriteMaterial({ map: gt, color: c, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); p.position.set(x, y, z); p.scale.setScalar(s); car.add(p); return p; };
  const glows = [spr(0xbfe0ff, 2.4, .7, .62, .9), spr(0xbfe0ff, 2.4, .7, -.62, .9), spr(0xff1020, -2.4, .75, .5, 1), spr(0xff1020, -2.4, .75, -.5, 1)];
  upd.push(t => glows.forEach((g, i) => g.material.opacity = (lights ? 1 : .35) + Math.sin(t * .003 + i) * .05));
  // headlight beams (LIGHTS button)
  const beams = [.62, -.62].map(z => { const b = new THREE.Mesh(new THREE.ConeGeometry(.65, 4.5, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xdfeeff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); b.rotation.z = Math.PI / 2 + .04; b.position.set(4.65, .62, z); car.add(b); return b; });
  upd.push(() => beams.forEach(b => b.material.opacity += ((lights ? .09 : 0) - b.material.opacity) * .08));
  // PPF scan beam
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshBasicMaterial({ color: 0xff2a3a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); scan.rotation.y = Math.PI / 2; car.add(scan);
  upd.push(t => { scan.position.set(Math.sin(t * .0016) * 2.2, .85, 0); scan.material.opacity = fx.ppf * .28; });
  // dust + dashed turntable ring
  const DN = mob ? 60 : 160, dp = new Float32Array(DN * 3);
  for (let i = 0; i < DN; i++) { dp[i * 3] = (Math.random() - .5) * 14; dp[i * 3 + 1] = Math.random() * 5; dp[i * 3 + 2] = (Math.random() - .5) * 14; }
  const dgm = new THREE.BufferGeometry(); dgm.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  S.add(new THREE.Points(dgm, new THREE.PointsMaterial({ color: 0xffb0b8, size: .035, transparent: true, opacity: .5, blending: THREE.AdditiveBlending, depthWrite: false })));
  upd.push((t, dt) => { for (let i = 0; i < DN; i++) { dp[i * 3 + 1] += dt * .06; dp[i * 3] += Math.sin(t * .0004 + i) * .0007; if (dp[i * 3 + 1] > 5) dp[i * 3 + 1] = 0; } dgm.attributes.position.needsUpdate = true; });
  const pts = []; for (let i = 0; i <= 128; i++) pts.push(new THREE.Vector3(Math.cos(i / 128 * 6.2832) * 4.5, .02, Math.sin(i / 128 * 6.2832) * 4.5));
  const dash = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: 0xff3040, dashSize: .25, gapSize: .2, transparent: true, opacity: .6 })); dash.computeLineDistances(); S.add(dash);
  upd.push((t, dt) => dash.rotation.y += dt * .15);
      /* ===== ADD-ON 3: WOW pack ===== */
  const txt = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return new THREE.CanvasTexture(c); };
  // number plates
  const plateT = txt(256, 64, (g, w, h) => { g.fillStyle = '#0a0a0a'; g.fillRect(0, 0, w, h); g.strokeStyle = '#d1101f'; g.lineWidth = 4; g.strokeRect(2, 2, w - 4, h - 4); g.fillStyle = '#fff'; g.font = '700 30px Syncopate,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('DEVILS', w / 2, h / 2 + 2); });
  [[2.36, Math.PI / 2], [-2.36, -Math.PI / 2]].forEach(([x, ry]) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(.62, .155), new THREE.MeshBasicMaterial({ map: plateT })); p.position.set(x, .5, 0); p.rotation.y = ry; car.add(p); });
  // brand text on floor
  const bt = txt(1024, 128, (g, w, h) => { g.font = '700 64px Syncopate,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = 'rgba(255,255,255,.9)'; g.fillText('D E T A I L I N G   D E V I L S', w / 2, h / 2); });
  const brand = new THREE.Mesh(new THREE.PlaneGeometry(6, .75), new THREE.MeshBasicMaterial({ map: bt, transparent: true, opacity: .28, depthWrite: false })); brand.rotation.x = -Math.PI / 2; brand.position.set(0, .015, 5.4); S.add(brand);
  // paint-reactive floor glow
  const W = new THREE.Color(1, 1, 1), RD = new THREE.Color(1, .1, .15);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(6, 64), new THREE.MeshBasicMaterial({ map: gt, transparent: true, opacity: .35, blending: THREE.AdditiveBlending, depthWrite: false, color: 0xff1a2b })); pool.rotation.x = -Math.PI / 2; pool.position.y = .02; S.add(pool);
  upd.push(() => { pool.material.color.copy(paint.color).lerp(W, .35); ring.material.color.copy(paint.color).lerp(RD, .5); });
  // overhead spotlight + visible light cone
  const sp = new THREE.SpotLight(0xffffff, 2.2, 20, .45, 1); sp.position.set(0, 9, 1); S.add(sp, sp.target);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(3.4, 9, 48, 1, true), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .045, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); cone.position.set(0, 4.5, 1); S.add(cone);
  // halo arcs
  const halos = [4.6, 5.4].map((r, i) => { const h = new THREE.Mesh(new THREE.TorusGeometry(r, .018, 8, 128, Math.PI * 1.3), new THREE.MeshBasicMaterial({ color: i ? 0xffffff : 0xff1a2b })); h.rotation.x = Math.PI / 2; h.position.y = 3.2 + i * .5; S.add(h); return h; });
  upd.push((t, dt) => halos.forEach((h, i) => { h.rotation.z += dt * (i ? -.25 : .35); h.position.y = 3.2 + i * .5 + Math.sin(t * .001 + i) * .1; }));
  // light towers
  for (let i = 0; i < 6; i++) { const a = i / 6 * 6.2832 + .3, b = new THREE.Mesh(new THREE.BoxGeometry(.08, 6, .08), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xffffff : 0xff1a2b })); b.position.set(Math.cos(a) * 10, 3, Math.sin(a) * 10); S.add(b); }
  // mirror-floor reflection (desktop only)
  if (!mob) { fl.material.transparent = true; fl.material.opacity = .78; fl.material.depthWrite = false; const mr = new THREE.Group(); mr.scale.y = -1; mr.add(car.clone()); rot.add(mr); }

    // PPF shield
    const sm = new THREE.MeshBasicMaterial({
        color: 0xff2a3a,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      lm = new THREE.LineBasicMaterial({
        color: 0xff6a75,
        transparent: true,
        opacity: 0,
      });
    [bodyG, glass.geometry].forEach((g) => {
      const m = new THREE.Mesh(g, sm),
        l = new THREE.LineSegments(new THREE.EdgesGeometry(g, 25), lm);
      m.scale.setScalar(1.03);
      l.scale.setScalar(1.03);
      car.add(m, l);
    });
    // ceramic droplets
    const N = mob ? 70 : 220,
      pp = new Float32Array(N * 3),
      dm = new THREE.PointsMaterial({
        color: 0xaee3ff,
        size: 0.045,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      dg = new THREE.BufferGeometry();
    const reset = (i, top) => {
      pp[i * 3] = (Math.random() - 0.5) * 4;
      pp[i * 3 + 1] = top ? 1.45 : 0.5 + Math.random() * 0.95;
      pp[i * 3 + 2] = (i % 2 ? 1 : -1) * 1.06;
    };
    for (let i = 0; i < N; i++) reset(i);
    dg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const dr = new THREE.Points(dg, dm);
    dr.frustumCulled = false;
    car.add(dr);

    // interaction
    let dn = false,
      lx = 0,
      mx = 0,
      my = 0;
    cv.addEventListener("pointerdown", (e) => {
      dn = true;
      lx = e.clientX;
      try {
        cv.setPointerCapture(e.pointerId);
      } catch (x) {}
    });
    addEventListener("pointerup", () => (dn = false));
    addEventListener("pointermove", (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      if (dn) {
        vel = (e.clientX - lx) * 0.006;
        lx = e.clientX;
        rotY += vel;
      }
    });
    const size = () => {
      const w = innerWidth,
        h = innerHeight;
      R.setSize(w, h, false);
      C.aspect = w / h;
      C.setViewOffset(w, h, w > 900 ? -w * 0.14 : 0, 0, w, h);
      C.updateProjectionMatrix();
    };
    addEventListener("resize", size);
    size();

    let last = 0;
    (function tick(t) {
      requestAnimationFrame(tick);
      if (!run || document.hidden) {
        last = t;
        return;
      }
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (!dn) {
        vel *= 0.94;
        rotY += vel;
        if (auto) rotY += dt * 0.18;
      }
      rot.rotation.y = rotY;
      upd.forEach(f => f(t, dt));
      const d = cam.d * zoom * I.z * (C.aspect < 1 ? 1.55 : 1);
      C.position.set(
        Math.sin(cam.az) * d + mx * 0.6,
        cam.y - my * 0.4,
        Math.cos(cam.az) * d,
      );
      C.lookAt(0, 0.55, 0);
      sm.opacity = fx.ppf * 0.14;
      lm.opacity = fx.ppf * 0.9;
      dm.opacity = fx.drop * 0.9;
      if (fx.drop > 0.01) {
        for (let i = 0; i < N; i++) {
          pp[i * 3 + 1] -= dt * (0.15 + (i % 5) * 0.05);
          pp[i * 3] += Math.sin(t * 0.001 + i) * 0.0006;
          if (pp[i * 3 + 1] < 0.42) reset(i, true);
        }
        dg.attributes.position.needsUpdate = true;
      }
      hl.emissiveIntensity +=
        ((lights ? 4 : 0.4) - hl.emissiveIntensity) * 0.08;
      ug.intensity += ((lights ? 4 : 0) - ug.intensity) * 0.08;
      r1.intensity = 2 + Math.sin(t * 0.002) * (lights ? 1.5 : 0.2);
      ring.material.opacity = 0.55 + Math.sin(t * 0.0015) * 0.15;
      R.render(S, C);
    })(0);
  }
  if (use3d) {
    try {
      init3d();
    } catch (e) {
      console.warn("3D disabled:", e);
      document.body.classList.add("nogl");
    }
  } else document.body.classList.add("nogl");
  setLook(1, "GLOSS");

  /* ---------- scroll storytelling ---------- */
  if (innerWidth < 900) gsap.set("#cfg", { autoAlpha: 0 });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#scene",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onToggle: (s) => (run = s.isActive),
    },
    defaults: { ease: "power1.inOut" },
  });
  [
    [0.15, 6.6, 1.3],
    [1.57, 6.4, 1.2],
    [2.3, 6, 2],
    [4.71, 4.4, 1],
    [6.9, 7, 1.5],
    [8.4, 7.4, 2.6],
  ].forEach(([az, d, y], i) => tl.to(cam, { az, d, y, duration: 1 }, i));
  tl.to('.hero,.drag,.views', { autoAlpha: 0, y: -40, duration: .5 }, .15);
  tl.to("#cfg", { autoAlpha: 0, x: 40, duration: 0.4 }, 0.6)
    .to("#cfg", { autoAlpha: 1, x: 0, duration: 0.4 }, 3.75)
    .to("#cfg", { autoAlpha: 0, x: 40, duration: 0.4 }, 4.9);
  $$(".st").forEach((el, i) => {
    tl.fromTo(
      el,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      1.1 + i,
    ).to(
      el,
      { autoAlpha: 0, y: -50, duration: 0.3, ease: "power2.in" },
      1.68 + i,
    );
    $$(".fl", el).forEach((f, j) =>
      tl.fromTo(
        f,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 0.15 },
        1.25 + i + j * 0.08,
      ),
    );
  });
  tl.to(fx, { ppf: 1, duration: 0.4 }, 2.05)
    .to(fx, { ppf: 0, duration: 0.4 }, 2.85)
    .to(fx, { drop: 1, duration: 0.4 }, 3.05)
    .to(fx, { drop: 0, duration: 0.4 }, 3.85);
  tl.to(
    "#veil",
    { backgroundPosition: "100% 100%", duration: 7, ease: "none" },
    0,
  );

  /* ---------- reveals, stats, timeline ---------- */
  gsap.utils
    .toArray(".rv")
    .forEach((el) =>
      gsap.from(el, {
        y: 50,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      }),
    );
  ["#cards .card", "#std .std", "#stats .stat", ".tile"].forEach((s) =>
    gsap.from(s, {
      y: 60,
      autoAlpha: 0,
      duration: 1.1,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger: s, start: "top 88%" },
      clearProps: "transform",
    }),
  );
  $$(".num").forEach((n) => {
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: n,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: +n.dataset.n,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => (n.textContent = Math.round(o.v)),
        }),
    });
  });
  gsap.to("#pl", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#tl",
      start: "top 60%",
      end: "bottom 60%",
      scrub: true,
    },
  });
  $$(".step").forEach((s) =>
    ScrollTrigger.create({
      trigger: s,
      start: "top 60%",
      onEnter: () => s.classList.add("on"),
      onLeaveBack: () => s.classList.remove("on"),
    }),
  );
  const rg = $("#rg"),
    cmp = $("#cmp"),
    upd = () => {
      cmp.style.setProperty("--p", rg.value + "%");
      $("#done").classList.toggle("on", +rg.value < 8);
    };
  rg.addEventListener("input", upd);
  ScrollTrigger.create({
    trigger: cmp,
    start: "top 75%",
    once: true,
    onEnter: () => {
      const o = { v: 100 };
      gsap.to(o, {
        v: 50,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          rg.value = o.v;
          upd();
        },
      });
    },
  });

  /* ---------- card tilt ---------- */
  document.addEventListener("mousemove", (e) => {
    const c = e.target.closest && e.target.closest(".tilt");
    if (!c) return;
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.style.setProperty("--mx", (x + 0.5) * 100 + "%");
    c.style.setProperty("--my", (y + 0.5) * 100 + "%");
    gsap.to(c, {
      rotationY: x * 12,
      rotationX: -y * 12,
      duration: 0.4,
      transformPerspective: 800,
      ease: "power2.out",
    });
    gsap.to(c.firstElementChild, { x: -x * 14, y: -y * 14, duration: 0.4 });
  });
  document.addEventListener("mouseout", (e) => {
    const c = e.target.closest && e.target.closest(".tilt");
    if (c && !c.contains(e.relatedTarget)) {
      gsap.to(c, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(c.firstElementChild, { x: 0, y: 0, duration: 0.8 });
    }
  });

  /* ---------- gallery + lightbox ---------- */
  const tiles = $$(".tile"),
    lb = $("#lb"),
    lbc = $("#lbc");
  let vis = tiles,
    li = 0;
  $$(".flt button").forEach(
    (b) =>
      (b.onclick = () => {
        $$(".flt button").forEach((x) => x.classList.toggle("on", x === b));
        tiles.forEach((t) =>
          t.classList.toggle(
            "h",
            b.dataset.c !== "ALL" && t.dataset.cat !== b.dataset.c,
          ),
        );
        vis = tiles.filter((t) => !t.classList.contains("h"));
        gsap.fromTo(
          vis,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 },
        );
      }),
  );
  const show = (i) => {
    li = (i + vis.length) % vis.length;
    const t = vis[li];
    lbc.className = "lbc";
    lbc.style.cssText = t.style.cssText;
    lbc.innerHTML = t.innerHTML;
    gsap.fromTo(
      lbc,
      { autoAlpha: 0, scale: 0.94 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" },
    );
  };
  tiles.forEach(
    (t) =>
      (t.onclick = () => {
        lb.classList.add("on");
        show(vis.indexOf(t));
      }),
  );
  $("#lp").onclick = () => show(li - 1);
  $("#ln").onclick = () => show(li + 1);
  $("#lz").onclick = () => lbc.classList.toggle("z");
  $("#lx").onclick = () => lb.classList.remove("on");
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") lb.classList.remove("on");
    if (e.key === "ArrowLeft") show(li - 1);
    if (e.key === "ArrowRight") show(li + 1);
  });

  /* ---------- testimonials ---------- */
  const ts = $$(".t");
  let ti = 2;
  const place = () =>
    ts.forEach((c, i) => {
      const o = i - ti,
        a = Math.abs(o);
      c.style.transform = `translateX(calc(-50% + ${o * 62}%)) translateZ(${-a * 140}px) scale(${1 - a * 0.14})`;
      c.style.opacity = a > 2 ? 0 : 1 - a * 0.38;
      c.style.filter = a ? `blur(${a * 2.5}px)` : "none";
      c.style.zIndex = 9 - a;
      c.style.pointerEvents = a > 2 ? "none" : "auto";
    });
  ts.forEach(
    (c, i) =>
      (c.onclick = () => {
        ti = i;
        place();
      }),
  );
  place();
  setInterval(() => {
    ti = (ti + 1) % ts.length;
    place();
  }, 5200);

  /* ---------- form ---------- */
  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#ok").classList.add("on");
    gsap.fromTo(
      "#ok .box",
      { y: 40, scale: 0.94, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 0.9, ease: "expo.out" },
    );
    e.target.reset();
  });
  $("#okc").onclick = () => $("#ok").classList.remove("on");

  /* ---------- nav, progress, cursor ---------- */
  const nav = $("#nav"),
    bar = $("#bar");
  addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("sc", scrollY > 40);
      bar.style.transform =
        "scaleX(" +
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight) +
        ")";
    },
    { passive: true },
  );
  $("#burger").onclick = () => nav.classList.toggle("open");
  $$("#menu a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );
  if (matchMedia("(pointer:fine)").matches) {
    document.body.classList.add("cur");
    const cr = $(".cr"),
      cd = $(".cd"),
      qx = gsap.quickTo(cr, "x", { duration: 0.4, ease: "power3" }),
      qy = gsap.quickTo(cr, "y", { duration: 0.4, ease: "power3" });
    addEventListener("mousemove", (e) => {
      qx(e.clientX);
      qy(e.clientY);
      gsap.set(cd, { x: e.clientX, y: e.clientY });
    });
    document.addEventListener("mouseover", (e) => {
      const t = e.target,
        c = t.closest && t.closest("[data-cur]"),
        b = t.closest && t.closest("a,button,input,select,textarea,.sw");
      cr.classList.toggle("big", !!b && !c);
      cr.classList.toggle("txt", !!c);
      cr.firstElementChild.textContent = c ? c.dataset.cur : "";
    });
  }
  /* ===== ADD-ON 2: magnetic buttons, HUD counters, marquee, hero parallax ===== */
if (matchMedia('(pointer:fine)').matches) {
  $$('.btn').forEach(b => { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); }); b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .7, ease: 'power3.out' })); });
  addEventListener('mousemove', e => gsap.to('.hero h1', { x: (e.clientX / innerWidth - .5) * -18, y: (e.clientY / innerHeight - .5) * -10, duration: 1.2 }));
}
$$('.hud b').forEach((b, i) => { const o = { v: 0 }; gsap.to(o, { v: +b.dataset.v, duration: 2.5, delay: 3.2 + i * .3, ease: 'power2.out', onUpdate: () => b.textContent = Math.round(o.v) }); });
$('.mq div').innerHTML = ['PPF', 'VEHICLE WRAPPING', 'CERAMIC COATING', 'GRAPHENE', 'PAINT CORRECTION', 'WINDOW TINTING', 'ALLOY WHEELS', 'CAR SPA'].map(s => `<span>${s}</span>`).join('').repeat(2);

  /* ===== ADD-ON 3: view angle buttons ===== */
$$('.views button').forEach(b => b.onclick = () => {
  const t = cam.az + (+b.dataset.a) * Math.PI / 2, n = Math.round((rotY - t) / (2 * Math.PI)), o = { v: rotY };
  auto = false; vel = 0; $('#bRot').classList.remove('on');
  gsap.to(o, { v: t + n * 2 * Math.PI, duration: 1.8, ease: 'power3.inOut', onUpdate: () => { rotY = o.v; vel = 0; } });
});
  /* ---------- preloader -> reveal ---------- */
  function enter() {
    document.body.classList.remove("lock");
    gsap.fromTo(I, { z: 1.7 }, { z: 1, duration: 2.8, ease: "expo.out" });
    gsap.from(".hero h1 span", {
      yPercent: 100,
      autoAlpha: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.15,
    });
    gsap.from(".hero .kick,.hero .lead,.hero .cta,.ctl,#nav", {
      autoAlpha: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.1,
      delay: 0.5,
      ease: "power3.out",
    });
    ScrollTrigger.refresh();
  }
  const arc = $("#arc"),
    L = 2 * Math.PI * 45,
    P = { v: 0 };
  arc.style.strokeDasharray = L;
  arc.style.strokeDashoffset = L;
  gsap.to(P, {
    v: 100,
    duration: 2.8,
    ease: "power1.inOut",
    onUpdate() {
      arc.style.strokeDashoffset = L * (1 - P.v / 100);
      $("#pct").textContent = Math.round(P.v);
    },
    onComplete() {
      gsap
        .timeline()
        .to(".pl", {
          scale: 0.85,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.in",
        })
        .to("#pre", { yPercent: -100, duration: 1.1, ease: "expo.inOut" })
        .add(enter, "-=.6")
        .set("#pre", { display: "none" });
    },
  });
})();
