const cells = document.querySelector('.game2048__cells');
const restart = document.querySelector('.game2048__restart')
let cellStatus = [];

createRandomUnit();


restart.onclick = (event) => {
    cleanBorad();
    cellStatus = [];
    createRandomUnit();
}

function createRandomUnit() {
    const unit = document.createElement('div');
    unit.className = 'game2048__unit';
    unit.innerHTML = Math.random() < 0.8 ? '2' : '4';

    const posX = Math.floor(Math.random() * 4 + 1);
    const posY = Math.floor(Math.random() * 4 + 1);

    if (!isBusy(posX, posY)){
        unit.style.setProperty('--posX', posX);
        unit.style.setProperty('--posY', posY);
        unit.style.setProperty('background', getColor(unit));
    
        cells.appendChild(unit);
        cellStatus.push(`${posX}${posY}`);
    }else {
        createRandomUnit();
    }
}

function cleanBorad() {
    const units = document.querySelectorAll('.game2048__unit');
    units.forEach((item) => {
        cells.removeChild(item);
    })
}

function isBusy(x, y) {
    return cellStatus.includes(`${x}${y}`);
}

function getColor(cell) {
    switch(cell.innerHTML) {
        case '2':
            return 'red';
        case '4':
            return 'orange';
        case '8':
            return 'yellow';
        case '16':
            return 'green';
        case '32':
            return 'blue';
        case '64':
            return 'darkblue';
        case '128':
            return 'purple';
        case '256':
            return 'red';
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

document.addEventListener('keydown', function drawLetter(event) {
    if (event.code == 'ArrowUp') {
        console.log('up')
    }
    if (event.code == 'ArrowDown') {
        console.log('down')
    }
    if (event.code == 'ArrowLeft') {
        console.log('left')
    }
    if (event.code == 'ArrowRight') {
        console.log('right')
    }
})

