import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox'

/**
 * Loaders
 */

const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();
const rgbeLoader = new RGBELoader();

/**
 * Base
 */
// Debug
const gui = new GUI()
const parameters = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */

const updateAllMaterials = () => {
    scene.traverse((child)=>{
        try {
            child.material.envMapIntensity = parameters.envMapIntensity
        } catch (error) {
        }
    })
}
// updateAllMaterials()
/**
 * Environment map
 */

// scene.backgroundBlurriness = 1;
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.01)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.01)

// GLOBAL INTENSITY
parameters.envMapIntensity = 1;
gui.add(parameters, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.01)
  .onChange(updateAllMaterials);

const textureIdx = 0;

// LDR cube texture
// const environmentMap = cubeTextureLoader.load([
//     `/environmentMaps/${textureIdx}/px.png`,
//     `/environmentMaps/${textureIdx}/nx.png`,
//     `/environmentMaps/${textureIdx}/py.png`,
//     `/environmentMaps/${textureIdx}/ny.png`,
//     `/environmentMaps/${textureIdx}/pz.png`,
//     `/environmentMaps/${textureIdx}/nz.png`,
// ])
// scene.background = environmentMap;
// scene.environment = environmentMap;

// HDR (RGBE) equirectangular

// rgbeLoader.load(`/environmentMaps/${textureIdx}/2k.hdr`, (envMap) => {
//     envMap.mapping = THREE.EquirectangularReflectionMapping;
//     // scene.background = envMap;
//     scene.environment = envMap;

//     const skybox = new GroundProjectedSkybox(envMap)
//     skybox.scale.setScalar(50);
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxradius');
//     gui.add(skybox, 'height', 1, 100, 0.1).name('skyboxheight');
// })

const environmentMap = textureLoader.load('environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;

scene.background = environmentMap;

/**
 * Holy donit
 */
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8,0.5),
    new THREE.MeshBasicMaterial({color: new THREE.Color(10,10,10)})
);
scene.add(holyDonut)
holyDonut.position.y = 3.5;
holyDonut.layers.enable(1)

// cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256, 
    {
    type: THREE.HalfFloatType
    }
);

scene.environment = cubeRenderTarget.texture;

// cube camera
const cubecamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
cubecamera.layers.enable(1)
/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 1,
        color: '#aaa'
    })
)
torusKnot.position.y = 4
torusKnot.position.x = -4
scene.add(torusKnot)

/**
 * Models
 */

gltfLoader.load(
    'models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10,10,10)
        scene.add(gltf.scene);
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // real time environment map
    if(holyDonut){
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2;
        cubecamera.update(renderer, scene);
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()