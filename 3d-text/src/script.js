import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
/**
 * Cursor tracking
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / window.innerWidth  - 0.5
    cursor.y = - (e.clientY / window.innerHeight - 0.5)
})
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x323232)
// //Axes Helper 

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const mapCapTexture = textureLoader.load('/textures/matcaps/4.png')

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Fonts
 */
 const fontLoader = new THREE.FontLoader()
 fontLoader.load(
     '/fonts/sans_regular.typeface.json', (font) => {
         const textGeometry = new THREE.TextBufferGeometry(
             'Bye World', {
                 font: font,
                 size: 0.5,
                 height: 0.2,
                 curveSegments: 3,
                 bevelEnabled: true,
                 bevelThickness: 0.03,
                 bevelSize: 0.03,
                 bevelOffset: 0,
                 bevelSegments: 4
             }
         )
        //  textGeometry.computeBoundingBox()
        //  textGeometry.translate(
        //     - textGeometry.boundingBox.max.x  * 0.5,
        //     - textGeometry.boundingBox.max.y  * 0.5,
        //     - textGeometry.boundingBox.max.z  * 0.5
        //  )
         textGeometry.center()    
         const material = new THREE.MeshMatcapMaterial({ matcap: mapCapTexture })
         const text = new THREE.Mesh(textGeometry,  material)
         const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
         const squareGeometry = new THREE.BoxBufferGeometry(0.7, 0.7, 0.7)
         scene.add(text)

         Array.from({ length : 150 }).forEach(() => {
             const donut = new THREE.Mesh(donutGeometry, material)
             //randomise donut positions
             donut.position.set(
                 (Math.random() - 0.5) * 20,
                 (Math.random() - 0.5) * 20,
                 (Math.random() - 0.5) * 20
             ) 
             donut.rotation.x = Math.random() * Math.PI
             donut.rotation.y = Math.random() * Math.PI
             
             const scale = Math.random()
             donut.scale.set(scale, scale, scale)
             scene.add(donut)
         })
         Array.from({ length : 150 }).forEach(() => {
            const square = new THREE.Mesh(squareGeometry, material)

            //randomise donut positions
            square.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            )
             
            square.rotation.x = Math.random() * Math.PI
            square.rotation.y = Math.random() * Math.PI
            
            const scale = Math.random()
            square.scale.set(scale, scale, scale)
            scene.add(square)
        })

     })
 
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
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enableZoom = false
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
    //Update objects

    camera.position.x = Math.sin(elapsedTime * 0.02 * Math.PI * 2) * 6
    camera.position.z = Math.cos(elapsedTime *  0.02 *  Math.PI * 2) * 6
    camera.position.y = cursor.y * 10

    // Render
    renderer.render(scene, camera)
     // Update controls
     controls.update()

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()