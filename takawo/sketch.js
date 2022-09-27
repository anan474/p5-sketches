// https://openprocessing.org/sketch/1630344
let palette;
let c,
  pc = -1;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  palette = shuffle(createPalette(random(url)), true);

  background(palette[0]);
  blendMode(MULTIPLY);
  background(0, 0, 0, 33);
  palette.splice(0, 1);
  blendMode(BLEND);

  stroke(0, 0, 20);

  let rows = 5;
  int(random(5, 5));
  let offset = width / 5;
  let h = (height - offset * 2) / rows;
  let w = width - offset * 2;

  for (let i = 0; i <= rows; i += 1) {
    let ox = i % 2 == 0 ? offset : width - offset;
    let oy = offset + h * i;

    push();
    translate(ox, oy);
    let a = 180 / 12 + 7;
    rotate(i % 2 == 0 ? -a / 2 : -a / 2 + 180);
    let x = 10;
    let y = x * tan(a / 2);
    let d = sqrt(sq(x) + sq(y));
    let s = (d + y) / (d - y);
    while (x <= w) {
      push();
      translate(x, y);
      let nd = 2 * y;
      let colors = shuffle(palette.concat());
      fill(colors[0]);
      drawingContext.shadowColor = color(0, 0, 0, 33);
      drawingContext.shadowBlur = nd / 10;

      colors.splice(0, 1);
      circle(0, 0, nd);
      drawingContext.clip();
      drawingContext.shadowBlur = 0;
      drawFlower(0, 0, nd / 2 / 1.5, ((nd / 2) * 1) / 5, colors);
      pop();
      x = x * s;
      y = y * s;
    }
    pop();
  }

  noLoop();
}

function createPalette(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = color("#" + arr[i]);
  }
  return arr;
}

let url = [
  "202c39-283845-b8b08d-f2d492-f29559",
  "1f2041-4b3f72-ffc857-119da4-19647e",
  "2f4858-33658a-86bbd8-f6ae2d-f26419",
  "ffac81-ff928b-fec3a6-efe9ae-cdeac0",
  "f79256-fbd1a2-7dcfb6-00b2ca-1d4e89",
  "e27396-ea9ab2-efcfe3-eaf2d7-b3dee2",
  "966b9d-c98686-f2b880-fff4ec-e7cfbc",
  "50514f-f25f5c-ffe066-247ba0-70c1b3",
  "177e89-084c61-db3a34-ffc857-323031",
  "390099-9e0059-ff0054-ff5400-ffbd00",
  "0d3b66-faf0ca-f4d35e-ee964b-f95738",
  "177e89-084c61-db3a34-ffc857-323031",
  "780000-c1121f-fdf0d5-003049-669bbc",
  "eae4e9-fff1e6-fde2e4-fad2e1-e2ece9-bee1e6-f0efeb-dfe7fd-cddafd",
  "f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590",
  "555b6e-89b0ae-bee3db-faf9f9-ffd6ba",
  "9b5de5-f15bb5-fee440-00bbf9-00f5d4",
  "ef476f-ffd166-06d6a0-118ab2-073b4c",
  "006466-065a60-0b525b-144552-1b3a4b-212f45-272640-312244-3e1f47-4d194d",
  "f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1",
  "f6bd60-f7ede2-f5cac3-84a59d-f28482",
  "0081a7-00afb9-fdfcdc-fed9b7-f07167",
  "f4f1de-e07a5f-3d405b-81b29a-f2cc8f",
  "50514f-f25f5c-ffe066-247ba0-70c1b3",
  "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226",
  "ef476f-ffd166-06d6a0-118ab2-073b4c",
  "fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a",
  "e63946-f1faee-a8dadc-457b9d-1d3557",
  "264653-2a9d8f-e9c46a-f4a261-e76f51",
];

function drawFlower(x, y, rMax, rStep, colors) {
  push();
  translate(x, y);
  let n = 0;
  for (let r = rMax; r > rMax / 5; r -= rStep) {
    let step = int(random(5, 30));
    push();
    rotate(map(r, rMax, 0, 0, 360));
    let angleStep = 360 / step;
    for (let angle = 0; angle < 360; angle += angleStep) {
      let x1 = cos(angle) * r;
      let y1 = sin(angle) * r;
      let x2 = cos(angle + angleStep) * r;
      let y2 = sin(angle + angleStep) * r;
      let x = (x1 + x2) / 2;
      let y = (y1 + y2) / 2;
      let d = dist(x1, y1, x2, y2);
      fill(colors[n++ % 2]);
      beginShape();
      vertex(0, 0);
      for (
        let angle = atan2(y, x) - 90;
        angle <= atan2(y, x) - 90 + 180;
        angle += 1
      ) {
        vertex(x + (cos(angle) * d) / 2, y + (sin(angle) * d) / 2);
      }
      endShape();
    }
    pop();
  }
  circle(0, 0, rMax / 5);
  pop();
}
