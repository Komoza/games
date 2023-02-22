const cells = document.querySelector('.game2048__cells');
const restart = document.querySelector('.game2048__restart')
let cellStatus = [];

createRandomUnit();

// ===== test =====
// createRandomUnit(2);
// createRandomUnit(4);
// createRandomUnit(8);
// createRandomUnit(16);
// createRandomUnit(32);
// createRandomUnit(64);
// createRandomUnit(128);
// createRandomUnit(256);
// createRandomUnit(512);
// createRandomUnit(1024);
// createRandomUnit(2048);

restart.onclick = (event) => {
    cleanBorad();
    cellStatus = [];
    createRandomUnit();
}

function createRandomUnit(val) {
    const unit = document.createElement('div');
    unit.className = 'game2048__unit';
    unit.innerHTML = Math.random() < 0.7 ? '2' : '4';

    // ===== test =====
    // unit.innerHTML = val;

    const posX = Math.floor(Math.random() * 4 + 1);
    const posY = Math.floor(Math.random() * 4 + 1);

    if (!isBusy(posX, posY)){
        unit.style.setProperty('--posX', posX);
        unit.style.setProperty('--posY', posY);
        
        setPropertyUnit(unit);
    
        cells.appendChild(unit);
        cellStatus.push(`${posX}${posY}`);
    }else {
        createRandomUnit();

        // ===== test =====
        // createRandomUnit(val);
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

function setPropertyUnit(cell) {
    switch(cell.innerHTML) {
        case '2':
            cell.style.setProperty('background', 'rgb(240, 228, 217)');
            cell.style.setProperty('color', 'rgb(121, 112, 99)');
            cell.style.setProperty('font-size', '8vmin');
            return cell;
        case '4':
            cell.style.setProperty('background', 'rgb(238, 225, 199)');
            cell.style.setProperty('color', 'rgb(121, 112, 99)');
            cell.style.setProperty('font-size', '8vmin');
            return cell;
        case '8':
            cell.style.setProperty('background', 'rgb(253, 175, 112)');
            cell.style.setProperty('font-size', '8vmin');
            return cell;
        case '16':
            cell.style.setProperty('background', 'rgb(255, 143, 86');
            cell.style.setProperty('font-size', '7vmin');
            return cell;
        case '32':
            cell.style.setProperty('background', 'rgb(255, 112, 80');
            cell.style.setProperty('font-size', '7vmin');
            return cell;
        case '64':
            cell.style.setProperty('background', 'rgb(255, 70, 18)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '128':
            cell.style.setProperty('background', 'rgb(241, 210, 104)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '256':
            cell.style.setProperty('background', 'rgb(241, 208, 86)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '512':
            cell.style.setProperty('background', 'rgb(240, 203, 65)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '1024':
            cell.style.setProperty('background', 'rgb(242, 201, 39)');
            cell.style.setProperty('font-size', '5vmin');
            return cell;
        case '2048':
            cell.style.setProperty('background', 'rgb(243, 197, 0)');
            cell.style.setProperty('font-size', '5vmin');
            return cell;

        default:
            cell.style.setProperty('background', 'black');
            cell.style.setProperty('font-size', '4vmin');
    }
}

document.addEventListener('keyup', function drawLetter(event) {
    if (event.code == 'ArrowUp') {   
        createRandomUnit();
    }
    if (event.code == 'ArrowDown') {
        createRandomUnit();
    }
    if (event.code == 'ArrowLeft') {
        createRandomUnit();
    }
    if (event.code == 'ArrowRight') {
        createRandomUnit();
    }
})

