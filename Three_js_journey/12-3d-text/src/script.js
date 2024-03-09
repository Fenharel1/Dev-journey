import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

scene.add(new THREE.AxesHelper());

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Fonts
const fontLoader = new FontLoader();
fontLoader.load(
  "/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry(
      'Luz Daniela Conde Quispe',
      {
        font,
        size: 0.5,
        height: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3,
        curveSegments: 5,
      }
    );
    textGeometry.center();
    textGeometry.computeBoundingBox();
    console.log(textGeometry.boundingBox);

    const matcapMaterial = new THREE.MeshMatcapMaterial();
    matcapMaterial.matcap = matcapTexture;
    const text = new THREE.Mesh(textGeometry, matcapMaterial);
    scene.add(text);

    let count = 300;
    console.time('donuts')
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture});

    for(let i = 0; i < count; i++){
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      donut.position.x = Math.random() * 10 - 5;
      donut.position.y = Math.random() * 10 - 5;
      donut.position.z = Math.random() * 10 - 5;

      donut.rotation.x = Math.random() * Math.PI;
      donut.scale.x = donut.scale.y = donut.scale.z = Math.random();
      scene.add(donut);
    }
    console.timeEnd('donuts')
  }
);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();