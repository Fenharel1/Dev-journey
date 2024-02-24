precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vRandom;
varying float vElevation;

void main(){
  // gl_FragColor = vec4(1.0, vRandom, 0.0, 1.0);
  // gl_FragColor = vec4(uColor, 1.0);
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  vec4 color = texture2D(uTexture, vUv);
  color.rgb *= vElevation * 2.0 + 0.5;
  gl_FragColor = color;
}