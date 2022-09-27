// https://openprocessing.org/sketch/1581091

// for WCCChallenge - theme: '#000000, #FFFFFF, #FF0000 '.
//the color scheme reminded me of old wood engravings, so I went for a generative version of that.
//The clouds gave me a hell of a time, and I still am not 100% sold on them, but I think the final product is charming enough
//to overcome the imperfections.

let pts = [];
let sun;

function setup() {
  createCanvas(600, 600);
  sun = createVector(450, 350);
  frameRate(4);
}
function draw() {
  pts = [];

  noStroke();
  fill("white");
  background("white");

  sun.y++;

  background("black");

  fill("white");

  //expression lines
  for (let y = height - 10; y >= height * 0.75; y -= 10) {
    let x = 10;
    pt = createVector(x, y);
    pts.push(pt);
  }
  for (let y = height * 0.75; y >= 30; y -= 30) {
    pt1 = createVector(10, y + 8);
    pts.push(pt1);
    pts.push(pt1);
    pt2 = createVector(20, y + 5);
    pts.push(pt2);
    ptr = createVector(10, y);
    let toSun = random(0.1, 0.6);
    let pt3 = p5.Vector.lerp(ptr, sun, toSun);
    pts.push(pt3);
    let pt4 = createVector(20, y - 5);
    pts.push(pt4);
    let pt5 = createVector(15, y - 15);
    pts.push(pt5);
    pts.push(pt5);
  }
  pts.push(createVector(20, 20));
  pts.push(createVector(20, 20));
  for (let x = 30; x <= width - 10; x += 30) {
    pt1 = createVector(x - 8, 15);
    pts.push(pt1);
    pts.push(pt1);
    pt2 = createVector(x - 5, 20);
    pts.push(pt2);
    ptr = createVector(x, 10);
    let toSun = random(0.1, 0.5);
    pt3 = p5.Vector.lerp(ptr, sun, toSun);
    pts.push(pt3);
    pt4 = createVector(x + 5, 20);
    pts.push(pt4);
    pt5 = createVector(x + 15, 15);
    pts.push(pt5);
    pts.push(pt5);
  }

  for (let y = 50; y <= height / 2 - 50; y += 50) {
    pt1 = createVector(width - 10, y - 20);
    pts.push(pt1);
    pt2 = createVector(width - 10, y - 10);
    pts.push(pt2);
    ptr = createVector(width - 10, y);
    let toSun = random(0.1, 0.5);
    pt3 = p5.Vector.lerp(ptr, sun, toSun);
    pts.push(pt3);
    pt4 = createVector(width - 10, y + 25);
    pts.push(pt4);
    pt5 = createVector(width - 10, y + 30);
    pts.push(pt5);
    pts.push(pt5);
  }
  for (let y = width / 2; y < height - 10; y += 10) {
    let x = width - 10;
    pt = createVector(x, y);
    pts.push(pt);
  }
  bottomRight = createVector(width - 10, height - 10);
  pts.push(bottomRight);
  pts.push(bottomRight);

  beginShape();
  for (let pt of pts) {
    curveVertex(pt.x, pt.y);
  }
  endShape(CLOSE);

  //sun
  noStroke();
  fill("red");
  ellipse(sun.x, sun.y, 100);
  for (let i = 0; i < 100; i++) {
    fill(255, 10);
    rect(random(400, 500), random(400, 500), random(10, 40), random(10, 40));
  }

  //clouds (function below)
  stroke(0);
  for (let i = 0; i < 6; i++) {
    cloud(random(width), random(100, 300), random(75, 200), random(35, 50));
  }

  //birds
  fill("red");
  stroke("red");
  for (let i = 0; i < 9; i++) {
    let birdSize = random(3, 15);
    push();
    translate(randomGaussian(350, 40), random(320, 400));
    rotate(random(-PI / 8, 0));
    arc(-birdSize / 2, 0, birdSize, birdSize / 2, -PI, TWO_PI);
    arc(birdSize / 2, 0, birdSize, birdSize / 2, -PI, TWO_PI);
    pop();
  }

  //sea
  stroke("red");
  strokeWeight(2.5);
  fill("white");
  for (let y = 500; y < 630; y += 5) {
    beginShape();
    vertex(10, width - 10);
    noiseDetail(random(1, 7), 0.7);
    for (let x = 10; x < width - 10; x++) {
      vertex(x, y - noise(x / 600, y / 200) * 40);
    }
    vertex(width - 10, height - 10);
    endShape();
  }
}

function cloud(x, y, w, h) {
  push();
  strokeWeight(4);
  stroke("black");
  translate(x, y);
  //noStroke()
  fill("white");
  //noFill()
  beginShape();
  let count = 0;
  //below gives 16 points-- 8 wavy lines?
  for (let i = PI * 0.75; i < PI + QUARTER_PI; i += 0.1) {
    count += 1;
    let x = cos(i) * w;
    let y = sin(i) * h;
    vertex(x, y);
    let div = w / 12;
    let seg = w / 2 - div * count;

    let power = 0;
    noiseDetail(2, 0.4);
    if (count % 2 == 0) {
      for (let i = x; i < seg; i += 0.5) {
        power += 0.01;
        vertex(i, y + noise(i / 10, y) * power);
      }
      for (let i = seg; i > x; i -= 0.5) {
        power -= 0.01;
        vertex(i, y + noise(i / 10, y) * power);
      }
    }
  }
  noiseDetail(4, 0.7);
  let power = 1;
  let xer = -w / 2;
  let yer = -h / 2;
  while (xer < w) {
    let wsizer = w / 4;

    for (let i = PI + QUARTER_PI; i < TWO_PI - QUARTER_PI; i += 0.1) {
      let xing = xer + cos(i) * (wsizer * 0.65) - noise(i) * 5;
      let ying = yer + sin(i) * (wsizer * 0.65) + noise(x / 50, i) * 5;
      vertex(xing, ying);
      //
      power += 0.25;
    }
    xer += wsizer;
    yer += h / 3.5;
  }

  endShape(CLOSE);
  pop();
}
