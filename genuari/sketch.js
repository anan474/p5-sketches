// https://openprocessing.org/sketch/1461745

let r = 12;
let K = 20;
let grid = [];
let w = r / Math.sqrt(2);
let active = [];
let lines = [];

let pal = ["#0c2046", "#f67e7d", "#fffaf2"];
function setup() {
  shuffle(pal, true);

  createCanvas(600, 600);
  stroke(pal[1]);
  strokeWeight(3.5);

  for (let x = 0; x < floor(width / w); x++) {
    let col = [];
    for (let y = 0; y < floor(height / w); y++) {
      col.push(-1);
    }
    grid.push(col);
  }

  let x = 0;
  let y = 0;
  while (true) {
    x = random(width);
    y = random(height);
    if (!in_circle(x, y)) break;
  }
  insert_grid(x, y);
}

const in_circle = (x, y) => {
  return dist(x, y, width / 2, height / 2) < 160;
};

const to_grid = (i) => floor(i / w);

function insert_grid(x, y) {
  let v = createVector(x, y);
  grid[to_grid(x)][to_grid(y)] = v;
  active.push(v);
}

function draw() {
  if (active.length > 0) {
    let ind = floor(random(active.length));
    let found = false;
    for (let n = 0; n < K; n++) {
      let sample = p5.Vector.random2D();
      sample.mult(random(r, 2 * r));
      sample.add(active[ind]);

      let sample_grid = createVector(to_grid(sample.x), to_grid(sample.y));

      let can_sample = true;
      if (in_circle(sample.x, sample.y)) continue;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          let col = sample_grid.x + x;
          let row = sample_grid.y + y;
          if (col < 0 || col >= grid.length || row < 0 || row >= grid.length) {
            can_sample = false;
            continue;
          }
          let neighbor = grid[col][row];
          if (neighbor == -1) continue;
          if (neighbor.dist(sample) < r) can_sample = false;
        }
      }
      if (can_sample) {
        lines.push([active[ind].copy(), sample]);
        insert_grid(sample.x, sample.y);
        found = true;
        break;
      }
    }
    if (!found) active.splice(ind, 1);
  }

  background(pal[0]);
  for (let l of lines) {
    line(l[0].x, l[0].y, l[1].x, l[1].y);
  }
}
