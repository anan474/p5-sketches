var rad = 140;
var xPos = 60 + rad / 2;
//var yPos=-35;
var yPos = -35;
var numLeafs = 11;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(40);
  fill(0, 159, 90);
  for (var i = 0; i < numLeafs; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(radians((i * 360) / numLeafs));
    arc(xPos, yPos, rad, rad, radians(30), radians(180 - 30), CHORD);
    arc(xPos, yPos + rad / 2, rad, rad, radians(180 + 30), radians(-30), CHORD);
    pop();
  }
  fill(350, 230, 20);
  ellipseMode(CENTER); // Set ellipseMode to CORNERS
  noStroke();
  ellipse(width / 2, height / 2, 160);
}
