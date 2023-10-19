// https://openprocessing.org/sketch/1715934

//Created by kusakari
//https://twitter.com/kusakarism

let _palette = [
  "0085b6",
  "ec7287",
  "fff687",
  "00afb0",
  "003151",
  "ffffff",
  "f4cac9",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);

  setObject();
}

let _minW;
let _maxW;

let _aryCurveLine = [];

function setObject() {
  _minW = min(width, height) * 1;
  _maxW = max(width, height);

  strokeWeight(_minW / 600);
  strokeCap(SQUARE);
  noFill();

  let numCurveLine = 3; //4;
  _aryCurveLine = [];
  for (let i = 0; i < numCurveLine; i++) {
    let posY = (-_minW / 2 + (_minW / numCurveLine) * (0.5 + i)) * 0.75; //0.5;
    _aryCurveLine[i] = new CurveLine(posY, i);
  }

  _count = 0;
}

class ChildCurveLine {
  constructor(aryXi, stepX, ampY, aryFunctionParameter, col, col2, id) {
    this.aryXi = aryXi;
    this.stepX = stepX;
    this.ampY = ampY;
    this.aryFunctionParameter = aryFunctionParameter;
    this.numFunction = this.aryFunctionParameter.length;
    this.col = col;
    this.col2 = col2;
    this.id = id;
    this.numInner = 15; //20;//9;
    this.count = 0;

    this.areaX = random(["left", "right"]);
    this.areaY = random(["upper", "lower"]);
  }

  draw() {
    push();

    let aryAryX = [];
    let aryAryY = [];
    let startInner_i = 1;

    if (this.areaY == "lower") {
      for (let i = 0; i < this.numInner; i++) {
        aryAryX[i] = [];
        aryAryY[i] = [];
        let newAmpY = this.ampY * (1 - i / this.numInner);

        if (this.areaX == "left") {
          let lastXi =
            this.aryXi[this.aryXi.length - 1 - startInner_i] -
            ((this.aryXi[this.aryXi.length - 1 - startInner_i] -
              this.aryXi[startInner_i]) /
              this.numInner) *
              i;
          let val;

          let xi = this.aryXi[startInner_i];
          while (xi < lastXi) {
            aryAryX[i].push(xi);
            val = calcVal(
              xi,
              this.aryFunctionParameter,
              this.numFunction,
              this.count
            );
            aryAryY[i].push(val * newAmpY);

            xi++;
          }

          xi = lastXi;
          aryAryX[i].push(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].push(val * newAmpY);

          xi = lastXi;
          aryAryX[i].push(xi);
          aryAryY[i].push(0);

          xi = this.aryXi[startInner_i];
          aryAryX[i].push(xi);
          aryAryY[i].push(0);
        } else if (this.areaX == "right") {
          let minXi =
            this.aryXi[startInner_i] +
            ((this.aryXi[this.aryXi.length - 1 - startInner_i] -
              this.aryXi[startInner_i]) /
              this.numInner) *
              i;
          let val;

          let xi = this.aryXi[this.aryXi.length - 1 - startInner_i];
          while (xi > minXi) {
            aryAryX[i].unshift(xi);
            val = calcVal(
              xi,
              this.aryFunctionParameter,
              this.numFunction,
              this.count
            );
            aryAryY[i].unshift(val * newAmpY);

            xi--;
          }

          xi = minXi;
          aryAryX[i].unshift(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].unshift(val * newAmpY);

          xi = minXi;
          aryAryX[i].unshift(xi);
          aryAryY[i].unshift(0);

          xi = this.aryXi[this.aryXi.length - 1 - startInner_i];
          aryAryX[i].unshift(xi);
          aryAryY[i].unshift(0);
        }
      }
    } else if (this.areaY == "upper") {
      for (let i = 0; i < this.numInner; i++) {
        aryAryX[i] = [];
        aryAryY[i] = [];
        let newAmpY = (this.ampY * i) / this.numInner;

        if (this.areaX == "left") {
          let lastXi =
            this.aryXi[this.aryXi.length - 1 - startInner_i] -
            ((this.aryXi[this.aryXi.length - 1 - startInner_i] -
              this.aryXi[startInner_i]) /
              this.numInner) *
              i;
          let val;
          let xi = this.aryXi[startInner_i];
          while (xi < lastXi) {
            aryAryX[i].push(xi);
            val = calcVal(
              xi,
              this.aryFunctionParameter,
              this.numFunction,
              this.count
            );
            aryAryY[i].push(val * newAmpY);

            xi++;
          }

          xi = lastXi;
          aryAryX[i].push(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].push(val * newAmpY);

          xi = lastXi;
          aryAryX[i].push(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].push(val * this.ampY);

          xi = this.aryXi[startInner_i];
          aryAryX[i].unshift(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].unshift(val * this.ampY);
        } else if (this.areaX == "right") {
          let minXi =
            this.aryXi[startInner_i] +
            ((this.aryXi[this.aryXi.length - 1 - startInner_i] -
              this.aryXi[startInner_i]) /
              this.numInner) *
              i;
          let val;

          let xi = this.aryXi[this.aryXi.length - 1 - startInner_i];
          while (xi > minXi) {
            aryAryX[i].unshift(xi);
            val = calcVal(
              xi,
              this.aryFunctionParameter,
              this.numFunction,
              this.count
            );
            aryAryY[i].unshift(val * newAmpY);

            xi--;
          }

          xi = minXi;
          aryAryX[i].unshift(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].unshift(val * newAmpY);

          xi = minXi;
          aryAryX[i].unshift(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].unshift(val * this.ampY);

          xi = this.aryXi[this.aryXi.length - 1 - startInner_i];
          aryAryX[i].push(xi);
          val = calcVal(
            xi,
            this.aryFunctionParameter,
            this.numFunction,
            this.count
          );
          aryAryY[i].push(val * this.ampY);
        }
      }
    }

    stroke(this.col);

    for (let i = 0; i < this.numInner; i++) {
      beginShape();
      for (let j = 0; j < aryAryX[i].length; j++) {
        vertex(this.stepX * aryAryX[i][j], aryAryY[i][j]);
      }
      endShape();
    }

    pop();

    this.count++;
  }
}

function calcVal(xi, aryFunctionParameter, numFunction, count) {
  let val = 0;
  for (let j = 0; j < numFunction; j++) {
    val +=
      sin(
        aryFunctionParameter[j][0] +
          2 *
            PI *
            aryFunctionParameter[j][1] *
            aryFunctionParameter[j][2] *
            xi +
          aryFunctionParameter[j][3] * count
      ) ** aryFunctionParameter[j][4];
  }
  val /= numFunction; // -1 to 1

  return val;
}

class CurveLine {
  constructor(posY, id) {
    this.posY = posY;
    this.id = id;

    this.stepX = _minW / 200 / 1.5; // * random(1, 4);
    this.xiMin = -int(_minW / 2 / this.stepX) * 0.75;
    this.xiMax = -this.xiMin;

    this.ampY = _minW / 1.5 / 1.25 / 2;

    this.numFunction = 4;
    this.aryFunctionParameter = [];
    for (let i = 0; i < this.numFunction; i++) {
      this.aryFunctionParameter[i] = [
        random(2 * PI), //init
        random(0.5, 2), //freq
        random(0.001, 0.005) * random([-1, 1]) * 1, //stepSpeed
        random(0.005, 0.015) * 1.2, //timeSpeed
        int(random([1, 3, 5])), // order of function
      ];
    }

    let numBlock = int(random(1, 6)) * 2;
    this.numSeriesXi = int((this.xiMax - this.xiMin) / numBlock) + 0; //+2 to align edge
    this.aryChildren = [];

    let aryXi = [];
    let xi = 0;
    aryXi.unshift(xi); // xi=0
    xi--;
    let col;
    let col2;
    while (xi >= this.xiMin) {
      // minXi <= xi <= -1
      aryXi.unshift(xi);
      if (xi % this.numSeriesXi == 0) {
        col = color("#" + random(_palette));
        if (this.aryChildren.length > 0) {
          while (
            red(this.aryChildren[0].col) == red(col) &&
            green(this.aryChildren[0].col) == green(col) &&
            blue(this.aryChildren[0].col) == blue(col)
          ) {
            col = color("#" + random(_palette));
          }
        }
        col2 = color("#" + random(_palette));
        while (
          red(col) == red(col2) &&
          green(col) == green(col2) &&
          blue(col) == blue(col2)
        ) {
          col2 = color("#" + random(_palette));
        }
        this.aryChildren.unshift(
          new ChildCurveLine(
            aryXi,
            this.stepX,
            this.ampY,
            this.aryFunctionParameter,
            col,
            col2,
            this.id
          )
        );
        aryXi = [];
        aryXi.unshift(xi);
      }
      xi--;
    }

    aryXi = [];
    xi = 0;
    aryXi.push(xi); // xi=0
    xi++;
    while (xi <= this.xiMax) {
      // 1 <= xi <= xiMax
      aryXi.push(xi);
      if (xi % this.numSeriesXi == 0) {
        col = color("#" + random(_palette));
        if (this.aryChildren.length > 0) {
          while (
            red(this.aryChildren[this.aryChildren.length - 1].col) ==
              red(col) &&
            green(this.aryChildren[this.aryChildren.length - 1].col) ==
              green(col) &&
            blue(this.aryChildren[this.aryChildren.length - 1].col) == blue(col)
          ) {
            col = color("#" + random(_palette));
          }
        }
        col2 = color("#" + random(_palette));
        while (
          red(col) == red(col2) &&
          green(col) == green(col2) &&
          blue(col) == blue(col2)
        ) {
          col2 = color("#" + random(_palette));
        }
        this.aryChildren.push(
          new ChildCurveLine(
            aryXi,
            this.stepX,
            this.ampY,
            this.aryFunctionParameter,
            col,
            col2,
            this.id
          )
        );
        aryXi = [];
        aryXi.push(xi);
      }
      xi++;
    }
  }

  draw() {
    push();
    translate(0, this.posY);
    for (let i = 0; i < this.aryChildren.length; i++) {
      this.aryChildren[i].draw();
    }
    pop();
  }
}

function draw() {
  translate(width / 2, height / 2);
  background(10); //color("#"+_bgCol));// 90);//90);//10);//80);

  for (let i = 0; i < _aryCurveLine.length; i++) {
    _aryCurveLine[i].draw();
  }
}
