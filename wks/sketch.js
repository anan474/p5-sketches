// https://openprocessing.org/sketch/1308366

// https://coolors.co/227c9d-17c3b2-ffcb77-fef9ef-fe6d73
let bg = ["#fef9ef"];
let c = ["#227c9d", "#ffcd77", "#fe6d73"];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(bg);

  let cols = 65;
  let rows = cols / 2;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;

      let n = noise(x * 0.004, y * 0.004);

      let rotate_num = map(n, 0, 1, 0, 180);

      push();
      translate(x + cellW / 2, y + cellH / 2);
      rotate(rotate_num);

      stroke(random(c));
      strokeWeight(cellW * 0.8);
      strokeCap(SQUARE);

      line(0, 0, cellW, cellH);

      pop();
    }
  }
}
