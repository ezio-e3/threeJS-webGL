import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animation
let time = Date.now();
const clock = new THREE.Clock()
const loop = () => {
    // delta time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time;
    // time = currentTime

    //Update object using delta time
    // mesh.rotation.y += 0.001 * deltaTime

    //clock
    const elapsedTime = clock.getElapsedTime();

    //Update object using clock
    // mesh.rotation.y = elapsedTime;

    //Update object using sin() oscillation
    camera.position.y = Math.sin(elapsedTime) 
    camera.position.x = Math.cos(elapsedTime) 
    camera.lookAt(mesh.position)


    // Renderer
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

//GSAP
gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})

const gsapLoop = () => {
  // Renderer
  renderer.render(scene, camera)
  window.requestAnimationFrame(gsapLoop)
}
gsapLoop()
