//p5.js shader basic structure ref from https://www.openprocessing.org/sketch/920144

let theShader;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

let drawingGraphics;
let WebglGraphics;
function setup() {
  createCanvas(1000, 1000);
  WebglGraphics = createGraphics(width, height, WEBGL);
  drawingGraphics = createGraphics(width, height);
  background(100);
  mouseX = width / 2;
  mouseY = height / 2;
}

function draw() {
  WebglGraphics.shader(theShader);
  theShader.setUniform("u_resolution", [width / 1000, height / 1000]);
  theShader.setUniform("u_time", millis() / 1000);
  theShader.setUniform("u_mouse", [mouseX / width, mouseY / height]);
  theShader.setUniform("tex0", drawingGraphics);

  drawingGraphics.clear(0, 0, width, height);
  // drawingGraphics.ellipse(mouseX,mouseY,850)

  drawingGraphics.stroke(255);
  drawingGraphics.strokeWeight(2);
  drawingGraphics.push();
  if (mouseIsPressed) {
    drawingGraphics.noFill();
  } else {
    drawingGraphics.fill(255);
  }

  // drawingGraphics.noFill()
  for (var i = 200; i < 800; i += 200) {
    drawingGraphics.ellipse(mouseX, mouseY, i);
  }
  drawingGraphics.pop();

  drawingGraphics.push();
  drawingGraphics.textSize(180);
  drawingGraphics.textStyle(BOLDITALIC);

  if (mouseIsPressed) {
    drawingGraphics.fill(255);
  } else {
    drawingGraphics.fill(0);
  }

  for (var i = 0; i < height + 400; i += 200) {
    drawingGraphics.text(
      "MEMORY",
      50,
      i + ((frameCount / (5 / log(mouseY))) % 200)
    );
  }
  drawingGraphics.pop();
  for (var i = 0; i < width; i += 50) {
    for (var o = 0; o < height; o += 50) {
      drawingGraphics.ellipse(i, o, (i / 50) % 5 == 0 ? 20 : 10);
    }
  }
  WebglGraphics.rect(-width / 2, -height / 2, width, height);

  image(WebglGraphics, 0, 0);

  // image(drawingGraphics,0,0)
  // rotateY(frameCount/100)
  // ellipse(mouseX, mouseY, 20, 20);
}

// function keyPressed(){
// 	save()
// }

const frag_functions_default = `
	float rand(vec2 c){
		return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
	}

	mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
	}

	mat2 scale2d(vec2 _scale){
			return mat2(_scale.x,0.0,
									0.0,_scale.y);
	}

	vec2 tile (vec2 _st, float _zoom) {
			_st *= _zoom;
			return fract(_st);
	}

	//	Classic Perlin 3D Noise 
	//	by Stefan Gustavson

	vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
	vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
	vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

	float cnoise(vec3 P){
		vec3 Pi0 = floor(P); // Integer part for indexing
		vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
		Pi0 = mod(Pi0, 289.0);
		Pi1 = mod(Pi1, 289.0);
		vec3 Pf0 = fract(P); // Fractional part for interpolation
		vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
		vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
		vec4 iy = vec4(Pi0.yy, Pi1.yy);
		vec4 iz0 = Pi0.zzzz;
		vec4 iz1 = Pi1.zzzz;

		vec4 ixy = permute(permute(ix) + iy);
		vec4 ixy0 = permute(ixy + iz0);
		vec4 ixy1 = permute(ixy + iz1);

		vec4 gx0 = ixy0 / 7.0;
		vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
		gx0 = fract(gx0);
		vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
		vec4 sz0 = step(gz0, vec4(0.0));
		gx0 -= sz0 * (step(0.0, gx0) - 0.5);
		gy0 -= sz0 * (step(0.0, gy0) - 0.5);

		vec4 gx1 = ixy1 / 7.0;
		vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
		gx1 = fract(gx1);
		vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
		vec4 sz1 = step(gz1, vec4(0.0));
		gx1 -= sz1 * (step(0.0, gx1) - 0.5);
		gy1 -= sz1 * (step(0.0, gy1) - 0.5);

		vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
		vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
		vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
		vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
		vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
		vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
		vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
		vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

		vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
		g000 *= norm0.x;
		g010 *= norm0.y;
		g100 *= norm0.z;
		g110 *= norm0.w;
		vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
		g001 *= norm1.x;
		g011 *= norm1.y;
		g101 *= norm1.z;
		g111 *= norm1.w;

		float n000 = dot(g000, Pf0);
		float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
		float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
		float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
		float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
		float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
		float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
		float n111 = dot(g111, Pf1);

		vec3 fade_xyz = fade(Pf0);
		vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
		vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
		float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
		return 2.2 * n_xyz;
	}

	vec2 random2( vec2 p ) {
			return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
	}

`;

const frag = `
	precision highp float;

	uniform vec2 u_resolution;
	uniform vec2 u_mouse;
	uniform float u_time;
	uniform vec3 u_lightDir;
	uniform vec3 u_col;
	uniform mat3 uNormalMatrix;
	uniform float u_pixelDensity;
	uniform sampler2D tex0;

	//attributes, in
	varying vec4 var_centerGlPosition;
	varying vec3 var_vertNormal;
	varying vec2 var_vertTexCoord;

	${frag_functions_default}


	void main(){
		vec2 st = var_vertTexCoord.xy /u_resolution.xy;
		// st.y = 1.0 - st.y;
		vec3 color = vec3(255.);
		float d = distance(u_mouse,st);

		vec2 distorted_st = st;
		distorted_st.x+=cnoise(vec3(st.x*5000.,st.y*3000.,u_time))/(1.+(sin(sqrt(st.y+u_time/20.)*50.)+1.)*500.)/2.;
		distorted_st.y+=cnoise(vec3(st.x*5000.,st.y*3000.,u_time))/(1.+(sin(sqrt(st.y+u_time/10.)*50.)+1.)*1000.)/2.;
		distorted_st.x += sin(distorted_st.y*(50.+sin(st.x)*20.)+u_time)*distorted_st.y*distorted_st.y/10.;
		color*=texture2D(tex0,distorted_st).rgb;
		color*=1.-d;
		
		color*=cnoise(vec3(st.x*5000.,st.y*3000.,u_time))+0.5;
		gl_FragColor= vec4(color,1.0);
	}
`;
//ref 3d shader from https://www.openprocessing.org/sketch/881537

const vert = `
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
		uniform float u_time;


    void main() {
      vec3 pos = aPosition;
			vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
      gl_Position = posOut;

      // set out value
      var_vertPos      = pos;
      var_vertNormal   =  aNormal;
      var_vertTexCoord = aTexCoord;
			var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0., 0., 0.,1.0);
    }
`;
