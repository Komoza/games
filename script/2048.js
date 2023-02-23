const cells = document.querySelector('.game2048__cells');
const restart = document.querySelector('.game2048__restart')

let arrayCells = new Array(4);
for (let i = 0; i < 4; i++) {
    arrayCells[i] = new Array(4);
}

reloadArrayCells();
createRandomUnit();
createRandomUnit();

restart.onclick = (event) => {
    cleanBoard();
    reloadArrayCells();
    createRandomUnit();
    createRandomUnit();
    drawBoard();
}

function drawBoard() {
    cleanBoard();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arrayCells[i][j] !== 0) {
                const unit = document.createElement('div');
                unit.className = 'game2048__unit';
                unit.style.setProperty('--posX', i + 1);
                unit.style.setProperty('--posY', j + 1);
                unit.innerHTML = arrayCells[i][j];

                setPropertyUnit(unit);
                cells.appendChild(unit);
            }
        }
    }
}

function reloadArrayCells()  {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++){
            arrayCells[i][j] = 0;
        }
    }
}

function createRandomUnit(val) {
    const posX = Math.floor(Math.random() * 4 + 1);
    const posY = Math.floor(Math.random() * 4 + 1);

    if (isEmpty(posX, posY)){                   // зацикливается на проигрыше
        arrayCells[posX - 1][posY - 1] = Math.random() < 0.7 ? 2 : 4;
    }else {
        createRandomUnit();
    }
    drawBoard();
}

function cleanBoard() {
    const units = document.querySelectorAll('.game2048__unit');
    units.forEach((item) => {
        cells.removeChild(item);
    })
}

function isEmpty(x, y) {
    if (arrayCells[x - 1][y - 1] !== 0) {
        return false;
    }
    return true;
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
        moveCellsUp(); 
        drawBoard();
        createRandomUnit();
    }
    if (event.code == 'ArrowDown') {
        moveCellsDown(); 
        drawBoard();
        createRandomUnit();
    }
    if (event.code == 'ArrowLeft') {
        moveCellsLeft(); 
        drawBoard();
        createRandomUnit();
    }
    if (event.code == 'ArrowRight') {
        moveCellsRight(); 
        drawBoard();
        createRandomUnit();
    }
})

function moveCellsUp() {
    for (let i = 0; i < 4; i++){
        for (let j = 1; j < 4; j++) {
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i + 1, j)) {
                    arrayCells[i][j - 1] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsUp();
                    break;
                }
                if (arrayCells[i][j] === arrayCells[i][j - 1]) {
                    arrayCells[i][j - 1] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                }
            }
        }
    }
}

function moveCellsLeft() {
    for (let i = 1; i < 4; i++){
        for (let j = 0; j < 4; j++) {
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i, j + 1)) {
                    arrayCells[i - 1][j] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsLeft();
                    break;
                }
                if (arrayCells[i][j] === arrayCells[i - 1][j]) {
                    arrayCells[i - 1][j] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                }
            }
        }
    }
}

function moveCellsDown() {
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 3; j++) {
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i + 1, j + 2)) {
                    arrayCells[i][j + 1] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsDown();
                    break;
                }
                if (arrayCells[i][j] === arrayCells[i][j + 1]) {
                    arrayCells[i][j + 1] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                }
            }
        }
    }
}

function moveCellsRight() {
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 4; j++) {
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i + 2, j + 1)) {
                    arrayCells[i + 1][j] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsRight();
                    break;
                }
                if (arrayCells[i][j] === arrayCells[i + 1][j]) {
                    arrayCells[i + 1][j] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                }
            }
        }
    }
}