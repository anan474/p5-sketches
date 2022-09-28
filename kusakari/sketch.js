// https://openprocessing.org/sketch/1417982

let _minWidth;
let _palette = [
  "008594",
  "f0f0c9",
  "f2bb05",
  "d74e09",
  "6e0e0a",
  "649642",
  "447604",
];
let _aryPoints = [];
let _d;
let _type;
let _unitTime;
let _numStepR;
let _numStepAng;
let _xyTile = [];
let _bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  ellipseMode(RADIUS);
  frameRate(30);
  setObject();
}

function setObject() {
  _minWidth = min(width, height) * 0.8;
  noFill();
  stroke(0);
  strokeWeight(_minWidth / 800);

  shuffle(_palette, true);
  _bgColor = color(100);
  setFlow();
  updateFlow();

  let numPoints = 400;

  _aryPoints = [];
  for (let i = 0; i < numPoints; i++) {
    _aryPoints[i] = new Points();
  }
}

let _aryAddLine = [];
let _areaWidth;
let _startXy;
let _stepGrid;
let _noiseSpeed;
let _initNoise = [];
let _stepLength;
let _numGrid;
let _noiseStep;
let _noiseFreq;

function setFlow() {
  _stepLength = _minWidth / 50;
  _numGrid = 150;
  _noiseStep = 1 / _numGrid;
  _initNoise = [random(10000), random(10000)];
  _noiseFreq = 6;
  _noiseSpeed = 0.008;
  _areaWidth = _minWidth + _stepLength * 2;
  _startXy = createVector(-_areaWidth / 2, -_areaWidth / 2);
  _stepGrid = _areaWidth / _numGrid;
}

function updateFlow() {
  _aryAddLine = [];
  for (let ix = 0; ix < _numGrid; ix++) {
    _aryAddLine[ix] = [];
    for (let iy = 0; iy < _numGrid; iy++) {
      let ang =
        2 *
        PI *
        noise(
          _initNoise[0] + _noiseStep * ix,
          _initNoise[1] + _noiseStep * iy,
          _noiseSpeed * frameCount
        );
      _aryAddLine[ix][iy] = createVector(
        _stepLength * cos(_noiseFreq * ang),
        _stepLength * sin(_noiseFreq * ang)
      );
    }
  }
}

function GetEndxy(xy) {
  let ix = int((xy.x - _startXy.x) / _stepGrid);
  let iy = int((xy.y - _startXy.y) / _stepGrid);
  let endxy = p5.Vector.add(xy, _aryAddLine[ix][iy]);

  return endxy;
}

class Points {
  constructor() {
    this.col = color("#" + _palette[int(random(5))]);
    this.aryXy = [];
    let startR = random(0, -_minWidth / 2);
    let startAng = random(0, 2 * PI);
    let nextXy = createVector(startR * cos(startAng), startR * sin(startAng));
    this.aryXy.push(nextXy);
    this.maxNumXy = 30;
  }

  update() {
    if (p5.Vector.dist(this.aryXy[0], createVector(0, 0)) > _minWidth / 2) {
      this.aryXy.pop();
      if (this.aryXy.length == 0) {
        this.aryXy = [];
        let startR = random(0, -_minWidth / 2);
        let startAng = random(0, 2 * PI);
        let nextXy = createVector(
          startR * cos(startAng),
          startR * sin(startAng)
        );
        this.aryXy.unshift(nextXy);
      }
    } else {
      let nextXy = GetEndxy(this.aryXy[0]);
      this.aryXy.unshift(nextXy);
      if (this.aryXy.length > this.maxNumXy) {
        this.aryXy.pop();
      }
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.aryXy.length; i++) {
      curveVertex(this.aryXy[i].x, this.aryXy[i].y);
    }
    endShape();
  }
}

function getContactLine(xy1, xy2, r1, r2) {
  let xy_l;
  let xy_s;
  let r_l;
  let r_s;
  if (r1 > r2) {
    xy_l = xy1;
    xy_s = xy2;
    r_l = r1;
    r_s = r2;
  } else {
    xy_l = xy2;
    xy_s = xy1;
    r_l = r2;
    r_s = r1;
  }
  let numAng = 24; //64;
  let aryContactLinePoints = [];
  let d = p5.Vector.dist(xy_l, xy_s);

  let theta_l = acos((r_l - r_s) / d);
  let vec_l_s = p5.Vector.sub(xy_s, xy_l);
  let vec_radius_l = p5.Vector.rotate(vec_l_s, theta_l).setMag(r_l);

  for (let i = 0; i < numAng + 1; i++) {
    let vec = p5.Vector.add(xy_l, vec_radius_l);
    aryContactLinePoints.push(vec);
    vec_radius_l.rotate((2 * PI - theta_l * 2) / numAng);
  }
  let theta_s = PI - theta_l;
  let vec_s_l = p5.Vector.sub(xy_l, xy_s);
  let vec_radius_s = p5.Vector.rotate(vec_s_l, theta_s).setMag(r_s);
  for (let i = 0; i < numAng + 1; i++) {
    let vec = p5.Vector.add(xy_s, vec_radius_s);
    aryContactLinePoints.push(vec);
    vec_radius_s.rotate((2 * PI - theta_s * 2) / numAng);
  }

  return aryContactLinePoints;
}

function drawVertexShape(aryPoints) {
  beginShape();
  for (let i = 0; i < aryPoints.length; i++) {
    vertex(aryPoints[i].x, aryPoints[i].y);
  }
  endShape(CLOSE);
}

function easing(unitTime, t, type, d) {
  let value;
  if (type == "in") {
    value = easeIn(unitTime, t, d);
  } else if (type == "out") {
    value = easeOut(unitTime, t, d);
  } else if (type == "inout") {
    value = easeInOut(unitTime, t, d);
  }

  return value;
}

function easeIn(unitTime, t, d) {
  let value = (t / unitTime) ** d;

  return value;
}

function easeOut(unitTime, t, d) {
  let t2 = unitTime - t;
  let value = 1 - easeIn(unitTime, t2, d);

  return value;
}

function easeInOut(unitTime, t, d) {
  let t2;
  let value;
  if (t < unitTime / 2) {
    t2 = t * 2;
    value = easeIn(unitTime, t2, d) / 2;
  } else {
    t2 = t * 2 - unitTime;
    value = easeOut(unitTime, t2, d) / 2 + 0.5;
  }

  return value;
}

function draw() {
  translate(width / 2, height / 2);
  background(_bgColor);

  updateFlow();

  for (let i = _aryPoints.length - 1; i >= 0; i--) {
    _aryPoints[i].update();
  }

  for (let i = _aryPoints.length - 1; i >= 0; i--) {
    _aryPoints[i].draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setObject();
}
