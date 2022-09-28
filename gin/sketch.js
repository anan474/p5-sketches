// https://openprocessing.org/sketch/1575228

//ref: https://twitter.com/Code4_11/status/1525903677651062784
function setup() {
  createCanvas(720, 720);
  background(255);
  stroke(0);
  strokeWeight(1);
  textAlign(CENTER, CENTER);

  let d = 720 * 0.2;

  //random()
  push();
  translate(width * 0.25, height * 0.25);
  for (let i = 0; i < 10000; i++) {
    let theta = random(TAU);
    let r = d * (1 - random());
    let x = r * cos(theta);
    let y = r * sin(theta);
    point(x, y);
  }
  text("1-random()", 0, height * 0.225);
  pop();

  //random(random())
  push();
  translate(width * 0.75, height * 0.25);
  for (let i = 0; i < 10000; i++) {
    let theta = random(TAU);
    let r = d * (1 - random(random()));
    let x = r * cos(theta);
    let y = r * sin(theta);
    point(x, y);
  }
  text("1-random(random())", 0, height * 0.225);
  pop();

  //random(random(random()))
  push();
  translate(width * 0.25, height * 0.75);
  for (let i = 0; i < 10000; i++) {
    let theta = random(TAU);
    let r = d * (1 - random(random(random())));
    let x = r * cos(theta);
    let y = r * sin(theta);
    point(x, y);
  }
  text("1-random(random(random()))", 0, height * 0.225);
  pop();

  //random(random(random(random())))
  push();
  translate(width * 0.75, height * 0.75);
  for (let i = 0; i < 10000; i++) {
    let theta = random(TAU);
    let r = d * (1 - random(random(random(random()))));
    let x = r * cos(theta);
    let y = r * sin(theta);
    point(x, y);
  }
  text("1-random(random(random(random())))", 0, height * 0.225);
  pop();
}
