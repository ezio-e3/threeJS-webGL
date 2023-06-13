import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf9e0bb)

//Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_bold.typeface.json', 
(font) => {
    const textGeometry = new TextGeometry(
        'Three.js Donut Shop', 
        {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled : true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4

        }
    )
    textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //    - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //    - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //    - (textGeometry.boundingBox.max.z - 0.03) * 0.5

    // )
    textGeometry.center()

    const textMaterial = new THREE.MeshMatcapMaterial()
    textMaterial.matcap = matCapTexture
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
})

/**
 * Object
 */
const torus = new THREE.TorusGeometry(0.3, 0.2 ,20 ,45)
const torusMaterial = new THREE.MeshMatcapMaterial({matcap : matCapTexture})
for (let i = 0; i < 280; i++){
    const donut = new THREE.Mesh(torus, torusMaterial)
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.x = scale
    donut.scale.y = scale
    donut.scale.z = scale



    scene.add(donut)
}

//scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()