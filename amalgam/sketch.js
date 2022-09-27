// https://openprocessing.org/sketch/1660868

let h = 800;
let padding = 70;
let last_id = 1;
let g;

let count = 0;

let col = [
  "#3DB2FF",
  "#FFB830",
  "#FF2442",
  "#FF7600",
  "#185ADB",
  "#0A1931",
  "#99154E",
];
let edge_length = (h * 14) / 1080;

let get_r = (n) => edge_length / (2 * sin(PI / n));
let get_apothem = (n) => edge_length / (2 * tan(PI / n));

function setup() {
  createCanvas(h, h);
  background("#FFEDDA");
  rectMode(CENTER);
  frameRate(30);
  g = new grid(h / 2, h / 2);
}

function test(param) {
  let s = [];

  //translate(h/2, h/2)

  let t = new tile(0, 12, 0, 0, 0, (2 * PI) / (12 * 2));
  t.draw();

  // let t2 = t.get_new_tile(0, 12)
  // t2.draw()

  for (let i = 0; i < 12; i += 2) {
    let t2 = t.get_new_tile(i, param);
    s.push(t2);
    update_tiles(t2, s);
  }

  for (let i = 1; i < 12; i += 2) {
    let t2 = t.get_new_tile(i, 3);
    s.push(t2);
    update_tiles(t2, s);
  }

  s.map((it) => it.draw());
}

function draw() {
  background("#FFEDDA");
  for (let i = 0; i < 10; i += 1) {
    g.add_tile_to_front();
  }
  g.draw_grid();

  if (g.front.length == 0) {
    g.save_grid();
    noLoop();
  } else {
    count += 1;
  }

  console.log(g.front.length + " " + g.s.length);
}

function constraints(a, b) {
  return a < padding || a > h - padding || b < padding || b > h - padding;
}

// function constraints(a,b) {
// 	return dist_ab([a,b], [h/2, h/2]) > 0.70*h/2
// }

class grid {
  constructor(sx, sy) {
    this.sx = sx;
    this.sy = sy;
    this.start_c = new tile(0, 12, sx, sy, 0, (2 * PI) / (12 * 2));
    this.s = [this.start_c];
    this.front = [this.start_c];
    this.done = 0;
  }

  f(col_t, sides_t, side_t, col_out, sides_out, new_tt, current_t) {
    if (
      this.front[current_t].n_sides == sides_t &&
      this.front[current_t].c == col_t &&
      side_t == new_tt &&
      this.done == 0 &&
      this.front[current_t].adj[new_tt] == -1
    ) {
      let new_tile = this.front[current_t].get_new_tile(new_tt, sides_out);
      new_tile.c = col_out;

      if (!constraints(new_tile.x, new_tile.y)) {
        this.front.push(new_tile);
        this.s.push(new_tile);
        update_tiles(new_tile, this.s);
        //update_tiles(new_tile, this.front)
      } else {
        this.s.push(new_tile);
        update_tiles(new_tile, this.s);
      }

      this.done = 1;
    }
  }

  add_tile_to_front() {
    if (this.front.length == 0) {
      return;
    }

    let t = floor(random(this.front.length));

    if (this.front[t].n_sides == 6 && this.front[t].c == 1) {
      this.front.splice(t, 1);
      return;
    }

    if (this.front[t].n_sides == 3 && this.front[t].c == 3) {
      this.front.splice(t, 1);
      return;
    }

    let opport = [];
    for (let i = 0; i < this.front[t].adj.length; i += 1) {
      if (this.front[t].adj[i] == -1) {
        opport.push(i);
      }
    }

    if (opport.length == 0) {
      this.front.splice(t, 1);
      return;
    }

    let new_t = random(opport);
    this.done = 0;

    this.f(0, 12, 0, 1, 12, new_t, t);
    this.f(0, 12, 4, 1, 12, new_t, t);
    this.f(0, 12, 8, 1, 12, new_t, t);

    this.f(0, 12, 1, 3, 3, new_t, t);
    this.f(0, 12, 3, 3, 3, new_t, t);
    this.f(0, 12, 5, 3, 3, new_t, t);
    this.f(0, 12, 7, 3, 3, new_t, t);
    this.f(0, 12, 9, 3, 3, new_t, t);
    this.f(0, 12, 11, 3, 3, new_t, t);

    this.f(0, 12, 2, 15, 4, new_t, t);
    this.f(0, 12, 6, 15, 4, new_t, t);
    this.f(0, 12, 10, 15, 4, new_t, t);

    this.f(1, 12, 6, 0, 3, new_t, t);
    this.f(2, 12, 6, 0, 12, new_t, t);

    this.f(1, 12, 3, 0, 6, new_t, t);
    this.f(2, 12, 3, 1, 6, new_t, t);
    this.f(1, 12, 9, 1, 6, new_t, t);
    this.f(2, 12, 9, 0, 6, new_t, t);

    this.f(1, 12, 2, 16, 4, new_t, t);
    this.f(1, 12, 10, 16, 4, new_t, t);

    this.f(2, 12, 4, 16, 4, new_t, t);
    this.f(2, 12, 8, 16, 4, new_t, t);

    this.f(1, 12, 5, 4, 3, new_t, t);

    this.f(2, 12, 1, 12, 3, new_t, t); /////
    this.f(2, 12, 11, 4, 3, new_t, t);

    this.f(0, 6, 3, 11, 3, new_t, t);

    this.f(1, 12, 4, 12, 4, new_t, t);
    this.f(2, 12, 10, 12, 4, new_t, t);

    this.f(0, 3, 1, 8, 4, new_t, t);
    //this.f(0, 3, 2,   4,4,  new_t,t)

    this.f(2, 3, 2, 8, 4, new_t, t);
    this.f(2, 3, 1, 2, 12, new_t, t);

    this.f(4, 4, 2, 5, 4, new_t, t); // start (4) to 1
    this.f(5, 4, 2, 6, 4, new_t, t);
    this.f(6, 4, 2, 7, 4, new_t, t);
    this.f(7, 4, 2, 1, 3, new_t, t);

    this.f(8, 4, 2, 9, 4, new_t, t); // start (8) to 2
    this.f(9, 4, 2, 10, 4, new_t, t);
    this.f(10, 4, 2, 11, 4, new_t, t);
    this.f(11, 4, 2, 2, 3, new_t, t);

    this.f(8, 4, 3, 3, 3, new_t, t);
    this.f(9, 4, 3, 21, 3, new_t, t);
    this.f(10, 4, 3, 19, 3, new_t, t);
    this.f(11, 4, 3, 21, 3, new_t, t); ////
    this.f(19, 3, 2, 20, 3, new_t, t);
    this.f(20, 3, 1, 2, 6, new_t, t);

    this.f(21, 3, 2, 22, 3, new_t, t);
    this.f(22, 3, 1, 3, 3, new_t, t);

    this.f(2, 6, 3, 1, 6, new_t, t);

    this.f(12, 4, 2, 13, 4, new_t, t); // start (12) to dead end
    this.f(13, 4, 2, 14, 4, new_t, t);

    this.f(13, 4, 1, 3, 3, new_t, t);

    this.f(15, 4, 1, 3, 3, new_t, t);
    this.f(15, 4, 2, 3, 3, new_t, t);
    this.f(15, 4, 3, 3, 3, new_t, t);

    this.f(16, 4, 2, 3, 3, new_t, t);

    this.f(4, 3, 1, 5, 3, new_t, t);
    this.f(5, 3, 2, 6, 3, new_t, t);
    this.f(6, 3, 1, 7, 3, new_t, t);
    this.f(7, 3, 2, 8, 3, new_t, t);
    this.f(8, 3, 1, 9, 3, new_t, t);
    this.f(9, 3, 2, 10, 3, new_t, t);

    this.f(12, 3, 2, 13, 3, new_t, t);
    this.f(13, 3, 1, 14, 3, new_t, t);
    this.f(14, 3, 2, 15, 3, new_t, t);
    this.f(15, 3, 1, 16, 3, new_t, t);
    this.f(16, 3, 2, 17, 3, new_t, t);
    this.f(17, 3, 1, 18, 3, new_t, t);

    this.f(11, 3, 1, 17, 4, new_t, t);

    this.f(17, 4, 1, 14, 4, new_t, t);
    this.f(17, 4, 3, 14, 4, new_t, t);

    this.front[t].adj[new_t] = -2;
  }

  draw_grid() {
    //print(this.s)
    this.s.map((it) => it.draw());
  }

  save_grid() {
    let out = [];

    for (let i = 0; i < this.s.length; i += 1) {
      out.push([
        this.s[i].id,
        this.s[i].x,
        this.s[i].y,
        this.s[i].n_sides,
        this.s[i].seg,
        this.s[i].adj,
      ]);
    }

    //console.log(JSON.stringify(out));
  }
}

function update_tiles(target, all_tiles) {
  for (let a = 0; a < all_tiles.length; a += 1) {
    if (all_tiles[a].id == target.id) continue;
    //if(dist_ab([all_tiles[a].x, all_tiles[a].y], [target.x, target.y]) > all_tiles[a].r +target.r + 0.000001) continue;

    for (let i = 0; i < target.seg.length; i += 1) {
      if (target.adj[i] != -1) continue;
      for (let j = 0; j < all_tiles[a].seg.length; j += 1) {
        //if(all_tiles[a].adj[j] != -1) continue;
        if (segments_are_close_enough(all_tiles[a].seg[j], target.seg[i])) {
          all_tiles[a].adj[j] = target.id;
          target.adj[i] = all_tiles[a].id;
          break;
        }
      }
    }
  }
}

function check_intersections(target, all_tiles) {
  for (let a = 0; a < all_tiles.length; a += 1) {
    if (all_tiles[a].id == target.id) continue;
    if (
      dist_ab([all_tiles[a].x, all_tiles[a].y], [target.x, target.y]) <
      all_tiles[a].ap + target.ap + 0.000001
    )
      return true;
  }
  return false;
}

class tile {
  constructor(id, n_sides, x, y, adj, ang = 0) {
    this.n_sides = n_sides;
    this.id = id;
    this.x = x;
    this.y = y;

    this.parent = [x, y];

    this.c = 0;

    this.r = get_r(n_sides);
    this.ap = get_apothem(n_sides);

    this.vert = polygonArr(this.r, n_sides, ang);
    this.vert = this.vert.map((i) => [i[0] + x, i[1] + y]);
    this.seg = get_segments_from_points(this.vert);

    if (adj === 0) {
      this.adj = new Array(n_sides).fill(-1);
    } else {
      this.adj = adj;
    }
    this.ang = ang;
  }

  draw() {
    if (g.front.includes(this)) {
      fill(col[3]);
    } else {
      fill(col[1]);
    }

    //fill(0, 20)
    stroke(col[4]);
    strokeWeight(2);
    // beginShape();
    // for (let a = 0; a < this.vert.length; a += 1) vertex(...this.vert[a]);
    // endShape(CLOSE)
    //circle(...this.vert[0], 10)

    line(...this.parent, this.x, this.y);

    // 		for (let a = 0; a < this.seg.length; a += 1){
    // 			let new_vx = (this.seg[a][0][0] + this.seg[a][1][0])/2;
    // 			let new_vy = (this.seg[a][0][1] + this.seg[a][1][1])/2;
    // 			//print(dist_ab(...this.seg[a]))
    // 			//if(this.adj[a] != -1) square(new_vx, new_vy, 2)

    // 		}
  }

  get_new_tile(n_seg_expand, new_sides) {
    let new_id = last_id;
    last_id += 1;
    this.adj[n_seg_expand] = new_id;

    let new_ap = get_apothem(new_sides);

    let new_vx =
      (this.seg[n_seg_expand][0][0] + this.seg[n_seg_expand][1][0]) / 2 -
      this.x;
    let new_vy =
      (this.seg[n_seg_expand][0][1] + this.seg[n_seg_expand][1][1]) / 2 -
      this.y;

    let dd = sqrt(new_vx ** 2 + new_vy ** 2);
    new_vx = ((this.ap + new_ap) * new_vx) / dd + this.x;
    new_vy = ((this.ap + new_ap) * new_vy) / dd + this.y;

    let new_start_ang = atan2(
      this.seg[n_seg_expand][1][1] - new_vy,
      this.seg[n_seg_expand][1][0] - new_vx
    );

    let new_contact = 0;
    let new_adj = new Array(new_sides).fill(-1);
    new_adj[new_contact] = this.id;
    let nt = new tile(
      new_id,
      new_sides,
      new_vx,
      new_vy,
      new_adj,
      new_start_ang
    );
    nt.parent = [this.x, this.y];
    return nt;
  }
}
