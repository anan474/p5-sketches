// https://openprocessing.org/sketch/1533859

let offset = 80;
let margin = 10;
let grid = 5;
let s;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  s = (width + margin - offset * 2) / grid - margin;
  noLoop();
}

function draw() {
  background(255);
  for (let j = 0; j < grid; j++) {
    for (let i = 0; i < grid; i++) {
      randomSquare(
        offset + i * (s + margin) + s / 2,
        offset + j * (s + margin) + s / 2,
        s
      );
    }
  }
}

function randomSquare(x, y, s) {
  let rnd = int(random(6));
  if (rnd == 0) {
    fill(0, 220);
    noStroke();
    square(x, y, s);
  } else if (rnd == 1) {
    noFill();
    stroke(0);
    square(x, y, s);
  } else if (rnd <= 3) {
    noFill();
    stroke(0);
    stripeSquare1(x, y, s, 10);
  } else if (rnd <= 5) {
    noFill();
    stroke(0);
    stripeSquare2(x, y, s, 10);
  }
}

function stripeSquare1(x, y, s, n) {
  push();
  translate(x, y);
  let rnd = random();
  if (rnd < 0.5) {
    rotate(90);
  } else {
    rotate(0);
  }
  for (let i = -s / 2; i <= s / 2; i += s / n) {
    line(-s / 2, i, s / 2, i);
  }
  pop();
}

function stripeSquare2(x, y, s, n) {
  push();
  translate(x, y);
  let rnd = random();
  if (rnd < 0.5) {
    rotate(90);
  } else {
    rotate(0);
  }
  for (let i = -s / 2; i < s / 2; i += s / n) {
    line(-s / 2, i, i, -s / 2);
  }
  for (let i = -s / 2; i <= s / 2; i += s / n) {
    line(s / 2, i, i, s / 2);
  }
  pop();
}

function mousePressed() {
  saveCanvas("myCanvas", "png");
}
