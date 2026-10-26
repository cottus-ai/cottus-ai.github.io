// Cottus spot illustration: one fan frond held up like an open hand, against an ultramarine disc.
// Square, on black, so it sits in a page column with no edge.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-hand.js spot-hand.png 1600 1600
function draw(ctx, W, H, K) {
  const INK = {
    ultra: '#3a43aa', ultraLine: '#6f78d8', verm: '#ee3b05', cream: '#ebe5c8', black: '#000000',
    bottle: '#0f4935', bottleLine: '#2f7a5c', teal: '#14526f', tealLine: '#3f86a8', green: '#23805a', greenLine: '#0b3a2b',
    sage: '#6f8f3a',
  };
  const S = 1600, TAU = Math.PI * 2;
  ctx.save();
  ctx.scale(W / S, H / S);
  const line = (pts, ink, w) => {
    ctx.strokeStyle = ink; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.stroke(K.path(pts, false));
  };

  // the disc behind, textured with pulled strokes and a ring of stipple at its rim
  const disc = K.roughen(K.blob(900, 640, 470, 470, { seed: 3, rough: 0.04 }), 3, { seed: 4 });
  K.fill(ctx, disc, INK.ultra);
  K.flow(ctx, disc, { ink: INK.ultraLine, per: 0.006, len: 30, turn: 0.3, freq: 0.002, width: 1.3, seed: 5, alpha: 0.7 });
  K.stipple(ctx, disc, { ink: INK.black, per: 0.006, rMin: 1, rMax: 2.6, seed: 6, density: (x, y) => Math.max(0, Math.hypot(x - 900, y - 640) / 470 - 0.55) * 2.2 });

  // the frond: a stalk from the bottom edge, the fan open upward; vermilion plate out of register first
  const fx = 760, fy = 820, dir = -Math.PI / 2 + 0.12;
  const stalk = [];
  for (let i = 0; i <= 30; i++) { const t = i / 30; stalk.push([K.lerp(720, fx, t) + 40 * Math.sin(Math.PI * t), K.lerp(1440, fy, t)]); }
  const f = K.fan(fx, fy, dir, 640, { lobes: 30, split: 0.42, droop: 0.42, overlap: 1.15, spread: Math.PI * 1.08, seed: 21 });
  const shapes = [f.core, ...f.lobes.map((l, i) => K.roughen(l.outline, 1.4, { seed: 30 + i }))];
  ctx.save();
  ctx.translate(22, 16);
  line(stalk, INK.verm, 22);
  for (const s of shapes) K.fill(ctx, s, INK.verm);
  ctx.restore();
  line(stalk, INK.cream, 22);
  for (const s of shapes) K.fill(ctx, s, INK.cream);
  K.radial(ctx, fx, fy, { clip: f.core, count: 220, r0: 0, r1: 640 * 0.45, a0: dir - 1.7, a1: dir + 1.7, ink: INK.black, width: 1.3, bend: 0, seed: 22, alpha: 0.85 });
  for (const l of f.lobes) line([[fx, fy], ...l.mid], INK.black, 2);
  f.lobes.forEach((l, i) => K.stipple(ctx, K.roughen(l.outline, 1.4, { seed: 30 + i }), { ink: INK.black, per: 0.002, rMin: 0.8, rMax: 1.8, seed: 60 + i }));

  // two lupin-leaf wheels at the base
  const wheel = (x, y, r, ink, vein, tilt, seed) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, tilt);
    const lobes = K.palmate(0, 0, { lobes: 11, len: r, wid: r * 0.4, dir: -Math.PI / 2, spread: TAU * (10 / 11), even: true, droop: 0, tip: 0.9, seed });
    for (const l of lobes) {
      const o = K.roughen(l.outline, 1, { seed: seed + 3 });
      K.fill(ctx, o, ink);
      K.hatch(ctx, o, { ink: vein, gap: 5, width: 1, angle: Math.atan2(l.mid[l.mid.length - 1][1] - l.mid[0][1], l.mid[l.mid.length - 1][0] - l.mid[0][0]) + 1.1, dash: [16, 50], lift: 0.05, wave: 0.6, seed: seed + 9, alpha: 0.7 });
      ctx.strokeStyle = vein; ctx.lineWidth = 1.3; ctx.stroke(K.path(o));
      line(l.mid.slice(2), vein, 2);
    }
    ctx.restore();
  };
  // a low clump of leaf wheels hides where the stalk starts, all inside the frame
  wheel(520, 1420, 210, INK.green, INK.greenLine, 0.58, 71);
  wheel(930, 1440, 190, INK.teal, INK.tealLine, 0.55, 72);
  wheel(730, 1480, 170, INK.bottle, INK.bottleLine, 0.5, 73);

  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 79 });
}
