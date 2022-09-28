// https://openprocessing.org/sketch/1641293

let h = 1080;
let d = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
let g;
let padding = 100;

function setup() {
  createCanvas(h, h);
  background(250);
  g = new grid_p();
}

function draw() {
  background(250);
  for (let i = 0; i < 5; i += 1) {
    g.add_point_to_front();
  }
  g.draw();
}

function test1() {
  let g = new grid_p();
  for (let i = 0; i < 100; i += 1) {
    g.add_point_to_front();
  }
  g.draw();
}

class node {
  constructor(a, b, pa, pb, w, r) {
    this.a = a;
    this.b = b;

    this.pa = pa;
    this.pb = pb;

    this.w = w;
    this.r = r;
  }
}

class grid_p {
  constructor() {
    this.seed = new node(h / 2, h / 2, h / 2, h / 2, 20, 70);
    this.r_point = 5;
    this.dist_step = this.r_point * 2 + 20;
    this.try_n = 50;
    this.points = [this.seed];
    this.front = [this.seed];
  }

  draw() {
    fill(0);
    stroke(0);

    for (let i = 0; i < this.points.length; i += 1) {
      strokeWeight(0);
      circle(this.points[i].a, this.points[i].b, this.points[i].w);
      strokeWeight(this.points[i].w);
      line(
        this.points[i].a,
        this.points[i].b,
        this.points[i].pa,
        this.points[i].pb
      );
    }
  }

  add_point_to_front() {
    if (this.front.length == 0) {
      return;
    }

    let t = floor(random(this.front.length));

    let a = this.front[t].a;
    let b = this.front[t].b;

    if (a < padding || a > h - padding || b < padding || b > h - padding) {
      this.front.splice(t, 1);
      return;
    }

    let discard = true;

    for (let i = 0; i < this.try_n; i += 1) {
      let ang = random(0, TWO_PI);

      let t_a = a + cos(ang) * this.front[t].r;
      let t_b = b + sin(ang) * this.front[t].r;

      let s = true;

      for (let j = 0; j < this.points.length; j += 1) {
        if (d(t_a, t_b, this.points[j].a, this.points[j].b) < this.front[t].r) {
          s = false;
          break;
        }
      }

      if (s) {
        let mint_d = 20;
        let new_r = this.front[t].r * 0.9;
        new_r = new_r > mint_d ? new_r : mint_d;

        let new_one = new node(t_a, t_b, a, b, this.front[t].w * 0.8, new_r);
        this.points.push(new_one);
        this.front.push(new_one);
        discard = false;
        break;
      }
    }

    if (discard) {
      this.front.splice(t, 1);
    }
  }
}
