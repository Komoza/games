const cells = document.querySelector('.game2048__cells');
const restart = document.querySelector('.game2048__restart')

createRandomUnit();

restart.onclick = (event) => {
    cleanBorad()
    createRandomUnit();
}

function createRandomUnit() {
    const unit = document.createElement('div');
    unit.className = 'game2048__unit';
    unit.innerHTML = Math.random() < 0.7 ? '2' : '4';
    unit.style.setProperty('--posX', Math.floor(Math.random() * 4 + 1));
    unit.style.setProperty('--posY', Math.floor(Math.random() * 4 + 1));
    cells.appendChild(unit);
}

function cleanBorad() {
    const units = document.querySelectorAll('.game2048__unit');
    units.forEach((item) => {
        cells.removeChild(item);
    })
}


