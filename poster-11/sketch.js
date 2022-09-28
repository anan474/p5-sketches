// Assignment 03 ~ Moiré Effect
//Mock mirage, M-Mir sunset

var radius = 200.0;
var sRadius = radius * 0.9;
let noiseValues = [];

function setup() {
  createCanvas(800, 800);

  // generate perlin noise values for mountain landscape
  let offx = 0;
  let offy = 0;
  for (let i = 0; i < width; i++) {
    noiseY = map(noise(offx, offy), 0, 1, 300, 990);
    offy += 0.04;
    offx += 0.02;
    noiseValues[i] = noiseY;
  }
}

function draw() {
  mouse255 = map(mouseY, 0, height, 255, 40); // map mouseY to range 0, 255
  mouse2StrokeW = map(mouseY, 0, height, 7.5, 3); // map mouse Y to range 7.5, 3
  mouse255inv = map(mouseY, 0, height, 40, 255);
  background(0, 0 + mouse255inv / 3, mouse255inv);
  strY = map(mouseY, width, 0, 1.5, 4); ///// map mouse Y to range 1.5, 4
  drawSun(strY);
  push();
  translate(width / 2, height / 2);
  angBg = map(mouseX, 0, width, -3, 3);
  rotate(angBg);
  drawBg(11, 255, 220, 255, mouse255inv); // stroke width, red, green, blue, alpha
  drawBg(1, 0, 0, 0, mouse255inv); // stroke width, red, green, blue, alpha
  pop();
  drawHorizon(255, 40, 60, mouse255); // red, green, blue, alpha
  drawMountains(mouse2StrokeW, 0, 0, 0, 0); // stroke width , red green blue
}

function drawMountains(mStroke, mHeightOffset, r, g, b) {
  // stroke width, offset, r,g,b
  var xM = 0;
  var rand = 0;
  for (m = 0; m < width; m++) {
    noFill();
    strokeWeight(mStroke);
    stroke(r, g, b);
    line(xM, height, xM, noiseValues[m] + mHeightOffset); // random perlin noise values generated in setup()
    xM = xM + 5;
  }
}

function drawHorizon(red, green, blue, alpha) {
  strW = 0.5; /// stroke weight
  var xW = 0;
  var yW = height / 1.85;
  for (i = 0; i < width; i++) {
    stroke(red, green, blue, alpha);
    strokeWeight(strW);
    line(xW, yW, xW + width * 3, yW);
    strW = strW + 0.5;
    yW = yW + height / 70;
  }
}

function drawBg(bgStr, bgR, bgG, bgB, bgA) {
  strokeWeight(bgStr); /// stroke weight
  stroke(bgR, bgG, bgB, bgA);
  var xB = -width;
  var yB = -height;
  for (i = 0; i < width; i++) {
    line(xB, yB, xB + width * 10, yB);
    yB = yB + height / 70;
  }
}

/// functions for drawing the sun
function drawSun(strW) {
  sunQu(-1, true, mouseY / 10, height - height / 4 - mouseY / 2, strW); //bottom left quarter
  sunQu(1, true, mouseY / 10, height - height / 4 - mouseY / 2, strW); //bottom right quarter
  sunQu(-1, false, mouseY / 10, height - height / 4 - mouseY / 2, strW); //top left quarter
  sunQu(1, false, mouseY / 10, height - height / 4 - mouseY / 2, strW); //top right quarter
}

function sunQu(inv, flip, density, zenith, strokeW) {
  var yOffset = 0;
  var angle = HALF_PI / density;
  noFill();
  strokeWeight(strokeW);
  r = 255;
  g = 10;
  b = 10;
  if (flip === true) {
    var i = 0;
    while (i < density) {
      beginShape();
      stroke(r, g, b);
      x = cos(angle * i) * sRadius;
      y = sin(angle * i) * sRadius;
      strokeWeight(strokeW);
      vertex(width / 2 + x * inv, zenith + y);
      vertex(width / 2, zenith + y);
      endShape();
      yOffset = yOffset + radius / density;
      r = r + 20;
      g = g - 9;
      b = b - 9;
      i++;
    }
  } else {
    var j = 0;
    while (j < density) {
      beginShape();
      stroke(r, g, b);
      x = cos(angle * j) * sRadius;
      y = sin(angle * j) * sRadius;
      vertex(width / 2 - x * inv, zenith - y);
      vertex(width / 2, zenith - y);
      endShape();
      yOffset = yOffset - radius / density;
      j++;
    }
  }
}
