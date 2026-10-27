// Trinetra second spot: a scope letter closed with a wax seal, on a teal disc: nothing is tested
// unless a signed scope allows it. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-seal.js,plants.js spot-seal.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2, r = K.rng(501);
  P.disc(880, 640, 460, INKS.teal, 502);
  P.wheel(520, 1250, 240, INKS.green, 0.55, 503);
  P.wheel(1120, 1260, 220, INKS.bottle, 0.55, 504);

  const rect = (cx, cy, w, h, rot) => {
    const c = Math.cos(rot), s = Math.sin(rot), pts = [], cs = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 30; j++) {
      const t = j / 30, x = K.lerp(cs[i][0], cs[(i + 1) % 4][0], t), y = K.lerp(cs[i][1], cs[(i + 1) % 4][1], t);
      pts.push([cx + x * c - y * s, cy + x * s + y * c]);
    }
    return pts;
  };
  const rot = -0.1, cx = 800, cy = 820;
  const toWorld = (x, y) => [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)];

  // the letter, folded in three: two creases, typed lines, on a vermilion plate
  const sheet = K.roughen(rect(cx, cy, 720, 520, rot), 2, { seed: 511, spacing: 5 });
  ctx.save();
  ctx.translate(18, 12);
  K.fill(ctx, sheet, INKS.verm);
  ctx.restore();
  K.fill(ctx, sheet, INKS.cream[0]);
  K.stipple(ctx, sheet, { ink: INKS.cream[1], per: 0.002, rMin: 0.7, rMax: 1.4, seed: 512, alpha: 0.6 });
  for (const yy of [-87, 87]) P.line([toWorld(-360, yy), toWorld(360, yy)], INKS.cream[1], 2.5);
  for (let i = 0; i < 9; i++) {
    const yy = -215 + i * 26 + (i > 4 ? 60 : 0) + (i > 7 ? 30 : 0), x1 = -300 + 260 + r() * 260;
    if (yy > -95 && yy < -75) continue;
    P.line([toWorld(-300, yy), toWorld(x1, yy)], i === 0 ? '#1b1a17' : INKS.white[1], i === 0 ? 7 : 4);
  }
  // a ribbon under the seal
  const rib = K.roughen([toWorld(-40, 120), toWorld(40, 120), toWorld(70, 330), toWorld(10, 300), toWorld(-60, 340)], 1.5, { seed: 520 });
  K.fill(ctx, rib, INKS.mustard[0]);
  K.hatch(ctx, rib, { ink: INKS.mustard[1], gap: 6, width: 1.1, angle: 1.4, dash: [20, 60], lift: 0.1, seed: 521 });

  // the wax seal: a lumpy disc, a raised ring and the eye pressed into it
  const [sx, sy] = toWorld(0, 150);
  const wax = K.roughen(K.blob(sx, sy, 118, 112, { seed: 530, rough: 0.16, freq: 2.2 }), 2.5, { seed: 531 });
  K.fill(ctx, wax, INKS.poppy[0]);
  K.radial(ctx, sx, sy, { clip: wax, count: 140, r0: 30, r1: 130, ink: INKS.poppy[1], width: 1.4, seed: 532, alpha: 0.6 });
  P.edge(K.blob(sx, sy, 78, 78, { seed: 533, rough: 0.03 }), INKS.poppy[1], 6);
  const eh = 50, ew = 26, almond = [];
  for (let i = 0; i <= 60; i++) { const t = i / 60, y = -eh + 2 * eh * t; almond.push([sx + ew * Math.pow(1 - (y / eh) ** 2, 0.8), sy + y]); }
  for (let i = 1; i < 60; i++) { const t = i / 60, y = eh - 2 * eh * t; almond.push([sx - ew * Math.pow(1 - (y / eh) ** 2, 0.8), sy + y]); }
  P.edge(almond, INKS.poppy[1], 5);
  K.fill(ctx, K.blob(sx, sy, 11, 11, { seed: 534, rough: 0.05 }), INKS.poppy[1]);
  ctx.fillStyle = 'rgba(244,241,230,0.55)';
  ctx.beginPath(); ctx.ellipse(sx - 60, sy - 55, 16, 8, -0.7, 0, TAU); ctx.fill();

  P.wheel(830, 1300, 200, INKS.sage, 0.5, 541);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 542 });
}
