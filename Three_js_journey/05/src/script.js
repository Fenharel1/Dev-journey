import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 
import gsap from 'gsap';
import GUI from 'lil-gui'

// Debugging
const gui = new GUI({
  width: 300,
  title: 'Nive debug UI',
  closeFolders: false
});
gui.hide();

window.addEventListener('keydown', (event) => {
  if(event.key == 'h') gui.show(gui._hidden);
})

const debugObject = {};

// Textures
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/color.jpg');
const heightTexture = textureLoader.load('/textures/door/height.png');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metallicTexture = textureLoader.load('/textures/door/metallic.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

colorTexture.colorSpace = THREE.SRGBColorSpace;
heightTexture.colorSpace = THREE.SRGBColorSpace;
normalTexture.colorSpace = THREE.SRGBColorSpace;
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
metallicTexture.colorSpace = THREE.SRGBColorSpace;
roughnessTexture.colorSpace = THREE.SRGBColorSpace;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5;
// colorTexture.rotation = Math.PI / 4;

colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes
const axes = new THREE.AxesHelper(30);
scene.add(axes);

// Object
debugObject.color = '#ff0000'
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({map: colorTexture});
const mesh = new THREE.Mesh(geometry, material);

// Buffer Array
const points = new Float32Array([
  0,0,0,
  0.5,1,0,
  1,0,0
]);

const posAttribute = new THREE.BufferAttribute(points,3);
const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute('position', posAttribute)
const material2 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe:true })
const mesh2 = new THREE.Mesh(bufferGeometry, material2)

// Setting objects to the scene
scene.add(mesh);

// options of the gui

const cubeTweaks = gui.addFolder('Awesome cube');

cubeTweaks.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('elevation')

cubeTweaks.add(mesh, 'visible');
cubeTweaks.add(material, 'wireframe')

cubeTweaks.addColor(debugObject, 'color')
 .onChange((value)=>{
  material.color.set(value)
 })

debugObject.spin = () => {gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2, duration: 1.2})}
cubeTweaks.add(debugObject, 'spin');

debugObject.subdivision = 2;
cubeTweaks.add(debugObject, 'subdivision')
 .min(1)
 .max(20)
 .step(1)
 .onFinishChange((value)=>{
    mesh.geometry.dispose(); // ! important
    mesh.geometry = new THREE.BoxGeometry(1,1,1,value,value,value);
 })

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', (event)=>{
  sizes.width =  window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

// FullScreen configuration
window.addEventListener('dblclick', ()=>{
  if(!document.fullscreenElement){
    // canvas.requestFullscreen();
  }else{
    // document.exitFullscreen();
  }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Time
const clock = new THREE.Clock();

// Animations
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();
  controls.update();

  // Render 
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
