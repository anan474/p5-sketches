// https://openprocessing.org/sketch/1467958

let _minWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  setObject();
}

let _aryLine = [];

function setObject() {
  _minWidth = min(width, height) * 0.8;
  strokeWeight(_minWidth / 75);
  stroke(255);
  noFill();
  strokeJoin(ROUND);

  let numLine = 10;
  let stepY = _minWidth / (numLine - 1);
  for (let i = 0; i < numLine; i++) {
    let startXy = createVector(-_minWidth / 2, -_minWidth / 2 + stepY * i);
    let endXy = createVector(_minWidth / 2, -_minWidth / 2 + stepY * i);
    _aryLine[i] = new BendLine(startXy, endXy);
    _aryLine[i].update();
    _aryLine[i].draw();
  }
}

class BendLine {
  constructor(startXy, endXy) {
    this.startXy = startXy;
    this.endXy = endXy;
    this.numPoints = 300;
    this.aryXy = [];
    for (let i = 0; i < this.numPoints; i++) {
      this.aryXy[i] = p5.Vector.lerp(
        this.startXy,
        this.endXy,
        (1 / (this.numPoints - 1)) * i
      );
    }
    this.numBend = 5;
    this.aryRParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryRParameter[i] = [_minWidth / 220, random(2 * PI), 0]; //2*PI / random(30, 300) * 0];//[max, init, speed]
    }
    this.aryinitAng = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryinitAng[i] =
        2 * PI * 10 * noise((0.2 * this.startXy.y) / _minWidth + 0.1 * i);
    }
    this.aryAngStepParameter = [];
    for (let i = 0; i < this.numBend; i++) {
      this.aryAngStepParameter[i] = [
        (2 * PI) / 40,
        random(2 * PI),
        random((2 * PI) / 1000),
      ]; //[max, init, speed]
    }
    this.numCycle = 4;
  }

  update() {
    this.updateR();
    this.updateAngStep();
    this.updateInitAng();
    this.newAryXy = this.aryXy;
    for (let i = 0; i < this.numBend; i++) {
      this.newAryXy = bend(
        this.newAryXy,
        this.aryR[i],
        this.aryinitAng[i],
        this.aryAngStep[i],
        this.numCycle
      );
    }
  }

  updateR() {
    this.aryR = [];
    for (let i = 0; i < this.aryRParameter.length; i++) {
      this.aryR[i] =
        this.aryRParameter[i][0] *
        sin(this.aryRParameter[i][1] + this.aryRParameter[i][2] * frameCount);
    }
  }

  updateAngStep() {
    this.aryAngStep = [];
    for (let i = 0; i < this.aryAngStepParameter.length; i++) {
      this.aryAngStep[i] =
        this.aryAngStepParameter[i][0] *
        sin(
          this.aryAngStepParameter[i][1] +
            this.aryAngStepParameter[i][2] * frameCount
        );
    }
  }

  updateInitAng() {
    for (let i = 0; i < this.aryinitAng.length; i++) {
      this.aryinitAng[i] += -0.05;
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.newAryXy.length; i++) {
      vertex(this.newAryXy[i].x, this.newAryXy[i].y);
    }
    endShape();
  }
}

function bend(aryXy, r, initAng, angStep, numCycle) {
  let aryXy2 = aryXy;
  for (let j = 0; j < numCycle; j++) {
    let aryXyNew = [];
    for (let i = 0; i < aryXy2.length - 1; i++) {
      let xy_1_2 = p5.Vector.sub(aryXy2[i + 1], aryXy2[i]);
      let ang = initAng + angStep * i;
      xy_1_2.rotate(-PI / 2).setMag(r * sin(ang));
      let xy = p5.Vector.add(aryXy2[i], xy_1_2);
      aryXyNew.push(xy);
    }
    aryXy2 = aryXyNew;
  }

  return aryXy2;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < _aryLine.length; i++) {
    _aryLine[i].update();
    _aryLine[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setObject();
}
