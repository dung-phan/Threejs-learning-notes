import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js'

const scene = new THREE.Scene() 

//create a MESH which includes geometry(shape) and material(how it looks)
//create a red cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight)
camera.position.z = 2
scene.add(camera)

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl')
})
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.render(scene, camera) 