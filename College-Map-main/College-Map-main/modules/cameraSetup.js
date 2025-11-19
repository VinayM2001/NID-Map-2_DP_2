import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { renderer } from './sceneSetup.js';

// Camera: 50mm approximated to FOV ~39.6 deg
export const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(5, 4, 6);

// OrbitControls bound to renderer.domElement
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;

// Camera distance constraints
controls.minDistance = 0.0;   // minimum distance (zoom-in)
controls.maxDistance = 10;  // maximum distance (zoom-out)

// Prevent camera flipping below ground
controls.maxPolarAngle = Math.PI / 2.0;
controls.screenSpacePanning = false;
controls.update();

// small helper to change the camera's target smoothly (used by UI)
export function setControlsTarget(vec3){
  controls.target.copy(vec3);
  controls.update();
}
