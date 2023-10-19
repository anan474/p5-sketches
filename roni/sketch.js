// https://openprocessing.org/sketch/1970575

// Roni's Musical Chairs
//
// Remix of Roni Kaufman's "Combinaisons" (2021)
// https://openprocessing.org/sketch/1241191
//
// For the #WCCChallenge << remix >> (join the discord! https://discord.gg/S8c7qcjw2b)
// A take on one of the pieces of the master of truchets (and palettes)

const MAX_TILES = 6;
const _palettes = [
  ["#f5dc23", "#ed225d", "#1c1c1c"],
  ["#fe01ec", "#8a07da", "#102340"],
  ["#0d40bf", "#f4e361", "#f24679"],
  ["#ffffff", "#000000", "#ffe819"],
  ["#021d34", "#228fca", "#dcedf0"],
  ["#3cd86b", "#ebf7cd", "#0d150b"],
];

/** OPC START **/
OPC.slider("seed", Math.floor(Math.random() * 1000), 0, 1000, 1);
OPC.slider("grid_size", 7, 3, 11, 1);
OPC.palette("palette", _palettes);
OPC.toggle("flip_colors", false);
OPC.toggle("line_only", false);
OPC.slider("line_thickness", 0.5, 0, 1, 0.25);
OPC.slider("effect", 2, 1, 2, 1);
/** OPC END**/

let colors;
let tile, tile2;
let possibilities;
let s, sw;
let xCorner, yCorner, realSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  imageMode(CENTER);
  recalculateSizes();
}

function draw() {
  randomSeed(seed);
  recalculatePalette();

  translate(
    xCorner + (realSize - grid_size * s) / 2,
    yCorner + (realSize - grid_size * s) / 2
  );

  background(colors[0]);
  fill(colors[1]);
  strokeWeight(sw);
  stroke(colors[2]);

  drawBorders(s, colors);

  for (let i = 0; i < grid_size; i++) {
    for (let j = 0; j < grid_size; j++) {
      let _c = colors;
      if (floor(j / 2) % 2 !== 0) {
        _c = [colors[1], colors[0], colors[2]];
      }
      if (j % 2 == 0) {
        makeTile(i * s, getY(j, s), s, sw, _c);
      } else {
        makeTile2(i * s, getY(j, s), s, sw, _c);
      }
    }
  }
}

function recalculateSizes() {
  realSize = floor(min(windowWidth, windowHeight) * 0.8);
  xCorner = width / 2 - realSize / 2;
  yCorner = height / 2 - (realSize * 9) / 10 / 2;
  s = realSize / grid_size;
  s = round(s / 5) * 5;
  sw = map(line_thickness, 0, 1, 0, s / 15);
  if (tile) {
    tile.remove();
  }
  if (tile2) {
    tile2.remove();
  }
  tile = createGraphics(s, s);
  tile2 = createGraphics(s, floor((s * 4) / 5) + 1);
}

let getY = (j, s) => {
  if (j % 2 == 0) {
    return ceil(j * ((s * 9) / 10));
  } else {
    return getY(j - 1, s) + s;
  }
};

function makeTile(x, y, s, sw, colors) {
  push();
  translate(x + s / 2, y + s / 2);
  rotate(random([0, PI / 2, PI, (3 * PI) / 2]));

  let _c = colors.map((c) => color(c));
  let phase = getPhase();
  colors = [
    lerpColor(_c[1], _c[0], phase),
    lerpColor(_c[0], _c[1], phase),
    _c[2],
  ];

  let r = floor(random(6));
  tile.stroke(colors[2]);
  tile.strokeWeight(sw);
  let u = s / 5;
  switch (r) {
    case 0:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4 * u);
      tile.circle(s, 0, 4 * u);
      tile.circle(0, s, 4 * u);
      tile.circle(s, s, 4 * u);
      tile.circle(s / 2, s / 2, 2 * u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2 * u);
      tile.circle(s, 0, 2 * u);
      tile.circle(0, s, 2 * u);
      tile.circle(s, s, 2 * u);
      break;
    case 1:
      tile.background(colors[1]);
      tile.fill(colors[0]);
      tile.circle(0, 0, 6 * u);
      tile.circle(s, 0, 2 * u);
      tile.circle(0, s, 2 * u);
      tile.circle(s, s, 6 * u);
      tile.fill(colors[1]);
      tile.circle(s, s, 4 * u);
      tile.circle(0, 0, 4 * u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2 * u);
      tile.circle(s, s, 2 * u);
      break;
    case 2:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 8 * u);
      tile.circle(s, (3 / 2) * u, u);
      tile.circle((3 / 2) * u, s, u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 6 * u);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4 * u);
      tile.circle(s, s, 4 * u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2 * u);
      tile.circle(s, s, 2 * u);
      break;
    case 3:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(s / 2, 0, 3 * u);
      tile.circle(s, s / 2, 3 * u);
      tile.circle(s / 2, s, 3 * u);
      tile.circle(0, s / 2, 3 * u);
      tile.fill(colors[0]);
      tile.circle(s / 2, 0, u);
      tile.circle(s, s / 2, u);
      tile.circle(s / 2, s, u);
      tile.circle(0, s / 2, u);
      break;
    case 4:
      tile.background(colors[1]);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2 * u);
      tile.circle(s / 2, 0, u);
      tile.circle(s, 0, 2 * u);
      tile.circle(0, s, 2 * u);
      tile.circle(s / 2, s, u);
      tile.circle(s, s, 2 * u);
      tile.rect(-sw, 2 * u, s + 2 * sw, u);
      break;
    case 5:
      tile.background(colors[0]);
      tile.fill(colors[1]);
      tile.circle(0, 0, 4 * u);
      tile.circle(0, s, 4 * u);
      tile.circle(s, s, 4 * u);
      tile.circle((7 / 2) * u, 0, u);
      tile.circle(s, (3 / 2) * u, u);
      tile.circle(s / 2, s / 2, 2 * u);
      tile.fill(colors[0]);
      tile.circle(0, 0, 2 * u);
      tile.circle(0, s, 2 * u);
      tile.circle(s, s, 2 * u);
      break;
  }
  image(tile, 0, 0);
  pop();
}

function makeTile2(x, y, s, sw, colors) {
  push();
  translate(x + s / 2, y + (s * 2) / 5);
  let phase = getPhase(true);
  if (random() < 0.5) {
    // This causes a lot of alignment problems, fix later
    // rotate(PI)
    // colors = [colors[1], colors[0], colors[2]]
  }
  if (random() < 0.5) {
    scale(-1, 1);
  }

  if (effect === 1) {
    scale(1, map(phase, 0, 1, -1, 1));
  } else if (effect === 2) {
    rotate(map(phase, 0, 1, PI, 0));
  }

  let r = floor(random(4));
  tile2.stroke(colors[2]);
  tile2.strokeWeight(sw);
  let u = s / 5;
  switch (r) {
    case 0:
      tile2.background(colors[1]);
      tile2.fill(colors[0]);
      tile2.circle(0, 0, 2 * u);
      tile2.circle(s, 0, 2 * u);
      tile2.circle(0, 4 * u, 4 * u);
      tile2.circle(s, 4 * u, 4 * u);
      tile2.rect(2 * u, -u, u, 3 * u, u);
      tile2.fill(colors[1]);
      tile2.circle(0, 4 * u, 2 * u);
      tile2.circle(s, 4 * u, 2 * u);
      break;
    case 1:
      tile2.background(colors[1]);
      tile2.fill(colors[0]);
      tile2.circle(0, 0, 6 * u);
      tile2.circle(s, 0, 2 * u);
      tile2.circle((3 * u) / 2, 4 * u, u);
      tile2.circle(s, 4 * u, 4 * u);
      tile2.fill(colors[1]);
      tile2.circle(0, 0, 4 * u);
      tile2.circle(s, 4 * u, 2 * u);
      tile2.fill(colors[0]);
      tile2.circle(0, 0, 2 * u);
      break;
    case 2:
      tile2.background(colors[1]);
      tile2.fill(colors[0]);
      tile2.circle(0, 0, 2 * u);
      tile2.circle(s, 0, 2 * u);
      tile2.circle(0, (5 * u) / 2, u);
      tile2.circle(s, (5 * u) / 2, u);
      tile2.rect(2 * u, -u, u, 2 * u, u);
      tile2.circle(s / 2, 4 * u, 3 * u);
      tile2.fill(colors[1]);
      tile2.circle(s / 2, 4 * u, u);
      break;
    case 3:
      tile2.background(colors[0]);
      tile2.fill(colors[1]);
      tile2.circle(0, 0, 4 * u);
      tile2.circle(s, 0, 4 * u);
      tile2.circle(0, 4 * u, 2 * u);
      tile2.circle(s, 4 * u, 2 * u);
      tile2.rect(2 * u, 2 * u, u, 4 * u, u);
      tile2.fill(colors[0]);
      tile2.circle(0, 0, 2 * u);
      tile2.circle(s, 0, 2 * u);
      break;
  }
  //image(tile2, 0, 0, s, (s * 4/5) + 2) // Get rid of gap between tiles
  image(tile2, 0, 0);
  pop();
}

function drawBorders(s, colors) {
  let gridHeight = getY(grid_size, s);
  for (let i = 0; i < grid_size; i++) {
    let phase = getPhase();
    let c0_1 = [...colors[1], 255 * phase];
    let c1_2 = [...colors[1], 255 * (1 - phase)];
    let c2_1 = [...colors[2], 255 * phase];
    let c2_2 = [...colors[2], 255 * (1 - phase)];
    let swapColors = (i, n) => {
      let isOdd = floor(i / 2) % 2 === 0;
      if (isOdd === n) {
        fill(c0_1);
        stroke(c2_1);
      } else {
        fill(c1_2);
        stroke(c2_2);
      }
    };

    // Top
    swapColors(0, true);
    circle(i * s + (3 * s) / 10, 0, s / 5);
    circle(i * s + (7 * s) / 10, 0, s / 5);
    swapColors(0, false);
    circle(i * s, 0, (2 * s) / 5);
    circle(i * s + s / 2, 0, s / 5);

    // Bottom
    swapColors(grid_size, false);
    circle(i * s, gridHeight, (2 * s) / 5);
    circle(i * s + s / 2, gridHeight, s / 5);
    swapColors(grid_size, true);
    circle(i * s + (3 * s) / 10, gridHeight, s / 5);
    circle(i * s + (7 * s) / 10, gridHeight, s / 5);

    if (i % 2 === 0) {
      swapColors(i, true);
      circle(0, getY(i, s) + (3 * s) / 10, s / 5);
      circle(grid_size * s, getY(i, s) + (3 * s) / 10, s / 5);
      circle(0, getY(i, s) + (7 * s) / 10, s / 5);
      circle(grid_size * s, getY(i, s) + (7 * s) / 10, s / 5);

      swapColors(i, false);
      circle(0, getY(i, s), (2 * s) / 5);
      circle(grid_size * s, getY(i, s), (2 * s) / 5);
      circle(0, getY(i, s) + s / 2, s / 5);
      circle(grid_size * s, getY(i, s) + s / 2, s / 5);
    } else {
      swapColors(i, true);
      circle(0, getY(i, s) + (3 * s) / 10, s / 5);
      circle(grid_size * s, getY(i, s) + (3 * s) / 10, s / 5);

      swapColors(i, false);
      circle(0, getY(i, s), (2 * s) / 5);
      circle(grid_size * s, getY(i, s), (2 * s) / 5);
      circle(0, getY(i, s) + (5 * s) / 10, s / 5);
      circle(grid_size * s, getY(i, s) + (5 * s) / 10, s / 5);
    }
    // Draw corner circle
    swapColors(grid_size, false);
    circle(grid_size * s, gridHeight, (2 * s) / 5);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalculateSizes();
}

function parameterChanged(name, value) {
  if (name === "palette") {
    recalculatePalette();
  }
  if (name === "grid_size") {
    recalculateSizes();
  }
}

function recalculatePalette() {
  colors = palette.map((c) => {
    let _c = color(c);
    return [red(_c), green(_c), blue(_c)];
  });
  if (flip_colors) {
    colors = [colors[1], colors[0], colors[2]];
  }
  if (line_only) {
    colors = [colors[0], colors[0], colors[2]];
    if (line_thickness == 0) {
      colors = [colors[0], colors[2], colors[2]];
    }
  }
}

function getPhase(useEasing = false) {
  let period = 40;
  let rest = 120;
  let p = period + rest;
  let f = frameCount + 2 * rest; // Start after 2 rest cycles
  let phase = (f % p) / period;
  let n = floor(f / p);
  if (f % p >= period) {
    phase = 1;
  }
  if (n % 2 === 0) {
    phase = 1 - phase;
  }
  return useEasing ? easing(phase) : phase;
}

function easing(x) {
  // return 1 - Math.pow(1 - x, 4)
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

// Fixes possible memory leak
// https://stackoverflow.com/questions/49859246/objects-generated-with-creategraphics-using-p5-js-are-not-being-garbage-collec
p5.Graphics.prototype.remove = function () {
  if (this.elt.parentNode) {
    this.elt.parentNode.removeChild(this.elt);
  }
  var idx = this._pInst._elements.indexOf(this);
  if (idx !== -1) {
    this._pInst._elements.splice(idx, 1);
  }
  for (var elt_ev in this._events) {
    this.elt.removeEventListener(elt_ev, this._events[elt_ev]);
  }
};
