// By Roni Kaufman
// Inspired by Steve (Swade) Wade's "Sun Cliffs"
// https://www.pinterest.com/pin/533535887103221055/

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  background(14, 10, 100);
  noLoop();
}

function draw() {
  // sun
  fill(14, 90, 100);
  noStroke();
  let d = random(90, 130);
  let x = random(d, width - d);
  let y = random(d, 100);
  circle(x, y, d);

  // field
  stroke(14, 90, 15);
  strokeWeight(2);
  let theta0 = random(TWO_PI);
  let interLines = 6;
  let incr = 10;
  for (let k = 2; k > 1; k -= 0.2) {
    let nLines = 25 * k;
    let freq = 1 / random(50, 100);
    theta0 += random(HALF_PI, 3 * HALF_PI);

    y = height - (nLines - 1) * interLines + 25;
    x = -incr;
    fill(14, 10, 100);
    strokeWeight(3.5);
    beginShape();
    vertex(x, height);
    vertex(x, height);
    while (x <= width + incr) {
      let yOffset = cos(x * freq + theta0) * 30;
      yOffset *= map(y, height, height - interLines * nLines, 0, 1);
      curveVertex(x, y + yOffset);
      x += incr;
    }
    vertex(x, height);
    vertex(x, height);
    endShape();

    noFill();
    strokeWeight(2);
    y = height + interLines + 25;
    for (let i = 0; i < nLines - 1; i++) {
      x = -incr;
      y -= interLines;
      beginShape();
      while (x <= width + incr) {
        let yOffset = cos(x * freq + theta0) * 30;
        yOffset *= map(y, height, height - interLines * nLines, 0.2, 1);
        curveVertex(x, y + yOffset);
        x += incr;
        if (random() > 0.8) {
          endShape();
          beginShape();
        }
      }
      endShape();
    }
  }
}
