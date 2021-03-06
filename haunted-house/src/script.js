import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/forest/color.png')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/forest/ambientOcclusion.png')
const grassNormalTexture = textureLoader.load('/textures/forest/normal.png')
const grassRoughnessTexture = textureLoader.load('/textures/forest/roughness.png')
const grassMetalnessTexture = textureLoader.load('/textures/forest/metalness.png')
const grassHeightTexture = textureLoader.load('/textures/forest/height.png')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

//Wall 

const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture

    })
)
walls.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 1.25
house.add(walls)

//Roof 
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5, 2, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.position.y = 2.5 + 1
roof.rotation.y = Math.PI / 4
house.add(roof)

//Door 

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.8, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
})
)
door.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y = 1
door.position.z = 4/2 + 0.01
house.add(door)

//Window 

const frontWindow = new THREE.Group()

const frontWindowSquare = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(0.7, 0.7),
    new THREE.MeshStandardMaterial({ 
        color: 0xffffff
    })
)
const frontWindowTop = new THREE.Mesh(
    new THREE.CircleBufferGeometry(0.35, 32, 0, 3.1),
    new THREE.MeshStandardMaterial({ 
        color: 0xffffff
    })
)
frontWindowTop.position.y = 0.3

frontWindow.add(frontWindowSquare, frontWindowTop)
frontWindow.position.y = 1.5
frontWindow.position.x = 1.4
frontWindow.position.z = 4/2 + 0.02
house.add(frontWindow)
//Bushes 

const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial( { color : '#89c854'})

const bushOne = new THREE.Mesh(bushGeometry, bushMaterial)
bushOne.scale.set(0.5, 0.5, 0.5)
bushOne.position.set(0.8, 0.2, 2.2)

const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial)
bushTwo.scale.set(0.25, 0.25, 0.25)
bushTwo.position.set(1.4, 0.1, 2.1)

const bushThree = new THREE.Mesh(bushGeometry, bushMaterial)
bushThree.scale.set(0.4, 0.4, 0.4)
bushThree.position.set(-0.8, 0.1, 2.2)

const bushFour = new THREE.Mesh(bushGeometry, bushMaterial)
bushFour.scale.set(0.15, 0.15, 0.15)
bushFour.position.set(-1, 0.05, 2.6)
house.add(bushOne, bushTwo, bushThree, bushFour)

//Graves 

const graves = new THREE.Group()
scene.add(graves)

const graveVerticalGeometry = new THREE.BoxBufferGeometry(0.2, 1.2, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})
const graveHorizontalGeometry = new THREE.BoxBufferGeometry(0.6, 0.2, 0.2)


for(let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Group()
    const graveVerticalSquare = new THREE.Mesh(graveVerticalGeometry, graveMaterial)
    const graveHorizontalSquare = new THREE.Mesh(graveHorizontalGeometry, graveMaterial)
    graveHorizontalSquare.position.y = 0.25
    grave.add(graveVerticalSquare, graveHorizontalSquare)
    grave.position.set(x, 0.3, z)

    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    graves.add(grave)
}

// Floor    
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
        metalnessMap: grassMetalnessTexture,
        transparent: true,
        displacementMap: grassHeightTexture,
        displacementScale: 0.1,
    })
)
floor.geometry.setAttribute('uv2', 
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


/**
 * Sizes
 */
const ghostOne = new THREE.PointLight(0x751b1b, 2, 3)
const parameters = {
    color: 0x751b1b
}
gui
    .addColor(parameters, 'color')
    .onChange(() => {
        ghostOne.color.set(parameters.color)
    })
    .name('ghostOne color')
// const ghostTwo = new THREE.PointLight(0x2d5cb6, 2, 3)

// const ghostThree = new THREE.PointLight(0x72807, 2, 3)

scene.add(ghostOne, 
    // ghostTwo, ghostThree
    )
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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
moonLight.castShadow = true
doorLight.castShadow = true
ghostOne.castShadow = true
// ghostTwo.castShadow = true
// ghostThree.castShadow = true

walls.castShadow = true
bushOne.castShadow = true
bushTwo.castShadow = true
bushThree.castShadow = true
bushFour.castShadow = true

floor.receiveShadow = true

//Optimise shadow maps -- check with shadow helper

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghostOne.shadow.mapSize.width = 256
ghostOne.shadow.mapSize.height = 256
ghostOne.shadow.camera.far = 7

// ghostTwo.shadow.mapSize.width = 256
// ghostTwo.shadow.mapSize.height = 256
// ghostTwo.shadow.camera.far = 7

// ghostThree.shadow.mapSize.width = 256
// ghostThree.shadow.mapSize.height = 256
// ghostThree.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Update ghosts 

    const ghostOneAngle = elapsedTime * 0.5
    ghostOne.position.x = Math.sin(ghostOneAngle) * 4
    ghostOne.position.z = Math.cos(ghostOneAngle) * 4
    ghostOne.position.y = Math.sin(elapsedTime * 3)

    // const ghostTwoAngle = - elapsedTime * 0.32
    // ghostTwo.position.x = Math.sin(ghostTwoAngle) * 5
    // ghostTwo.position.z = Math.cos(ghostTwoAngle) * 5
    // ghostTwo.position.y = Math.sin(elapsedTime * 3)

    // const ghostThreeAngle = - elapsedTime * 0.18
    // ghostThree.position.x = Math.cos(ghostThreeAngle) * (7 + Math.sin(elapsedTime * 0.32))
    // ghostThree.position.z = Math.sin(ghostThreeAngle) * (7 + Math.sin(elapsedTime * 0.5))
    // ghostThree.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()