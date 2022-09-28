// https://openprocessing.org/sketch/1202233

let object = [];
let objectNum = 20;

function setup() {
  createCanvas(1000, 1000);
  for (let i = 0; i < objectNum; i++) {
    object.push(new drawObject());
  }
}

function draw() {
  blendMode(BLEND);
  background(0);
  for (let i = 0; i < objectNum; i++) {
    object[i].update(i);
    object[i].display();
  }
  // drawGrid(25);
}

class drawObject {
  constructor() {
    this.sizeList = [100, 250, 500];
    this.objectSize = this.sizeList[int(random(this.sizeList.length))];
    this.motion;
    this.counter = 0;
    this.counter2 = 0;
    this.interval = this.counter + 1.3;
    this.initPosX = width / 2;
    this.desX =
      (this.objectSize / 2) * int(random(1, (width / this.objectSize) * 2));
    this.distanceX = this.desX - this.initPosX;
    this.initPosY = height / 2;
    this.desY =
      (this.objectSize / 2) * int(random(1, (height / this.objectSize) * 2));
    this.distanceY = this.desY - this.initPosY;
    this.objectColor = 255;
    this.speed = 0.01 * int(random(1, 2));
    this.randomSelector = int(random(0, 3));
    this.randomTex = int(random(0, 10));
    textAlign(CENTER, CENTER);
    textFont("helvetica");
    rectMode(CENTER);
  }
  display() {
    blendMode(DIFFERENCE);
    noStroke();
    fill(this.objectColor);
    textSize(this.objectSize);
    switch (this.randomSelector) {
      case 0:
        text(this.randomTex, this.x, this.y);
        break;
      case 1:
        rect(this.x, this.y, this.objectSize);
        break;
      default:
        ellipse(this.x, this.y, this.objectSize);
    }
  }
  update() {
    this.motion = easeOutExpo(this.counter);
    this.x = int(this.initPosX + this.distanceX * this.motion);
    this.y = int(this.initPosY + this.distanceY * this.motion);
    if (this.counter < 1) {
      this.counter += this.speed;
      this.counter2 += this.speed;
    } else if (this.counter2 < this.interval) {
      this.counter2 += this.speed;
    } else {
      this.randomSelector = int(random(0, 3));
      this.counter = 0;
      this.counter2 = 0;
      this.speed = 0.01;
      this.initPosX = this.x;
      this.desX =
        (this.objectSize / 2) * int(random(1, (width / this.objectSize) * 2));
      this.distanceX = this.desX - this.initPosX;
      this.initPosY = this.y;
      this.desY =
        (this.objectSize / 2) * int(random(1, (height / this.objectSize) * 2));
      this.distanceY = this.desY - this.initPosY;
    }
  }
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
}

function drawGrid(gridSize) {
  stroke(255);
  strokeWeight(1);
  for (let x = 0; x <= 1000; x += gridSize) {
    for (let y = 0; y <= 1000; y += gridSize) {
      line(0, y, width, y);
    }
    line(x, 0, x, height);
  }
}
