// https://openprocessing.org/sketch/1516337

let swallows = [];
let colors = ["#916953", "#cf8e80", "#fcb5b5", "#fcddf2", "#faf6f6"];
let traces = [];

function setup() {
  createCanvas(600, 600);
  traces.push(new trace(30));
  traces.push(new trace(height - 30));
  for (let i = 20; i < 200; i += 20) {
    swallows.push(new swallow(300, 300, i, i / 10));
  }
}

function draw() {
  clear();
  background("#F8F2DC");
  blendMode(MULTIPLY);
  for (let i = 0; i < traces.length; i++) {
    traces[i].update();
    traces[i].show();
  }
  for (let i = 0; i < swallows.length; i++) {
    swallows[i].update();
    swallows[i].show();
  }
}

class swallow {
  constructor(x, y, s, r) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.points = [];
    this.noiser = random(1000);
    for (let i = 0; i < TWO_PI; i += 0.1) {
      let x = cos(i) * s - (noise(this.noiser) * this.s) / 2;
      let y = sin(i) * s - (noise(this.noiser + i) * this.s) / 2;
      let point = createVector(x, y);
      this.points.push(point);
      this.noiser += 0.1;
    }
    this.r = r;
    this.goal = [];
    this.color = color(random(colors));
    this.goalColor = color(random(colors));
    this.wait = 280;
  }
  update() {
    if (frameCount % 100 == 0) {
      this.noiser = random(1000);
      this.goal = [];
      this.goalColor = color(random(colors));
      for (let i = 0; i < TWO_PI; i += 0.1) {
        let x = cos(i) * this.s - (noise(this.noiser) * this.s) / 2;
        let y = sin(i) * this.s - (noise(this.noiser + i) * this.s) / 2;
        let point = createVector(x, y);
        this.goal.push(point);
        this.noiser += 0.1;
      }
    }
    if (frameCount > 50) {
      this.r += 0.001;
      for (let i = 0; i < this.points.length; i++) {
        let v1 = this.points[i];
        let v2 = this.goal[i];
        let v3 = p5.Vector.lerp(v1, v2, 0.02);
        this.points[i] = v3;
      }
    }
  }

  show() {
    noStroke();
    if (frameCount > 50) {
      let from = this.color;
      let to = this.goalColor;
      let interA = lerpColor(from, to, 0.01);
      this.color = interA;
    }

    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.r);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      curveVertex(this.points[i].x, this.points[i].y);
    }
    endShape(CLOSE);
    pop();
  }
}

class trace {
  constructor(y) {
    this.y = y;
    this.theta = random(1000);
    this.points = [];
    for (let x = 50; x < width - 50; x++) {
      let y1 = sin(this.theta + x / 100) * 10;
      let y2 = sin(this.theta) * 10;
      let y3 = this.y + y1 - y2;
      let pointer = createVector(x, y3);
      this.points.push(pointer);
      this.theta += 0.01;
    }
    this.theta = random(1000);
    this.goal = [];
    for (let x = 50; x < width - 50; x++) {
      let y1 = sin(this.theta + x / 100) * 10;
      let y2 = sin(this.theta) * 10;
      let y3 = this.y + y1 - y2;
      let pointer = createVector(x, y3);
      let i = x - 50;
      this.points[i] = pointer;
      this.theta += 0.01;
    }
  }

  update() {
    if (frameCount % 100 == 0) {
      this.theta = random(1000);
      this.goal = [];
      for (let x = 50; x < width - 50; x++) {
        let y1 = sin(this.theta + x / 100) * 10;
        let y2 = sin(this.theta) * 10;
        let y3 = this.y + y1 - y2;
        let pointer = createVector(x, y3);
        let i = x - 50;
        this.goal[i] = pointer;
        this.theta += 0.01;
      }
    }

    if (frameCount > 50) {
      this.r += 0.001;
      for (let i = 0; i < this.points.length; i++) {
        let v1 = this.points[i];
        let v2 = this.goal[i];
        let v3 = p5.Vector.lerp(v1, v2, 0.02);
        this.points[i] = v3;
      }
    }
  }

  show() {
    noFill();
    strokeWeight(0.8);
    stroke(100);
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      curveVertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }
}
