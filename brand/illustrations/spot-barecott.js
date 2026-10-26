// barecott spot: a closed bud on a teal disc, for a project that isn't public yet. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-barecott.js,plants.js spot-barecott.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K);
  P.disc(860, 640, 460, INKS.teal, 131);
  P.stem(800, 1400, 800, 760, 30, INKS.bottle[0], 16);
  const sepals = [];
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * 0.32;
    sepals.push(K.roughen(K.lobe(800, 780, a, 330 - Math.abs(i - 2) * 40, 150, { tip: 0.1, base: 0.5, bend: (i - 2) * 0.08 }).outline, 2, { seed: 140 + i }));
  }
  ctx.save();
  ctx.translate(20, 14);
  for (const s of sepals) K.fill(ctx, s, INKS.verm);
  ctx.restore();
  sepals.forEach((s, i) => {
    const p = i === 2 ? INKS.pink : i % 2 ? INKS.sage : INKS.green;
    K.fill(ctx, s, p[0]);
    K.hatch(ctx, s, { ink: p[1], gap: 6, width: 1.2, angle: 1.3 + (i - 2) * 0.3, dash: [20, 60], lift: 0.05, seed: 150 + i, alpha: 0.8 });
    P.edge(s, p[1], 1.4);
  });
  P.wheel(560, 1360, 230, INKS.green, 0.55, 161);
  P.wheel(1040, 1380, 210, INKS.bottle, 0.55, 162);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 163 });
}
