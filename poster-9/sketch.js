// https://gist.github.com/limzykenneth/6731a9b740c93df20e45ac35e3e3a765

// Stop after how many frames
var iterations = 4000;
// The higher the damping the less the pendulum will shift its position
// ie. damping of 1000 or more will just draw concentric spirals
var damping = 400;

function setup() {
  // Create canvas
  var canvas = createCanvas(500, 500);
  // Give canvas an id in order to style it with CSS later
  canvas.id("vertigo");
  // Approximate background colour of the original poster
  background("#d44424");
}

function draw() {
  // Redraw the background each frame, replacing what's already drawn
  background("#d44424");
  // White strokes in line with the original poster
  stroke("#ffffff");
  // Draw lines only, don't fill in shapes
  noFill();
  // Begin drawing the shape
  beginShape();

  // To get the effect of the pattern drawing, every frame only `frameCount` number of frames
  // are drawn on the canvas
  for (var i = 0; i < frameCount; i++) {
    // Algorithm for harmonograph (https://en.wikipedia.org/wiki/Harmonograph)
    // Taken from https://www.johndcook.com/blog/2017/02/14/recreating-the-vertigo-poster/

    // x1 and y1 are two pendulums with amplitude (1.0 and 1.4) slightly offset from one another
    // Changing the divisor of the argument of sin and cos will change the frequency at which the
    // drawing occurs. Lower number = higher frequency
    var x1 = 1.0 * cos(i / 8) * exp(-i / 2500);
    var y1 = 1.4 * sin(i / 8) * exp(-i / 2500);

    var d = damping;

    var vx = sin(i / d) * x1 - cos(i / d) * y1;
    var vy = cos(i / d) * x1 + sin(i / d) * y1;

    // Mapping the value of the algorithms output to canvas coordinates
    var px = map(vx, -1.5, 1.5, 0, 500);
    var py = map(vy, -1.3, 1.3, 0, 500);
    // Define the vertex
    vertex(px, py);
  }

  // End shape and draw it on screen
  endShape();

  // Stop main loop after all iterations are done
  if (frameCount >= iterations) {
    noLoop();
  }
}
