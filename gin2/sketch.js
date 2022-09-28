//https://openprocessing.org/sketch/1534141

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  colorMode(HSB);

  background(100);

  blendMode(DIFFERENCE);

  stroke(100);

  for (let i = 0; i <= width; i += width / 8) {
    for (let j = 0; j <= height; j += height / 8) {
      strokeWeight(int(random(8, 32)));
      strokeCap(random([ROUND, SQUARE, PROJECT]));
      line_polygon(i, j, int(random(20, 40)), int(random(3, 16)));
    }
  }
}

function line_polygon(x, y, size, point_num) {
  let cx = [];
  let cy = [];
  for (let i = 0; i < point_num; i++) {
    let theta = (TAU / point_num) * i;
    cx.push(0.5 * size * cos(theta));
    cy.push(0.5 * size * sin(theta));
  }

  push();
  translate(x, y);
  for (let i = 0; i < point_num; i++) {
    line(cx[i], cy[i], cx[(i + 1) % point_num], cy[(i + 1) % point_num]);
  }
  pop();
}

//save PNG
function keyPressed() {
  save("img_" + month() + day() + hour() + minute() + second() + ".png");
}
