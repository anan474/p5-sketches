// https://openprocessing.org/sketch/1241405

let w = 400;
let h = 400;
let palettes = ["#145DA0", "#0C2D48", "#2E8BC0", "#B1D4E0"];

function setup() {
  createCanvas(w, h);
  noLoop();
}

function draw() {
  background("#FBE7C6");
  stroke(255);

  for (let y = 0; y < 9; y += 1) {
    for (let x = 0; x < 9; x += 1) {
      strokeWeight(4);
      resetMatrix();
      translate(x * 50 + 25, y * 50 + 25);
      for (let z = 0; z < 4; z += 1) {
        strokeWeight(4 - z);
        fill(random(palettes));
        ellipse(0, 0, 100 - z * 20, 100 - z * 20);
      }
    }
  }
}

function mousePressed() {
  redraw();
}
