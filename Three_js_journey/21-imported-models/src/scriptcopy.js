import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(10))

// models
const modelPath1 = '/models/Duck/glTF/Duck.gltf'
const modelPath2 = '/models/Fox/glTF/Fox.gltf'
const modelPath3 = '/models/FlightHelmet/glTF/FlightHelmet.gltf'
const modelPath4 = '/models/Amongus/amongus.gltf'
const modelPath5 = '/models/Amongus/amongus.glb'

const dracomodel = '/models/Duck/glTF-Draco/Duck.gltf'


const gltfLoader = new GLTFLoader();

let mixer = null
gltfLoader.load('/models/habitacion_02.glb',
    (gltf) => {
        
        gltf.scene.scale.set(0.55, 0.55, 0.55)
        scene.add(gltf.scene)
        updateAllMaterials()
    })

const updateAllMaterials = () => {
    scene.traverse((child)=>{
        try {
            child.castShadow = true;
            child.receiveShadow = true;
        } catch (error) {
        }
    })
}
/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

gui.add(ambientLight, 'intensity', 0, 4, 0.01)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const guiDL = gui.addFolder('directional light')
guiDL.add(directionalLight, 'intensity', 0, 9, 0.01)
guiDL.add(directionalLight.position, 'x', -30, 30, 0.01)
guiDL.add(directionalLight.position, 'y', -30, 30, 0.01)
guiDL.add(directionalLight.position, 'z', -30, 30, 0.01)
guiDL.add(directionalLight.shadow,'normalBias').min(-0.05).max(0.05).step(0.001);
guiDL.add(directionalLight.shadow,'bias').min(-0.05).max(0.05).step(0.001);

directionalLight.shadow.normalBias = 0.032;
directionalLight.shadow.bias = -0.01
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.far = 20;


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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // update mixer
    if(mixer!==null) mixer.update(deltaTime * 1.75)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()