let renderer;
const CYCLE = 60;
let sh;

function setup() {
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  //shader
  sh = createShader(vert, frag);
  this.shader(sh);
  sh.setUniform("u_resolution", [width, height]);
  sh.setUniform("u_lightDir", [0.5, 1, -1]);
  pixelDensity(2);
}

function draw() {
  background("#18171D");

  orbitControl();

  let s = min(width, height) * 0.14 + 2 * sin((frameCount / CYCLE) * PI);

  setCol(sh, "#D3E3FE");
  translate(0, cos((frameCount / CYCLE) * PI) * s * 0.2, 0);
  rotateX(0.3);
  push();
  rotateY((-frameCount / CYCLE / 2) * PI);
  obake(s, s * (2.5 + 0.125 * sin((frameCount / CYCLE) * PI)), 50, 30);
  pop();
  setCol(sh, "#222222");
  rotateY(PI * 1.2);
  push();
  translate(s, s * 0.2, 0);
  ball(s * 0.1, 10, 10);
  pop();
  rotateY(PI * 0.2);
  translate(s, s * 0.2, 0);
  ball(s * 0.1, 10, 10);
}

function obake(_sphereRadius, _h, _dx, _dy) {
  let geometry = new p5.Geometry(_dx, _dy);

  for (let yi = 0; yi <= _dy; yi++) {
    let yRadian = map(yi, 0, _dy, -PI / 2, PI / 2);
    let y, radius, degree;
    if (yi < _dy / 2) {
      degree = 0;
      y = sin(yRadian) * _sphereRadius;
      radius = cos(yRadian) * _sphereRadius;
    } else {
      degree = map(yi, _dy / 2, _dy, 0, 1);
      y =
        degree *
        (_h - _sphereRadius) *
        (1 + 0.1 * (sin((frameCount / CYCLE) * PI) * 0.5 + 1));
      radius =
        _sphereRadius +
        pow(degree, 3) *
          (_sphereRadius * 0.3) *
          (sin((yi / _dy) * 3 + (frameCount / CYCLE) * PI) * 0.5 + 1);
    }
    for (let xi = 0; xi <= _dx; xi++) {
      let r = ((xi * TWO_PI) / _dx) * -1;
      let x = cos(r) * radius;
      let z = sin(r) * radius;
      let yOff =
        degree *
        (_h * 0.07) *
        sin((frameCount / CYCLE / 1.5) * PI) *
        sin(r * 5 + (frameCount / CYCLE) * PI);
      geometry.vertices[xi + (_dx + 1) * yi] = createVector(x, y - yOff, z);
    }
  }

  //face
  geometry.computeFaces();
  //normal
  geometry.computeNormals();
  geometry.averageNormals();

  //draw
  renderer.createBuffers("gId", geometry);
  renderer.drawBuffers("gId");
}

function ball(_radius, _dx, _dy) {
  let geometry = new p5.Geometry(_dx, _dy);
  for (let yi = 0; yi <= _dy; yi++) {
    let yRadian = map(yi, 0, _dy, PI / 2, -PI / 2);
    let y = sin(yRadian) * _radius;
    let radius = cos(yRadian) * _radius;
    for (let xi = 0; xi <= _dx; xi++) {
      let r = (xi * TWO_PI) / _dx;
      let x = cos(r) * radius;
      let z = sin(r) * radius;
      geometry.vertices[xi + (_dx + 1) * yi] = createVector(x, y, z);
    }
  }
  geometry.computeFaces();
  geometry.computeNormals();
  geometry.averageNormals();
  renderer.createBuffers("ball", geometry);
  renderer.drawBuffers("ball");
}

function setCol(shader, colStr) {
  let col = color(colStr);
  let colArray = col._array;
  colArray.pop();
  shader.setUniform("u_col", colArray);
}

var vert = `

		precision highp float;

    // attributes, in
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    // attributes, out
    varying vec3 var_vertPos;
    varying vec3 var_vertNormal;
    varying vec2 var_vertTexCoord;
		varying vec4 var_centerGlPosition;//原点
    
    // matrices
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;

    void main() {
      vec3 pos = aPosition;
			vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
			//posOut.y *= -1.; //orthを入れるとなぜかこれが必要に。。。
      gl_Position = posOut;

      // set out value
      var_vertPos      = pos;
      var_vertNormal   =  aNormal;
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0., 0., 0.,1.0);
    }
`;

var frag = `

precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec3 u_lightDir;
uniform vec3 u_col;
uniform mat3 uNormalMatrix;

//attributes, in
varying vec4 var_centerGlPosition;
varying vec3 var_vertNormal;




float random (in vec2 st) {
   	highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(st.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float noise(vec2 st) {
    vec2 i = vec2(0.);
		i = floor(st);
    vec2 f = vec2(0.);
		f = fract(st);
    vec2 u =  vec2(0.);
		u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(1.0,1.0) ), u.x), u.y);
}

float grid(vec2 uv){
	uv *= 10.;
  uv = fract(uv);
  float v = uv.x >= 0. && uv.x < 0.1 || uv.y >= 0. && uv.y < 0.1 ? 1. : 0.;
  return v;
}

float gridGra(in vec2 uv , float gridNum){
    float scale = gridNum;
    uv *= scale;
    uv = fract(uv);
    float o = abs(uv.y + -0.5)*2.;
		o *= abs(uv.x + -0.5)*2.;
    return o;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
		st.x *= u_resolution.x/u_resolution.y;

		vec2 centerPos = var_centerGlPosition.xy/var_centerGlPosition.w;//スクリーン変換
		centerPos = (centerPos + 1.0)*.5*2.;//gl_FragCoordと座標を合わせる pixelDensityによって係数が変化する
		centerPos.x *= u_resolution.x/u_resolution.y;//gl_FragCoordと座標を合わせる
		//centerPos.y *= -1.;//orthを入れるとなぜかこれが必要に。。。
		vec3 vertNormal = normalize(uNormalMatrix * var_vertNormal);
    float dot = dot(vertNormal,-normalize(u_lightDir));
    dot = (dot *.5) + .5;

    float noise1 = noise((st-centerPos)*500.);
		float noise2 = noise((st-centerPos)*1000.);
		float tone = step(noise1,dot);
		vec3 col = u_col * tone + (u_col-0.4) * (1.-tone);
		col += noise2*.1;

		gl_FragColor = vec4(col,1.0);
}

`;
