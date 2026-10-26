// argus spot: a passion flower, which looks like an eye, on a cobalt disc. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-argus.js,plants.js spot-argus.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K);
  P.disc(880, 640, 460, INKS.cobalt, 51);
  P.stem(780, 1440, 760, 760, -40, INKS.bottle[0], 14);
  // a curling tendril and a closed bud
  const tendril = [];
  for (let i = 0; i <= 80; i++) {
    const t = i / 80, a = t * Math.PI * 4.2, rr = 70 * (1 - t) + 12;
    tendril.push([1080 + t * 140 + Math.cos(a) * rr, 1060 - t * 260 + Math.sin(a) * rr]);
  }
  P.stem(800, 1440, 1090, 1060, 60, INKS.bottle[0], 8);
  P.line(tendril, INKS.sage[0], 6);
  P.stem(790, 1440, 470, 980, -50, INKS.bottle[0], 8);
  const bud = K.roughen(K.blob(470, 930, 46, 78, { seed: 61, rough: 0.12, rot: -0.3 }), 1.5, { seed: 62 });
  K.fill(ctx, bud, INKS.sage[0]);
  K.hatch(ctx, bud, { ink: INKS.sage[1], gap: 6, width: 1.2, angle: 1.2, dash: [20, 60], lift: 0.05, seed: 63 });
  P.passion(760, 700, 360, 0.86, 0.2, [INKS.white[0], INKS.lilac[1], INKS.cream[0]], [INKS.violet[1], INKS.white[0], INKS.violet[0]], 71, INKS.verm);
  P.wheel(560, 1420, 210, INKS.green, 0.58, 81);
  P.wheel(1010, 1450, 190, INKS.bottle, 0.55, 82);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 84 });
}
