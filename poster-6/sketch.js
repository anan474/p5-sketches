//https://github.com/Volorf/Processing-Posters

let itter = 20;
let step;
let offset;
let strokeOffsetMin = 1;
let strokeOffsetMax = 40;

function setup() {
  pixelDensity(2);
  createCanvas(595, 691);
  step = width / (itter - 1);
  offset = step / 2;
  noLoop();
}

function draw() {
  background(33);
  for (let x = 0; x < itter; x++) {
    stroke("f5");
    strokeWeight(random(strokeOffsetMin, strokeOffsetMax));
    let offsetX = random(-offset, offset);
    let lX = x * step + offsetX;
    line(lX, 0, lX, height);
  }
}
