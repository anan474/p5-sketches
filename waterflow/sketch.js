// https://openprocessing.org/sketch/1248127

const referencePoints = [];
const particles = [];
const num = 3e3;

setup = () => {
  createCanvas(640, 640);
  for (let i = num; i--; ) {
    particles[i] = {
      x: 0,
      y: random(-280, 280),
    };
  }
};

draw = () => {
  stroke("black");
  background("white");
  translate(width / 2, height / 2);
  for (let i = 3; i--; ) {
    referencePoints[i] =
      i == 0
        ? {
            x: 0,
            y: 360,
            ratio: 1,
          }
        : {
            x: 0,
            y: 50,
            ratio: 0.4,
          };
  }

  for (const p of particles) {
    let angle = 0;
    for (const ref of referencePoints) {
      if (ref.ratio > random(1)) {
        angle += atan2(ref.y - p.y, ref.x - p.x);
      }
    }
    line(p.x, p.y, (p.x += cos(angle) * 4), (p.y += sin(angle) * 4));
    if (p.y > 280) {
      p.x = 0;
      p.y = -280;
    }
  }
};
