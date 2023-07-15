import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor').onChange(() => {
        material.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const textureLoader = new THREE.TextureLoader()
const objectDistance = 4

const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture,
})
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

/**
 * Particles
 */
const partcileCount = 200
const positions = new Float32Array(partcileCount * 3)

for(let i = 0; i < partcileCount; i++){
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = objectDistance * 0.5 - Math.random() * 10 * sectionMeshes.length
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}
const particlesGeom = new THREE.BufferGeometry()
particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03
})

// Points
const particles = new THREE.Points(particlesGeom, particlesMaterial)
scene.add(particles)

mesh1.position.y = - objectDistance * 0
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

const dirLight = new THREE.DirectionalLight('ffffff', 1)
dirLight.position.set(1 ,1 ,0)
scene.add(dirLight)


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
//Group
const camGroup = new THREE.Group()
scene.add(camGroup)
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
camGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', ()=> {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if(newSection != currentSection){
        currentSection = newSection
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }
    
})

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event)=> {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

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

    //Animate Camera
    camera.position.y  = - scrollY / sizes.height * objectDistance
    const parralaxX = cursor.x * 0.5
    const parralaxY = - cursor.y * 0.5
    camGroup.position.x += (parralaxX - camGroup.position.x) * 5 * deltaTime
    camGroup.position.y += (parralaxY - camGroup.position.y) * 5 * deltaTime

    //Animate Meshes
    for(const mesh of sectionMeshes){
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12

    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()