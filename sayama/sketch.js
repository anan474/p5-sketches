// https://openprocessing.org/sketch/1362060

const COLS = createCols("https://coolors.co/fd5126-ffffff-1e3e34");

let tiles = [];

function setup() {
  let s = min(windowWidth, windowHeight) * 0.9;

  createCanvas(s, s);

  let num = 6;
  let span = width / num;

  for (let yi = 0; yi < num + 1; yi++) {
    for (let xi = 0; xi < num + 1; xi++) {
      let x = xi * span + span / 2;
      let y = yi * span + span / 2;
      tiles.push(new tile(x, y, span, COLS[1]));
      tiles.push(new tile(x - span / 2, y - span / 2, span, COLS[2]));
    }
  }

  tiles = shuffle(tiles);
}

function draw() {
  background(COLS[0]);
  for (const i of tiles) i.display();
}

function tile(x, y, s, c) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.angle = int(random(4)) * HALF_PI;
  this.sw = this.s / 5;
  this.c = c;
  this.rotateNegative = random() > 0.5;

  this.culcRatio = function () {
    let cycle = 360;
    let ratio = (frameCount % cycle) / cycle;
    return ratio;
  };

  this.display = function () {
    let ratio = this.culcRatio();
    let off = this.s / 70;

    noFill();
    stroke(this.c);
    strokeWeight(this.sw);
    strokeCap(PROJECT);

    push();
    translate(this.x, this.y);
    rotate(this.angle);

    CircleMoveArc(this.s + off, ratio, this.rotateNegative);

    rotate(PI);
    CircleMoveArc(this.s + off, ratio, this.rotateNegative);

    pop();
  };
}

function CircleMoveArc(s, ratio, rotateNegative) {
  const ratioStep = 0.5;

  let rotateAngleStep = HALF_PI;
  let rotateNum = int(ratio / ratioStep);
  let rotateAngle = rotateAngleStep * rotateNum;

  const idleTimeRatio = 0.3;

  let curveRatio = (ratio % ratioStep) / ratioStep;
  curveRatio = map(curveRatio, 0, 1 - idleTimeRatio, 0, 1, true);
  if (rotateNegative) curveRatio = 1 - curveRatio;

  curveRatio = customEase(curveRatio, 0.2, 3);

  push();

  rotate(rotateAngle);

  CurvingArcLine(s, curveRatio);

  pop();
}

function customEase(x, idleTimeRatio, powNum) {
  let halfTimeRatio = (1 - idleTimeRatio) / 2;

  if (x < halfTimeRatio)
    return 0.5 * easingEaseInOut(x / halfTimeRatio, powNum);
  else if (x > 1 - halfTimeRatio)
    return 0.5 * easingEaseInOut(1 - (1 - x) / halfTimeRatio, powNum) + 0.5;
  else return 0.5;
}

function easingEaseInOut(x, powNum) {
  if (x < 0.5) return 0.5 * pow(2 * x, powNum);
  else return 0.5 * pow(2 * (x - 1), powNum) + 1;
}

function CurvingArcLine(s, curveRatio) {
  const cpMul = 0.7;
  const p2YMul = -0.3;

  //start position
  let p1 = createVector(0, -s / 2);

  //control position 1
  let cp1 = createVector(0, -s / 2 + (s / 2) * cpMul);

  //end position
  let p2StartRad = PI;
  let p2EndRad = 0;
  let p2Rad = lerp(p2StartRad, p2EndRad, curveRatio);
  let p2X = (cos(p2Rad) * s) / 2;
  let p2Y = ((sin(p2Rad) * s) / 2) * p2YMul;
  let p2 = createVector(p2X, p2Y);

  //control position 2
  let cp2_OffsetStartRad = 0;
  let cp2_OffsetEndRad = -PI;
  let cp2_OffsetRad = lerp(cp2_OffsetStartRad, cp2_OffsetEndRad, curveRatio);
  let cp2_offsetX = ((cos(cp2_OffsetRad) * s) / 2) * cpMul;
  let cp2_offsetY = ((sin(cp2_OffsetRad) * s) / 2) * cpMul;
  let cp2 = createVector(p2.x + cp2_offsetX, p2.y + cp2_offsetY);

  //draw bezier
  beginShape();
  vertex(p1.x, p1.y);
  bezierVertex(cp1.x, cp1.y, cp2.x, cp2.y, p2.x, p2.y);
  endShape();
}

function createCols(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = "#" + arr[i];
  }
  return arr;
}
