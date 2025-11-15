import * as THREE from 'three';
import { controls } from './cameraSetup.js';
import { setPivotPoint, enableOrientation, disableOrientation, isOrientationOn } from './deviceOrientation.js';
import { loadModel, modelGroup, resetModelGroupPosition } from './modelLoader.js';

// UI wires top-right panel and compass button bottom-right.
// Exports setupUI which main.js calls, passing the loadModel callback.

export function setupUI({ loadModelFn, enableOrientation: enableFn, disableOrientation: disableFn, toggleOrientation } = {}){
  // create panel
  const panel = document.getElementById('uiPanel');
  panel.innerHTML = `
    <button id="btnInsti" class="ui-button selected">Map</button>
    <button id="btnG" class="ui-button">G</button>
    <button id="btn1" class="ui-button">1</button>
    <button id="btn2" class="ui-button">2</button>
  `;

  function setSelected(el){
    panel.querySelectorAll('.ui-button').forEach(b=>b.classList.remove('selected'));
    if (el) el.classList.add('selected');
  }

  // button handlers
  panel.querySelector('#btnInsti').addEventListener('click', (e)=>{
    setSelected(e.target);
    loadModelFn('Insti_map_Final.glb');
    resetModelGroupPosition();
  });
  panel.querySelector('#btnG').addEventListener('click', (e)=>{
    setSelected(e.target);
    loadModelFn('G_floor_Final.glb');
    resetModelGroupPosition();
  });
  panel.querySelector('#btn1').addEventListener('click', (e)=>{
    setSelected(e.target);
    loadModelFn('1st_floor_Final.glb');
    resetModelGroupPosition();
  });
  panel.querySelector('#btn2').addEventListener('click', (e)=>{
    setSelected(e.target);
    loadModelFn('2nd_floor_Final.glb');
    resetModelGroupPosition();
  });

  // compass bottom-right toggle
  const orientBtn = document.getElementById('orientBtn');
  orientBtn.addEventListener('click', ()=>{
    if (isOrientationOn()){
      disableOrientation();
      orientBtn.classList.remove('active');
    } else {
      enableOrientation();
      orientBtn.classList.add('active');
    }
  });

  // Pointerup/tap to set pivot (after click finished)
  // Raycast to world position on model; fallback: center of screen if no hit
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function setPivotFromPointer(clientX, clientY){
    const canvas = document.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    ray.setFromCamera(pointer, controls.object); // note: controls.object is camera
    // raycast against modelGroup children
    const objs = modelGroup.children.length ? modelGroup.children : [];
    const intersects = ray.intersectObjects(objs, true);
    if (intersects.length > 0){
      const p = intersects[0].point.clone();
      setPivotPoint(p);
      // also keep camera target at pivot so user sees pivot centered
      controls.target.copy(p);
      controls.update();
    } else {
      // fallback: pivot = camera's world center (target)
      const fallback = controls.target.clone();
      setPivotPoint(fallback);
    }
  }

  // use pointerup so action occurs after click/tap completes
  const canvas = document.querySelector('canvas');
  canvas.addEventListener('pointerup', (e)=>{
    setPivotFromPointer(e.clientX, e.clientY);
  });

  // Also allow double-click to recenter camera to clicked point (explore mode)
  canvas.addEventListener('dblclick', (e)=>{
    // recenter controls target to clicked point (same ray logic)
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    ray.setFromCamera(pointer, controls.object);
    const objs = modelGroup.children.length ? modelGroup.children : [];
    const intersects = ray.intersectObjects(objs, true);
    if (intersects.length > 0){
      const p = intersects[0].point.clone();
      controls.target.copy(p);
      controls.update();
    }
  });
}
