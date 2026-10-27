// Offprint spot: three vertical prints fanned on a pink disc, each a frame Offprint makes
// (a sticky-note list, parsley in a jar, a front page). Transparent background.
// Render: node ~/.claude/skills/new-horizon-style/scripts/render.mjs spot-offprint.js,plants.js spot-offprint.png 1600 1600
function draw(ctx, W, H, K) {
  ctx.save();
  ctx.scale(W / 1600, H / 1600);
  const P = Plants(ctx, K), r = K.rng(171);
  P.disc(880, 640, 460, INKS.pink, 172);
  P.wheel(540, 1250, 240, INKS.green, 0.55, 241);
  P.wheel(1090, 1265, 220, INKS.bottle, 0.55, 242);

  // a 9:16 sheet around (cx, cy), turned by rot, as a point outline the kit can roughen
  const sheet = (cx, cy, w, h, rot, seed) => {
    const c = Math.cos(rot), s = Math.sin(rot), pts = [];
    const corners = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]];
    for (let i = 0; i < 4; i++) {
      const [ax, ay] = corners[i], [bx, by] = corners[(i + 1) % 4];
      for (let j = 0; j < 30; j++) {
        const t = j / 30, x = K.lerp(ax, bx, t), y = K.lerp(ay, by, t);
        pts.push([cx + x * c - y * s, cy + x * s + y * c]);
      }
    }
    return K.roughen(pts, 2, { seed, spacing: 5 });
  };
  // draw inside a sheet in its own unturned coordinates, origin at its centre
  const inside = (o, cx, cy, rot, fn) => K.clip(ctx, o, () => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    fn();
    ctx.restore();
  });
  const print = (o, paper, seed) => {
    ctx.save();
    ctx.translate(18, 12);
    K.fill(ctx, o, INKS.verm);
    ctx.restore();
    K.fill(ctx, o, paper[0]);
    K.stipple(ctx, o, { ink: paper[1], per: 0.002, rMin: 0.7, rMax: 1.4, seed, alpha: 0.6 });
  };
  const ink = '#1b1a17';
  const w = 380, h = 676;

  // left: a sticky note with a ticked list
  const L = { x: 560, y: 860, a: -0.24 };
  const left = sheet(L.x, L.y, w, h, L.a, 181);
  print(left, INKS.cream, 182);
  inside(left, L.x, L.y, L.a, () => {
    const note = K.roughen(K.blob(0, -40, 150, 170, { seed: 183, rough: 0.03, steps: 120 }), 1.5, { seed: 184 });
    const sq = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 20; j++) {
      const t = j / 20, c = [[-140, -210], [140, -210], [140, 130], [-140, 130]];
      sq.push([K.lerp(c[i][0], c[(i + 1) % 4][0], t), K.lerp(c[i][1], c[(i + 1) % 4][1], t)]);
    }
    const pad = K.roughen(sq, 1.5, { seed: 185 });
    void note;
    K.fill(ctx, pad, INKS.mustard[0]);
    K.hatch(ctx, pad, { ink: INKS.mustard[1], gap: 7, width: 1, angle: 0.05, dash: [30, 120], lift: 0.3, seed: 186, alpha: 0.35 });
    P.line([[-110, -170], [60, -176]], ink, 7);
    for (let i = 0; i < 3; i++) {
      const y = -100 + i * 72;
      P.edge([[-112, y - 16], [-82, y - 16], [-82, y + 14], [-112, y + 14]], ink, 3);
      P.line([[-108, y - 2], [-98, y + 10], [-78, y - 22]], INKS.verm, 6);
      P.line([[-62, y], [-62 + 120 + r() * 60, y + (r() - 0.5) * 6]], ink, 5);
    }
  });

  // right: a front page with a headline, a halftone sun and columns
  const R = { x: 1060, y: 870, a: 0.22 };
  const right = sheet(R.x, R.y, w, h, R.a, 191);
  print(right, INKS.white, 192);
  inside(right, R.x, R.y, R.a, () => {
    P.line([[-60, -270], [160, -270]], ink, 3);
    P.line([[-40, -235], [150, -235]], ink, 14);
    P.line([[-50, -200], [120, -200]], ink, 14);
    P.line([[-60, -175], [160, -175]], ink, 2);
    const sun = K.blob(60, -70, 84, 84, { seed: 193, rough: 0.03 });
    K.fill(ctx, sun, INKS.mustard[0]);
    K.stipple(ctx, sun, { ink: INKS.poppy[0], per: 0.02, rMin: 2, rMax: 4.5, seed: 194, density: (x, y) => Math.min(1, Math.hypot(x - R.x - 90, y - R.y + 100) / 120) });
    K.hatch(ctx, K.blob(60, -10, 120, 36, { seed: 195, rough: 0.05 }), { ink: INKS.teal[0], gap: 6, width: 2, angle: 0, dash: [40, 160], lift: 0.1, seed: 196 });
    for (let col = 0; col < 3; col++) {
      for (let i = 0; i < 8; i++) {
        const x0 = -60 + col * 76, y = 70 + i * 26;
        P.line([[x0, y], [x0 + 60 - (i === 7 ? 30 : r() * 8), y]], INKS.white[1], 4);
      }
    }
  });

  // centre, on top: parsley stood in a jar of water
  const C = { x: 810, y: 780, a: 0.02 };
  const mid = sheet(C.x, C.y, w * 1.06, h * 1.06, C.a, 201);
  print(mid, INKS.cream, 202);
  inside(mid, C.x, C.y, C.a, () => {
    const table = K.roughen([[-200, 150], [200, 140], [200, 360], [-200, 360]], 2, { seed: 203 });
    K.fill(ctx, table, INKS.mustard[0]);
    K.hatch(ctx, table, { ink: INKS.mustard[1], gap: 9, width: 1.4, angle: -0.02, dash: [60, 300], lift: 0.1, seed: 204, alpha: 0.6 });
    // stems first, so the glass and water sit over them
    const tops = [];
    for (let i = 0; i < 9; i++) {
      const bx = -40 + i * 10, tx = -120 + i * 30 + (r() - 0.5) * 30, ty = -200 - r() * 70;
      tops.push([tx, ty]);
      P.stem(bx, 240, tx, ty, (r() - 0.5) * 30, INKS.sage[0], 5);
    }
    const water = K.roughen([[-88, 40], [88, 40], [92, 230], [80, 250], [-80, 250], [-92, 230]], 1.5, { seed: 205 });
    ctx.save();
    ctx.globalAlpha = 0.55;
    K.fill(ctx, water, INKS.cobalt[1]);
    ctx.restore();
    K.hatch(ctx, water, { ink: INKS.white[0], gap: 10, width: 1.4, angle: 1.45, dash: [20, 70], lift: 0.4, seed: 206, alpha: 0.6 });
    P.edge(K.roughen([[-95, -40], [95, -40], [100, 240], [84, 262], [-84, 262], [-100, 240]], 1.2, { seed: 207 }), INKS.teal[0], 5);
    P.line([[-100, -40], [100, -40]], INKS.teal[0], 9);
    P.line([[-70, 0], [-74, 200]], INKS.white[0], 7);
    // leaf clusters at the stem tops, two greens
    tops.forEach(([x, y], i) => {
      const p = i % 3 === 1 ? INKS.sage : INKS.green;
      for (let k = 0; k < 4; k++) {
        const kx = x + (r() - 0.5) * 50, ky = y + (r() - 0.5) * 40;
        for (const l of K.palmate(kx, ky, { lobes: 7, len: 30 + r() * 10, wid: 18, dir: -Math.PI / 2 + (r() - 0.5) * 2, spread: Math.PI * 1.6, tip: 0.85, droop: 0.4, seed: 210 + i * 9 + k })) {
          const o = K.roughen(l.outline, 2.2, { seed: 230 + i * 9 + k, spacing: 3 });
          K.fill(ctx, o, (k + i) % 2 ? p[0] : INKS.green[0]);
          P.edge(o, p[1], 1.3);
        }
      }
    });
  });

  P.wheel(800, 1310, 210, INKS.teal, 0.5, 243);
  ctx.restore();
  K.grain(ctx, W, H, { amount: 13, linen: 5, seed: 244 });
}
