import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

const canvas = document.querySelector('.webgl')
const gui = new GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// materials
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Meshes
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 16, 16),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.4, 0.2, 10, 16),
  material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10),
  material
)

plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 1

scene.add(cube, sphere, torus, plane);

// lights

// ambientLight
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color('#fff');
ambientLight.intensity = 0.5;

scene.add(ambientLight);
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)

// directionalLight
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight);

//hemisphere
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphereLight);

//pointLight
const pointLight = new THREE.PointLight(0xff9000, 5, 15);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {

  controls.update();

  const elapsedTime = clock.getElapsedTime();

  const speed = 0.2;
  cube.rotation.x = elapsedTime * speed;
  cube.rotation.y = elapsedTime * speed;
  cube.rotation.z = elapsedTime * speed;

  sphere.rotation.x = elapsedTime * speed;
  sphere.rotation.y = elapsedTime * speed;
  sphere.rotation.z = elapsedTime * speed;

  torus.rotation.x = elapsedTime * speed;
  torus.rotation.y = elapsedTime * speed;
  torus.rotation.z = elapsedTime * speed;

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick();