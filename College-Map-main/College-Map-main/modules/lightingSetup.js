import * as THREE from 'three';

export function setupLighting(scene){
  // Hemisphere to provide ambient fill
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 2.6);
  hemi.position.set(10, 50, 0);
  scene.add(hemi);

  // Main sun directional light (soft shadows tuned)
  const sun = new THREE.DirectionalLight(0xffffff, 5.6);
  sun.position.set(100, 80, 100);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 200;
  sun.shadow.normalBias = 0.01; // reduce shadow acne
  scene.add(sun);

  // Mild fill from opposite side
  const fill = new THREE.DirectionalLight(0xffffff, 1.5);
  fill.position.set(-10, 8, -10);
  scene.add(fill);
}
