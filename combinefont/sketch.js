// https://openprocessing.org/sketch/1139243

let f = [
  "Hiragino Sans",
  "Hiragino Maru Gothic ProN",
  "Hiragino Mincho Pro",
  "YuMincho",
  "Meiryo UI",
];
let num = 4;
let moji = [];
let count = 0;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);
  textSize(400);
  noCursor();
  for (let i = 0; i <= 0x3096 - 0x3041; i++) {
    moji[i] = 0x3041 + i;
  }
  seed = random(0, 100);
}

function draw() {
  randomSeed(seed);
  let kana = String.fromCodePoint(moji[count]);
  for (let y = 0; y < height; y += height / num) {
    for (let x = 0; x < width; x += width / num) {
      drawingContext.save();
      noStroke();
      fill(0);
      rect(x, y, height / num);
      drawingContext.clip();
      fill(255);
      textFont(f[int(random(f.length))]);
      text(kana, width / 2, height / 2);
      drawingContext.restore();
    }
  }
  if (frameCount % 20 === 0) {
    fontSeed = random(0, 100);
    count++;
    if (count === moji.length) {
      count = 0;
    }
  }
}
