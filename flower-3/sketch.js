//https://editor.p5js.org/chriswmartin/sketches/A6mepO9id

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(66, 200, 245);
}

function drawFlower() {
  noStroke();

  var numberOfPetals = map(sin(frameCount / 20), -1, 1, 10, 50);
  let colorChangeAmount = 0.0;

  for (var i = 0; i < numberOfPetals; i++) {
    let startColor = color(0, 50, 25);
    let endColor = color(178, 255, 100);
    let lerpedColor = lerpColor(startColor, endColor, colorChangeAmount);

    push();
    translate(0, 0);
    let rotation = atan2(height / 2 + 10, width / 2);
    rotate(rotation + i);

    fill(lerpedColor);
    ellipse(15 + i * 2, 15 + i * 2, 35, 20);
    pop();

    colorChangeAmount += 0.02;
  }

  fill(200, 0, 100);
  ellipse(0, 0, 50, 50);

  fill(200, 200, 0);
  ellipse(0, 0, 20, 20);
}

function draw() {
  var rotationAmount = map(sin(frameCount / 10000), -1, 1, 0, 360);

  translate(windowWidth / 2, windowHeight / 2);
  rotate(rotationAmount);
  drawFlower();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(66, 200, 245);
}
