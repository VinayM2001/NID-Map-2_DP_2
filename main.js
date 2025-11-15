import { scene, renderer } from './modules/sceneSetup.js';
import { camera, controls } from './modules/cameraSetup.js';
import { addLights } from './modules/lightingSetup.js';
import { loadModel, modelGroup } from './modules/modelLoader.js';
import { setupDeviceOrientation } from './modules/deviceOrientation.js';
import { setupUI } from './modules/uiSetup.js';
import { initGeoLocation } from './modules/geoLocation.js';

// Scene setup
addLights(scene);
setupUI(scene, camera, controls, loadModel);
setupDeviceOrientation(scene);
initGeoLocation(scene);

// Load default model on start
loadModel(scene, 'Insti_map_Final.glb');

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
