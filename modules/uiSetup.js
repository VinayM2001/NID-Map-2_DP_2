export function setupUI(loadModel, toggleOrientation) {

    function selectButton(activeBtn) {
        const buttons = document.querySelectorAll('.ui-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        activeBtn.classList.add('selected');
    }

    document.getElementById('instiButton').addEventListener('click', () => {
        loadModel('Insti_map_Final.glb');
        selectButton(document.getElementById('instiButton'));
    });

    document.getElementById('gButton').addEventListener('click', () => {
        loadModel('G_floor_Final.glb');
        selectButton(document.getElementById('gButton'));
    });

    document.getElementById('firstButton').addEventListener('click', () => {
        loadModel('1st_floor_Final.glb');
        selectButton(document.getElementById('firstButton'));
    });

    document.getElementById('secondButton').addEventListener('click', () => {
        loadModel('2nd_floor_Final.glb');
        selectButton(document.getElementById('secondButton'));
    });

    document.getElementById("orientButton").addEventListener("click", toggleOrientation);
}
