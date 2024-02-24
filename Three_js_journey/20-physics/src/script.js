import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import CANNON, { Vec3 } from "cannon";

/**
 * Debug
 */
const gui = new GUI();
const parameters = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(3));

// sound
const hitSound = new Audio('sounds/hit.mp3')
const playHitSound = (collide) => {
  const impact = collide.contact.getImpactVelocityAlongNormal()
  if (impact > 1.5)
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
}

 
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);
environmentMapTexture.colorSpace = THREE.SRGBColorSpace;

// Physics

// world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;

// material
const defaultMaterial = new CANNON.Material("default");
const contactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1, // friccion
    restitution: 0.7, // bounce
  }
);

world.addContactMaterial(contactMaterial);
world.defaultContactMaterial = contactMaterial;

// physic objects
// floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
  shape: floorShape,
  // material: defaultMaterial
});
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
world.addBody(floorBody);

/**
 * Objects
 */

const physicMeshes = []

const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
})
const createSphere = (radius, position) => {
  const sphere = new THREE.Mesh(
    sphereGeom, sphereMaterial
  );
  sphere.scale.set(radius, radius, radius);
  sphere.castShadow = true;
  // sphere.receiveShadow = true;
  sphere.position.copy(position)
  scene.add(sphere);

  const sphereBody = new CANNON.Body({
    mass: radius * 2,
    shape: new CANNON.Sphere(radius) 
  })
  sphereBody.position.copy(position)
  world.addBody(sphereBody);
  sphereBody.addEventListener('collide',playHitSound)

  physicMeshes.push({mesh:sphere, body:sphereBody});
};

parameters.createSphere = ()=>{
  createSphere(0.2 + Math.random() * 0.3, {x:Math.random() * 4 - 2, y:3, z:Math.random() * 4 - 2})
};
gui.add(parameters, 'createSphere')

const boxGeom = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  envMapIntensity: 0.5,
}) 

const createBox = (width, height, depth, position) => {
  // mesh
  const mesh = new THREE.Mesh(
    boxGeom, boxMaterial
  )
  mesh.scale.set(width, height, depth)
  mesh.castShadow = true;
  // mesh.receiveShadow = true;
  mesh.position.copy(position)
  scene.add(mesh)

  const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2))
  })
  body.position.copy(position)
  world.addBody(body)

  body.addEventListener('collide',playHitSound)

  physicMeshes.push({mesh, body})
}

parameters.createBox = () => {
  createBox(
    0.2 + Math.random() * 0.6, 
    0.2 + Math.random() * 0.6, 
    0.2 + Math.random() * 0.6, 
    {x:Math.random() * 3 - 1/5, y:3, z:Math.random() * 3 - 1.5})
}
gui.add(parameters, 'createBox')

parameters.reset = () => {
  for(const object of physicMeshes) {
    object.body.removeEventListener('collide', playHitSound);
    world.removeBody(object.body)
    scene.remove(object.mesh)
  }
  physicMeshes.splice(0, physicMeshes.length)
}
gui.add(parameters, 'reset');
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.47);
scene.add(ambientLight);

gui.add(ambientLight, "intensity").min(0).max(6).step(0.01).name("ambient");

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.45);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(3)
  .step(0.01)
  .name("directional");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(-3, 3, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let pastTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - pastTime;
  pastTime = elapsedTime;

  // update physics world
  // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);

  world.step(1 / 60, deltaTime, 3);

  for(const pm of physicMeshes) {
    pm.mesh.position.copy(pm.body.position)
    pm.mesh.quaternion.copy(pm.body.quaternion)
  }


  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
