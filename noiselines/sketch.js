// https://openprocessing.org/sketch/1787558

// noise, grayscale, map, text, shape, vertex
// Move the mouse to interact.
// Mouse click to toggle render

var xincr, yincr, xincr2, yincr2, dst, fp, fp2;
var isBlk = false;

function setup() {
  size(550, 550);
  background(0);
  dst = 100;
  smooth();
  noiseSeed(123);
}

function draw() {
  if (isBlk) {
    background(50);
    stroke(200);
    fill(200);
  } else {
    background(200);
    stroke(50);
    fill(50);
  }
  text("X: ", 20, 30);
  text("Y: ", 20, 45);
  text(fp, 40, 30);
  text(fp2, 40, 45);
  noFill();

  translate(width / 2, height / 2);

  fp = map(mouseX, 0, width, -0.05, 0.05);
  fp2 = map(mouseY, 0, height, -0.05, 0.05);

  xincr += 0.001;
  yincr += 0.001;

  yincr2 = yincr;
  for (let y = -dst; y <= dst; y += 5) {
    yincr2 += fp;
    beginShape();
    xincr2 = xincr;
    for (let x = -dst; x <= dst; x += 5) {
      xincr2 += fp2;
      vertex(x * noise(xincr2, yincr2) * 3, y * noise(xincr2, yincr2) * 3);
    }
    endShape();
  }
}

function mousePressed() {
  isBlk = !isBlk;
}
