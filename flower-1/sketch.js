//https://editor.p5js.org/son/sketches/SkJJxG2Cm

function setup() {
  createCanvas(600, 600);
  frameRate(60);
}

function draw() {
  background(33);
  flower();
  ground();
}

function ground() {
  //noStroke();
  fill(170, 150, 146, 240);
  rect(0, 530, 600, 530);
}

function flower() {
  for (var r51 = 0; r51 < 10; r51++) {
    stroke(85, 107, 47, 20);
    strokeWeight(3);
    if (frameCount <= 400) {
      line(300, 600, 300, 400 + frameCount / 10);
    }
    if (frameCount > 400) {
      line(300, 600, 300, 440);
    }
    noStroke();
  }

  push();
  fill(245, 174, 184, 240);
  translate(300, 400);
  noStroke();
  for (var r5 = 0; r5 < 10; r5++) {
    if (frameCount <= 400) {
      ellipse(
        0,
        10 + frameCount / 20,
        10 + frameCount / 40,
        20 + frameCount / 20
      );
    }
    if (frameCount > 400) {
      ellipse(0, 30, 20, 40);
    }
    rotate(PI / 5);
  }
  pop();
}
