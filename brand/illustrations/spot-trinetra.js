// Trinetra spot: the third eye keeping watch over a walled garden at night, on an ultramarine disc.
// The eye is the logo's. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-trinetra.js,plants.js spot-trinetra.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2, r = K.rng(401);
  const ink = '#1b1a17';
  P.disc(880, 640, 460, INKS.ultra, 402);
  // stars
  const sky = K.blob(880, 640, 440, 440, { seed: 403, rough: 0.02 });
  K.clip(ctx, sky, () => {
    for (let i = 0; i < 46; i++) {
      const x = 460 + r() * 840, y = 230 + r() * 520, s = 2 + r() * 4;
      ctx.fillStyle = r() < 0.7 ? INKS.cream[0] : INKS.mustard[0];
      ctx.beginPath(); ctx.ellipse(x, y, s, s, 0, 0, TAU); ctx.fill();
    }
  });

  // the eye, upright, with cut rays of light around it
  const ex = 860, ey = 560, eh = 220, ew = 112;
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * TAU + (r() - 0.5) * 0.05, ca = Math.cos(a), sa = Math.sin(a);
    const r0 = Math.hypot(ew * ca, eh * sa) * 1.18 + 26, L = r0 + (i % 2 ? 70 : 105) + r() * 20;
    const at = (al, sd) => [ex + ca * al - sa * sd, ey + sa * al + ca * sd];
    const ray = K.roughen([at(r0, -9), at(L, -15), at(L + 6, 0), at(L, 15), at(r0, 9)], 1.4, { seed: 410 + i, spacing: 3 });
    K.fill(ctx, ray, INKS.cream[0]);
  }
  const almond = [];
  for (let i = 0; i <= 120; i++) { const t = i / 120, y = -eh + 2 * eh * t; almond.push([ex + ew * Math.pow(1 - (y / eh) ** 2, 0.8), ey + y]); }
  for (let i = 1; i < 120; i++) { const t = i / 120, y = eh - 2 * eh * t; almond.push([ex - ew * Math.pow(1 - (y / eh) ** 2, 0.8), ey + y]); }
  const eye = K.roughen(almond, 2, { seed: 430, spacing: 4 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, eye, INKS.verm);
  ctx.restore();
  K.fill(ctx, eye, INKS.white[0]);
  K.hatch(ctx, eye, { ink: INKS.white[1], gap: 7, width: 1, angle: 1.5, dash: [20, 90], lift: 0.3, seed: 431, alpha: 0.5 });
  const iris = K.blob(ex, ey, 58, 58, { seed: 432, rough: 0.04 });
  K.fill(ctx, iris, INKS.mustard[0]);
  K.radial(ctx, ex, ey, { clip: iris, count: 120, r0: 18, r1: 62, ink: INKS.mustard[1], width: 1.4, seed: 433, alpha: 0.8 });
  K.fill(ctx, K.blob(ex, ey, 22, 22, { seed: 434, rough: 0.05 }), ink);
  ctx.fillStyle = 'rgba(244,241,230,0.9)';
  ctx.beginPath(); ctx.ellipse(ex - 20, ey - 22, 9, 6, -0.5, 0, TAU); ctx.fill();

  // plants grown inside the wall, rising behind it
  P.spike(560, 1120, 420, INKS.violet, INKS.lilac, 441, 30, 0.3);
  P.spike(1200, 1120, 380, INKS.pink, INKS.white, 442, 28, 0.3);
  P.wheel(700, 1010, 170, INKS.green, 0.55, 443);
  P.wheel(1060, 1000, 160, INKS.bottle, 0.55, 444);

  // the wall: a low run of brick, cut from paper, on a vermilion plate
  const wall = K.roughen([[330, 1010], [1440, 990], [1450, 1160], [320, 1170]], 2, { seed: 450, spacing: 5 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, wall, INKS.verm);
  ctx.restore();
  K.fill(ctx, wall, INKS.maroon[0]);
  K.clip(ctx, wall, () => {
    for (let row = 0; row < 5; row++) {
      const y = 1030 + row * 34;
      P.line([[300, y], [1470, y - 6]], INKS.maroon[1], 4);
      for (let x = 330 + (row % 2) * 45; x < 1460; x += 90) P.line([[x, y - 34], [x, y]], INKS.maroon[1], 4);
    }
  });
  K.hatch(ctx, wall, { ink: INKS.rose[0], gap: 8, width: 1.2, angle: 0.02, dash: [30, 140], lift: 0.4, seed: 451, alpha: 0.5 });
  const cap = K.roughen([[310, 985], [1460, 965], [1462, 1000], [312, 1018]], 1.5, { seed: 452, spacing: 5 });
  K.fill(ctx, cap, INKS.cream[0]);
  K.stipple(ctx, cap, { ink: INKS.cream[1], per: 0.01, rMin: 0.8, rMax: 1.6, seed: 453 });

  P.wheel(520, 1250, 230, INKS.green, 0.55, 461);
  P.wheel(1120, 1260, 210, INKS.teal, 0.55, 462);
  P.wheel(830, 1300, 200, INKS.sage, 0.5, 463);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 464 });
}
