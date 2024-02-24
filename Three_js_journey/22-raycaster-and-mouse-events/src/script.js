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

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)
const objectsToTest = [ object1, object2, object3 ]

// load models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
let ducky = null

gltfLoader.load('/models/Duck/glTF-Draco/Duck.gltf', (gltf) => {
    ducky = gltf.scene.children[0];
    scene.add(ducky)
    // objectsToTest.push(ducky.children[0])
})

const ambientLight = new THREE.AmbientLight('#fff', 1);
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#fff', 3);
directionalLight.position.set(1,2,3)
scene.add(directionalLight)

// Raycaster

const raycaster = new THREE.Raycaster()

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

// mouse
const mouse = new THREE.Vector2();

// event listeners
window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX / sizes.width * 2 - 1;
    mouse.y = - e.clientY / sizes.height * 2 + 1;
})

window.addEventListener('click', ()=>{
    if(currentIntersect){
        switch (currentIntersect.object) {
            case object1:
                console.log('click on object 1') 
                break;
            case object2:
                console.log('click on object 2') 
                break;
            case object3:
                console.log('click on object 3') 
                break;
            default:
                break;
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const bg = new THREE.BufferGeometry();
const posi = new Float32Array([-3,0,0,2,0,0]);
bg.setAttribute('position', new THREE.BufferAttribute(posi,3))
const line = new THREE.Line(bg, new THREE.LineBasicMaterial());
scene.add(line)

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects

    object1.position.y = Math.sin(elapsedTime * 0.5) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    // cast a ray
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(objectsToTest)
    const inters = raycaster.intersectObject(object1)
    if(inters.length){

    console.log(intersects, inters)
    }

    for(const obj of objectsToTest){
        obj.material.color.set('red')
    }

    for(const intersect of intersects){
        intersect.object.material.color.set('blue');
    }

    if(intersects.length){
        if(currentIntersect === null){
            // console.log('mouseenter')
        }
        currentIntersect = intersects[0];
    }else{
        if(currentIntersect !== null){
            // console.log('mouseleave')
        }
        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()