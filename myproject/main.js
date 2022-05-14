import './style.css'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



//creates scene

const scene = new THREE.Scene()


// creates cmamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)



const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


// renders torus
const geometry = new THREE.TorusGeometry(50, 3, 10, 50);
const material = new THREE.MeshStandardMaterial({ color: 0xAC2B6B });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);


// loads gltf
let loadedModel;
const loader = new GLTFLoader();
loader.load('./cloud_station/scene.gltf', (gltf) => {
  loadedModel = gltf.scene;
  scene.add(loadedModel);
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.scale.set(5, 5, 5);
  gltf.scene.rotation.set(0, 0, 0);









  scene.add(gltf.scene);
})



// const animate = () => {
//   if (loadedModel) {
//     loadedModel.scene.scale.set(10, 10, 10)
//     loadedModel.scene.rotation.x += 0.01;
//     loadedModel.scene.rotation.y += 0.01;
//     loadedModel.scene.rotation.z += 0.01;
//   }

// };


// // create an AudioListener and add it to the camera
// const listener = new THREE.AudioListener();
// camera.add( listener );

// // create a global audio source
// const sound = new THREE.Audio( listener );

// // load a sound and set it as the Audio object's buffer
// const audioLoader = new THREE.AudioLoader();
// audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
// 	sound.setBuffer( buffer );
// 	sound.setLoop( true );
// 	sound.setVolume( 0.5 );
// 	sound.play();
// });



// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



// helpers.

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, scene.gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// adds stats to the page
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);


  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);

}

Array(200).fill().forEach(addStar);

//background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// avatar
// const sunTexture = new THREE.TextureLoader().load('neonCity.jpg');
// const sun = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 3, 3),
//   new THREE.MeshBasicMaterial({ map: sunTexture })
// );

// scene.add(sun);




// animate torus to move
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;



  controls.update();
  renderer.render(scene, camera);
}
animate();

