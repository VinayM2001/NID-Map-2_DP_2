import * as THREE from "three";

let enabled = false;
let targetRotation = 0;
let currentRotation = 0;
let pivot = new THREE.Vector3();

export function enableOrientation(state) {
    enabled = state;
}

export function setPivot(point) {
    pivot.copy(point);
}

export function updateOrientation(model) {
    if (!enabled || !model) return;

    window.addEventListener("deviceorientation", (e) => {
        // Rotation in radians (smooth)
        targetRotation = THREE.MathUtils.degToRad(e.alpha);
    });

    // Smooth follow
    currentRotation += (targetRotation - currentRotation) * 0.06;

    model.position.sub(pivot);
    model.rotation.y = currentRotation;
    model.position.add(pivot);
}
