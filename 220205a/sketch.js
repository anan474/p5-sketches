// https://openprocessing.org/sketch/1469411

let tex;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  tex = createGraphics(width, height);
  tex.colorMode(HSB, 360, 100, 100, 100);
  tex.angleMode(DEGREES);
  for (let i = 0; i < (width * height * 1) / 100; i++) {
    if (random() > 0.5) {
      tex.stroke(0, 0, 100, 3);
    } else {
      tex.stroke(0, 0, 0, 1);
    }
    let cx = random(width);
    let cy = random(height);
    let angle = random(360);
    tex.line(
      cx + cos(angle) * width,
      cy + sin(angle) * height,
      cx + cos(angle + 180) * width,
      cy + sin(angle + 180) * height
    );
  }
}

function draw() {
  background(40, 5, 100);

  let offset = width / 10;
  let margin = 0;
  let cells = int(random(6, 12));
  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin);
      let y = offset + j * (d + margin);
      if (random() > 0.5) {
        drawLineByPoint(x, y, x + d, y + d);
      } else {
        drawLineByPoint(x + d, y, x, y + d);
      }
    }
  }
  image(tex, 0, 0);

  // let x1 = offset;
  // let y1 = offset;
  // let x2 = width - offset;
  // let y2 = height - offset;
  // drawLineByPoint(x1, y1, x2, y2);
  noLoop();
}

function drawLineByPoint(x1, y1, x2, y2) {
  let distance = dist(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  push();
  translate(x1, y1);
  rotate(angle);
  scale(1, random() > 0.5 ? -1 : 1);
  let d = 0;
  let dStep;
  while (d < 1) {
    let px = lerp(x1, x2, d);
    let py = lerp(y1, y2, d);
    let n = sq(noise(d, px / 150, py / 150));
    strokeWeight((n * distance) / 2);
    stroke(0, 0, 0, n * 50);
    strokeCap(PROJECT);
    push();
    translate(d * distance, ((n - 1 / 2) * distance) / random(20));
    rotate(random(360));
    shearX(random(30) * (random() > 0.5 ? -1 : 1));
    shearY(random(30) * (random() > 0.5 ? -1 : 1));
    point(0, 0);
    pop();
    // if (n < 0.25 || n > 0.75) point(px, py);
    // if (n > 0.25 || n > 0.75) point(px, py);
    d += 1 / distance / 5;
  }
  pop();
}
