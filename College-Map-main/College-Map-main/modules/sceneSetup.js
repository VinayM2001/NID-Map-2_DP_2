import * as THREE from 'three';

export const scene = new THREE.Scene();

// create renderer and expose a small helper to attach canvas container
export const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;

// helper: attach renderer.domElement into container element from index.html
export function attachCanvasTo(container){
  if (!container) {
    document.body.appendChild(renderer.domElement);
  } else {
    // clear && append
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
  }
}

// optional debug axes
export function addDebugAxes(size = 2){
  const axes = new THREE.AxesHelper(size);
  scene.add(axes);
}
