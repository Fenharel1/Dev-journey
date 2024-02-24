import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#09a9c6'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/gradients/5.jpg')
texture.colorSpace = THREE.SRGBColorSpace;
texture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({
    gradientMap: texture,
    color: parameters.materialColor
});

const directionalLight = new THREE.DirectionalLight("#ffffff",5)
directionalLight.position.set(1,1,0)

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material 
);

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 8),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

const objectDistance = 4;

mesh1.position.y = - objectDistance * 0;
mesh2.position.y = - objectDistance * 1;
mesh3.position.y = - objectDistance * 2;

mesh1.position.x = 2
mesh2.position.x = - 2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3);
scene.add(directionalLight)

const sectionMeshes = [ mesh1, mesh2, mesh3 ]

// particles
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount; i ++){
    positions[i*3] = (Math.random() - 0.5) * 5.5;
    positions[i*3+1] = objectDistance / 2 - Math.random() * objectDistance * 3;
    positions[i*3+2] = (Math.random() - 0.5) * 10;
}
const particlesGeom = new THREE.BufferGeometry();
particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    size: 0.1,
    sizeAttenuation: true
})
const particles = new THREE.Points(particlesGeom, particlesMaterial);
scene.add(particles)
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

const meshGroup = new THREE.Group();
scene.add(meshGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
meshGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// scroll
let scrollY = window.scrollY;
let currentSection = Math.round(scrollY / sizes.height);

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.round(scrollY / sizes.height);
    if(newSection != currentSection){
        currentSection = newSection;
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3'
            }
        )
    }
})

// parallax
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e)=>{
    cursor.x = (-0.5 + e.clientX / sizes.width)
    cursor.y = (-0.5 + e.clientY / sizes.height)
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectDistance;
    const parallaxX = (cursor.x - meshGroup.position.x) * 5 * deltaTime;
    const parallaxY = (- cursor.y - meshGroup.position.y) * 5 * deltaTime;
    meshGroup.position.x += parallaxX;
    // meshGroup.position.x = elapsedTime* 10;
    meshGroup.position.y += parallaxY;

    // Animate meshes
    for( const mesh of sectionMeshes) {
        mesh.rotation.y += deltaTime * 0.3;
        mesh.rotation.x += deltaTime * 0.35;
    }

    // Render
    renderer.render(scene, camera)

    // torus.rotation.y = elapsedTime * 0.3

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()