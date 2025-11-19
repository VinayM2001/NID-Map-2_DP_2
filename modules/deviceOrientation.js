import * as THREE from 'three';
import { modelGroup } from './modelLoader.js';

// Device-orientation controller:
// - smooth rotation
// - pivot set by UI (tap) via setPivotPoint()
// - disables user horizontal rotation while orientation is active

let orientOn = false;
let lastAlpha = 0;
let smoothAlpha = 0;
let pivot = new THREE.Vector3(0,0,0);

// smoothing parameter: higher = slower smoothing
const SMOOTHING = 0.12;

// keep track of listeners
let listening = false;

function normDeg(a){ a = a % 360; if (a < 0) a += 360; return a; }

function handleDevice(e){
  if (!orientOn) return;
  const rawAlpha = (typeof e.alpha === 'number') ? e.alpha : 0;
  const alpha = normDeg(rawAlpha);

  // compute diff with wrap-around handling
  let diff = alpha - lastAlpha;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  lastAlpha += diff * SMOOTHING;
  smoothAlpha = normDeg(lastAlpha);

  // rotate modelGroup around pivot smoothly
  if (modelGroup){
    // translate so pivot sits at origin
    modelGroup.position.sub(pivot);
    modelGroup.rotation.y = THREE.MathUtils.degToRad(-smoothAlpha);
    modelGroup.position.add(pivot);
  }
}

// public API
export function initDeviceOrientation({ pivotSetter } = {}){
  // ensure we add event listener only once
  if (listening) return;
  listening = true;
  window.addEventListener('deviceorientation', handleDevice, true);
}

export function enableOrientation(){
  orientOn = true;
  // reset smoothing anchors so rotation starts nicely
  lastAlpha = 0;
  smoothAlpha = 0;
}

export function disableOrientation(){
  orientOn = false;
}

// allow UI to set pivot point (world coordinates)
export function setPivotPoint(vec3){
  pivot.copy(vec3);
}

export function isOrientationOn(){ return orientOn; }
