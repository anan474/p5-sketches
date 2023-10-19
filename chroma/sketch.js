// https://openprocessing.org/sketch/1713629

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  blendMode(BLEND);
  background(0);

  blendMode(ADD);

  for (let y = 0; y < height; y += 11) {
    for (let x = 0; x < width; x += 11) {
      if (f(x, y, frameCount)) {
        myShape(x, y, 13);
      }
    }
  }
}

function myShape(x, y, r) {
  r = r / 2;
  fill(255, 0, 0);
  square(x, y, r);
  fill(0, 255, 0);
  square(x + 4, y, r);
  fill(0, 0, 255);
  square(x + 3, y, r);
}

function f(x, y, t) {
  k = round(noise(x / 1000, y / 1000, t / 100) * 100);

  return k % 2 == 1;
}
