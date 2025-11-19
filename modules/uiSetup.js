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
}
