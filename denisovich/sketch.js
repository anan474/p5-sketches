// https://openprocessing.org/sketch/1349756
r = 100;
let c1, c2, a1, prev;

function setup() {
  createCanvas(400, 400);
  c1 = color(255, 253, 209);
  c2 = color(26, 161, 129);
  a1 = random(0, TWO_PI);

  let pref = [
    random(0, PI / 2),
    random(PI / 2, PI),
    random(PI, (3 * PI) / 2),
    random((3 * PI) / 2, TWO_PI),
  ];
  let offset = PI / 12;

  prev = [];
  for (let i = 0; i < 80; i++) {
    strokeWeight(max(5 - i / 8, 1));
    stroke(lerpColor(c1, c2, i / 80));
    if (random() < 0.4) a2 = noise(cos(a1), sin(a1)) * TWO_PI;
    else a2 = random(pref) + random(-offset, offset);
    prev.push(a2);
    a1 = a2;
  }
}

function draw() {
  background(255, 253, 209);
  translate(200, 200);
  let pref = [
    random(0, PI / 2),
    random(PI / 2, PI),
    random(PI, (3 * PI) / 2),
    random((3 * PI) / 2, TWO_PI),
  ];
  let offset = PI / 12;

  for (let i = 0; i < 80; i++) {
    strokeWeight(max(5 - i / 8, 1));
    stroke(lerpColor(c1, c2, i / 80));
    a2 = prev[i];
    line(r * cos(a1), r * sin(a1), r * cos(a2), r * sin(a2));
    a1 = a2;
  }
  if (random() < 0.4) a2 = noise(cos(a1), sin(a1)) * TWO_PI;
  else a2 = random(pref) + random(-offset, offset);
  prev.shift();
  prev.push(a2);
}
