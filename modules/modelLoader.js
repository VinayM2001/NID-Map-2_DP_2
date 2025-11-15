import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export let modelGroup = new THREE.Group();
let currentModel = null;

export function loadModel(scene, modelName) {
  const loader = new GLTFLoader();
  const path = `./assets/${modelName}`;

  if (modelGroup) scene.remove(modelGroup);
  modelGroup = new THREE.Group();

  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Compute bounding box
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const scale = 3 / Math.max(size.x, size.y, size.z);

      // Center and scale
      model.position.sub(center);
      model.scale.setScalar(scale);

      modelGroup.add(model);
      scene.add(modelGroup);
      currentModel = model;

      console.log(`✅ Loaded: ${modelName}`);
    },
    (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
    (error) => console.error('❌ Model load error:', error)
  );
}
