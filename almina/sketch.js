// https://openprocessing.org/sketch/1582080

function setup() {
  createCanvas(600, 600);
  background(15);

  // put setup code here
}

function draw() {
  // put drawing code here
  stroke(255);
  let n = 12;
  let w = 600;
  for (i = 0; i < n; i++) {
    for (j = 0; j < 10; j++) {
      let a = random(Math.PI * 2);
      let r =
        map(i, 0, n - 1, w / 3, w / 10) *
        pow(random(), map(i, 0, n - 1, 0.1, 0.2) - abs(a - Math.PI) / 10);
      point(cos(a) * r + w / 2, sin(a) * r + w / 2);
    }
  }
}
