// https://openprocessing.org/sketch/1711256

let w = 900,
  h = 900;
let s = 10;
let f = s * 4;
let arr = [];

let pal = [
  "#ECAA9C",
  "#B1D1C6",
  "#2E5B8B",
  "#F2CA60",
  "#d4c7a3",
  "#DE7830",
  "#513C2C",
  "#1F3858",
  "#C9292E",
  "#bfb8a3",
];

function mousePressed() {
  redraw();
}

function setup() {
  createCanvas(w, h);
  pixelDensity(2);
  noLoop();
  smooth();
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(220);

  push();

  shuffle(pal, true);

  var hh, cc;
  for (let i = 0; i < 10; i++) {
    hh = i * s * 8 + s * 9;
    cc = getColor();

    //     push();
    //     noStroke();
    //     var col = color(cc);
    //     col.setAlpha(40);
    //     fill(col);
    //     for(let i = 0; i < 15; i++) {
    //       circle(random(s*8, w-s*8), random(hh-s*4, hh+s*4), random(10, 30));
    //     }
    //     pop();

    drawLine(hh, cc);
  }

  pop();

  drawGrids();
  drawFrame();
}

function drawLine(hh, cc) {
  push();

  var margin1 = int(random(3, 6));
  var margin2 = int(random(6, 12));

  var limit = 82 - margin2; // yoko : 82 masu

  while (limit > 0) {
    var nt = int(random(1, 5));
    if (limit < nt) {
      nt = limit;
    }
    arr.push(nt);
    limit -= nt;
  }
  shuffle(arr, true);

  translate(f, hh);

  strokeWeight(2);
  stroke(5);
  line(0, 0, margin1 * s, 0);
  translate(margin1 * s, 0);

  var ss = 0;
  var flag = int(random(0.5, 1.5));

  while (arr.length > 0) {
    var n = arr.pop();
    var r = (n * s) / 2;

    noStroke();
    noFill();

    translate(r, 0);

    var j = int(random(1, 5));
    var k = (j * s) / 2;

    if (flag == 0) {
      flag = 1;

      strokeWeight(2);
      stroke(5);
      line(-r, 0, -r, k);
      line(r, 0, r, k);
      arc(0, k, r * 2, r * 2, 0, PI);

      noStroke();
      fill(cc);
      arc(0, k, r * 2 - s, r * 2 - s, 0, PI);

      rect(0, k / 2, r * 2 - s, k);
    } else {
      flag = 0;

      strokeWeight(2);
      stroke(5);
      line(-r, 0, -r, -k);
      line(r, 0, r, -k);
      arc(0, -k, r * 2, r * 2, -PI, 0);

      noStroke();
      fill(cc);
      arc(0, -k, r * 2 - s, r * 2 - s, -PI, 0);
      rect(0, -k / 2, r * 2 - s, k);
    }

    translate(r, 0);
  }

  strokeWeight(2);
  stroke(5);
  line(0, 0, margin2 * s, 0);

  pop();
}

// ------------------------------------- //
// ------------------------------------- //
// ------------------------------------- //

function drawGrids() {
  stroke(0, 0, 10, 100);
  strokeWeight(1.5);
  noFill();
  var tx = int(w / s);
  var ty = int(h / s);
  for (let i = 0; i < ty; i++) {
    cy = i * s;
    for (let j = 0; j < tx; j++) {
      cx = j * s;
      point(cx, cy);
    }
  }
}

function drawFrame() {
  rectMode(CENTER);
  noStroke();
  fill(220);

  rect(s * 2 - 1, h / 2, f, h);
  rect(w - s * 2 + 1, h / 2, f, h);

  rect(w / 2, s * 2 - 1, w, f);
  rect(w / 2, h - s * 2 + 1, w, f);
}

function getColor() {
  var l = pal.length;
  var cc = random();

  if (cc < 1 / l) {
    return pal[0];
  } else if (cc < 2 / l) {
    return pal[1];
  } else if (cc < 3 / l) {
    return pal[2];
  } else if (cc < 4 / l) {
    return pal[3];
  } else if (cc < 5 / l) {
    return pal[4];
  } else if (cc < 6 / l) {
    return pal[5];
  } else if (cc < 7 / l) {
    return pal[6];
  } else if (cc < 8 / l) {
    return pal[7];
  } else if (cc < 9 / l) {
    return pal[8];
  } else {
    return pal[9];
  }
}
