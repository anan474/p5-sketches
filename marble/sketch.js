// https://openprocessing.org/sketch/1614308

// https://zenn.dev/baroqueengine/books/a19140f2d9fc1a/viewer/786179

const radius = 270;
let img, maxRad;
const palette = ["#ffff00", "#00ffff", "#ff00ff"];

function setup() {
  const mainColor = random(palette);
  img = createGraphics(630, 630);
  img.background("#000");
  img.noStroke();
  for (let i = 0; i < 100; i++) {
    let x1 = random(img.width / 2);
    img.strokeWeight(random(1, 5));
    img.stroke(mainColor);
    img.line(x1, 0, x1, img.height);

    let x2 = random(img.width / 2, img.width);
    img.strokeWeight(random(1, 5));
    img.stroke("#E7ECF2");
    img.line(x2, 0, x2, img.height);
  }

  createCanvas(img.width, img.height);
  background("#E7ECF2");
  // image(img, 0, 0);

  maxRad = PI * random(0.5, 1.25);
  img.loadPixels();

  const dest = createImage(img.width, img.height);
  dest.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  dest.loadPixels();

  const cx = img.width / 2;
  const cy = img.height / 2;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const d = dist(cx, cy, x, y);
      const rad = max(0, map(d, 0, radius, maxRad, 0));

      if (rad > 0) {
        const tx = cx + round(cos(rad) * (x - cx) - sin(rad) * (y - cy));
        const ty = cy + round(sin(rad) * (x - cx) + cos(rad) * (y - cy));
        const c = getPixel(img, tx, ty);
        setPixel(dest, x, y, c);
      }
    }
  }

  dest.updatePixels();
  push();
  image(dest, 0, 0);
  pop();

  noStroke();
  fill("#E7ECF2");
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height);
  vertex(0, height);

  beginContour();
  for (let t = TWO_PI; t >= 0; t -= TWO_PI / 360) {
    vertex(width / 2 + radius * cos(t), height / 2 + radius * sin(t));
  }
  endContour();
  endShape(CLOSE);
}

function getPixel(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [img.pixels[i], img.pixels[i + 1], img.pixels[i + 2]];
}

function setPixel(img, x, y, color) {
  const i = (y * img.width + x) * 4;
  img.pixels[i + 0] = color[0];
  img.pixels[i + 1] = color[1];
  img.pixels[i + 2] = color[2];
}
