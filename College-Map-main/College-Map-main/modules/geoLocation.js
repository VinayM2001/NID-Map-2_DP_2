import * as THREE from 'three';
import { controls } from './cameraSetup.js';
import { modelGroup } from './modelLoader.js';

// Option A: user marker stays at screen center; model moves around it.
const userMarker = new THREE.Mesh(
  new THREE.SphereGeometry(0.06, 12, 12),
  new THREE.MeshStandardMaterial({ color: 0x00bfff })
);
userMarker.visible = false;

export function initGeoLocation(scene, controlsRef){
  scene.add(userMarker);

  if (!('geolocation' in navigator)){
    console.warn('Geolocation not supported by browser');
    return;
  }

  // Watch position and update marker; mapping to model coords is project-specific.
  navigator.geolocation.watchPosition((pos)=>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // SIMPLE mapping: normalize fractional part to scene units — adjust for real mapping
    const x = ((lon % 1) - 0.5) * 10; // center around 0
    const z = ((lat % 1) - 0.5) * 10;

    userMarker.position.set(x, 0.05, z);
    userMarker.visible = true;

    // Keep user marker as the camera target (center of screen)
    controls.target.copy(userMarker.position);
    controls.update();

    // Move modelGroup so that user remains visually at center (model translates)
    if (modelGroup) {
      modelGroup.position.set(-x, 0, -z);
    }

  }, (err)=>{ console.error('Geolocation error:', err); }, { enableHighAccuracy:true, maximumAge:2000, timeout:5000 });
}

export function getUserMarker(){ return userMarker; }

// helper to set marker from lat/lon (for calibration/testing)
export function setUserFromLatLon(lat, lon){
  const x = ((lon % 1) - 0.5) * 20;
  const z = ((lat % 1) - 0.5) * 20;
  userMarker.position.set(x, 0.05, z);
  userMarker.visible = true;
  if (modelGroup) modelGroup.position.set(-x,0,-z);
  controls.target.copy(userMarker.position);
  controls.update();
}
