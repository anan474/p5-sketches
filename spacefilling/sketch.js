// https://openprocessing.org/sketch/1967150

// By Roni Kaufman
// https://ronikaufman.github.io

let paths = [],
  points = [],
  pointIdx = 0,
  pointsPerFrame = 1;
const MAX_DEPTH = 3,
  N = 5;

function setup() {
  createCanvas(600, 600);
  //noLoop();
  strokeCap(PROJECT);

  findPaths([0, 0], [[0, 0]]);

  let margin = 50;
  strokeWeight(((1 / 2) * (width - 2 * margin)) / pow(N, MAX_DEPTH));
  rsfc(margin, margin, width - 2 * margin, true, true, 0);

  background(5);
}

function draw() {
  for (let k = 0; k < pointsPerFrame; k++) {
    let p1 = points[pointIdx],
      p2 = points[pointIdx + 1];
    stroke(rainbow(pointIdx / points.length));
    line(p1.x, p1.y, p2.x, p2.y);

    pointIdx++;
    if (pointIdx == points.length - 1) {
      noLoop();
      break;
    }
  }

  pointsPerFrame += 0.01;
}

function possibleNeighbors([i, j]) {
  let possibilities = [];
  if (i % 2 == 0 && j < N - 1) possibilities.push([i, j + 1]);
  if (i % 2 == 1 && j > 0) possibilities.push([i, j - 1]);
  if (j % 2 == 0 && i < N - 1) possibilities.push([i + 1, j]);
  if (j % 2 == 1 && i > 0) possibilities.push([i - 1, j]);
  return possibilities;
}

function inArray([i, j], arr) {
  for (let e of arr) {
    if (e[0] == i && e[1] == j) return true;
  }
  return false;
}

// find all paths in a N*N grid, going from top-left to bottom-right and through all points
function findPaths(p, visited) {
  let neighbors = possibleNeighbors(p);
  if (neighbors.length == 0) {
    if (visited.length == sq(N)) paths.push(visited);
    return;
  }
  for (let neigh of neighbors) {
    if (!inArray(neigh, visited)) findPaths(neigh, [...visited, neigh]);
  }
}

// random space-filling curve
function rsfc(x0, y0, s, topToBottom, leftToRight, depth) {
  if (depth == MAX_DEPTH) {
    points.push({ x: x0 + s / 2, y: y0 + s / 2 });
    return;
  }

  let newS = s / N;
  let idx1 = topToBottom ? 0 : 1;
  let idx2 = leftToRight ? 0 : 1;
  let path = random(paths);

  for (let [i, j] of path) {
    let x = leftToRight ? i * newS : (N - i - 1) * newS;
    let y = topToBottom ? j * newS : (N - j - 1) * newS;
    rsfc(x0 + x, y0 + y, newS, i % 2 == idx1, j % 2 == idx2, depth + 1);
  }
}

function rainbow(t) {
  let palette = ["#ef562f", "#f9d531", "#a7cc51", "#4bafdd", "#bd4ee5"];
  let i = floor(palette.length * t);
  let amt = fract(palette.length * t);
  return lerpColor(
    color(palette[i % palette.length]),
    color(palette[(i + 1) % palette.length]),
    amt
  );
}
