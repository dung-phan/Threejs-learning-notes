import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

/**
 * Group Objects
 */
const group = new THREE.Group();
group.position.y = 1
group.scale.y = 1.5
group.rotation.x = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -1.5
group.add(cube2)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ffff })
)
cube3.position.x = 1.5
group.add(cube3)
/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl')
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)