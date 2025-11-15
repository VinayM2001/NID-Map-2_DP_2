import * as THREE from 'three';

export function setupLighting(scene) {

    scene.environment = null;

    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;

    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.normalBias = 0.02;

    scene.add(sun);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const fill = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    scene.add(fill);
}
