// https://openprocessing.org/sketch/893896

// By Roni Kaufman

let margin = 44;
let density = 1 / 1000;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 1);
  rectMode(CENTER);
  //noLoop();
}

function draw() {
  background(0.15, 0.9, 1);
  fill(0);
  noStroke();

  let s = width - 2 * margin;

  translate(margin, margin);
  for (let incr = s; incr > 2; incr /= 2) {
    let z = incr / 100;
    for (let x = 0; x <= s; x += incr) {
      for (let y = 0; y <= s; y += incr) {
        let noize = noise(x * density, y * density, z + frameCount / 600);
        let digit = floor(noize * 50);
        if (digit % 2 === 0) {
          square(x, y, 4);
        }
      }
    }
  }
}
