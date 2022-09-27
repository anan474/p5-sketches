//https://openprocessing.org/sketch/147750

// http://dianalange.tumblr.com/post/84504561091/ihaveitallfiguredout-long-lost-drawing

var y;

var amplitude;

var steps;

var timeSteps;

var versatz;

var sw;

var strokeAlpha;

var bgColor;

var margin;

var doReDraw;

function setup() {
  initializeFields();
  createCanvas(800, 800);
  smooth();
}

function draw() {
  if (doReDraw == true) {
    background(bgColor);
    y = random(80, 150);
    while (y < height + 70) {
      setRandomValues();
      drawFilles();
      drawLines();
      y += random(5, 70);
    }
    drawMargin();
    doReDraw = false;
  }
}

function setRandomValues() {
  noiseSeed(int(random(100000)));
  sw = random(0.5, 2);
  steps = random(sw * 2, 6);
  amplitude = random(40, 250);
  timeSteps = random(0.01, 0.05);
  versatz = random(-200, 200);
  strokeAlpha = random(50, 200);
}

function mousePressed() {
  doReDraw = true;
}

function time() {
  return year() + month() + day() + hour() + minute() + second() + frameCount;
}

function drawFilles() {
  fill(bgColor);
  noStroke();
  var noiseValue;
  var x = -abs(versatz);
  var time = 0.0;
  beginShape();
  vertex(-10, height + 1);
  while (x < width) {
    noiseValue = y - noise(time) * amplitude;
    vertex(x, noiseValue);
    x += steps;
    time += timeSteps;
  }
  vertex(width + 10, height + 1);
  endShape();
}

function drawLines() {
  noFill();
  strokeWeight(sw);
  var noiseValue;
  var x = -abs(versatz);
  var time = 0.0;
  while (x < width + abs(versatz)) {
    noiseValue = y - noise(time) * amplitude;
    strokeWeight(random(sw * 0.5, sw * 1.2));
    stroke(random(strokeAlpha * 0.8, strokeAlpha));
    line(
      x,
      noiseValue + 3,
      x + random(versatz * 0.9, versatz),
      noiseValue + 3 + height
    );
    x += steps;
    time += timeSteps;
  }
}

function drawMargin() {
  noStroke();
  fill(bgColor);
  rect(0, 0, width, margin);
  rect(0, height, width, -margin);
  rect(0, 0, margin, height);
  rect(width, 0, -margin, height);
}

function initializeFields() {
  y = 80;
  amplitude = random(50, 80);
  steps = 3;
  timeSteps = 0.01;
  versatz = 10;
  sw = random(0.5, 2);
  strokeAlpha = 0;
  bgColor = color(0xee, 0xe8, 0xdc);
  margin = 30;
  doReDraw = true;
}
