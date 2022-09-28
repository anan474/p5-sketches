// https://openprocessing.org/sketch/1460594

// Reference
// filter_sobel.js: https://www.rand-on.com/projects/2018_edge_detection/edge_detection.html

let pictImg; // original image
let edgeImg; // edge detection
let pictGfx;

const W = 720;

function preload() {
  pictImg = loadImage("./profile.png");
}

let textureGfx;
const prepareTexture = () => {
  textureGfx = createGraphics(W, W);
  textureGfx.noStroke();

  // white texture
  textureGfx.fill(255, 30);
  for (let i = 0; i < 100000; i++) {
    textureGfx.circle(random(W), random(W), (noise(i) * W) / 360);
  }
};

const lines = [];
const unit = 8;

function setup() {
  createCanvas(W, W);
  pixelDensity(1);

  prepareTexture();

  pictGfx = createGraphics(W, W);

  fill("#f1e9db");
  noStroke();

  // Edge Detection
  edgeImg = createImage(W, W);
  edgeImg.copy(pictImg, 0, 0, W, W, 0, 0, W, W);
  apply_sobel_filter(edgeImg);
  edgeImg.filter(INVERT);
  edgeImg.filter(THRESHOLD, 0.6);

  // Filter for the original image and blend with edges
  pictImg.filter(THRESHOLD, 0.79);
  pictImg.blend(edgeImg, 0, 0, W, W, 0, 0, W, W, DARKEST);

  // Draw it on the pictGfx
  pictGfx.image(pictImg, 0, 0, W, W);

  // Add space for the Kanji name
  pictGfx.fill(0);
  pictGfx.rect(50, W - 150, 90, 110, 10);

  background(30);
  image(textureGfx, 0, 0);

  // For random matrix picking
  for (let i = 0; i < W / unit; i++) {
    for (let j = 0; j < W / unit; j++) {
      lines.push({ x: unit * j, y: unit * i });
    }
  }
  shuffle(lines, true);
}

// DrawCounter
let counter = 0;

function draw() {
  // Num of drawing lines
  let numDraw = 1;

  // Drawing speed
  if (counter < 60) {
    numDraw = 1;
  } else if (counter < 1000) {
    numDraw = 10;
  } else if (counter < 7100) {
    numDraw = 30;
  } else if (counter < 8000) {
    numDraw = 10;
  } else {
    numDraw = 1;
  }

  if (counter <= lines.length - 1) {
    // Normal drawing
    for (let i = 0; i < numDraw; i++) {
      const targetIndex = counter + i;
      const val = pictGfx.get(lines[targetIndex].x, lines[targetIndex].y)[0];
      if (val === 255) {
        push();
        {
          translate(lines[targetIndex].x, lines[targetIndex].y);
          rotate(random(-PI / 30, PI / 30));
          ellipse(0, 0, unit / random(1, 2), unit * random(1, 6));
        }
        pop();
      }
    }
  } else {
    // Name drawing
    frameRate(7);
    drawName(57, W - 147, counter - 8100);
  }

  counter += numDraw;
}

const drawName = (x, y, index) => {
  // draw '哲'
  const nameLines = [
    { x: x + 3 * unit, y: y + 4 * unit, a: PI / 2, l: unit * random(3, 4) },
    { x: x + 3 * unit, y: y + 5 * unit, a: PI, l: unit * random(5, 6) },
    { x: x + 3 * unit, y: y + 6 * unit, a: PI / 2, l: unit * random(3, 4) },

    { x: x + 7 * unit, y: y + 4 * unit, a: PI / 2, l: unit * random(3, 4) },
    { x: x + 6 * unit, y: y + 5 * unit, a: PI, l: unit * random(4, 5) },
    { x: x + 7 * unit, y: y + 6 * unit, a: PI / 2, l: unit * random(3, 4) },
    { x: x + 8 * unit, y: y + 6 * unit, a: PI, l: unit * random(2, 3) },

    { x: x + 2 * unit, y: y + 9 * unit, a: PI, l: unit * random(2, 3) },
    { x: x + 5 * unit, y: y + 8 * unit, a: PI / 2, l: unit * random(5, 6) },
    { x: x + 8 * unit, y: y + 9 * unit, a: PI, l: unit * random(2, 3) },
    { x: x + 5 * unit, y: y + 10 * unit, a: PI / 2, l: unit * random(5, 6) },
  ];

  // Invalid index specified
  if (index > nameLines.length - 1) {
    return;
  }

  push();
  {
    const l = nameLines[index];
    translate(l.x, l.y);
    rotate(l.a + random(-PI / 80, PI / 80));
    ellipse(0, 0, unit / random(1, 2), l.l);
  }

  pop();
};
