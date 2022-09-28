// https://openprocessing.org/sketch/1021859

let buttuon;
let input;
let inputText;
let num = 0;
let moji = 250;
let vecLocation = [];
let vecVelocity = [];
let te = [];
let sizeSlider;
let speedSlider;
let colorr = [];
let colorg = [];
let colorb = [];
let sizemoji = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton("enter");
  button.position(20, 60);
  button.mousePressed(hello);
  input = createInput("吾輩は猫である。名前はまだない。");
  input.position(20, 20);
  inputText = input.value();
  sizeSlider = createSlider(20, 100, 35);
  sizeSlider.position(20, 105);
  speedSlider = createSlider(18, 35, 20);
  speedSlider.position(20, 145);
  hello();

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 30);
  textAlign(CENTER);
  let mojiSize = sizeSlider.value();
  let speed = speedSlider.value();
  for (let i = 0; i < moji; i++) {
    vecLocation[i].add(vecVelocity[i]);
    textSize(sizemoji[i]);
    fill(colorr[i], colorg[i], colorb[i], 225);
    text(te[i], vecLocation[i].x, vecLocation[i].y);
    if (vecLocation[i].y > height + 100) {
      vecLocation[i].y = -100;
      vecLocation[i].x = random(0, width);
      vecVelocity[i] = createVector(0, random(speed - 15, speed));
      sizemoji[i] = random(mojiSize - 15, mojiSize);
    }
  }
}

function hello() {
  inputText = input.value();
  num = 0;
  for (let i = 0; i < moji; i++) {
    vecLocation[i] = createVector(random(0, width), random(-1000, 50));
    vecVelocity[i] = createVector(0, random(3, 15));
    colorr[i] = random(0, 127);
    colorg[i] = random(127, 255);
    colorb[i] = random(127, 255);
    sizemoji[i] = random(20, 35);
    te[i] = inputText.substring(num, num + 1);
    num++;
    if (num > inputText.length) {
      num = 0;
    }
  }
}
