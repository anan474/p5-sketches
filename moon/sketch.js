/**
 * Motus: Grid: Pins
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const itemCount = 9;
const gridSpacing = canvasSize / (itemCount + 1);
const itemSize = gridSpacing * 0.7;

let timer = 0;
const speed = 0.005;

var fps = 60;
var capturer = new CCapture({ format: "png", framerate: fps });

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
  frameRate(fps);
}

// Draw tick

var startMillis; // needed to subtract initial millis before first draw to begin at t=0.

function draw() {
  if (frameCount === 1) {
    // start the recording on the first frame
    // this avoids the code freeze which occurs if capturer.start is called
    // in the setup, since v0.9 of p5.js
    capturer.start();
  }

  if (startMillis == null) {
    startMillis = millis();
  }

  // duration in milliseconds
  var duration = 3000;

  // compute how far we are through the animation as a value between 0 and 1.
  var elapsed = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);

  // if we have passed t=1 then end the animation.
  if (t > 1) {
    noLoop();
    console.log("finished recording.");
    capturer.stop();
    capturer.save();
    return;
  }

  background(239);
  noStroke();

  for (let x = 0; x < itemCount; x++) {
    for (let y = 0; y < itemCount; y++) {
      // Base ellipse
      const posX = x * gridSpacing + gridSpacing;
      const posY = y * gridSpacing + gridSpacing;
      fill(39);
      ellipse(posX, posY, itemSize);

      // Plasma effect
      const s1 = sin(x + timer * 5);
      const s2 = sin(y + timer * 10);
      const s3 = sin(x + y + timer);
      const s = (s1 + s2 + s3) / 3;
      const c = constrain(map(s, -1, 1, 0, 0.33) - 0.05, 0, 0.25);
      const offset = itemSize * c;

      fill(239);
      ellipse(posX - offset, posY - offset, itemSize + 2);
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }

  // handle saving the frame
  console.log("capturing frame");
  capturer.capture(document.getElementById("defaultCanvas0"));
}
