// main.js - bootstraps the modular 3D campus map
import { scene, renderer, attachCanvasTo } from './modules/sceneSetup.js';
import { camera, controls } from './modules/cameraSetup.js';
import { setupLighting } from './modules/lightingSetup.js';
import { loadModel, modelGroup, resetModelGroupPosition } from './modules/modelLoader.js';
import { initDeviceOrientation, enableOrientation, disableOrientation, setPivotPoint, isOrientationOn } from './modules/deviceOrientation.js';
import { setupUI } from './modules/uiSetup.js';

// 1) Attach renderer canvas into the container (index.html)
attachCanvasTo(document.getElementById('canvasContainer'));

// 2) Lighting
setupLighting(scene);

// 3) UI wiring (top-right panel buttons and compass)
setupUI({
  loadModelFn: (name) => {
    // load one model at a time
    loadModel(name);
    // ensure modelGroup origin reset
    resetModelGroupPosition();
  },
  enableOrientation,
  disableOrientation,
  toggleOrientation: () => {
    if (isOrientationOn()) disableOrientation(); else enableOrientation();
  }
});

// 4) Device-orientation init (this will listen but only act when enabled)
initDeviceOrientation({ pivotSetter: setPivotPoint });

// 5) Load default model
loadModel('Insti_map_Final.glb');

// 6) Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 7) Animation loop
(function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();
