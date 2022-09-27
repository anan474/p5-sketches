// https://openprocessing.org/sketch/1584146

ssquare = true;
padding = 7.5;
var palette;
//OPC.slider('n',4,2,50,1);
//OPC.slider('m',4,2,50,1);
n = 25;
m = 25;

const Colors = [
  "f6bd60-f7ede2-f5cac3-84a59d-f28482",
  "ecdcc3-e2b1aa-809ba6-db8762-bac8ae",
];

function setup() {
  if (ssquare) {
    L = min(windowWidth, windowHeight);
    createCanvas(L, L);
  } else {
    createCanvas(windowWidth, windowHeight);
  }
  rectMode(CENTER);
  background(255);
  fill(0);
  noLoop();
  npal = int(random(Colors.length)); //!important
  palette = createCols(Colors[npal]);
  createTexture();
  background(100);
}

function draw() {
  push();
  fill("#eeeeee");
  noStroke();
  rect(width / 2, height / 2, width, height);
  pop();
  let padW = width * (padding / 100); //PaddingX
  let padH = height * (padding / 100); //PaddingY
  let w = (width - padW * 2) / n;
  let h = (height - padH * 2) / m;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let x = padW + i * w + w / 2;
      let y = padH + j * h + h / 2;
      let c = shuffle(palette)[0];
      getfig(x, y, w, h, c);
    }
  }
  image(txtre, 0, 0);
}

function getfig(x, y, w, h, c) {
  let sel = 1;
  push();
  translate(x, y);
  if (sel == 0) {
    push();
    fill(c);
    rect(0, 0, w, h);
    pop();
  }
  if (sel == 1) {
    push();
    rotate(radians(shuffle([0, 45, 90, 135, 180, 225, 270, 315, 360])[0]));
    line(-w / 2, -h / 2, w / 2, h / 2);
    pop();
  }
  pop();
}

function windowResized() {
  L = min(windowWidth, windowHeight);
  resizeCanvas(L, L);
}

function keyPressed() {
  if (key === "s") save(int(random(432567)) + ".png");
}

function createCols(p) {
  let colArr = p.split("-");
  for (let i = 0; i < colArr.length; i++) colArr[i] = "#" + colArr[i];
  return colArr;
}

function createTexture() {
  txtre = createGraphics(width, height);
  txtre.noStroke();
  let ns = (width * height) / 2;
  for (let i = 0; i < ns; i++) {
    //txtre.fill(255,255,255,200)
    let x = random(txtre.width);
    let y = random(txtre.height);
    txtre.circle(x, y, random(0.25, 0.5));
  }
}
