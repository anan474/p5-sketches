// https://openprocessing.org/sketch/1347776

let gs = [];
let d, blur_num;
function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  for (let i = 0; i < 3; i++) {
    graphics = createGraphics(width, height);
    graphics.angleMode(DEGREES);
    gs.push(graphics);
  }

  let cells = int(random(2, 10));
  let offset = width / 10;
  let margin = offset / 10;
  d = (width - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (d + margin) + d / 2;
      let y = offset + j * (d + margin) + d / 2;
      let n = 0;
      let rangle = (int(random(4)) * 360) / 4 + 45;

      let arr = [true, random() > 0.5, random() > 0.5, random() > 0.5];

      for (let g of gs) {
        switch (n++) {
          case 0:
            g.fill(255, 0, 0);
            g.drawingContext.shadowColor = color(255, 0, 0);
            g.drawingContext.shadowBlur = d / blur_num;

            break;
          case 1:
            g.drawingContext.shadowColor = color(0, 255, 0);
            g.drawingContext.shadowBlur = d / blur_num;
            g.fill(0, 255, 0);
            break;
          case 2:
            g.drawingContext.shadowColor = color(0, 0, 255);
            g.drawingContext.shadowBlur = d / blur_num;

            g.fill(0, 0, 255);
            break;
        }
        g.push();
        g.translate(x, y);
        g.scale(0.9);
        g.rotate(rangle);
        g.noStroke();
        g.circle(0, 0, d);
        g.erase(255, 255);
        g.circle(0, 0, d / 2);
        g.rectMode(CENTER);
        for (let i = 0; i < 4; i++) {
          g.push();
          g.rotate((i * 360) / 4);
          if (arr[i]) {
            g.rect(d / 4, 0, d / 2 + 2, d / 4);
          }
          g.pop();
        }
        g.noErase();
        // g.beginShape();
        // for (let angle = 30; angle < 330; angle++) {
        //   let nx = cos(angle) * d / 4;
        //   let ny = sin(angle) * d / 4;
        //   g.vertex(nx, ny);
        // }
        // for (let angle = 330; angle >30; angle--) {
        //   let nx = cos(angle) * d / 4/2;
        //   let ny = sin(angle) * d / 4/2;
        //   g.vertex(nx, ny);
        // }
        // g.endShape(CLOSE);
        g.pop();
      }
    }
  }
}

function draw() {
  background(0);
  blendMode(ADD);

  let n = 0;
  blur_num = 5;

  for (let g of gs) {
    switch (n++) {
      case 0:
        drawingContext.shadowColor = color(255, 0, 0);
        drawingContext.shadowBlur = d / blur_num;
        break;
      case 1:
        drawingContext.shadowColor = color(0, 255, 0);
        drawingContext.shadowBlur = d / blur_num;
        break;
      case 2:
        drawingContext.shadowColor = color(0, 0, 255);
        drawingContext.shadowBlur = d / blur_num;
        break;
    }
    image(g, 0, 0);
    translate(5 / 2, 5 / 2);
  }
  blendMode(BLEND);
}
