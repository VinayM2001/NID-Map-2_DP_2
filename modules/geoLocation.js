import * as THREE from 'three';

export function initGeoLocation(scene) {
  const markerGeometry = new THREE.SphereGeometry(0.05, 16, 2, 1.72787595947439, 4.73752172161341, 1.5707963267949, 6.283185307179586);
  const markerMaterial = new THREE.MeshStandardMaterial({ color: 0xDE0000 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  scene.add(marker);

  if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log('GPS:', latitude, longitude);
        marker.position.set((longitude % 1) * 10, 0.05, (latitude % 1) * 10);
      },
      (err) => console.error('Geo error:', err),
      { enableHighAccuracy: true }
    );
  } else {
    console.warn('Geolocation not supported.');
  }
}
