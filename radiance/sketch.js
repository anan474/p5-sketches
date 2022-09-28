// https://openprocessing.org/sketch/1633183
var xc, yc;
var r, g, b;

function setup() {
  xc = windowWidth / 2;
  yc = windowHeight / 2;
  createCanvas(windowWidth, windowHeight);
  background(0, 10, 130);
}

function draw() {
  strokeWeight(random(1, 15));
  stroke((0, 72), 21, 163, 44);
  line(random(0, windowWidth), 0, random(0, windowWidth), windowHeight);
  ///lines ^
  stroke(255);
  strokeWeight(random(1, 3));
  fill(237, 184, 62, 15);
  circle(random(0, 0, windowWidth), 0, random(windowWidth), windowHeight);
  frameRate(25);
  //"sun"^
  triangle(windowWidth, windowHeight, mouseX, mouseY, 0, 0);
}
