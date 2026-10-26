// akernl spot: a pomegranate cut open, its seeds sealed in separate chambers, on an ultramarine disc.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-akernl.js,plants.js spot-akernl.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), TAU = Math.PI * 2, r = K.rng(91);
  P.disc(880, 640, 460, INKS.ultra, 92);
  const cx = 790, cy = 760, R = 400;
  // the fruit rests on a bed of leaves
  P.wheel(1110, 1170, 240, INKS.green, 0.55, 111);
  P.wheel(470, 1190, 220, INKS.bottle, 0.55, 112);
  P.wheel(800, 1240, 230, INKS.teal, 0.5, 113);

  // rind, on a vermilion plate out of register, with the crown on top
  const rind = K.roughen(K.blob(cx, cy, R, R * 0.96, { seed: 93, rough: 0.06 }), 2.5, { seed: 94 });
  const crown = [];
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI / 2 + (i - 2.5) * 0.28;
    crown.push(K.roughen(K.lobe(cx, cy - R * 0.9, a, 120 + 30 * r(), 50, { tip: 0, base: 0.5 }).outline, 1.5, { seed: 95 + i }));
  }
  ctx.save();
  ctx.translate(20, 14);
  for (const s of [rind, ...crown]) K.fill(ctx, s, INKS.verm);
  ctx.restore();
  for (const c of crown) { K.fill(ctx, c, INKS.rose[0]); K.hatch(ctx, c, { ink: INKS.rose[1], gap: 6, width: 1.2, angle: 1.4, dash: [20, 60], lift: 0.05, seed: 96 }); P.edge(c, INKS.rose[1]); }
  K.fill(ctx, rind, INKS.rose[0]);
  K.flow(ctx, rind, { ink: INKS.rose[1], per: 0.004, len: 26, turn: 0.6, freq: 0.004, width: 1.2, seed: 97, alpha: 0.7 });

  // the cut face: cream pith, six chambers split by membranes
  const face = K.roughen(K.blob(cx, cy, R * 0.86, R * 0.83, { seed: 98, rough: 0.07 }), 2, { seed: 99 });
  K.fill(ctx, face, INKS.cream[0]);
  K.stipple(ctx, face, { ink: INKS.cream[1], per: 0.004, rMin: 0.8, rMax: 1.6, seed: 100 });
  const walls = [0.3, 1.35, 2.3, 3.4, 4.4, 5.35];
  const inWall = (a) => walls.some((w) => Math.abs(Math.atan2(Math.sin(a - w), Math.cos(a - w))) < 0.12);
  K.clip(ctx, face, () => {
    for (let i = 0; i < 520; i++) {
      const a = r() * TAU, d = Math.sqrt(r()) * R * 0.74;
      if (d < R * 0.12 || inWall(a)) continue;
      const sx = cx + Math.cos(a) * d, sy = cy + Math.sin(a) * d * 0.97, s = 15 + 7 * r();
      const seed = K.blob(sx, sy, s, s * 0.8, { seed: 200 + i, rough: 0.2, rot: a });
      K.fill(ctx, seed, r() < 0.2 ? INKS.rose[0] : INKS.poppy[0]);
      P.edge(seed, INKS.poppy[1], 1.2);
      ctx.fillStyle = 'rgba(244,241,230,0.85)';
      ctx.beginPath(); ctx.ellipse(sx - s * 0.3, sy - s * 0.25, s * 0.22, s * 0.12, a, 0, TAU); ctx.fill();
    }
  });
  for (const w of walls) {
    const pts = [];
    for (let i = 0; i <= 20; i++) { const t = i / 20, d = R * 0.1 + t * R * 0.74, b = Math.sin(t * Math.PI) * 0.08; pts.push([cx + Math.cos(w + b) * d, cy + Math.sin(w + b) * d]); }
    P.line(pts, INKS.cream[0], 14);
    P.line(pts, INKS.cream[1], 1.4);
  }
  K.fill(ctx, K.blob(cx, cy, R * 0.12, R * 0.12, { seed: 101, rough: 0.1 }), INKS.cream[0]);
  P.edge(face, INKS.rose[1], 1.6);

  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 113 });
}
