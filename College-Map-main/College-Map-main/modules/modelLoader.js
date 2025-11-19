import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from './sceneSetup.js';

// single modelGroup container. We add one model at a time to this group.
export let modelGroup = new THREE.Group();
let currentModel = null;

const loader = new GLTFLoader();

// Load a model (removes previous). modelName must match files in /assets
// Example: loadModel('Insti_map_Final.glb')
export function loadModel(modelName){
  if (!modelName) return;
  const path = `./assets/${modelName}`;

  // remove previous
  if (modelGroup) {
    scene.remove(modelGroup);
    modelGroup = new THREE.Group();
  }

  // placeholder to ensure something visible while loading
  const placeholder = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    new THREE.MeshStandardMaterial({ color: 0xdddddd })
  );
  placeholder.rotateX(-Math.PI/2);
  modelGroup.add(placeholder);
  scene.add(modelGroup);

  console.log('Loading model:', path);

  loader.load(
    path,
    (gltf) => {
      // clear placeholder
      modelGroup.clear();

      const model = gltf.scene;

      // make sure meshes cast/receive shadows and show both sides if needed
      model.traverse((c) => {
        if (c.isMesh){
          c.castShadow = true;
          c.receiveShadow = true;
          if (c.material) c.material.side = THREE.DoubleSide;
        }
      });

      // compute bbox to scale & center
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = (maxDim > 0) ? (4 / maxDim) : 1;

      model.scale.setScalar(scale);
      // translate model so its center sits at origin (0,0,0)
      model.position.sub(center.multiplyScalar(scale));

      // add model
      modelGroup.add(model);
      scene.add(modelGroup);
      currentModel = model;

      console.log('Loaded:', modelName, 'scale:', scale);

    },
    (xhr) => {
      if (xhr.total) console.log('Model progress: ' + Math.round(xhr.loaded / xhr.total * 100) + '%');
    },
    (err) => {
      console.error('Model load failed:', err);
      alert('Model load failed (check console). Make sure the GLB files are at ./assets/ and served from HTTP server.');
    }
  );
}

// reset the modelGroup transform (keeps currently loaded model)
export function resetModelGroupPosition(){
  if (modelGroup) modelGroup.position.set(0,0,0);
}

// helper to get current model (if needed by other modules)
export function getCurrentModel(){ return currentModel; }
