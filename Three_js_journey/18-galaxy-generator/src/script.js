import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'lil-gui'

const gui = new GUI();
const debugObject = {};

// canvas
const canvas =  document.querySelector('.webgl')
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 200);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 2;
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(2,window.devicePixelRatio))

// GALAXY

// particles material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.02;
particlesMaterial.sizeAttenuation = true
particlesMaterial.vertexColors = true;
particlesMaterial.blending = THREE.AdditiveBlending;

let particlesGeometry = new THREE.BufferGeometry();
let particles = new THREE.Points();

debugObject.count = 100000;
debugObject.branches = 3;
debugObject.radius = 5;
debugObject.spin = 2;
debugObject.randomness = 0.5;
debugObject.randomnessPower = 3;
debugObject.insideColor = '#ff0000';
debugObject.outsideColor = '#0000ff'

const generateGalaxy = () => {
  // check objects
  particlesGeometry.dispose();
  scene.remove(particles)

  const insideColor = new THREE.Color(debugObject.insideColor)
  const outsideColor = new THREE.Color(debugObject.outsideColor)

  // particles
  const particlesPosition = new Float32Array(debugObject.count * 3);
  const particlesColor = new Float32Array(debugObject.count * 3);

  for (let i = 0; i < debugObject.count; i++) {
    const angle =
      2 * Math.PI * ((i % debugObject.branches) / debugObject.branches);
    const radius = Math.random() * debugObject.radius;
    const spinAngle = radius * debugObject.spin;

    // randomness
    const randomX = Math.pow(Math.random(), debugObject.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * debugObject.randomness;
    const randomY = Math.pow(Math.random(), debugObject.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * debugObject.randomness;
    const randomZ = Math.pow(Math.random(), debugObject.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * debugObject.randomness;

    // set position
    particlesPosition[i * 3] = Math.sin(angle + spinAngle) * radius + randomX;
    particlesPosition[i * 3 + 2] = Math.cos(angle + spinAngle) * radius + randomZ;
    particlesPosition[i * 3 + 1] = randomY;
    

    // set color
    const mixedColor = insideColor.clone().lerp(outsideColor, radius / debugObject.radius);
    particlesColor[i * 3] = mixedColor.r;
    particlesColor[i * 3 + 1] = mixedColor.g;
    particlesColor[i * 3 + 2] = mixedColor.b;

  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlesPosition, 3)
  );

  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(particlesColor, 3)
  );

  // particles
  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
};

generateGalaxy();

debugObject.rotationSpeed = 0.2;

// GUI options
gui.add(debugObject, 'count').min(100).max(40000).step(100)
  .onFinishChange(generateGalaxy)
gui.add(debugObject, 'branches').min(2).max(10).step(1).onFinishChange(generateGalaxy)
gui.add(debugObject, 'radius').min(1).max(10).step(1).onFinishChange(generateGalaxy)
gui.add(debugObject, 'spin').min(-4).max(4).step(1).onFinishChange(generateGalaxy)
gui.add(debugObject, 'randomness').min(0.5).max(3).step(0.01).onFinishChange(generateGalaxy)
gui.add(debugObject, 'randomnessPower').min(1).max(10).step(0.01).onFinishChange(generateGalaxy)
gui.addColor(debugObject, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(debugObject, 'outsideColor').onFinishChange(generateGalaxy)
gui.add(debugObject,'rotationSpeed').min(-4).max(4).step(0.01);

// Listeners
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(2,window.devicePixelRatio))
})

// animation
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera)

  particles.rotation.y = elapsedTime * debugObject.rotationSpeed * 0.7;
  
  requestAnimationFrame(tick)
}

tick();