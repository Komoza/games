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
    unit.innerHTML = Math.random() < 0.8 ? '2' : '4';

    let posX = Math.floor(Math.random() * 4 + 1);
    let posY = Math.floor(Math.random() * 4 + 1);

    unit.style.setProperty('--posX', posX);
    unit.style.setProperty('--posY', posY);
    unit.style.setProperty('background', getColor(unit));

    cells.appendChild(unit);
}

function cleanBorad() {
    const units = document.querySelectorAll('.game2048__unit');
    units.forEach((item) => {
        cells.removeChild(item);
    })
}

function getColor(cell) {
    switch(cell.innerHTML) {
        case '2':
            return '#f0cfa1';
        case '4':
            return '#edb05a';
        case '8':
            return '#edb05a';
        case '16':
            return '#edb05a';
        case '32':
            return '#edb05a';
        case '64':
            return '#edb05a';
        case '128':
            return '#edb05a';
        case '256':
            return '#edb05a';
        case '512':
            return '#edb05a';
        case '1024':
            return '#edb05a';
        case '2048':
            return '#edb05a';

        default:
            return '#f0cfa1';
    }
}

