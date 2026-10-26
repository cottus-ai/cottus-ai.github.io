// Cottus header band: the hundred-handed burst setting into a teal sea under a vermilion sky, a small boat
// with a lit window on the water, an ultramarine hill, fan palms and palmettos in cool print inks.
// A wide strip (3.6:1) so the page's headline fits in the first screen under it.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs header.js header.png 3840 1060
function draw(ctx, W, H, K) {
  const INK = {
    ultra: '#3a43aa', ultraDeep: '#272e8c',
    verm: '#ee3b05', vermDeep: '#a82602',
    teal: '#16556a', tealDeep: '#0b3646',
    bottle: '#0a3836', bottleLite: '#2a6b55',
    cream: '#ebe5c8', black: '#000000',
    sky: '#f0501a', skyDeep: '#d23c0b', sunPlate: '#8f1d02',
  };
  const F = 3840, FH = 1060;
  ctx.save();
  ctx.scale(W / F, H / FH);
  const all = [[0, 0], [F, 0], [F, FH], [0, FH]];

  // Sky: a sunset, one flat warm ink with faint pulled strokes, so the sun reads as a sun.
  K.fill(ctx, all, INK.sky);
  K.hatch(ctx, all, { ink: INK.skyDeep, gap: 10, width: 1.6, wave: 2.5, dash: [220, 1100], lift: 0.35, alpha: 0.4, seed: 1 });

  // The burst, on a deep red under-plate printed slightly out of register.
  const bx = 1120, by = 560, bs = 1.75;
  const B = K.burst(bx, by, bs, { seed: 1, rays: 13, from: 40, to: 320 });
  ctx.save();
  ctx.translate(18, 12);
  for (const s of [...B.rays, B.disc]) K.fill(ctx, s, INK.sunPlate);
  ctx.restore();
  for (const s of [...B.rays, B.disc]) K.fill(ctx, s, INK.cream);
  B.axes.forEach((ax, i) => {
    const half = (ax.w / ax.r1) * 1.1;
    K.radial(ctx, bx, by, { clip: B.rays[i], count: 26, r0: ax.r0, r1: ax.r1 * 1.08, a0: ax.a - half, a1: ax.a + half, ink: '#c9822a', width: 1.5, bend: 0.015, seed: 40 + i, alpha: 0.7 });
    K.radial(ctx, bx, by, { clip: B.rays[i], count: 5, r0: ax.r0, r1: ax.r1 * 1.08, a0: ax.a - half, a1: ax.a + half, ink: INK.black, width: 1.2, bend: 0.01, seed: 90 + i, alpha: 0.7 });
  });
  B.rays.forEach((ray, i) => K.stipple(ctx, ray, { ink: INK.black, per: 0.0009, rMin: 1, rMax: 2.2, seed: 120 + i }));
  K.stipple(ctx, B.disc, { ink: INK.black, per: 0.0055, rMin: 1.6, rMax: 3.8, seed: 8 });

  // The sea: a flat teal band the sun sets into, combed with ripples, the sun's reflection broken on it.
  const l1 = K.ridge(-20, F + 20, 652, { amp: 3, freq: 0.004, seed: 3 });
  const b1 = K.roughen(K.band(l1, FH), 1.5, { seed: 31 });
  K.fill(ctx, b1, INK.teal);
  K.flow(ctx, b1, { ink: '#2a7591', per: 0.004, len: 60, turn: 0.04, freq: 0.002, width: 1.6, seed: 4, alpha: 0.8 });
  const rr = K.rng(5);
  for (let y = 664; y < 790; y += 8 + rr() * 5) {
    const t = (y - 664) / 126, half = 70 + t * 170;
    let x = bx - half + rr() * 30;
    while (x < bx + half) {
      const len = 18 + rr() * 80;
      if (rr() > 0.3) {
        ctx.strokeStyle = rr() < 0.65 ? INK.cream : '#e3a52a';
        ctx.globalAlpha = 0.9 - t * 0.4;
        ctx.lineWidth = 3 + rr() * 3;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.min(x + len, bx + half), y); ctx.stroke();
      }
      x += len + 12 + rr() * 26;
    }
  }
  ctx.globalAlpha = 1;

  // A small boat on the sea, its cabin window lit, the light spilling onto the water.
  const boat = (cx, wl, s) => {
    const hull = [];
    for (let i = 0; i <= 40; i++) {                        // deck line: bow raised on the left
      const t = i / 40, x = cx - 150 * s + t * 300 * s;
      hull.push([x, wl - (30 + 26 * (1 - t) ** 3 + 6 * t ** 4) * s]);
    }
    for (let i = 40; i >= 0; i--) {                       // keel: a shallow curve under the waterline
      const t = i / 40, x = cx - 135 * s + t * 270 * s;
      hull.push([x, wl + (6 + 12 * Math.sin(Math.PI * t)) * s]);
    }
    const H1 = K.roughen(hull, 1.5, { seed: 61, spacing: 3 });
    const cab = K.roughen([[cx - 20 * s, wl - 33 * s], [cx - 20 * s, wl - 92 * s], [cx + 90 * s, wl - 92 * s], [cx + 104 * s, wl - 33 * s]], 1.2, { seed: 62, spacing: 3 });
    const roof = K.roughen([[cx - 32 * s, wl - 88 * s], [cx - 32 * s, wl - 100 * s], [cx + 110 * s, wl - 100 * s], [cx + 110 * s, wl - 88 * s]], 1, { seed: 63, spacing: 3 });
    const win = [[cx + 30 * s, wl - 74 * s], [cx + 66 * s, wl - 74 * s], [cx + 66 * s, wl - 50 * s], [cx + 30 * s, wl - 50 * s]];
    const wx = cx + 48 * s, wy = wl - 62 * s;

    // the glow first, so the boat sits inside it
    const glow = ctx.createRadialGradient(wx, wy, 4 * s, wx, wy, 150 * s);
    glow.addColorStop(0, 'rgba(255, 236, 170, 0.95)');
    glow.addColorStop(0.3, 'rgba(255, 210, 110, 0.5)');
    glow.addColorStop(1, 'rgba(255, 190, 90, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(wx - 160 * s, wy - 160 * s, 320 * s, 320 * s);

    // the window's light on the water: warm dashes trailing down from the boat
    const lr = K.rng(64);
    for (let y = wl + 12 * s; y < wl + 62 * s; y += 5 * s) {
      const t = (y - wl) / (62 * s), half = (22 + 40 * t) * s;
      let x = wx - half + lr() * 8 * s;
      while (x < wx + half) {
        const len = (8 + lr() * 18) * s;
        ctx.strokeStyle = lr() < 0.6 ? '#ffd27a' : INK.cream;
        ctx.globalAlpha = 1 - t * 0.5;
        ctx.lineWidth = 3.4 * s;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(Math.min(x + len, wx + half), y); ctx.stroke();
        x += len + (6 + lr() * 10) * s;
      }
    }
    ctx.globalAlpha = 1;

    // mast and a small pennant
    ctx.strokeStyle = '#1b0f24'; ctx.lineWidth = 4 * s; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx - 70 * s, wl - 40 * s); ctx.lineTo(cx - 70 * s, wl - 150 * s); ctx.stroke();
    K.fill(ctx, [[cx - 70 * s, wl - 150 * s], [cx - 30 * s, wl - 140 * s], [cx - 70 * s, wl - 130 * s]], '#ebe5c8');

    // hull and cabin on a deep red plate out of register
    ctx.save();
    ctx.translate(8 * s, 6 * s);
    for (const sh of [H1, cab, roof]) K.fill(ctx, sh, INK.sunPlate);
    ctx.restore();
    K.fill(ctx, H1, '#1b0f24');
    K.hatch(ctx, H1, { ink: '#3a2550', gap: 5, width: 1.2, angle: 0.05, dash: [20, 60], lift: 0.2, seed: 65, alpha: 0.9 });
    K.fill(ctx, cab, '#7d1d2a');
    K.hatch(ctx, cab, { ink: '#3c0a12', gap: 5, width: 1.1, angle: 1.4, dash: [10, 30], lift: 0.15, seed: 66, alpha: 0.8 });
    K.fill(ctx, roof, '#1b0f24');
    K.fill(ctx, win, '#ffe08a');
    K.fill(ctx, [[wx - 8 * s, wy - 9 * s], [wx + 2 * s, wy - 9 * s], [wx + 2 * s, wy - 1 * s], [wx - 8 * s, wy - 1 * s]], '#fff4d6');
    ctx.strokeStyle = '#1b0f24'; ctx.lineWidth = 2.4 * s;
    ctx.beginPath(); ctx.moveTo(wx, wy - 12 * s); ctx.lineTo(wx, wy + 12 * s); ctx.stroke();
    // the window's own glow on the cabin wall, then rays of light coming out of it
    const wglow = ctx.createRadialGradient(wx, wy, 6 * s, wx, wy, 60 * s);
    wglow.addColorStop(0, 'rgba(255, 236, 170, 0.7)');
    wglow.addColorStop(1, 'rgba(255, 236, 170, 0)');
    ctx.fillStyle = wglow;
    ctx.fillRect(wx - 60 * s, wy - 60 * s, 120 * s, 120 * s);
    // rays of light from the window
    const ry = K.rng(67);
    for (let k = 0; k < 14; k++) {
      const a = (k / 14) * Math.PI * 2 + (ry() - 0.5) * 0.2, r0 = 20 * s, r1 = (46 + ry() * 56) * s;
      const ray = K.lobe(wx + Math.cos(a) * r0, wy + Math.sin(a) * r0, a, r1, 5 * s, { tip: 0, base: 0.8 });
      ctx.globalAlpha = 0.8;
      K.fill(ctx, ray.outline, '#fff1c4');
    }
    ctx.globalAlpha = 1;

  };
  boat(1640, 700, 1.15);

  // Ultramarine hill, low on the left, peaking on the right.
  const l2 = K.ridge(-20, F + 20, 770, { amp: 28, freq: 0.0019, seed: 5, shape: (x) => -330 * Math.exp(-(((x - 3080) / 640) ** 2)) });
  const b2 = K.roughen(K.band(l2, FH), 2.5, { seed: 32 });
  K.fill(ctx, b2, INK.ultra);
  K.contour(ctx, b2, l2, { ink: '#6f78d8', gap: 9, count: 50, width: 2.1, seed: 6, alpha: 0.85 });

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
    plum: ['#5b2a86', '#a77fd6'], cobalt: ['#2445b0', '#7f9bf0'], teal: ['#14526f', '#5ea8c8'], green: ['#23805a', '#0b3a2b'],
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

  palm(2780, 965, 420, -60, 300, 21, { back: [P.violet, P.plum], front: [P.pink, P.pink], stalk: '#2e1147' });
  palm(3180, 955, 250, 45, 340, 22, { back: [P.cobalt, P.teal], front: [P.cream, P.cream], stalk: '#0b3646' });
  palm(3620, 945, 360, 60, 310, 23, { back: [P.plum, P.violet], front: [P.lilac, P.lilac], stalk: '#2e1147' });
  palmetto(90, 965, 150, 31, [P.pink, P.mustard, P.cream, P.lilac, P.coral, P.sage, P.violet]);
  palmetto(320, 980, 120, 32, [P.coral, P.lilac, P.mustard, P.cream, P.pink, P.sage, P.rose]);
  palmetto(2520, 965, 100, 33, [P.cream, P.pink, P.lilac, P.mustard, P.coral, P.sage, P.violet]);
  palmetto(3420, 975, 115, 34, [P.mustard, P.violet, P.coral, P.cream, P.pink, P.sage, P.lilac]);

  ctx.restore();
  K.grain(ctx, W, H, { amount: 15, linen: 7, seed: 77 });
}
