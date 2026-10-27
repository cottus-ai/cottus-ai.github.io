// Trinetra checks spot: a magnifying glass finding a beetle on a leaf, on a violet disc.
// Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-magnifier.js,plants.js spot-magnifier.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2;
  const ink = '#1b1a17';
  P.disc(880, 640, 460, INKS.violet, 601);
  P.wheel(520, 1250, 230, INKS.bottle, 0.55, 602);
  P.wheel(1130, 1260, 210, INKS.teal, 0.55, 603);

  // a big leaf lying across the disc, midrib and veins cut in cream
  const leaf = K.lobe(330, 1180, -0.72, 1000, 470, { tip: 0.05, base: 0.15, bend: 0.12 });
  const lo = K.roughen(leaf.outline, 2.5, { seed: 611, spacing: 5 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, lo, INKS.verm);
  ctx.restore();
  K.fill(ctx, lo, INKS.green[0]);
  K.flow(ctx, lo, { ink: INKS.green[1], per: 0.004, len: 26, turn: 0.4, freq: 0.003, width: 1.3, seed: 612, alpha: 0.7 });
  P.line(leaf.mid, INKS.cream[0], 7);
  for (let i = 4; i < leaf.mid.length - 4; i += 4) {
    const [mx, my] = leaf.mid[i], [nx, ny] = leaf.mid[i + 1], a = Math.atan2(ny - my, nx - mx);
    for (const side of [-1, 1]) {
      const L = 150 * Math.sin(Math.PI * i / leaf.mid.length) + 30, b = a + side * 0.75;
      P.line([[mx, my], [mx + Math.cos(b) * L * 0.6, my + Math.sin(b) * L * 0.6 + 4], [mx + Math.cos(b - side * 0.2) * L, my + Math.sin(b - side * 0.2) * L]], INKS.cream[0], 3);
    }
  }

  // a beetle: wing cases, a split down the back, spots, legs and feelers
  const beetle = (bx, by, s, rot) => {
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(rot);
    ctx.scale(s, s);
    for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
      const y0 = -20 + k * 26;
      P.line([[side * 30, y0], [side * 62, y0 - 14 + k * 12], [side * 78, y0 + 6 + k * 14]], ink, 5);
    }
    for (const side of [-1, 1]) P.line([[side * 8, -62], [side * 22, -92], [side * 40, -104]], ink, 4);
    K.fill(ctx, K.blob(0, -56, 22, 16, { seed: 621, rough: 0.05 }), ink);
    const shell = K.roughen(K.blob(0, 6, 46, 62, { seed: 622, rough: 0.04 }), 1.2, { seed: 623, spacing: 3 });
    K.fill(ctx, shell, INKS.poppy[0]);
    K.radial(ctx, 0, -50, { clip: shell, count: 60, r0: 10, r1: 130, a0: 0.9, a1: 2.2, ink: INKS.poppy[1], width: 1, seed: 624, alpha: 0.6 });
    P.line([[0, -50], [0, 66]], ink, 4);
    for (const [x, y, r] of [[-22, -18, 9], [20, -12, 8], [-18, 26, 10], [22, 30, 9], [-6, 52, 6], [10, 52, 6]]) K.fill(ctx, K.blob(x, y, r, r, { seed: 630 + x, rough: 0.1 }), ink);
    ctx.fillStyle = 'rgba(244,241,230,0.8)';
    ctx.beginPath(); ctx.ellipse(-20, -30, 7, 4, -0.6, 0, TAU); ctx.fill();
    ctx.restore();
  };
  beetle(980, 640, 0.75, 0.6);

  // the glass: a tinted lens with the beetle large inside it, a brass ring and a wooden handle
  const lx = 940, ly = 610, lr = 230;
  const handle = K.lobe(lx - 150, ly + 165, 2.35, 380, 70, { tip: 0.9, base: 0.9 });
  const ho = K.roughen(handle.outline, 1.5, { seed: 641, spacing: 4 });
  ctx.save();
  ctx.translate(16, 12);
  K.fill(ctx, ho, INKS.verm);
  ctx.restore();
  K.fill(ctx, ho, INKS.maroon[0]);
  K.hatch(ctx, ho, { ink: INKS.maroon[1], gap: 6, width: 1.2, angle: 2.35, dash: [40, 120], lift: 0.1, seed: 642 });
  const lens = K.blob(lx, ly, lr, lr, { seed: 643, rough: 0.01 });
  K.clip(ctx, lens, () => {
    ctx.fillStyle = 'rgba(214,236,236,0.28)';
    ctx.fill(K.path(lens));
    beetle(985, 645, 1.45, 0.6);
    ctx.fillStyle = 'rgba(244,241,230,0.35)';
    ctx.beginPath(); ctx.ellipse(lx - 110, ly - 120, 60, 26, -0.7, 0, TAU); ctx.fill();
  });
  const ring = K.blob(lx, ly, lr + 10, lr + 10, { seed: 644, rough: 0.01 });
  ctx.save();
  ctx.translate(14, 10);
  P.edge(ring, INKS.verm, 34);
  ctx.restore();
  P.edge(ring, INKS.mustard[0], 34);
  P.edge(ring, INKS.mustard[1], 2);

  P.wheel(820, 1300, 200, INKS.sage, 0.5, 651);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 652 });
}
