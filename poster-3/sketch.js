//https://github.com/Volorf/Processing-Posters

let itter = 10000;
let offset = 0;

function setup() {
  pixelDensity(2);
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(33);
  stroke("f5");
  fill(33);
  for (let i = 0; i < itter; i++) {
    let x = random(offset, width - offset);
    let y = random(offset, height - offset);
    let d = dist(width / 2, height / 2, x, y);
    let decay = exp(-pow(d / 100, 2)) / sin(d);
    ellipse(x, y, decay * 10);
  }
}
