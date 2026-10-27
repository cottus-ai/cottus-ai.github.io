// Offprint second spot: scissors cutting a paper flower out of a printed sheet, on a cobalt disc.
// Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-scissors.js,plants.js spot-scissors.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2;
  const ink = '#1b1a17';
  P.disc(880, 640, 460, INKS.cobalt, 301);
  P.wheel(520, 1270, 240, INKS.green, 0.55, 302);
  P.wheel(1110, 1280, 220, INKS.sage, 0.55, 303);

  // a flower outline: five round petals around a centre
  const flower = (cx, cy, R, rot, seed) => {
    const pts = [];
    for (let i = 0; i <= 300; i++) {
      const a = (i / 300) * TAU, r = R * (0.62 + 0.38 * Math.abs(Math.cos((a - rot) * 2.5)));
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return K.roughen(pts, 1.8, { seed, spacing: 4 });
  };
  const rect = (cx, cy, w, h, rot) => {
    const c = Math.cos(rot), s = Math.sin(rot), pts = [], corners = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 30; j++) {
      const t = j / 30, x = K.lerp(corners[i][0], corners[(i + 1) % 4][0], t), y = K.lerp(corners[i][1], corners[(i + 1) % 4][1], t);
      pts.push([cx + x * c - y * s, cy + x * s + y * c]);
    }
    return pts;
  };

  // the sheet, on a vermilion plate out of register, with the dashed outline still to cut
  const sheet = K.roughen(rect(780, 820, 760, 560, -0.12), 2, { seed: 311, spacing: 5 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, sheet, INKS.verm);
  ctx.restore();
  K.fill(ctx, sheet, INKS.cream[0]);
  K.stipple(ctx, sheet, { ink: INKS.cream[1], per: 0.002, rMin: 0.7, rMax: 1.4, seed: 312, alpha: 0.6 });
  K.clip(ctx, sheet, () => {
    for (let i = 0; i < 7; i++) {
      const y = 600 + i * 30 + (i > 3 ? 150 : 0);
      P.line([[460 + i * 4, y + 60 - i * 3], [700 - i * 6, y + 30]], INKS.cream[1], 5);
    }
  });
  ctx.save();
  ctx.setLineDash([22, 16]);
  P.edge(flower(930, 820, 190, 0.2, 313), INKS.teal[0], 5);
  ctx.restore();

  // the cut-out flower, lifted off the sheet
  const cut = flower(540, 1010, 175, 0.5, 321);
  ctx.save();
  ctx.translate(16, 12);
  K.fill(ctx, cut, INKS.verm);
  ctx.restore();
  K.fill(ctx, cut, INKS.poppy[0]);
  K.radial(ctx, 540, 1010, { clip: cut, count: 160, r0: 20, r1: 190, ink: INKS.poppy[1], width: 1.3, seed: 322, alpha: 0.7 });
  P.edge(cut, INKS.poppy[1], 1.6);
  const eye = K.blob(540, 1010, 46, 46, { seed: 323, rough: 0.1 });
  K.fill(ctx, eye, ink);
  K.stipple(ctx, eye, { ink: INKS.mustard[0], per: 0.05, rMin: 1.5, rMax: 3, seed: 324 });

  // scissors, open, lying across the cut line
  const px = 1000, py = 560, open = 0.32, dir = 2.2;
  const blade = (a, seed) => K.roughen(K.lobe(px, py, a, 520, 64, { tip: 0, base: 0.7, bend: 0.04 }).outline, 1.5, { seed });
  const b1 = blade(dir - open / 2, 331), b2 = blade(dir + open / 2, 332);
  for (const [b, s] of [[b2, 333], [b1, 334]]) {
    K.fill(ctx, b, INKS.white[0]);
    K.hatch(ctx, b, { ink: INKS.white[1], gap: 6, width: 1.1, angle: dir + 1.4, dash: [24, 80], lift: 0.1, seed: s, alpha: 0.8 });
    P.edge(b, INKS.white[1], 1.8);
  }
  const ring = (a, seed) => {
    const hx = px + Math.cos(a) * 190, hy = py + Math.sin(a) * 190;
    P.line([[px, py], [hx - Math.cos(a) * 60, hy - Math.sin(a) * 60]], INKS.mustard[0], 30);
    const o = K.blob(hx, hy, 92, 66, { seed, rough: 0.05, rot: a });
    ctx.save();
    ctx.translate(14, 10);
    P.edge(o, INKS.verm, 30);
    ctx.restore();
    P.edge(o, INKS.mustard[0], 30);
    P.edge(o, INKS.mustard[1], 2);
  };
  ring(dir + Math.PI - open / 2 - 0.25, 341);
  ring(dir + Math.PI + open / 2 + 0.25, 342);
  const pin = K.blob(px, py, 24, 24, { seed: 343, rough: 0.05 });
  K.fill(ctx, pin, INKS.cream[1]);
  K.fill(ctx, K.blob(px, py, 8, 8, { seed: 344, rough: 0.05 }), ink);

  P.wheel(820, 1330, 200, INKS.teal, 0.5, 351);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 352 });
}
