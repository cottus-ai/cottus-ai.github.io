// Loose petals and a few small blossoms for the page's side margins. Transparent, and seamless
// top to bottom so it can repeat down a long page. The outer edge is on the left; `MIRROR` flips it.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs side-petals.js,plants.js petals-left.png 680 2400
function draw(ctx, W, H, K) {
  const MIRROR = typeof SIDE !== 'undefined' && SIDE === 'right';
  const P = Plants(ctx, K), TAU = Math.PI * 2, r = K.rng(MIRROR ? 707 : 303);
  const inks = [INKS.pink, INKS.rose, INKS.mustard, INKS.cream, INKS.lilac, INKS.violet, INKS.poppy, INKS.white, INKS.teal, INKS.cobalt];
  if (MIRROR) { ctx.translate(W, 0); ctx.scale(-1, 1); }

  // Draws at y and at y ± H, so a shape that crosses an edge continues on the next tile.
  const wrap = (y, fn) => [y - H, y, y + H].forEach((yy) => { if (yy > -300 && yy < H + 300) fn(yy); });

  const petal = (x, y, len, wid, a, p, plate) => {
    const o = K.roughen(K.lobe(x, y, a, len, wid, { tip: 0.6 + 0.4 * r(), base: 0.15, bend: (r() - 0.5) * 0.5 }).outline, 1.2, { seed: Math.floor(r() * 1e6), spacing: 4 });
    if (plate) {
      ctx.save();
      ctx.translate(7, 5);
      K.fill(ctx, o, INKS.verm);
      ctx.restore();
    }
    K.fill(ctx, o, p[0]);
    K.radial(ctx, x, y, { clip: o, count: 18, r0: 0, r1: len * 1.05, a0: a - 0.35, a1: a + 0.35, ink: p[1], width: 0.9, bend: 0.05, seed: Math.floor(r() * 1e6), alpha: 0.8 });
    P.edge(o, p[1], 0.9);
  };

  const blossom = (x, y, R, p, seed) => {
    const rr = K.rng(seed), n = 5 + Math.floor(rr() * 2), rot = rr() * TAU;
    for (let i = 0; i < n; i++) petal(x, y, R, R * 0.8, rot + (i / n) * TAU, p, false);
    K.fill(ctx, K.blob(x, y, R * 0.24, R * 0.24, { seed, rough: 0.1 }), INKS.black);
    K.stipple(ctx, K.blob(x, y, R * 0.24, R * 0.24, { seed, rough: 0.1 }), { ink: INKS.mustard[0], per: 0.08, rMin: 0.8, rMax: 1.6, seed });
  };

  // Denser toward the outer edge, thinning toward the content.
  const count = 150;
  for (let i = 0; i < count; i++) {
    const x = W * Math.pow(r(), 1.6) * 0.95 + 10;
    const y = r() * H;
    const len = 34 + r() * 60, wid = len * (0.45 + 0.3 * r()), a = r() * TAU, p = inks[Math.floor(r() * inks.length)], plate = r() < 0.25;
    wrap(y, (yy) => petal(x, yy, len, wid, a, p, plate));
  }
  for (let i = 0; i < 9; i++) {
    const x = W * Math.pow(r(), 1.3) * 0.8 + 40, y = (i + r() * 0.7) * (H / 9), R = 34 + r() * 26, p = inks[Math.floor(r() * 7)], seed = Math.floor(r() * 1e6);
    wrap(y, (yy) => blossom(x, yy, R, p, seed));
  }
  K.grain(ctx, W, H, { amount: 12, linen: 4, seed: MIRROR ? 9 : 8 });
}
