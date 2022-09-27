// https://openprocessing.org/sketch/1522239

/*/////////////////////////////////////////////
// Code by Unknowable                        //
// unknowableart.github.io                   //
//                                           //
// Original code link:                       //
// https://openprocessing.org/sketch/1452176 //
/////////////////////////////////////////////*/

/*---------------------------------------------
---------------------------------------------*/

var particles = [];
var nums = 25;
var noiseScale = 500;
var radius;
var palette;
var paper;

function setup() {
  L = min(windowHeight, windowWidth);
  createCanvas(L, L);
  radius = L / 2 - L / 10;
  palette = createCols(URL[int(random(URL.length))]);
  background(100);
  createpaper();
  noStroke();
  init();
  image(paper, 0, 0);
}

function init() {
  let c = shuffle(palette)[0];
  for (var i = 0; i < nums; i++) {
    let padding = width / 2 - radius;
    particles[i] = new Particle(
      random(padding, width - padding),
      random(padding, height - padding),
      c
    );
  }
}

function draw() {
  if (frameCount % 100 == 0) {
    let c = shuffle(palette)[0];
    for (let i = 0; i < nums; i++) {
      particles[i].c = c;
    }
  }
  for (let i = 0; i < nums; i++) {
    var sz = 10;
    particles[i].checkEdge(radius);
    particles[i].move();
    particles[i].display(sz);
  }
  if (frameCount > 750) {
    noLoop();
  }
}

class Particle {
  constructor(x, y, c) {
    this.dir = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(x, y);
    this.speed = int(random(0.6, 4));
    this.c = color(c);
  }
  move() {
    var angle =
      noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }
  checkEdge(radius) {
    if (dist(width / 2, height / 2, this.pos.x, this.pos.y) > radius) {
      var angle = Math.random() * PI * 2;
      this.pos.x = cos(angle) * radius + width / 2;
      this.pos.y = sin(angle) * radius + height / 2;
    }
  }
  display(r) {
    push();
    fill(this.c);
    let alpha = atan2(this.dir.y, this.dir.x);
    translate(this.pos.x, this.pos.y);
    rotate(alpha);
    rect(0, 0, 0.5, r);
    pop();
  }
}

function keyPressed() {
  if (key === "s") save();
}

const URL = ["https://coolors.co/palette/264653-2a9d8f-e9c46a-e76f51"];

function createCols(url) {
  let slaIndex = url.lastIndexOf("/");
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split("-");
  for (let i = 0; i < colArr.length; i++) colArr[i] = "#" + colArr[i];
  return colArr;
}

function createpaper() {
  paper = createGraphics(width, height);
  paper.fill("#F6F2E9");
  paper.noStroke();
  paper.rect(0, 0, width, height);
  paper.fill(255, 50);
  for (let i = 0; i < 500000; i++) {
    let x = random(paper.width);
    let y = random(paper.height);
    paper.circle(x, y, random(0.5, 2));
  }
}
