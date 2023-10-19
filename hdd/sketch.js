//https://openprocessing.org/sketch/1983093

/**!
 * HDD
 *
 * Uses p5.grain:
 * {@link https://github.com/meezwhite/p5.grain}
 *
 * Copyright (c) 2023-present meezwhite. All rights reserved.
 * Twitter: @meezwhite
 * Website: https://meezwhite.xyz
 */
const PD = 2;
const W = PD > 1 ? 500 : 2000;
const HW = Math.ceil(W / 2);
const H = PD > 1 ? 700 : 2800;
const QH = Math.ceil(H / 4);
const TH = Math.ceil(H / 10);
const HH = Math.ceil(H / 2);
const M = Math.ceil(W * 0.09);
const CD = Math.ceil(W - M * 2);
const CR = Math.ceil(CD / 2);
const RW = Math.ceil(CD * 0.75);
const HRW = Math.ceil(RW / 2);
const HHRW = Math.ceil(HRW / 2);
const RM = Math.ceil((W - RW) / 2);
const COL = [
  ["#282828", "#F76951", "#F7AD72", "#FCF3DD", "#2D4F54", "#7e9692"],
  ["#282828", "#2D4F54", "#FCF3DD"],
];
let PIX;

function setup() {
  createCanvas(W, H);
  pixelDensity(PD);
  rectMode(CENTER);
  blendMode(DIFFERENCE);
  background("#282828");
  noStroke();

  p5grain.setup();

  fill("#F2E0CD");
  rect(HW, HH, RW, height);

  fill("#F76951");
  arc(HW, HH, CD, CD, radians(90), radians(270));
  fill("#F6E3D0");
  arc(HW, HH, CD, CD, radians(270), radians(90));

  PIX = floor(random(0, COL.length));
  rectMode(CORNER);
  rr(HW - HRW);
  rr(HW);

  if (false) {
    // calculate and draw intersection points
    const rectX = HW - HRW;
    const intersections1 = calculateIntersections(HW, HH, CR, rectX, HRW);
    const intersections2 = calculateIntersections(
      HW,
      HH,
      CR,
      rectX + HRW,
      HRW
    ).slice(2);

    // draw intersection points
    fill(COL[PIX][floor(random(0, COL[PIX].length))]);
    for (let i = 0; i < intersections1.length; i++) {
      circle(
        intersections1[i].x,
        intersections1[i].y,
        floor(random(PD > 1 ? 16 : 64, PD > 1 ? 64 : 256))
      );
    }
    for (let i = 0; i < intersections2.length; i++) {
      circle(
        intersections2[i].x,
        intersections2[i].y,
        floor(random(PD > 1 ? 16 : 64, PD > 1 ? 64 : 256))
      );
    }
  }

  blendMode(BLEND);
  for (let i = 0; i < 1000; i++) {
    const colIx = floor(random(0, COL[PIX].length));
    const col = color(COL[PIX][colIx]);
    col.setAlpha(3);
    fill(col);
    const cx = floor(random(0, width));
    const cy = floor(random(0, height));
    const cd = floor(random(10, PD > 1 ? 200 : 800));
    circle(cx, cy, cd);
  }
  fill("#ffffff08");
  for (let i = 0; i < 10000; i++) {
    const cx = floor(random(0, width));
    const cy = floor(random(0, height));
    const cd = floor(random(0, 4));
    circle(cx, cy, cd);
  }
  fill("#ffffff0f");
  for (let i = 0; i < 10000; i++) {
    const cx = floor(random(0, width));
    const cy = floor(random(0, height));
    const cd = floor(random(1, 2));
    circle(cx, cy, cd);
  }
  fill("#f00");
  for (let i = 0; i < floor(random(30, 60)); i++) {
    const px = floor(random(0, width));
    const py = floor(random(0, height));
    const ps = PD > 1 ? 1 : 2;
    rect(px, py, ps, ps);
  }
  p5grain.granulateSimple(PD > 1 ? 16 : 19);
}

function rr(rx) {
  let nextY = 0;
  while (nextY <= height) {
    const rh = floor(random(QH, TH));
    const colIx = floor(random(0, COL[PIX].length));
    fill(COL[PIX][colIx]);
    rect(rx, nextY, HRW, rh);
    nextY += rh;
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32: // [SPACE]
      setup();
      break;

    case 83: // [S]
      save("export.png");
      break;

    default:
      console.debug("keyCode:", keyCode);
      break;
  }
}

function calculateIntersections(
  circleX,
  circleY,
  circleRadius,
  rectX,
  rectWidth
) {
  const intersections = [];

  // left side intersection points
  const leftIntersectY1 =
    circleY -
    sqrt(circleRadius * circleRadius - (rectX - circleX) * (rectX - circleX));
  const leftIntersectY2 =
    circleY +
    sqrt(circleRadius * circleRadius - (rectX - circleX) * (rectX - circleX));
  intersections.push(createVector(rectX, leftIntersectY1));
  intersections.push(createVector(rectX, leftIntersectY2));

  // right side intersection points
  const rightIntersectY1 =
    circleY -
    sqrt(
      circleRadius * circleRadius -
        (rectX + rectWidth - circleX) * (rectX + rectWidth - circleX)
    );
  const rightIntersectY2 =
    circleY +
    sqrt(
      circleRadius * circleRadius -
        (rectX + rectWidth - circleX) * (rectX + rectWidth - circleX)
    );
  intersections.push(createVector(rectX + rectWidth, rightIntersectY1));
  intersections.push(createVector(rectX + rectWidth, rightIntersectY2));

  return intersections;
}

/**!
 * p5.grain
 *
 * @version 0.6.1
 * @license MIT
 * @copyright meezwhite, Gorilla Sun
 */
class P5Grain {
  version = "0.6.1";
  #e;
  #t;
  #n;
  constructor() {
    (this.#e = Math.random),
      (this.#t = { frameCount: 0 }),
      (this.#n = { frameCount: 0, tX_anchor: 0, tX: 0, tY: 0 });
  }
  setup(e) {
    void 0 === e
      ? (this.#e = random)
      : "object" == typeof e &&
        "function" == typeof e.random &&
        (this.#e = e.random);
  }
  granulateSimple(e, t, n) {
    const i = round(e),
      a = t || !1;
    n ? n.loadPixels() : loadPixels();
    const r = n ? n.pixelDensity() : pixelDensity(),
      o = width * r * 4 * (height * r),
      s = n ? n.pixels : pixels;
    for (let e = 0; e < o; e += 4) {
      const t = this.#i(-i, i);
      (s[e] = s[e] + t),
        (s[e + 1] = s[e + 1] + t),
        (s[e + 2] = s[e + 2] + t),
        a && (s[e + 3] = s[e + 3] + t);
    }
    n ? n.updatePixels() : updatePixels();
  }
  granulateChannels(e, t, n) {
    const i = round(e),
      a = t || !1;
    n ? n.loadPixels() : loadPixels();
    const r = n ? n.pixelDensity() : pixelDensity(),
      o = width * r * 4 * (height * r),
      s = n ? n.pixels : pixels;
    for (let e = 0; e < o; e += 4)
      (s[e] = s[e] + this.#i(-i, i)),
        (s[e + 1] = s[e + 1] + this.#i(-i, i)),
        (s[e + 2] = s[e + 2] + this.#i(-i, i)),
        a && (s[e + 3] = s[e + 3] + this.#i(-i, i));
    n ? n.updatePixels() : updatePixels();
  }
  tinkerPixels(e, t, n) {
    (t = !1 !== t), n ? n.loadPixels() : loadPixels();
    const i = n ? n.pixelDensity() : pixelDensity(),
      a = width * i * 4 * (height * i);
    for (let t = 0; t < a; t += 4) e(t, a);
    t && (n ? n.updatePixels() : updatePixels());
  }
  textureAnimate(e, t) {
    const n = t && t.atFrame ? round(t.atFrame) : 2;
    if (((this.#t.frameCount += 1), this.#t.frameCount >= n)) {
      const n = t && t.amount ? round(t.amount) : min(width, height),
        i = floor(this.#e() * n),
        a = floor(this.#e() * n),
        r = `${i}px ${a}px`;
      e instanceof HTMLElement
        ? (e.style.backgroundPosition = r)
        : e instanceof SVGElement
        ? ((e.style.top = -a + "px"), (e.style.left = -i + "px"))
        : e instanceof p5.Element && e.style("background-position", r),
        (this.#t.frameCount = 0);
    }
  }
  textureOverlay(e, t, n) {
    const i = n instanceof p5.Graphics,
      a = i ? n.width : width,
      r = i ? n.height : height,
      o = t && t.mode ? t.mode : MULTIPLY,
      s = !(!t || !t.reflect) && t.reflect,
      l = !(!t || !t.animate) && t.animate,
      u = t && t.animate && t.animate.atFrame ? round(t.animate.atFrame) : 2,
      p =
        t && t.animate && t.animate.amount
          ? round(t.animate.amount)
          : min(a, r),
      h = t && "number" == typeof t.width ? t.width : e.width,
      m = t && "number" == typeof t.height ? t.height : e.height;
    l &&
      ((this.#n.frameCount += 1),
      this.#n.frameCount >= u &&
        ((this.#n.tX_anchor = -floor(this.#e() * p)),
        (this.#n.tY = -floor(this.#e() * p)),
        (this.#n.frameCount = 0)));
    let d = this.#n.tX_anchor,
      c = this.#n.tY,
      x = !0,
      f = !0;
    for (n ? n.blendMode(o) : blendMode(o); c < r; ) {
      for (; d < a; ) {
        if (
          (s
            ? (i ? n.push() : push(),
              x
                ? f
                  ? i
                    ? n.image(e, d, c, h, m)
                    : image(e, d, c, h, m)
                  : i
                  ? (n.scale(-1, 1), n.image(e, -d, c, -h, m))
                  : (scale(-1, 1), image(e, -d, c, -h, m))
                : f
                ? i
                  ? (n.scale(1, -1), n.image(e, d, -c, h, -m))
                  : (scale(1, -1), image(e, d, -c, h, -m))
                : i
                ? (n.scale(-1, -1), n.image(e, -d, -c, -h, -m))
                : (scale(-1, -1), image(e, -d, -c, -h, -m)),
              i ? n.pop() : pop())
            : i
            ? n.image(e, d, c, h, m)
            : image(e, d, c, h, m),
          (d += h),
          d >= a)
        ) {
          (f = !0), (d = this.#n.tX_anchor), (c += m);
          break;
        }
        f = !f;
      }
      x = !x;
    }
    n ? n.blendMode(BLEND) : blendMode(BLEND), i && n.reset();
  }
  #i(e, t) {
    return (
      (e = Math.ceil(e)),
      (t = Math.floor(t)),
      Math.floor(this.#e() * (t - e + 1) + e)
    );
  }
}
const p5grain = new P5Grain();
(p5.prototype.granulateSimple = function (e, t) {
  return p5grain.granulateSimple(e, t);
}),
  (p5.Graphics.prototype.granulateSimple = function (e, t) {
    return p5grain.granulateSimple(e, t, this);
  }),
  (p5.prototype.granulateChannels = function (e, t) {
    return p5grain.granulateChannels(e, t);
  }),
  (p5.Graphics.prototype.granulateChannels = function (e, t) {
    return p5grain.granulateChannels(e, t, this);
  }),
  (p5.prototype.tinkerPixels = function (e, t) {
    return p5grain.tinkerPixels(e, t);
  }),
  (p5.Graphics.prototype.tinkerPixels = function (e, t) {
    return p5grain.tinkerPixels(e, t, this);
  }),
  (p5.prototype.textureAnimate = function (e, t) {
    return p5grain.textureAnimate(e, t);
  }),
  (p5.prototype.textureOverlay = function (e, t) {
    return p5grain.textureOverlay(e, t);
  }),
  (p5.Graphics.prototype.textureOverlay = function (e, t) {
    return p5grain.textureOverlay(e, t, this);
  });
