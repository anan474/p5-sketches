let dist_ab = (a, b) => sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

function get_segments_from_points(s) {
  let out = [];
  let pr = s[0];
  for (let a = 1; a < s.length; a += 1) {
    out.push([pr, s[a]]);
    pr = s[a];
  }
  //out.push([s[s.length-1], s[0]])
  return out;
}

function polygonArr(radius, npoints, angZero) {
  let arr = [];
  let angle = TWO_PI / npoints;
  for (let a = angZero; a < TWO_PI + angZero + 0.00001; a += angle) {
    arr.push([cos(a) * radius, sin(a) * radius]);
  }
  return arr;
}

function segments_are_close_enough(a, b) {
  let e = 0.1;
  if (dist_ab(a[0], b[0]) < e && dist_ab(a[1], b[1]) < e) return true;
  if (dist_ab(a[1], b[0]) < e && dist_ab(a[0], b[1]) < e) return true;
  return false;
}

function get_oposite(N, M) {
  N += 1;
  if (M > parseInt(N / 2)) {
    return M - parseInt(N / 2) - 1;
  }
  return M + parseInt(N / 2) - 1;
}
