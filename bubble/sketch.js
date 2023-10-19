// https://openprocessing.org/sketch/1721815

function keyTyped() {
  if (key === "s" || key === "S") {
    saveCanvas("1103_RE:BubbleChamber_7_2022", "png");
  }
}

//filter
function makeFilter() {
  // noiseのフィルターをつくる
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 95);
  overAllTexture = createGraphics(width, height);
  overAllTexture.loadPixels();
  for (var i = 0; i < width; i++) {
    // noprotect
    for (var j = 0; j < height; j++) {
      if (ver == 1) {
        overAllTexture.set(
          i,
          j,
          color(
            0,
            0,
            random(95, 85),
            (noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)) / 1
          )
        );
      }
      if (ver == 2) {
        overAllTexture.set(
          i,
          j,
          color(
            0,
            0,
            random(5, 10),
            (noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)) / 1
          )
        );
      }
    }
  }
  overAllTexture.updatePixels();
}

function drawOverPattern() {
  push();
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  let s = (mySize / 2) * sqrt(3) - 2;
  let n = 6;
  for (let theta = TWO_PI / 6; theta < TWO_PI; theta += TWO_PI / 6) {
    // noprotect
    divideOP(
      0,
      0,
      s * cos(theta),
      s * sin(theta),
      s * cos(theta + TWO_PI / 6),
      s * sin(theta + TWO_PI / 6),
      n
    );
  }
  pop();
}

function prop(x1, y1, x2, y2, k) {
  let x3 = (1 - k) * x1 + k * x2;
  let y3 = (1 - k) * y1 + k * y2;
  return [x3, y3];
}

function divideOP(x1, y1, x2, y2, x3, y3, n) {
  if (n > 1) {
    let [xA, yA] = prop(x1, y1, x2, y2, 1 / 3);
    let [xB, yB] = prop(x1, y1, x2, y2, 2 / 3);
    let [xC, yC] = prop(x2, y2, x3, y3, 1 / 3);
    let [xD, yD] = prop(x2, y2, x3, y3, 2 / 3);
    let [xE, yE] = prop(x3, y3, x1, y1, 1 / 3);
    let [xF, yF] = prop(x3, y3, x1, y1, 2 / 3);
    let [xG, yG] = prop(xF, yF, xC, yC, 1 / 2);
    divideOP(x1, y1, xA, yA, xF, yF, n - 1);
    divideOP(xA, yA, xB, yB, xG, yG, n - 1);
    divideOP(xB, yB, x2, y2, xC, yC, n - 1);
    divideOP(xG, yG, xF, yF, xA, yA, n - 1);
    divideOP(xC, yC, xG, yG, xB, yB, n - 1);
    divideOP(xF, yF, xG, yG, xE, yE, n - 1);
    divideOP(xG, yG, xC, yC, xD, yD, n - 1);
    divideOP(xD, yD, xE, yE, xG, yG, n - 1);
    divideOP(xE, yE, xD, yD, x3, y3, n - 1);
  } else {
    makeTriangle([x1, y1], [x2, y2], [x3, y3]);
  }
}

function makeTriangle(v1, v2, v3) {
  let points = shuffle([v1, v2, v3]);
  let [x1, y1] = points[0];
  let [x2, y2] = points[1];
  let [x3, y3] = points[2];
  let iStep = 1 / pow(2, floor(random(4, 2)));
  for (let i = 0; i < 1; i += iStep) {
    // noprotect
    let [x4, y4] = prop(x1, y1, x2, y2, 1 - i);
    let [x5, y5] = prop(x1, y1, x3, y3, 1 - i);
    triangle(x1, y1, x4, y4, x5, y5);
  }
}

// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

//refer:Bubble Chamber - Jared Tarbell, 2003
//http://www.complexification.net/gallery/machines/bubblechamber/

var p = [];
var mySize, margin;
var seed = Math.random() * 9217;
let colors1 = "fef9fb-fafdff-fcfbf4-f9f8f6".split("-").map((a) => "#" + a);
let colors2;
let colors_tone1 = "0D1E40-224573-5679A6-F2A25C-D96B43"
  .split("-")
  .map((a) => "#" + a);
let colors_tone2 = "7E56A6-F28B50-A63B14-591202-260101"
  .split("-")
  .map((a) => "#" + a);
let colors_tone3 = "4ED98A-3B8C57-F2AD85-404040-0D0D0D"
  .split("-")
  .map((a) => "#" + a);
let colors_tone4 = "725373-7866F2-8979F2-025373-BF7D56"
  .split("-")
  .map((a) => "#" + a);
let colors_tone5 = "20BF1B-218C11-17590C-11400A-0D0D0D"
  .split("-")
  .map((a) => "#" + a);
let colors_tone6 = "F20519-A60522-031059-071773-044BD9"
  .split("-")
  .map((a) => "#" + a);
let colors_tone7 = "F2E96D-F2B84B-BF8034-402B12-0D0D0D"
  .split("-")
  .map((a) => "#" + a);
let colors_tone8 = "9E9BF2-F2E088-F29544-F24405-F27E63"
  .split("-")
  .map((a) => "#" + a); // candy memory

let colors_root = "362300-805300-402900-734E39".split("-").map((a) => "#" + a);

let colorset = [];
let colorbg = "1C2611-2B4016-261416-031740".split("-").map((a) => "#" + a); // dark
let filter1;
let plusO, plus1;
let t, par_num;
let originalGraphics;
let lineGraphics;
let ver;

function setup() {
  frameRate(50);
  randomSeed(int(seed));
  // mySize = min(windowWidth, windowHeight);
  mySize = 1080;
  // mySize = 1200;
  margin = mySize / 100;
  createCanvas(mySize, mySize);
  originalGraphics = createGraphics(width, height);
  lineGraphics = createGraphics(width, height);

  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < 5; i++) {
      p[i] = createVector(width / 2, height / 2);
    }
  }
  // pixelDensity(3);
  colors2 = random([
    colors_tone1,
    colors_tone2,
    colors_tone3,
    colors_tone4,
    colors_tone5,
    colors_tone6,
    colors_tone7,
    colors_tone8,
  ]);
  // colors2 = colors_tone8;
  colorset[0] = random(colors2);
  colorset[1] = random(colors2);
  colorset[2] = random(colors1);
  colorset[3] = random(colors2);
  colorset[4] = random(colors2);
  colorset[5] = random(colors2);
  // ver = random([1, 2]);
  ver = 2;
  if (ver == 1) {
    background("#fafdff");
  }
  if (ver == 2) {
    background("#202020");
  }
  filter1 = new makeFilter();
  plusO = plus1 = t = 0;
}

function draw() {
  randomSeed(seed);
  noiseSeed(int(seed));
  let ver = 5;

  //line
  par_num = random(300, 400);
  for (let i = 0; i <= par_num; i++) {
    lineGraphics.fill(str(random(colorset)) + "0d");
    lineGraphics.noStroke();
    if (frameCount % 2 == 0) {
      lineGraphics.stroke(str(random(colorset)) + "0d");
      lineGraphics.strokeWeight(random(0.25, 0.1));
      lineGraphics.noFill();
    }
    lineGraphics.drawingContext.shadowColor = str(random(colorbg)) + "1a";
    lineGraphics.drawingContext.shadowOffsetX = 1;
    lineGraphics.drawingContext.shadowOffsetY = 1;
    lineGraphics.drawingContext.shadowBlur = 0;

    const xAngle = map(
      0,
      0,
      width,
      -random(0.5, 1) * PI,
      random(0.5, 1) * PI,
      true
    );
    const yAngle = map(
      height,
      0,
      height,
      -random(0.5, 1) * PI,
      random(0.5, 1) * PI,
      true
    );
    const angle = xAngle * width + yAngle * height;

    const myX =
      width / 2 + (mySize / 2) * sin(random(0.5, 1.5) * TAU * t + angle);
    const myY =
      height / 2 + (mySize / 2) * cos(random(0.5, 1.5) * TAU * t + angle);

    lineGraphics.push();
    lineGraphics.translate(
      myX + sin(random(0.5, 1.5) * TAU * t + angle),
      myY + cos(random(0.5, 1.5) * TAU * t + angle)
    );
    lineGraphics.rotate((sin(t) * PI) / 10);
    lineGraphics.ellipse(0, 0, random(1, 1.75) * (1 - sqrt(random(random(1)))));
    lineGraphics.pop();
  }

  image(lineGraphics, 0, 0);
  t += random(0.005, 0.01);

  //circle
  // if (frameCount % 25 == 0) {
  // 	randomSeed(seed * random(frameCount / 10));
  // }
  for (let newp of p) {
    let version = random(1, 0.1) * ver;
    let b1 = noise(newp.x / version, newp.y / version) * TWO_PI * 1;
    let c = random(100, 50);

    // *** main point *** //
    b2 = (TWO_PI / c) * int((b1 / TWO_PI) * c);
    newp.add(random(0.01, 0.035) * sin(b2), random(0.01, 0.035) * cos(b2));
    originalGraphics.push();
    originalGraphics.translate(newp.x, newp.y);
    originalGraphics.rotate(random(TAU));
    let gard_w = random(mySize / 0.5, mySize / 1) / ver;
    let gard_h = random(mySize / 0.5, mySize / 1) / ver;
    originalGraphics.stroke(random(colorset));
    originalGraphics.strokeWeight(1 - sqrt(random(random(random()))));
    originalGraphics.noFill();

    originalGraphics.drawingContext.shadowColor = str(random(colors1)) + "1a";
    originalGraphics.drawingContext.shadowOffsetX = random(-1, 1);
    originalGraphics.drawingContext.shadowOffsetY = random(-1, 1);
    originalGraphics.drawingContext.shadowBlur = 0;

    if (frameCount == 1) {
      originalGraphics.drawingContext.shadowColor =
        str(random(colorset)) + "80";
      originalGraphics.drawingContext.shadowOffsetX = 0;
      originalGraphics.drawingContext.shadowOffsetY = 0;
      originalGraphics.drawingContext.shadowBlur = random(10, 50);
      originalGraphics.fill(0);
      originalGraphics.noStroke();
      let grad = drawingContext.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        (random(1, 2) * random(gard_w, gard_h)) / random(1.5, 1)
      );
      grad.addColorStop(0.0, str(random(colorset)) + "00");
      grad.addColorStop(random(0.55, 0.25), str(random(colorset)) + "80");
      grad.addColorStop(random(0.65, 0.85), str(random(colorset)) + "00");
      originalGraphics.drawingContext.fillStyle = grad;
      originalGraphics.circle(
        0,
        0,
        (random(1, 2) * random(gard_w, gard_h)) / random(1.45, 2)
      );
    }

    originalGraphics.push();
    for (let k = 0; k < 100; k++) {
      let r =
        (1 - sqrt(random(random(random())))) *
        ((random(1, 2) * random(gard_w, gard_h)) / random(1, 2) + plus1 * 100);
      originalGraphics.strokeWeight(1 - sqrt(random(random(random()))) + plus1);
      let angle = random(TWO_PI);
      let point_x = cos(angle) * r;
      let point_y = sin(angle) * r;
      originalGraphics.point(point_x, point_y);
    }
    for (let k = 0; k < 300; k++) {
      let r =
        (1 - sqrt(random(random(random())))) *
        ((random(1, 2) * random(gard_w, gard_h)) / random(4, 2) + plus1 * 100);
      originalGraphics.strokeWeight(1 - sqrt(random(random(random()))) + plus1);
      let angle = random(TWO_PI);
      let point_x = cos(angle) * r;
      let point_y = sin(angle) * r;
      originalGraphics.point(point_x, point_y);
    }
    for (let k = 0; k < 500; k++) {
      let r =
        (1 - sqrt(random(random(random())))) *
        ((random(1, 2) * random(gard_w, gard_h)) / random(4, 32) + plus1 * 100);
      originalGraphics.strokeWeight(1 - sqrt(random(random(random()))) + plus1);
      let angle = random(TWO_PI);
      let point_x = cos(angle) * r;
      let point_y = sin(angle) * r;
      originalGraphics.point(point_x, point_y);
    }
    for (let k = 0; k < 100; k++) {
      let r =
        (1 - sqrt(random(random(random())))) *
        ((random(1, 2) * random(gard_w, gard_h)) / random(128, 64) +
          plus1 * 10);
      originalGraphics.strokeWeight(1 - sqrt(random(random(random()))) + plus1);
      let angle = random(TWO_PI);
      let point_x = cos(angle) * r;
      let point_y = sin(angle) * r;
      originalGraphics.point(point_x, point_y);
    }
    // originalGraphics.translate(random(1, 1.25) * random(-gard_w, gard_w), random(1.25, 1) * random(-gard_h, gard_h));
    //originalGraphics.circle(0, 0, random(1, 10) * random(gard_w, gard_h) / random(1, 128) + plus1);

    originalGraphics.pop();
    originalGraphics.pop();
    plusO -= (random(2, 3) * random(3, 2) * random(0.001, 0.00075)) / 2;
    plus1 += (random(2, 1) * random(3, 2) * random(0.001, 0.0005)) / 10;
  }

  blendMode(BLEND);
  image(originalGraphics, 0, 0);
  image(overAllTexture, 0, 0);

  if (frameCount == 500) {
    noLoop();
    blendMode(BLEND);
    image(overAllTexture, 0, 0);
    blendMode(ADD);
    strokeWeight(random(0.1, 0.2) / 1);
    stroke(str(random(colorbg)) + "33");
    noFill();
    drawingContext.setLineDash([1, 5, 1, 3]);
    drawOverPattern();
    drawingContext.setLineDash([1, 1, 1, 1]);
    blendMode(BLEND);

    noFill();
    strokeWeight(margin);
    rectMode(CORNER);
    stroke("#202020");
    rect(0, 0, width, height);
  }
}
