// from https://www.openprocessing.org/sketch/152169

var num;

var step, sz, offSet, theta, angle;

function setup() {
  initializeFields();
  createCanvas(window.innerWidth, window.innerHeight);
  strokeWeight(5);
  step = 22;
}

function draw() {
  background(20);
  translate(width / 2, height * 0.75);
  angle = 0;
  for (var i = 0; i < num; i++) {
    stroke(255);
    noFill();
    sz = i * step;
    var offSet = (TWO_PI / num) * i;
    var arcEnd = map(sin(theta + offSet), -1, 1, PI, TWO_PI);
    arc(0, 0, sz, sz, PI, arcEnd);
  }
  colorMode(RGB);
  resetMatrix();
  theta += 0.0523;
}

function initializeFields() {
  num = 20;
  step = 0;
  sz = 0;
  offSet = 0;
  theta = 0;
  angle = 0;
}
