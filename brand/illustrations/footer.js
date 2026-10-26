// Cottus footer band: a dense garden of hand-shaped (palmate) plants rising out of black —
// passion flowers, anemones, geraniums, lupins and fan palms over overprinted ink masses.
// The canvas stays transparent; whatever is behind the image shows through.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs footer.js footer.png 3840 1648
function draw(ctx, W, H, K) {
  // [ink, line] pairs: the line ink draws striations and edges inside the field
  const P = {
    violet: ['#8a4fd0', '#4b2580'], plum: ['#5b2a86', '#2e1147'], lilac: ['#b9a6e8', '#5e4b99'],
    pink: ['#ea538f', '#9c2357'], poppy: ['#d02d2a', '#7a1414'], rose: ['#c6354a', '#6f1626'],
    verm: ['#ee3b05', '#8a2202'], ochre: ['#c9821f', '#6e430a'], mustard: ['#e3a52a', '#8a5a10'],
    cream: ['#ede7cc', '#8f8463'], white: ['#f4f1e6', '#8e897d'], cobalt: ['#2445b0', '#5f7fe0'],
    green: ['#23805a', '#0b3a2b'], bottle: ['#0f4935', '#2f7a5c'], teal: ['#14526f', '#3f86a8'],
    sage: ['#6f8f3a', '#34481a'], maroon: ['#7d1d2a', '#3c0a12'],
  };
  const BLACK = '#000000', TAU = Math.PI * 2;
  const F = 3840, FH = 1648;
  ctx.save();
  ctx.scale(W / F, H / FH);
  const R = K.rng(2611);

  const line = (pts, ink, w) => {
    ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(K.path(pts, false));
  };
  const edge = (pts, ink, w = 1.4) => { ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(K.path(pts)); };
  const stem = (x0, y0, x1, y1, bend, ink, w) => {
    const pts = [];
    for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([K.lerp(x0, x1, t) + bend * Math.sin(Math.PI * t * 0.9), K.lerp(y0, y1, t)]); }
    line(pts, ink, w);
    return pts;
  };
  const angleOf = (mid) => Math.atan2(mid[mid.length - 1][1] - mid[0][1], mid[mid.length - 1][0] - mid[0][0]);

  // --- back: overprinted ink masses, then a river band in front of their feet ------------------
  // Masses are translucent: the one behind shows faintly through the one in front.
  const mass = (cx, cy, rx, ry, p, seed, turn = 2) => {
    const b = K.roughen(K.blob(cx, cy, rx, ry, { seed, rough: 0.32, freq: 1.3 }), 3, { seed });
    ctx.save();
    ctx.globalAlpha = 0.84;
    K.fringe(ctx, b, { ink: p[0], len: 10, every: 2.5, width: 1.2, seed: seed + 3 });
    K.fill(ctx, b, p[0]);
    ctx.restore();
    K.flow(ctx, b, { ink: p[1], per: 0.0045, len: 24, turn, freq: 0.006, width: 1.1, seed: seed + 1, alpha: 0.55 });
    K.fringe(ctx, b, { ink: p[1], len: 8, every: 4, width: 1, seed: seed + 4, alpha: 0.6 });
  };
  mass(330, 1130, 560, 330, P.rose, 11);
  mass(1180, 1040, 420, 230, P.teal, 12);
  mass(1720, 1000, 300, 170, P.ochre, 13);
  mass(2330, 1060, 640, 380, P.bottle, 14);
  mass(3180, 1100, 560, 320, P.poppy, 15);
  mass(3720, 960, 320, 230, P.teal, 16);

  const riverLine = K.ridge(-20, F + 20, 1300, { amp: 70, freq: 0.0013, seed: 4 });
  const river = K.roughen(K.band(riverLine, FH + 10), 3, { seed: 5 });
  K.fringe(ctx, river, { ink: P.cobalt[0], len: 10, every: 2.5, width: 1.3, seed: 7 });
  K.fill(ctx, river, P.cobalt[0]);
  K.flow(ctx, river, { ink: P.cobalt[1], per: 0.0045, len: 34, turn: 0.35, freq: 0.0025, width: 1.3, seed: 6, alpha: 0.75 });

  // --- plants ------------------------------------------------------------------------------------
  // Lupin spike: loose pea-flowers, two-tone, thinning toward the tip.
  const spike = (x, h, p, banner, seed) => {
    const r = K.rng(seed), base = FH, top = base - h, sway = (r() - 0.5) * 100;
    const cxAt = (y) => x + sway * ((base - y) / h) ** 2;
    const s0 = [];
    for (let i = 0; i <= 30; i++) { const y = K.lerp(base, top, i / 30); s0.push([cxAt(y), y]); }
    line(s0, P.bottle[0], 9);
    const levels = 40;
    for (let i = levels - 1; i >= 0; i--) {
      const t = i / (levels - 1), y = K.lerp(base - h * 0.52, top + 12, t), s = K.lerp(32, 9, t) * (0.8 + 0.4 * r());
      const n = t > 0.86 ? 1 : 2 + Math.floor(r() * 2);
      for (let k = 0; k < n; k++) {
        const side = n === 1 ? 0 : (k / (n - 1)) * 2 - 1;
        const px = cxAt(y) + side * s * 1.1 + (r() - 0.5) * s * 0.4, py = y + (r() - 0.5) * s * 0.5;
        const pt = K.blob(px, py, s * (0.7 + 0.25 * r()), s * (0.5 + 0.2 * r()), { seed: seed + i * 7 + k, rough: 0.25, rot: side * 0.6 + (r() - 0.5) * 0.4 });
        const ink = r() < 0.32 ? banner : p;
        K.fill(ctx, pt, ink[0]);
        K.radial(ctx, cxAt(y), y + s * 0.6, { clip: pt, count: 10, r0: 0, r1: s * 2, a0: -Math.PI * 0.9, a1: -Math.PI * 0.1, ink: ink[1], width: 1, seed: seed + i, alpha: 0.9 });
        edge(pt, ink[1], 1.1);
      }
    }
  };

  // Seed head on a long thin stalk.
  const head = (x, h, p, seed) => {
    const r = K.rng(seed), bend = (r() - 0.5) * 70, top = FH - h;
    stem(x, FH, x + bend, top, bend * 0.4, P.sage[0], 5);
    const b = K.blob(x + bend, top, 22 + 10 * r(), 30 + 10 * r(), { seed, rough: 0.12 });
    K.fill(ctx, b, p[0]);
    K.flow(ctx, b, { ink: p[1], per: 0.06, len: 8, steps: 3, turn: 3, freq: 0.05, width: 1, seed: seed + 1 });
    K.stipple(ctx, b, { ink: BLACK, per: 0.02, rMin: 0.8, rMax: 1.6, seed: seed + 2, alpha: 0.7 });
  };

  // Fan frond on its stalk; pleats as fine lines in the line ink.
  const frond = (x, y, dir, r, p, seed, pleat) => {
    const spread = Math.PI * (0.85 + 0.2 * K.rng(seed)());
    const f = K.fan(x, y, dir, r, { lobes: 28, split: 0.5, droop: 0.32, overlap: 1.2, spread, seed });
    K.fill(ctx, f.core, p[0]);
    for (const l of f.lobes) K.fill(ctx, K.roughen(l.outline, 1, { seed: seed + 5 }), p[0]);
    K.radial(ctx, x, y, { clip: f.core, count: 160, r0: 0, r1: r * 0.55, a0: dir - spread / 2, a1: dir + spread / 2, ink: pleat || p[1], width: 1.1, bend: 0, seed: seed + 2, alpha: 0.85 });
    for (const l of f.lobes) line([[x, y], ...l.mid], pleat || p[1], 1.6);
  };

  // Lupin leaf: eleven round-tipped leaflets in a wheel, seen at a tilt.
  const wheel = (x, y, r, p, tilt, seed) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, tilt);
    const lobes = K.palmate(0, 0, { lobes: 11, len: r, wid: r * 0.4, dir: -Math.PI / 2, spread: TAU * (10 / 11), even: true, droop: 0, tip: 0.9, seed });
    for (const l of lobes) {
      const o = K.roughen(l.outline, 1, { seed: seed + 3 });
      K.fill(ctx, o, p[0]);
      K.hatch(ctx, o, { ink: p[1], gap: 5, width: 1, angle: angleOf(l.mid) + 1.1, dash: [16, 50], lift: 0.05, wave: 0.6, seed: seed + 9, alpha: 0.7 });
      edge(o, p[1], 1.3);
      line(l.mid.slice(2), p[1], 2);
    }
    ctx.restore();
  };

  // Maple-like branch: toothed palmate leaves on short twigs.
  const maple = (x, h, p, seed) => {
    const r = K.rng(seed), top = FH - h, bend = (r() - 0.5) * 160;
    const s = stem(x, FH, x + bend, top, bend * 0.3, P.maroon[0], 8);
    const leaves = [];
    for (let k = 0; k < 9; k++) {
      const t = 0.35 + 0.65 * (k / 8), [sx, sy] = s[Math.floor(t * 30)], side = k % 2 ? 1 : -1;
      const lx = sx + side * (40 + 50 * r()), ly = sy - 20 - 30 * r();
      line([[sx, sy], [lx, ly]], P.maroon[0], 4);
      leaves.push([lx, ly, -Math.PI / 2 + side * (0.35 + 0.3 * r()), 70 + 45 * r() * (1 - t * 0.4), k]);
    }
    leaves.push([x + bend, top, -Math.PI / 2, 95, 99]);
    for (const [lx, ly, dir, len, k] of leaves) {
      const lobes = K.palmate(lx, ly, { lobes: 5, len, wid: len * 0.5, dir, spread: TAU * 0.62, tip: 0, droop: 0.08, seed: seed + k });
      const outs = lobes.map((l) => K.serrate(l.outline, 3.5, 9));
      for (const o of outs) K.fill(ctx, o, p[0]);
      for (const o of outs) K.flow(ctx, o, { ink: p[1], per: 0.02, len: 12, steps: 3, turn: 1, freq: 0.02, width: 0.9, seed: seed + k, alpha: 0.45 });
      for (const l of lobes) line(l.mid, p[1], 1.6);
    }
  };

  // Castor-like pods: clusters of small spiky balls.
  const pods = (x, y, p, seed) => {
    const r = K.rng(seed);
    for (let i = 0; i < 7; i++) {
      const px = x + (r() - 0.5) * 90, py = y + (r() - 0.5) * 110, rr = 16 + 8 * r();
      K.radial(ctx, px, py, { count: 18, r0: rr * 0.6, r1: rr * 1.7, ink: p[1], width: 2, bend: 0, seed: seed + i });
      const b = K.blob(px, py, rr, rr, { seed: seed + i, rough: 0.1 });
      K.fill(ctx, b, p[0]);
      K.stipple(ctx, b, { ink: p[1], per: 0.06, rMin: 0.8, rMax: 1.8, seed: seed + i + 50 });
    }
  };

  // Passion flower, face-on at a tilt: two rings of striated petals, a crinkled
  // three-band corona of filaments, and the anthers and styles at the centre.
  const passion = (x, y, Rr, tilt, rot, petal, corona, seed) => {
    const r = K.rng(seed);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, tilt);
    ctx.rotate(rot);
    for (let ring = 0; ring < 2; ring++) {
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * TAU + ring * (TAU / 10) + (r() - 0.5) * 0.12;
        const l = K.lobe(0, 0, a, Rr * (ring ? 0.9 : 1), Rr * 0.5, { tip: 0.8, base: 0.4, bend: (r() - 0.5) * 0.2 });
        const o = K.roughen(l.outline, 2, { seed: seed + i + ring * 9, spacing: 5 });
        const ink = ring ? petal[0] : petal[2] || petal[0];
        K.fill(ctx, o, ink);
        K.radial(ctx, 0, 0, { clip: o, count: 55, r0: Rr * 0.08, r1: Rr * 1.1, a0: a - 0.4, a1: a + 0.4, ink: petal[1], width: 1, bend: 0.04, seed: seed + i * 3 + ring, alpha: 0.7 });
        edge(o, petal[1], 1);
      }
    }
    const n = 150;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + (r() - 0.5) * 0.03, L = Rr * (0.66 + 0.14 * r()), pts = [];
      for (let s = 0; s <= 18; s++) {
        const t = s / 18, rr = Rr * 0.15 + (L - Rr * 0.15) * t, wob = Math.sin(t * 11 + i * 1.7) * 0.018 * t;
        pts.push([Math.cos(a + wob) * rr, Math.sin(a + wob) * rr]);
      }
      line(pts.slice(0, 7), corona[0], 2.6);
      line(pts.slice(6, 12), corona[1], 2.4);
      line(pts.slice(11), corona[2], 2.2);
    }
    const disc = K.blob(0, 0, Rr * 0.15, Rr * 0.15, { seed, rough: 0.08 });
    K.fill(ctx, disc, P.sage[0]);
    K.stipple(ctx, disc, { ink: P.sage[1], per: 0.03, rMin: 1, rMax: 2, seed: seed + 4 });
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * TAU + 0.3, ex = Math.cos(a) * Rr * 0.26, ey = Math.sin(a) * Rr * 0.26;
      line([[0, 0], [ex, ey]], P.sage[0], 5);
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(a + Math.PI / 2);
      K.fill(ctx, K.blob(0, 0, Rr * 0.075, Rr * 0.035, { seed: seed + i, rough: 0.05 }), P.mustard[0]);
      ctx.restore();
    }
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU - 0.4, ex = Math.cos(a) * Rr * 0.17, ey = Math.sin(a) * Rr * 0.17;
      line([[0, 0], [ex, ey]], P.plum[0], 4);
      K.fill(ctx, K.blob(ex, ey, 7, 7, { seed: seed + 20 + i, rough: 0.05 }), P.plum[0]);
    }
    ctx.restore();
  };

  // Anemone, face-on at a tilt: broad striated petals darkening toward the base,
  // a white ring and a black boss fringed with stamens.
  const anemone = (x, y, Rr, tilt, rot, p, seed) => {
    const r = K.rng(seed), n = 6 + Math.floor(r() * 2);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, tilt);
    ctx.rotate(rot);
    for (let ring = 0; ring < 2; ring++) {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU + ring * (Math.PI / n) + (r() - 0.5) * 0.15;
        const l = K.lobe(0, 0, a, Rr * (ring ? 0.8 : 1) * (0.9 + 0.2 * r()), Rr * 0.8, { tip: 0.95, base: 0.25, bend: (r() - 0.5) * 0.25 });
        const o = K.roughen(l.outline, 2.5, { seed: seed + i + ring * 13, spacing: 6 });
        K.fill(ctx, o, p[0]);
        K.stipple(ctx, o, { ink: p[1], per: 0.03, rMin: 0.7, rMax: 1.5, seed: seed + i * 5 + ring, density: (px, py) => Math.max(0, 1 - Math.hypot(px, py) / (Rr * 0.7)) });
        K.radial(ctx, 0, 0, { clip: o, count: 80, r0: Rr * 0.12, r1: Rr * 1.1, a0: a - 0.55, a1: a + 0.55, ink: p[1], width: 0.9, bend: 0.06, seed: seed + i * 3 + ring, alpha: 0.7 });
        edge(o, p[1], 1);
      }
    }
    K.fill(ctx, K.blob(0, 0, Rr * 0.3, Rr * 0.3, { seed, rough: 0.12 }), P.white[0]);
    K.radial(ctx, 0, 0, { count: 110, r0: Rr * 0.1, r1: Rr * 0.4, ink: BLACK, width: 1.5, bend: 0.12, seed: seed + 40 });
    ctx.fillStyle = BLACK;
    for (let i = 0; i < 70; i++) {
      const a = r() * TAU, d = Rr * (0.24 + 0.14 * r());
      ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, 2 + 1.5 * r(), 0, TAU); ctx.fill();
    }
    const boss = K.blob(0, 0, Rr * 0.15, Rr * 0.15, { seed: seed + 1, rough: 0.08 });
    K.fill(ctx, boss, BLACK);
    K.stipple(ctx, boss, { ink: P.cobalt[0], per: 0.02, rMin: 0.8, rMax: 1.6, seed: seed + 2 });
    ctx.restore();
  };

  // Cranesbill geranium: small five-petal flowers with dark veins, in sprays.
  const geranium = (x, base, h, p, seed) => {
    const r = K.rng(seed), top = base - h, bend = (r() - 0.5) * 80;
    const s0 = stem(x, base, x + bend, top, bend * 0.3, P.sage[0], 4);
    for (let k = 0; k < 4; k++) {
      const [sx, sy] = s0[Math.floor((0.55 + 0.45 * (k / 3)) * 30)];
      const fx = sx + (k % 2 ? 1 : -1) * (30 + 40 * r()), fy = sy - 20 - 30 * r(), Rr = 30 + 14 * r();
      line([[sx, sy], [fx, fy]], P.sage[0], 3);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * TAU - Math.PI / 2 + r() * 0.2;
        const o = K.roughen(K.lobe(fx, fy, a, Rr, Rr * 0.95, { tip: 1, base: 0.2 }).outline, 0.8, { seed: seed + k * 9 + i });
        K.fill(ctx, o, p[0]);
        for (let v = -1; v <= 1; v++) line([[fx, fy], [fx + Math.cos(a + v * 0.2) * Rr * 0.8, fy + Math.sin(a + v * 0.2) * Rr * 0.8]], p[1], 1.2);
        edge(o, p[1], 0.9);
      }
      K.fill(ctx, K.blob(fx, fy, Rr * 0.2, Rr * 0.2, { seed: seed + k, rough: 0.1 }), P.white[0]);
    }
  };

  // --- layers, back to front ---------------------------------------------------------------------
  // tall back row
  [[180, 1000, P.violet, P.cream], [600, 1180, P.pink, P.white], [1020, 900, P.cream, P.mustard], [1420, 1240, P.mustard, P.cream],
   [1880, 980, P.white, P.pink], [2180, 1260, P.violet, P.lilac], [2620, 960, P.poppy, P.pink], [3020, 1150, P.cream, P.mustard],
   [3380, 1000, P.pink, P.white], [3760, 1200, P.lilac, P.violet]].forEach(([x, h, p, b], i) => {
    const sx = x + (R() - 0.5) * 60;
    spike(sx, h, p, b, 300 + i);
    [-1, 1].forEach((side, k) => {
      const lx = sx + side * (70 + 30 * R()), ly = 1290 + R() * 90;
      stem(sx, FH, lx, ly, side * 15, P.bottle[0], 5);
      wheel(lx, ly, 85 + 25 * R(), [P.green, P.sage, P.teal][(i + k) % 3], 0.55, 1000 + i * 2 + k);
    });
  });
  for (let i = 0; i < 20; i++) head(80 + i * 190 + (R() - 0.5) * 90, 650 + R() * 520, [P.sage, P.mustard, P.cream, P.ochre][i % 4], 500 + i);
  // fan-palm clumps: several fronds from one base, stalks fanning out
  const clump = (x, base, fronds, p, seed) => {
    const r = K.rng(seed);
    fronds.forEach(([dx, h, rr], i) => {
      const tx = x + dx, ty = base - h, d = Math.atan2(ty - base, tx - x);
      stem(x + (r() - 0.5) * 20, base, tx, ty, dx * 0.15, P.bottle[0], 7);
      frond(tx, ty, d + (r() - 0.5) * 0.2, rr, p, seed + i * 7);
    });
  };
  clump(860, 1380, [[-170, 520, 300], [40, 640, 360], [210, 470, 290]], P.green, 400);
  clump(1660, 1360, [[-120, 600, 340], [150, 700, 380]], P.teal, 410);
  clump(2780, 1380, [[-200, 560, 330], [0, 680, 370], [190, 500, 300]], P.green, 420);
  clump(3540, 1360, [[-140, 660, 350], [130, 560, 320]], P.bottle, 430);

  // middle row
  [[420, 900, P.poppy], [1300, 820, P.ochre], [2420, 930, P.verm], [3240, 860, P.rose]].forEach(([x, h, p], i) => maple(x, h, p, 600 + i * 31));
  [[260, 1180, 0.8, P.violet], [1060, 1050, 0.86, P.poppy], [1960, 1010, 0.8, P.white], [2560, 1150, 0.84, P.pink], [3060, 990, 0.78, P.poppy], [3440, 1170, 0.82, P.violet]].forEach(([x, y, t, p], i) => {
    stem(x, FH, x + 10, y + 40, 25, P.bottle[0], 7);
    anemone(x, y, 105 + R() * 35, t, R() * TAU, p, 950 + i * 11);
  });
  [[640, 760, P.lilac], [1520, 700, P.pink], [2250, 760, P.violet], [3260, 720, P.lilac], [3880, 700, P.pink]].forEach(([x, h, p], i) => geranium(x, FH, h, p, 1100 + i * 7));
  for (let i = 0; i < 16; i++) {
    const x = 120 + i * 245 + (R() - 0.5) * 100, y = 1240 + R() * 140;
    stem(x, FH, x + (R() - 0.5) * 40, y, 20, P.bottle[0], 6);
    wheel(x, y, 100 + R() * 50, [P.green, P.teal, P.sage, P.bottle, P.cobalt][i % 5], 0.55 + R() * 0.25, 700 + i);
  }

  // front row: heroes, then dense foliage along the bottom edge (darker under the legal line, left)
  [[1500, 1330, 250, 0.6, 0.3, [P.white[0], P.lilac[1], P.cream[0]], [P.plum[0], P.white[0], P.violet[0]]],
   [2200, 1440, 290, 0.56, -0.2, [P.cream[0], P.cream[1], P.white[0]], [P.maroon[0], P.white[0], P.cobalt[0]]],
   [2960, 1350, 240, 0.62, 0.5, [P.white[0], P.lilac[1], P.lilac[0]], [P.plum[0], P.cream[0], P.violet[0]]],
   [3620, 1470, 260, 0.58, 0.1, [P.lilac[0], P.lilac[1], P.white[0]], [P.plum[0], P.white[0], P.pink[0]]]].forEach(([x, y, r, t, rot, petal, corona], i) => {
    stem(x, FH, x - 20, y, 30, P.bottle[0], 9);
    passion(x, y, r, t, rot, petal, corona, 900 + i * 17);
  });
  [[1880, 1610, -2.0, 300, P.cream], [2640, 1640, -1.1, 320, P.white], [3300, 1650, -2.1, 300, P.cream]].forEach(([x, y, d, r, p], i) => frond(x, y, d, r, p, 800 + i, BLACK));
  for (let i = 0; i < 18; i++) {
    const x = (i / 17) * F + (R() - 0.5) * 120, y = 1520 + R() * 120;
    const p = x < 1200 ? [P.bottle, P.green, P.teal][i % 3] : [P.green, P.teal, P.sage, P.bottle][i % 4];
    wheel(x, y, 150 + R() * 70, p, 0.5 + R() * 0.2, 760 + i);
  }

  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 78 });
}
