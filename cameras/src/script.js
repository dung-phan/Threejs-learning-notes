import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    //you want to the range when the mouse moves to the left or right 
    //to fall between 0 and 1, hence the division
    //minus 0.5 to make the range have positive and negative values
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = - (event.clientY / window.innerHeight - 0.5)
})
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// const aspectRatio = window.innerWidth/window.innerHeight
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, 
//     1, 
//     1*aspectRatio, 
//     -1, 
//     0.1, 100
// )
camera.position.z = 3
scene.add(camera)
//Axes helper 

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

//Controls 
const controls = new OrbitControls(camera, canvas)
//make the movements smoother
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Update camera with cursor move
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor. y * 10

    //move the cube around in a circle 
    //we can use sin and cos 
    //math.pi * 2 is used to create ONE full circle
    //multiple by 3 so at least the camera won't be too closed 
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 3
    //so the camera will move its position based on the cursor's movement
    //look at the cube position
    // camera.lookAt(mesh.position)

    
    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Render
    renderer.render(scene, camera)

    //Update controls on each frame
    controls.update()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()