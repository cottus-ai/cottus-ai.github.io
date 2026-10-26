// Cottus spot illustration: one white anemone with a bud, against a teal disc. Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-anemone.js spot-anemone.png 1600 1600
function draw(ctx, W, H, K) {
  const TAU = Math.PI * 2, BLACK = '#000000';
  const INK = {
    teal: '#14526f', tealLine: '#3f86a8', white: '#f4f1e6', whiteLine: '#8e897d', verm: '#ee3b05',
    green: '#23805a', greenLine: '#0b3a2b', bottle: '#0f4935', bottleLine: '#2f7a5c', sage: '#6f8f3a',
    violet: '#8a4fd0', violetLine: '#4b2580', cobalt: '#2445b0',
  };
  const S = 1600;
  ctx.save();
  ctx.scale(W / S, H / S);
  const line = (pts, ink, w) => {
    ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(K.path(pts, false));
  };
  const edge = (pts, ink, w) => { ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.stroke(K.path(pts)); };

  // disc
  const disc = K.roughen(K.blob(860, 660, 460, 460, { seed: 8, rough: 0.04 }), 3, { seed: 9 });
  K.fill(ctx, disc, INK.teal);
  K.flow(ctx, disc, { ink: INK.tealLine, per: 0.006, len: 30, turn: 0.3, freq: 0.002, width: 1.3, seed: 10, alpha: 0.7 });
  K.stipple(ctx, disc, { ink: BLACK, per: 0.006, rMin: 1, rMax: 2.6, seed: 11, density: (x, y) => Math.max(0, Math.hypot(x - 860, y - 660) / 460 - 0.55) * 2.2 });

  // stems
  const stem = (x0, y0, x1, y1, bend, w) => {
    const pts = [];
    for (let i = 0; i <= 30; i++) { const t = i / 30; pts.push([K.lerp(x0, x1, t) + bend * Math.sin(Math.PI * t), K.lerp(y0, y1, t)]); }
    line(pts, INK.bottle, w);
  };
  stem(760, 1430, 740, 760, -50, 14);
  stem(800, 1430, 1180, 900, 60, 9);

  // the bud, half open
  ctx.save();
  ctx.translate(1185, 880);
  ctx.rotate(0.35);
  for (let i = 0; i < 4; i++) {
    const a = -Math.PI / 2 + (i - 1.5) * 0.32;
    const o = K.roughen(K.lobe(0, 0, a, 120, 90, { tip: 0.9, base: 0.4 }).outline, 1.5, { seed: 30 + i });
    K.fill(ctx, o, INK.violet);
    K.radial(ctx, 0, 0, { clip: o, count: 40, r0: 10, r1: 130, a0: a - 0.4, a1: a + 0.4, ink: INK.violetLine, width: 0.9, seed: 31 + i, alpha: 0.8 });
    edge(o, INK.violetLine, 1);
  }
  ctx.restore();

  // the anemone, vermilion plate out of register behind its white petals
  const ax = 740, ay = 700, R = 330;
  const petals = [];
  const r = K.rng(77);
  for (let ring = 0; ring < 2; ring++) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU + ring * (Math.PI / 6) + (r() - 0.5) * 0.15;
      const l = K.lobe(0, 0, a, R * (ring ? 0.82 : 1) * (0.9 + 0.2 * r()), R * 0.82, { tip: 0.95, base: 0.25, bend: (r() - 0.5) * 0.25 });
      petals.push({ a, o: K.roughen(l.outline, 2.5, { seed: 40 + i + ring * 13, spacing: 6 }) });
    }
  }
  ctx.save();
  ctx.translate(ax, ay);
  ctx.scale(1, 0.92);
  ctx.save();
  ctx.translate(20, 14);
  for (const p of petals) K.fill(ctx, p.o, INK.verm);
  ctx.restore();
  for (const p of petals) {
    K.fill(ctx, p.o, INK.white);
    K.stipple(ctx, p.o, { ink: INK.whiteLine, per: 0.02, rMin: 0.7, rMax: 1.5, seed: 50, density: (px, py) => Math.max(0, 1 - Math.hypot(px, py) / (R * 0.7)) });
    K.radial(ctx, 0, 0, { clip: p.o, count: 110, r0: R * 0.12, r1: R * 1.1, a0: p.a - 0.55, a1: p.a + 0.55, ink: INK.whiteLine, width: 1, bend: 0.06, seed: 60, alpha: 0.75 });
    edge(p.o, INK.whiteLine, 1.2);
  }
  K.radial(ctx, 0, 0, { count: 160, r0: R * 0.1, r1: R * 0.42, ink: BLACK, width: 2, bend: 0.12, seed: 70 });
  ctx.fillStyle = BLACK;
  for (let i = 0; i < 110; i++) {
    const a = r() * TAU, d = R * (0.26 + 0.15 * r());
    ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, 3 + 2.5 * r(), 0, TAU); ctx.fill();
  }
  const boss = K.blob(0, 0, R * 0.16, R * 0.16, { seed: 71, rough: 0.08 });
  K.fill(ctx, boss, BLACK);
  K.stipple(ctx, boss, { ink: INK.cobalt, per: 0.02, rMin: 1, rMax: 2, seed: 72 });
  ctx.restore();

  // leaf wheels at the base, inside the frame
  const wheel = (x, y, rr, ink, vein, tilt, seed) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, tilt);
    for (const l of K.palmate(0, 0, { lobes: 11, len: rr, wid: rr * 0.4, dir: -Math.PI / 2, spread: TAU * (10 / 11), even: true, droop: 0, tip: 0.9, seed })) {
      const o = K.roughen(l.outline, 1, { seed: seed + 3 });
      K.fill(ctx, o, ink);
      const m = l.mid, ang = Math.atan2(m[m.length - 1][1] - m[0][1], m[m.length - 1][0] - m[0][0]);
      K.hatch(ctx, o, { ink: vein, gap: 5, width: 1, angle: ang + 1.1, dash: [16, 50], lift: 0.05, wave: 0.6, seed: seed + 9, alpha: 0.7 });
      edge(o, vein, 1.3);
      line(m.slice(2), vein, 2);
    }
    ctx.restore();
  };
  wheel(560, 1420, 210, INK.green, INK.greenLine, 0.58, 81);
  wheel(980, 1440, 190, INK.bottle, INK.bottleLine, 0.55, 82);
  wheel(770, 1480, 160, INK.green, INK.greenLine, 0.5, 83);

  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 84 });
}
