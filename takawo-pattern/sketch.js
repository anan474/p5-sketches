// https://openprocessing.org/sketch/966414

let graphic;
let url = "https://coolors.co/cfdbd5-e8eddf-f5cb5c-242423-333533";
let palette;
let texture;
let scl = 1;

function setup() {
  createCanvas(800 * scl, 800 * scl);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  graphics.angleMode(DEGREES);

  texture = createGraphics(width, height);
  texture.colorMode(HSB, 360, 100, 100, 100);
  texture.angleMode(DEGREES);

  texture.fill(0, 0, 0, 3);
  texture.noStroke();
  for (let i = 0; i < (texture.width * texture.height * 10) / 100; i++) {
    texture.ellipse(
      random(texture.width),
      random(texture.height),
      random(3),
      random(3)
    );
  }

  palette = createPalette(url);
}

function draw() {
  background(0, 0, 95);
  graphics.clear();

  // randomSeed(frameCount*10/10);
  let cells = int(random(1, 7));
  let offset = width / 10;
  let margin = 0; //offset / 5;

  let d = (width - offset * 2 - margin * (cells - 1)) / cells;

  drawingContext.shadowColor = color(0, 0, 0, 50);
  drawingContext.shadowBlur = d / 8;
  drawingContext.shadowOffsetX = d / 18;
  drawingContext.shadowOffsetY = d / 18;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin) + d / 2;
      let y = offset + j * (d + margin) + d / 2;

      drawFancyShape(x, y, sqrt(sq(d) * 2) / 2, graphics);
    }
  }
  noLoop();
  frameRate(0.5);
  image(graphics, 0, 0);
  image(texture, 0, 0);

  //   save();
}

function drawFancyShape(cx, cy, d, g) {
  let scl = 1;
  let step = int(random(3, 8));
  g.push();
  g.translate(cx, cy);
  g.rotate((int(random(4)) * 360) / 4);
  g.scale(random() > 0.5 ? -1 : 1, random() > 0.5 ? -1 : 1);
  g.rectMode(CENTER);
  g.noStroke();
  g.drawingContext.shadowColor = color(0, 0, 0, 33);
  g.drawingContext.shadowBlur = d / 15;

  let ratio_a = random(0.2, 0.8);
  let ratio_b = 1 - ratio_a;
  switch (int(random(4))) {
    case 0:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, -d / 4);
      g.scale(scl);
      drawCircularRect(
        0,
        0,
        d * ratio_a,
        d / 2,
        random([CENTER, TOP, LEFT]),
        step,
        g,
        palette
      );
      g.pop();
      break;
    case 1:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(scl);
      drawCircularHalfArc(0, 0, d * ratio_a, d * ratio_a, step, g, palette);
      g.pop();
      break;
    case 2:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.scale(scl);
      g.translate((-d * ratio_a) / 2, 0);
      drawRightTriangles(0, 0, 0, -d / 2, d * ratio_a, 0, step, g, palette);
      g.pop();
      break;
    case 3:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.scale(scl);
      drawCircularQuarterArc(
        (-d * ratio_a) / 2,
        0,
        d * ratio_a * 2,
        min(d * ratio_a * 2, d),
        step,
        g,
        palette
      );
      g.pop();
      break;
  }
  step = int(random(3, 8));
  switch (int(random(4))) {
    case 0:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, -d / 4);
      g.scale(scl);
      drawCircularRect(
        0,
        0,
        d * ratio_b,
        d / 2,
        random([CENTER, TOP, LEFT]),
        step,
        g,
        palette
      );
      g.pop();
      break;
    case 1:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(scl);
      drawCircularHalfArc(0, 0, d * ratio_b, d * ratio_b, step, g, palette);
      // g.arc(0, 0, d * ratio_b, d * ratio_b, 180, 360, PIE);
      g.pop();
      break;
    case 2:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.translate((-d * ratio_b) / 2, 0);
      drawRightTriangles(0, 0, 0, -d / 2, d * ratio_b, 0, step, g, palette);
      g.pop();
      break;
    case 3:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      drawCircularQuarterArc(
        (-d * ratio_b) / 2,
        0,
        d * ratio_b * 2,
        min(d * ratio_b * 2, d),
        step,
        g,
        palette
      );
      g.pop();
      break;
  }
  g.rotate(180);
  step = int(random(3, 8));
  switch (int(random(4))) {
    case 0:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, -d / 4);
      g.scale(scl);
      drawCircularRect(
        0,
        0,
        d * ratio_a,
        d / 2,
        random([CENTER, TOP, LEFT]),
        step,
        g,
        palette
      );
      g.pop();
      break;
    case 1:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(scl);
      drawCircularHalfArc(0, 0, d * ratio_a, d * ratio_a, step, g, palette);
      g.pop();
      break;
    case 2:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.scale(scl);
      g.translate((-d * ratio_a) / 2, 0);
      drawRightTriangles(0, 0, 0, -d / 2, d * ratio_a, 0, step, g, palette);
      g.pop();
      break;
    case 3:
      g.push();
      g.translate(-d / 2 + (d * ratio_a) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.scale(scl);
      drawCircularQuarterArc(
        (-d * ratio_a) / 2,
        0,
        d * ratio_a * 2,
        min(d * ratio_a * 2, d),
        step,
        g,
        palette
      );
      g.pop();
      break;
  }
  step = int(random(3, 8));
  switch (int(random(4))) {
    case 0:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, -d / 4);
      g.scale(scl);
      drawCircularRect(
        0,
        0,
        d * ratio_b,
        d / 2,
        random([CENTER, TOP, LEFT]),
        step,
        g,
        palette
      );
      g.pop();
      break;
    case 1:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(scl);
      drawCircularHalfArc(0, 0, d * ratio_b, d * ratio_b, step, g, palette);
      // g.arc(0, 0, d * ratio_b, d * ratio_b, 180, 360, PIE);
      g.pop();
      break;
    case 2:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      g.translate((-d * ratio_b) / 2, 0);
      drawRightTriangles(0, 0, 0, -d / 2, d * ratio_b, 0, step, g, palette);
      g.pop();
      break;
    case 3:
      g.push();
      g.translate(d / 2 - (d * ratio_b) / 2, 0);
      g.scale(random() > 0.5 ? -1 : 1, 1);
      drawCircularQuarterArc(
        (-d * ratio_b) / 2,
        0,
        d * ratio_b * 2,
        min(d * ratio_b * 2, d),
        step,
        g,
        palette
      );
      g.pop();
      break;
  }

  g.pop();
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color("#" + arr[i]);
  }
  return arr;
}

function drawRightTriangles(rx, ry, x1, y1, x2, y2, step, g, palette) {
  let colors = shuffle(palette.concat());
  let n = 0;
  for (let i = 1; i > 0; i -= 1 / step) {
    let xa = lerp(rx, x1, i);
    let ya = lerp(ry, y1, i);
    let xb = lerp(rx, x2, i);
    let yb = lerp(rx, y2, i);
    g.fill(colors[n++ % colors.length]);
    g.triangle(rx, ry, xa, ya, xb, yb);
  }
}

function drawCircularQuarterArc(cx, cy, dw, dh, step, g, palette) {
  let colors = shuffle(palette.concat());
  let n = 0;
  for (let i = 1; i > 0; i -= 1 / step) {
    g.fill(colors[n++ % colors.length]);
    g.arc(cx, cy, dw * i, dh * i, 270, 360, PIE);
  }
}

function drawCircularHalfArc(cx, cy, dw, dh, step, g, palette) {
  let colors = shuffle(palette.concat());
  let n = 0;
  for (let i = 1; i > 0; i -= 1 / step) {
    g.fill(colors[n++ % colors.length]);
    g.arc(cx, cy, dw * i, dh * i, 180, 360, PIE);
  }
}

function drawCircularRect(cx, cy, dw, dh, align, step, g, palette) {
  let colors = shuffle(palette.concat());
  let n = 0;
  for (let i = 1; i > 0; i -= 1 / step) {
    g.rectMode(CENTER);
    g.fill(colors[n++ % colors.length]);
    if (align == CENTER) {
      g.rect(cx, cy, i * dw, i * dh);
    }
    if (align == LEFT) {
      g.rect(cx - dw / 2 + (i * dw) / 2, cy, i * dw, i * dh);
    }
    if (align == TOP) {
      g.rect(
        cx - dw / 2 + (i * dw) / 2,
        cy - dh / 2 + (i * dh) / 2,
        i * dw,
        i * dh
      );
    }
  }
}
