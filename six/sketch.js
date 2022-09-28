// https://openprocessing.org/sketch/1361971

// By Roni Kaufman
// https://ronikaufman.github.io/
// https://twitter.com/KaufmanRoni

const SQRT3 = Math.sqrt(3);
let colors = ["#026edb", "#f5d216", "#fc3503", "#09b734"];

function setup() {
  createCanvas(496, 496);
  noLoop();
  strokeWeight(2.4);
  strokeJoin(BEVEL);
  noFill();
}

function draw() {
  translate(width / 2, height / 2);
  rotate(random([0, PI / 6]));
  background(255);

  let s = 18;
  let t = s * SQRT3;
  stroke(220);
  let n = 13;
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      let x = (i * SQRT3 + (j * SQRT3) / 2) * s;
      let y = ((j * 3) / 2) * s;
      let theta0 = random([0, PI / 3]);
      for (let theta = theta0 + PI / 6; theta < TWO_PI; theta += TWO_PI / 3) {
        push();
        translate(x + (cos(theta) * s) / 2, y + (sin(theta) * s) / 2);
        rotate(theta + PI / 2);
        makeRhombus(s, t);
        pop();
      }
    }
  }

  rotate(PI / 6);
  s *= SQRT3;
  t *= SQRT3;
  n = 7;
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      let x = (i * SQRT3 + (j * SQRT3) / 2) * s;
      let y = ((j * 3) / 2) * s;
      if (dist(x, y, 0, 0) < 185) {
        let mode = random([0, 1]); // which orientation for the hexagon
        let theta0 = mode == 0 ? 0 : PI / 3;
        for (let theta = theta0 + PI / 6; theta < TWO_PI; theta += TWO_PI / 3) {
          push();
          translate(x + (cos(theta) * s) / 2, y + (sin(theta) * s) / 2);
          rotate(theta + PI / 2);
          let l = floor(random(2, 6));
          noStroke();
          fill(255);
          makeRhombus(s, t);
          stroke(random(colors));
          makeRhombusLines(s, t, l);
          stroke(0);
          noFill();
          makeRhombus(s, t);
          pop();
        }
      }
    }
  }
}

function makeRhombus(s, t) {
  beginShape();
  vertex(0, -s / 2);
  vertex(t / 2, 0);
  vertex(0, s / 2);
  vertex(-t / 2, 0);
  endShape(CLOSE);
}

function makeRhombusLines(s, t, l) {
  let a = [0, -s / 2]; // top vertex
  let b = [t / 2, 0]; // right vertex
  let c = [0, s / 2]; // bottom vertex
  let d = [-t / 2, 0]; // left vertex

  if (random() < 1 / 2) {
    [b, d] = [d, b];
  }

  let double = random() < 1 / 2;

  for (let z = 1 / l; z < 1; z += 1 / l) {
    let [x1, y1] = prop(a, b, z);
    let [x2, y2] = prop(d, c, z);
    line(x1, y1, x2, y2);
    if (double) {
      [x1, y1] = prop(a, d, z);
      [x2, y2] = prop(b, c, z);
      line(x1, y1, x2, y2);
    }
  }
}

function prop(a, b, k) {
  let xC = (1 - k) * a[0] + k * b[0];
  let yC = (1 - k) * a[1] + k * b[1];
  return [xC, yC];
}
