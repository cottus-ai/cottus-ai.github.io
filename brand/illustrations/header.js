// Cottus header band: the hundred-handed burst rising behind the ridges, fan palms and palmettos in print inks.
// A wide strip (3.6:1) so the page's headline fits in the first screen under it.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs header.js header.png 3840 1060
function draw(ctx, W, H, K) {
  const INK = {
    ultra: '#3a43aa', ultraDeep: '#272e8c',
    verm: '#ee3b05', vermDeep: '#a82602',
    teal: '#16556a', tealDeep: '#0b3646',
    bottle: '#0a3836', bottleLite: '#2a6b55',
    cream: '#ebe5c8', black: '#000000',
  };
  const F = 3840, FH = 1060;
  ctx.save();
  ctx.scale(W / F, H / FH);
  const all = [[0, 0], [F, 0], [F, FH], [0, FH]];

  // Sky: one flat ink with long pulled strokes, like a dragged squeegee.
  K.fill(ctx, all, INK.ultra);
  K.hatch(ctx, all, { ink: INK.ultraDeep, gap: 10, width: 1.8, wave: 2.5, dash: [220, 1100], lift: 0.3, alpha: 0.6, seed: 1 });

  // The burst, on a vermilion under-plate printed slightly out of register.
  const bx = 1120, by = 560, bs = 1.75;
  const B = K.burst(bx, by, bs, { seed: 1, rays: 13, from: 40, to: 320 });
  ctx.save();
  ctx.translate(18, 12);
  for (const s of [...B.rays, B.disc]) K.fill(ctx, s, INK.verm);
  ctx.restore();
  for (const s of [...B.rays, B.disc]) K.fill(ctx, s, INK.cream);
  B.axes.forEach((ax, i) => {
    const half = (ax.w / ax.r1) * 1.1;
    K.radial(ctx, bx, by, { clip: B.rays[i], count: 70, r0: ax.r0, r1: ax.r1 * 1.08, a0: ax.a - half, a1: ax.a + half, ink: INK.vermDeep, width: 1.7, bend: 0.015, seed: 40 + i, alpha: 0.8 });
    K.radial(ctx, bx, by, { clip: B.rays[i], count: 14, r0: ax.r0, r1: ax.r1 * 1.08, a0: ax.a - half, a1: ax.a + half, ink: INK.black, width: 1.4, bend: 0.01, seed: 90 + i, alpha: 0.85 });
  });
  B.rays.forEach((ray, i) => K.stipple(ctx, ray, { ink: INK.black, per: 0.0009, rMin: 1, rMax: 2.2, seed: 120 + i }));
  K.stipple(ctx, B.disc, { ink: INK.black, per: 0.0055, rMin: 1.6, rMax: 3.8, seed: 8 });

  // Far ridge.
  const l1 = K.ridge(-20, F + 20, 650, { amp: 40, freq: 0.0011, seed: 3, shape: (x) => -90 * Math.exp(-(((x - 2350) / 520) ** 2)) });
  const b1 = K.roughen(K.band(l1, FH), 2.5, { seed: 31 });
  K.fill(ctx, b1, INK.teal);
  K.contour(ctx, b1, l1, { ink: INK.tealDeep, gap: 8, count: 34, width: 1.8, seed: 4 });

  // Vermilion mountain, low on the left, peaking on the right.
  const l2 = K.ridge(-20, F + 20, 770, { amp: 28, freq: 0.0019, seed: 5, shape: (x) => -330 * Math.exp(-(((x - 3080) / 640) ** 2)) });
  const b2 = K.roughen(K.band(l2, FH), 2.5, { seed: 32 });
  K.fill(ctx, b2, INK.verm);
  K.contour(ctx, b2, l2, { ink: INK.vermDeep, gap: 9, count: 50, width: 2.1, seed: 6 });

  // Bottle-green near hills.
  const l3 = K.ridge(-20, F + 20, 850, { amp: 42, freq: 0.0015, seed: 9, shape: (x) => -110 * Math.exp(-(((x - 640) / 620) ** 2)) });
  const b3 = K.roughen(K.band(l3, FH), 2.5, { seed: 33 });
  K.fill(ctx, b3, INK.bottle);
  K.contour(ctx, b3, l3, { ink: INK.bottleLite, gap: 8, count: 30, width: 1.7, seed: 10, alpha: 0.9 });

  // Ground: a textured umber field, then only a thin black edge where the band meets the page.
  // [fill, line] print inks for the plants
  const P = {
    pink: ['#ea538f', '#9c2357'], rose: ['#c6354a', '#6f1626'], mustard: ['#e3a52a', '#8a5a10'],
    ochre: ['#c9821f', '#6e430a'], cream: ['#ebe5c8', '#8f8463'], lilac: ['#b9a6e8', '#5e4b99'],
    violet: ['#8a4fd0', '#4b2580'], coral: ['#f47a5a', '#8a2a14'], sage: ['#6f8f3a', '#34481a'],
    ground: ['#3b1d12', '#6e3a1f'],
  };
  const l4 = K.ridge(-20, F + 20, 935, { amp: 30, freq: 0.0021, seed: 12, shape: (x) => -80 * Math.exp(-(((x - 3350) / 720) ** 2)) });
  const b4 = K.roughen(K.band(l4, FH + 10), 3, { seed: 34 });
  K.fill(ctx, b4, P.ground[0]);
  K.flow(ctx, b4, { ink: P.ground[1], per: 0.004, len: 30, turn: 0.3, freq: 0.002, width: 1.4, seed: 35, alpha: 0.8 });
  K.stipple(ctx, b4, { ink: INK.black, per: 0.0015, rMin: 1, rMax: 2, seed: 36, alpha: 0.7 });
  const l5 = K.ridge(-20, F + 20, 1035, { amp: 8, freq: 0.004, seed: 13 });
  K.fill(ctx, K.roughen(K.band(l5, FH + 10), 2, { seed: 37 }), INK.black);

  const stroke = (pts, ink, w) => {
    ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(K.path(pts, false));
  };

  // A fan in one ink, with darker pleats of the same hue radiating from its base.
  const fanInk = (f, x, y, dir, R, g, seed) => {
    K.fill(ctx, f.core, g[0]);
    f.lobes.forEach((l, i) => K.fill(ctx, K.roughen(l.outline, 1.2, { seed: seed + i, spacing: 3 }), g[0]));
    K.radial(ctx, x, y, { clip: f.core, count: 90, r0: 0, r1: R * 0.5, a0: dir - 1.9, a1: dir + 1.9, ink: g[1], width: 1.3, bend: 0, seed: seed + 3, alpha: 0.8 });
    f.lobes.forEach((l) => stroke([[x, y], ...l.mid], g[1], 1.6));
  };

  // pal: { back: [ink, ink], front: [ink, ink], stalk }
  const palm = (x, ground, top, lean, size, seed, pal) => {
    const r = K.rng(seed), L = [], Rr = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50, y = K.lerp(ground, top, t), xx = x + lean * t * t + 7 * Math.sin(t * 6 + seed), w = K.lerp(22, 11, t);
      L.push([xx - w, y]); Rr.push([xx + w, y]);
    }
    // maroon trunk with ring scars
    const trunk = K.roughen([...L, ...Rr.reverse()], 2, { seed });
    K.fill(ctx, trunk, '#7d1d2a');
    K.hatch(ctx, trunk, { ink: '#3c0a12', gap: 9, width: 2, angle: 0.08, dash: [14, 40], lift: 0.1, wave: 1, seed: seed + 1 });
    const cx = x + lean, cy = top, n = 10;
    // back fronds alternate two inks; the two facing the viewer carry the palm's light ink
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const a = -Math.PI / 2 + (t - 0.5) * Math.PI * 1.85 + (r() - 0.5) * 0.25;
      const p = size * (0.14 + 0.16 * r());
      const fx = cx + Math.cos(a) * p, fy = cy + Math.sin(a) * p, R = size * (0.4 + 0.12 * r()), d = a + Math.cos(a) * 0.45;
      stroke([[cx, cy], [K.lerp(cx, fx, 0.5), K.lerp(cy, fy, 0.5) - 8], [fx, fy]], pal.stalk, 7);
      const g = pal.back[i % 2];
      fanInk(K.fan(fx, fy, d, R, { lobes: 17, split: 0.36, overlap: 0.95, droop: 0.95, spread: Math.PI * (0.75 + 0.25 * r()), seed: seed * 17 + i }), fx, fy, d, R, g, seed * 5 + i * 40);
    }
    const crown = K.roughen(K.blob(cx, cy + size * 0.02, size * 0.3, size * 0.21, { seed, rough: 0.35, freq: 2.2 }), 3, { seed });
    K.fill(ctx, crown, pal.back[1][0]);
    K.radial(ctx, cx, cy - size * 0.03, { clip: crown, count: 160, r0: 0, r1: size * 0.4, ink: pal.back[1][1], width: 1.4, bend: 0.05, seed: seed + 9, alpha: 0.85 });
    for (let i = 0; i < 2; i++) {
      const a = -Math.PI / 2 + (i - 0.5) * 1.1, R = size * 0.3;
      fanInk(K.fan(cx, cy - size * 0.03, a, R, { lobes: 22, split: 0.16, overlap: 1.1, droop: 0.6, spread: Math.PI * 1.25, seed: seed * 29 + i }), cx, cy - size * 0.03, a, R, pal.front[i], seed * 9 + i * 70);
    }
  };

  // A trunkless palmetto: fans on stalks straight out of the ground.
  const palmetto = (x, ground, size, seed, inks) => {
    const r = K.rng(seed), n = 7;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i / (n - 1) - 0.5) * 2.1 + (r() - 0.5) * 0.2;
      const p = size * (0.5 + 0.6 * r());
      const fx = x + Math.cos(a) * p, fy = ground + Math.sin(a) * p, R = size * (0.55 + 0.25 * r()), d = a + Math.cos(a) * 0.3;
      stroke([[x, ground], [fx, fy]], '#34481a', 5);
      fanInk(K.fan(fx, fy, d, R, { lobes: 16, droop: 0.45, seed: seed * 11 + i }), fx, fy, d, R, inks[i % inks.length], seed + i * 30);
    }
  };

  palm(2780, 965, 420, -60, 300, 21, { back: [P.pink, P.rose], front: [P.mustard, P.mustard], stalk: '#6f1626' });
  palm(3180, 955, 250, 45, 340, 22, { back: [P.mustard, P.ochre], front: [P.cream, P.cream], stalk: '#6e430a' });
  palm(3620, 945, 360, 60, 310, 23, { back: [P.lilac, P.violet], front: [P.pink, P.pink], stalk: '#4b2580' });
  palmetto(90, 965, 150, 31, [P.pink, P.mustard, P.cream, P.lilac, P.coral, P.sage, P.violet]);
  palmetto(320, 980, 120, 32, [P.coral, P.lilac, P.mustard, P.cream, P.pink, P.sage, P.rose]);
  palmetto(2520, 965, 100, 33, [P.cream, P.pink, P.lilac, P.mustard, P.coral, P.sage, P.violet]);
  palmetto(3420, 975, 115, 34, [P.mustard, P.violet, P.coral, P.cream, P.pink, P.sage, P.lilac]);

  ctx.restore();
  K.grain(ctx, W, H, { amount: 15, linen: 7, seed: 77 });
}
