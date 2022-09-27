// https://openprocessing.org/sketch/1372277

//inspired by u/henryfrgu on Reddit
//https://www.reddit.com/r/generative/comments/r4qfmv/improved_version_of_my_triangular_truchet_tile/
//and @ippsketch on Twitter
//https://twitter.com/ippsketch/status/1414947706968199170?s=20

const hs3 = Math.sqrt(3) / 2;
const i2s3 = 1 / (Math.sqrt(3) * 2); //inverse of 2 sqrt 3
const sixth = Math.PI / 3;

let splitChance = 0.5;
let forceSplitLayer = 3; //how many layers should split regardless of the rules
let sw = 20;

let palettes = [
  ["#0c2046", "#f67e7d", "#fffaf2"],
  ["#d3d5d4", "#a2c5ac", "#9db5b2", "#878e99", "#7f6a93"],
  ["#989788", "#51344d", "#6f5060", "#a78682", "#e7ebc5"],
];
let pal;

function setup() {
  pal = random(palettes);
  shuffle(pal, true);

  createCanvas((m = min(windowWidth, windowHeight)), m);
  background(pal[0]);
  noLoop();
  noFill();
  strokeWeight(sw / 2);
}

function draw() {
  translate(m / 2, m / 2);
  let r = new ReTri(0, 0, sw * 2 ** 7, true);
  r.split(true);
}

function outlined_arc(x, y, s, a1, a2) {
  stroke(pal[1]);
  arc(x, y, s, s, a1, a2);
  stroke(pal[0]);
  arc(x, y, s + sw, s + sw, a1, a2);
}

function truchet(x, y, s, up, layer) {
  push();
  translate(x, y);
  rotate(up ? 0 : PI);
  let r = floor(random(0, 3));
  let rp = round(s / sw);

  for (let i = 0; i < rp * (r == 0 ? 0.75 : 0.5); i++) {
    outlined_arc(-s / 2, hs3 * 0.5 * s, sw * (2 * i + 1), -sixth, 0);
  }
  for (let i = 0; i < rp * (r == 1 ? 0.75 : 0.5); i++) {
    outlined_arc(s / 2, hs3 * 0.5 * s, sw * (2 * i + 1), PI, PI + sixth);
  }
  for (let i = 0; i < rp * (r == 2 ? 0.75 : 0.5); i++) {
    outlined_arc(0, -s * hs3 * 0.5, sw * (2 * i + 1), sixth, 2 * sixth);
  }
  pop();
}

class ReTri {
  constructor(x, y, s, up, l = 0) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.isUp = up;
    this.l = l;
  }
  split(forced = false) {
    if (forced || (random() < splitChance && this.s > sw * 4)) {
      let r0 = new ReTri(
        this.x,
        this.y + (this.s * (this.isUp ? 1 : -1) * hs3) / 4,
        this.s / 2,
        !this.isUp,
        this.l + 1
      );
      let r1 = new ReTri(
        this.x,
        this.y + (this.s * (this.isUp ? -1 : 1) * hs3) / 4,
        this.s / 2,
        this.isUp,
        this.l + 1
      );
      let r2 = new ReTri(
        this.x - this.s / 4,
        this.y + (this.s * (this.isUp ? 1 : -1) * hs3) / 4,
        this.s / 2,
        this.isUp,
        this.l + 1
      );
      let r3 = new ReTri(
        this.x + this.s / 4,
        this.y + (this.s * (this.isUp ? 1 : -1) * hs3) / 4,
        this.s / 2,
        this.isUp,
        this.l + 1
      );
      for (let i of [r0, r1, r2, r3]) {
        i.split(this.l + 1 < forceSplitLayer);
      }
    } else {
      truchet(this.x, this.y, this.s, this.isUp, this.l);
    }
  }
}
