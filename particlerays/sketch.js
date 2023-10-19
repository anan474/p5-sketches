/**
 * Particle Rays SDF
 *
 * #genuary #genuary2023 #genuary8
 *
 * Uses p5.grain:
 * {@link https://github.com/meezwhite/p5.grain}
 *
 * Copyright (c) 2022-present meezwhite. All rights reserved.
 * Twitter: @meezwhite
 * Website: https://meezwhite.xyz
 */
const SHOULD_ANIMATE = true;
const ANIMATION_SPEED = 32;
const SHOULD_INVERSE_COLORS = false;
const CANVAS_SIZE = 1024;
const H_CANVAS_SIZE = CANVAS_SIZE / 2;
const MARGIN = CANVAS_SIZE / 16;
const T_MARGIN = MARGIN / 6.18;
const D_T_MARGIN = T_MARGIN * 2;
const H_T_MARGIN = T_MARGIN / 2;
const DRAWING_SPACE = CANVAS_SIZE - MARGIN * 2;
const CIRCLE_D = DRAWING_SPACE * 0.1458659418;
const CIRCLE_R = CIRCLE_D / 2;
const LAST_POINT = MARGIN + DRAWING_SPACE;
const WHITE_COL = "ded5cc";
const BLACK_COL = "1c2221";
const DRAW_FP_COUNT = SHOULD_ANIMATE
  ? ANIMATION_SPEED
  : CANVAS_SIZE * CANVAS_SIZE;
const DRAW_VL_COUNT = DRAWING_SPACE / T_MARGIN;
//const DRAW_VL_COUNT = 10;
let CP;
let currPhase;
let drawPoints = [];
let lastDrawPoint = 0;
let lastFramePointIx;
let paperImg;

/**
 * @param {p5.Vector} p - point from where the distance will be calculated
 * @param {p5.Vector} c - the center point of the circle
 * @param {Number} r - the radius of the circle to be encountered
 * @return {Number} - the distance from p to the respective edge point of the circle
 */
function sdf(p, c, r) {
  if (p.x - 4 > c.x - r && p.x + 4 < c.x + r && p.y > c.y) return -1;
  return p.dist(c) - r + 4;
}

function preload() {
  paperImg = loadImage("./paper.jpg");
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noStroke();
  if (SHOULD_INVERSE_COLORS) {
    background(`#${BLACK_COL}`);
    fill(`#${WHITE_COL}`);
  } else {
    background(`#${WHITE_COL}`);
    fill(`#${BLACK_COL}`);
  }
  textureOverlay(paperImg);
  blendMode(MULTIPLY);
  CP = createVector(H_CANVAS_SIZE, H_CANVAS_SIZE);
  currPhase = 0;
  circle(CP.x, CP.y, CIRCLE_D);
  computeFramePoints();
  computeVerticalLinesPoints();
}

function computeFramePoints() {
  const FP1 = createVector(MARGIN, LAST_POINT);
  const FP2 = createVector(MARGIN, MARGIN);
  const FP3 = createVector(LAST_POINT, MARGIN);
  const FP4 = createVector(LAST_POINT, LAST_POINT);
  // left
  for (let i = 0; i < LAST_POINT; i += 2) {
    drawPoints.push(p5.Vector.lerp(FP1, FP2, i / LAST_POINT));
  }
  // top
  for (let i = 0; i < LAST_POINT; i += 2) {
    drawPoints.push(p5.Vector.lerp(FP2, FP3, i / LAST_POINT));
  }
  // right
  for (let i = 0; i < LAST_POINT; i += 2) {
    drawPoints.push(p5.Vector.lerp(FP3, FP4, i / LAST_POINT));
  }
  // bottom
  for (let i = 0; i < LAST_POINT; i += 2) {
    drawPoints.push(p5.Vector.lerp(FP4, FP1, i / LAST_POINT));
  }
  lastFramePointIx = drawPoints.length - 1;
}

function computeVerticalLinesPoints() {
  const spacing = (DRAWING_SPACE - T_MARGIN * 2) / DRAW_VL_COUNT;
  for (let col = 1; col <= DRAW_VL_COUNT; col++) {
    const currX = col * spacing + MARGIN + T_MARGIN - 2;
    const startVec = createVector(currX, MARGIN + D_T_MARGIN);
    const endVec = createVector(currX, LAST_POINT - D_T_MARGIN);
    for (let i = 0; i < LAST_POINT; i += 2) {
      const vlP = p5.Vector.lerp(startVec, endVec, i / LAST_POINT);
      if (sdf(vlP, CP, CIRCLE_R + T_MARGIN) > 0) {
        drawPoints.push(vlP);
      }
    }
  }
}

function draw() {
  switch (currPhase) {
    case 0:
      if (SHOULD_INVERSE_COLORS) {
        fill(`#${WHITE_COL}`);
      } else {
        fill(`#${BLACK_COL}`);
      }
      let nextLastDrawPoint = lastDrawPoint + DRAW_FP_COUNT;
      const leftoverDrawPoints = drawPoints.length - lastDrawPoint;
      if (leftoverDrawPoints === 0) {
        currPhase++;
        blendMode(BLEND);
        break;
      }
      if (leftoverDrawPoints < DRAW_FP_COUNT) {
        nextLastDrawPoint = drawPoints.length;
      }
      for (let i = lastDrawPoint; i < nextLastDrawPoint; i++) {
        const currDrawPoint = drawPoints[i];
        const maxD = i <= lastFramePointIx ? 6 : 4;
        const d = map(
          noise(currDrawPoint.x * 0.026, currDrawPoint.y * 0.026),
          0,
          1,
          2,
          maxD
        );
        circle(currDrawPoint.x, currDrawPoint.y, d);
      }
      lastDrawPoint +=
        leftoverDrawPoints >= DRAW_FP_COUNT
          ? DRAW_FP_COUNT
          : leftoverDrawPoints;
      break;
    case 1:
      //console.debug('DONE');
      loadPixels();
      const d = pixelDensity();
      for (
        let x = floor(MARGIN - T_MARGIN);
        x < ceil(LAST_POINT + T_MARGIN);
        x++
      ) {
        for (
          let y = floor(MARGIN - T_MARGIN);
          y < ceil(LAST_POINT + T_MARGIN);
          y++
        ) {
          for (let i = 0; i < d; i++) {
            for (let j = 0; j < d; j++) {
              if (random() < 0.026) {
                const ix = 4 * ((y * d + j) * width * d + (x * d + i));
                if (SHOULD_INVERSE_COLORS) {
                  if (
                    pixels[ix] > 190 &&
                    pixels[ix + 1] > 190 &&
                    pixels[ix + 2] > 190
                  ) {
                    fill(`#${BLACK_COL}16`);
                    circle(x, y, 2);
                  }
                } else {
                  if (
                    pixels[ix] < 50 &&
                    pixels[ix + 1] < 50 &&
                    pixels[ix + 2] < 50
                  ) {
                    fill(`#${WHITE_COL}16`);
                    circle(x, y, 2);
                  }
                }
              }
            }
          }
        }
      }
      granulateChannels(22, true);
      textureOverlay(paperImg);
      noLoop();
      break;
    default:
      break;
  }
}

function keyPressed() {
  if (keyCode === 83) {
    // S
    save("genuary8.png");
  }
  return false;
}
