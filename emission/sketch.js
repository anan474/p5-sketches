// By Roni Kaufman

let margin = 44;
let density = 1 / 650;
let nLines = 64;
let s;
let interLines;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 1);
  //noLoop();
  noFill();
  stroke(0);
  strokeWeight(2.5);
  strokeCap(SQUARE);

  s = width - 2 * margin;
  interLines = s / (nLines - 1);
}

function draw() {
  background(0.15, 0.9, 1);

  translate(margin, margin);
  for (let i = 0; i < nLines; i++) {
    let y = interLines * i;
    beginShape();
    for (let x = 0; x < s; x++) {
      let offset = 0;
      let noize = noise(x * density, y * density, frameCount / 700);
      let factor = 0;
      if (floor(noize * 50) % 2 === 0) {
        factor = interLines / 3;
      }
      offset = cos(x / 2 - frameCount / 10) * factor;
      curveVertex(x, y + offset);
    }
    endShape();
  }
}
