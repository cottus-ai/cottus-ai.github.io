// Cottus Runtime spot: three lupin spikes on a mustard disc. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-runtime.js,plants.js spot-runtime.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K);
  P.disc(860, 640, 460, INKS.mustard, 21);
  ctx.save();
  ctx.translate(18, 12);
  P.spike(820, 1330, 1120, [INKS.verm, INKS.verm[0]], [INKS.verm, INKS.verm[0]], 31, 50, 0.24);
  ctx.restore();
  P.spike(580, 1350, 900, INKS.violet, INKS.lilac, 33, 44, 0.24);
  P.spike(1070, 1350, 820, INKS.pink, INKS.white, 34, 42, 0.24);
  P.spike(820, 1330, 1120, INKS.cream, INKS.white, 31, 50, 0.24);
  P.wheel(560, 1330, 250, INKS.green, 0.55, 41);
  P.wheel(1060, 1350, 230, INKS.teal, 0.55, 42);
  P.wheel(810, 1400, 220, INKS.bottle, 0.5, 43);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 44 });
}
