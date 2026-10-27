// Trinetra on-prem spot: a wooden gate in a flowering hedge, shut with a padlock, on a mustard disc.
// Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-gate.js,plants.js spot-gate.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2, r = K.rng(701);
  const ink = '#1b1a17';
  P.disc(880, 640, 460, INKS.mustard, 702);

  // the hedge: a clipped mass with a round-topped opening
  const hedge = K.roughen(K.blob(880, 1010, 590, 400, { seed: 703, rough: 0.07, freq: 2.4 }).map(([x, y]) => [x, Math.min(y, 1200)]), 3, { seed: 704, spacing: 5 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, hedge, INKS.verm);
  ctx.restore();
  K.fill(ctx, hedge, INKS.bottle[0]);
  K.flow(ctx, hedge, { ink: INKS.green[0], per: 0.006, len: 22, turn: 0.9, freq: 0.006, width: 2, seed: 705, alpha: 0.9 });
  K.stipple(ctx, hedge, { ink: INKS.sage[0], per: 0.003, rMin: 2, rMax: 4, seed: 706 });
  // small flowers in the hedge
  K.clip(ctx, hedge, () => {
    for (let i = 0; i < 40; i++) {
      const x = 340 + r() * 1080, y = 690 + r() * 460;
      if (x > 650 && x < 1110 && y > 640) continue;
      const ink2 = [INKS.white[0], INKS.pink[0], INKS.lilac[0]][i % 3];
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * TAU;
        K.fill(ctx, K.blob(x + Math.cos(a) * 9, y + Math.sin(a) * 9, 8, 6, { seed: 710 + i * 5 + k, rough: 0.1, rot: a }), ink2);
      }
      K.fill(ctx, K.blob(x, y, 5, 5, { seed: 760 + i, rough: 0.1 }), INKS.mustard[0]);
    }
  });

  // the gate: an arch of planks with iron bands
  const arch = [];
  const gx = 880, gw = 210, top = 700, bottom = 1200;
  for (let i = 0; i <= 40; i++) { const a = Math.PI + (i / 40) * Math.PI; arch.push([gx + Math.cos(a) * gw, top + gw + Math.sin(a) * gw]); }
  arch.push([gx + gw, bottom], [gx - gw, bottom]);
  const gate = K.roughen(arch, 2, { seed: 771, spacing: 4 });
  const frame = K.roughen(arch.map(([x, y]) => [gx + (x - gx) * 1.12, y < bottom ? top + gw + (y - top - gw) * 1.1 - 6 : y]), 2, { seed: 772, spacing: 4 });
  K.fill(ctx, frame, INKS.cream[0]);
  K.stipple(ctx, frame, { ink: INKS.cream[1], per: 0.006, rMin: 1, rMax: 2, seed: 773 });
  K.fill(ctx, gate, INKS.maroon[0]);
  K.clip(ctx, gate, () => {
    for (let x = gx - gw + 52; x < gx + gw; x += 52) P.line([[x, top - 20], [x, bottom + 10]], INKS.maroon[1], 5);
    K.hatch(ctx, gate, { ink: INKS.rose[0], gap: 7, width: 1.2, angle: 1.57, dash: [60, 220], lift: 0.3, seed: 774, alpha: 0.6 });
    for (const y of [820, 1080]) {
      P.line([[gx - gw, y], [gx + gw, y]], ink, 16);
      for (const x of [gx - 150, gx - 50, gx + 50, gx + 150]) K.fill(ctx, K.blob(x, y, 6, 6, { seed: 780 + x, rough: 0.1 }), INKS.cream[1]);
    }
  });

  // the padlock on a hasp
  const lx = gx + 4, ly = 950;
  P.line([[gx - 60, ly - 30], [gx + 70, ly - 30]], ink, 14);
  const shackle = [];
  for (let i = 0; i <= 30; i++) { const a = Math.PI + (i / 30) * Math.PI; shackle.push([lx + Math.cos(a) * 46, ly - 10 + Math.sin(a) * 60]); }
  P.line([[lx - 46, ly + 10], ...shackle, [lx + 46, ly + 10]], INKS.white[1], 18);
  P.line([[lx - 46, ly + 10], ...shackle, [lx + 46, ly + 10]], INKS.white[0], 11);
  const body = K.roughen([[lx - 78, ly], [lx + 78, ly], [lx + 82, ly + 130], [lx - 82, ly + 130]], 1.5, { seed: 791, spacing: 4 });
  ctx.save();
  ctx.translate(12, 9);
  K.fill(ctx, body, INKS.verm);
  ctx.restore();
  K.fill(ctx, body, INKS.mustard[0]);
  K.hatch(ctx, body, { ink: INKS.mustard[1], gap: 6, width: 1.2, angle: 0, dash: [30, 100], lift: 0.2, seed: 792, alpha: 0.7 });
  K.fill(ctx, K.blob(lx, ly + 50, 15, 15, { seed: 793, rough: 0.05 }), ink);
  K.fill(ctx, [[lx - 7, ly + 55], [lx + 7, ly + 55], [lx + 10, ly + 95], [lx - 10, ly + 95]], ink);

  P.wheel(500, 1260, 230, INKS.green, 0.55, 801);
  P.wheel(1150, 1270, 210, INKS.teal, 0.55, 802);
  P.wheel(860, 1310, 190, INKS.sage, 0.5, 803);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 804 });
}
