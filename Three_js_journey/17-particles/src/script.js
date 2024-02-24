import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'lil-gui'

const canvas = document.querySelector('.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const scene = new THREE.Scene();

// Textures 
const textureLoader = new THREE.TextureLoader();

// particles
const count = 20000;
// const count = 1000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++){
  positions[i] = Math.random() * 10 - 5;
  colors[i] = Math.random();
}

const pointsGeometry = new THREE.BufferGeometry();
pointsGeometry.setAttribute('position',
  new THREE.BufferAttribute(positions, 3)
);
pointsGeometry.setAttribute('color',
  new THREE.BufferAttribute(colors, 3)
)

// particles textures

const particlesTexture = textureLoader.load('/textures/particles/2.png')

const pointsMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  // color: '#ff88cc',
  alphaMap: particlesTexture,
  transparent: true,
  vertexColors: true
})

// alpha test
// sets the threshold when a pixel should be transparent or not
// pointsMaterial.alphaTest = 0.001;

// depth test
// deactivate the z-index, it means that there is no deep efect so everything is rendered even if is behind another object
// pointsMaterial.depthTest = false;

// depth write
// material can still test the depth of the objects but it is not write on the depthbuffer anymore
pointsMaterial.depthWrite = false;

// don't have a lot of performance impact

// blending, different result, performance impact
pointsMaterial.blending = THREE.AdditiveBlending;

const particles = new THREE.Points(pointsGeometry, pointsMaterial)

scene.add(particles)

const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial())
// scene.add(cube)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

scene.add(new THREE.AxesHelper())

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  // particles.rotation.x = elapsedTime * 0.3;

  const particlesArray = pointsGeometry.attributes.position.array;

  for(let i = 0; i < particlesArray.length; i+=3){
    // particlesArray[i] = 0;
    particlesArray[i+1] = Math.sin(elapsedTime*3 + particlesArray[i] + particlesArray[i+2]);
    // particlesArray[i+2] = Math.cos(elapsedTime + particlesArray[i])
  }

  pointsGeometry.attributes.position.needsUpdate = true;

  requestAnimationFrame(tick)
}

tick()