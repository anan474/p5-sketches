// https://www.openprocessing.org/sketch/933418

let url = "https://coolors.co/f2f3ae-edd382-fc9e4f-f4442e-020122";
let palette;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop();
  background(100);
  palette = createPalette(url);
}

function draw() {
  background(255);
  stroke(33, 33, 200);
  strokeWeight(6);

  for (let a = 0; a < 13; a++) {
    for (let b = 0; b < 20; b++) {
      let odd = a % 2;
      if (odd == 0) {
        circle(b * 100, a * 60, 100);
        fill(palette[0]);
        circle(b * 100, a * 60, 80);
        fill(palette[1]);
        circle(b * 100, a * 60, 50);
        fill(palette[2]);
      } else {
        circle(b * 100 + 50, a * 60, 100);
        fill(palette[3]);
        circle(b * 100 + 50, a * 60, 80);
        fill(234, 248, 191);
        circle(b * 100 + 50, a * 60, 50);
        fill(palette[4]);
      }
    }
  }
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color("#" + arr[i]);
  }
  return arr;
}
