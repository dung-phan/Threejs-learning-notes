import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// create group
const group = new THREE.Group()
scene.add(group)

const arrayColor = [0x845EC2, 0xA178DF, 0xBE93FD, 0xDCB0FF, 0xFACCFF]
// Create objects

const cubes = Array.from(arrayColor).map((color) => new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.7, 0.7), 
    new THREE.MeshBasicMaterial({ color })
  ))
cubes.forEach((cube, index) => {
    cube.position.set(index, index + 4, index - 1)
    group.add(cube)
})
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.z = 2
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

//Clock
const clock = new THREE.Clock()

//animations

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    //Update objects
    group.children.forEach((cube, index) => {
        cube.rotation.set(elapsedTime + index, elapsedTime - 1, elapsedTime + 1)
        cube.position.set(Math.sin(elapsedTime), 1, Math.cos(elapsedTime) - 2)
    })
    //render
    renderer.render(scene, camera)
   window.requestAnimationFrame(tick)
}
tick()