const cells = document.querySelector('.game2048__cells');
const restart = document.querySelector('.game2048__restart');
let units = 0;
let score = document.querySelector('.game2048__score--val')

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
}

function reloadArrayCells()  {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++){
            arrayCells[i][j] = 0;
        }
    }
}

function createRandomUnit(val) {
    units = document.querySelectorAll('.game2048__unit');
    if (units.length === 16) {
        console.log('lose');
        return;
    }
    const posX = Math.floor(Math.random() * 4);
    const posY = Math.floor(Math.random() * 4);

    if (isEmpty(posX, posY)){                  
        arrayCells[posX][posY] = Math.random() < 0.7 ? 2 : 4;
        const unit = document.createElement('div');
        unit.className = 'game2048__unit';
        unit.style.setProperty('--posX', posX);
        unit.style.setProperty('--posY', posY);
        unit.innerHTML = arrayCells[posX][posY];

        setPropertyUnit(unit);
        cells.appendChild(unit); 
    }else {
        createRandomUnit();
    }
}

function cleanBoard() {
    units = document.querySelectorAll('.game2048__unit');
    score.innerHTML = '0';
    units.forEach((item) => {
        cells.removeChild(item);
    })
}

function isEmpty(x, y) {
    if (arrayCells[x][y] !== 0) {
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
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '8vmin');
            return cell;
        case '16':
            cell.style.setProperty('background', 'rgb(255, 143, 86');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '7vmin');
            return cell;
        case '32':
            cell.style.setProperty('background', 'rgb(255, 112, 80');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '7vmin');
            return cell;
        case '64':
            cell.style.setProperty('background', 'rgb(255, 70, 18)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '128':
            cell.style.setProperty('background', 'rgb(241, 210, 104)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '256':
            cell.style.setProperty('background', 'rgb(241, 208, 86)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '512':
            cell.style.setProperty('background', 'rgb(240, 203, 65)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '6vmin');
            return cell;
        case '1024':
            cell.style.setProperty('background', 'rgb(242, 201, 39)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '5vmin');
            return cell;
        case '2048':
            cell.style.setProperty('background', 'rgb(243, 197, 0)');
            cell.style.setProperty('color', 'rgb(255, 246, 230)');
            cell.style.setProperty('font-size', '5vmin');
            return cell;

        default:
            cell.style.setProperty('background', 'black');
            cell.style.setProperty('font-size', '4vmin');
    }
}

document.addEventListener('keyup', function drawLetter(event) {
    switch (event.code) {
        case 'ArrowUp':
            moveCellsUp(); 
            createRandomUnit();
            return;
        case 'ArrowDown':
            moveCellsDown(); 
            createRandomUnit();
            return;
        case 'ArrowLeft':
            moveCellsLeft(); 
            createRandomUnit();
            return;
        case 'ArrowRight':
            moveCellsRight(); 
            createRandomUnit();
            return;
        default:
            return;
    }
})
function moveCellsUp() {
    for (let j = 1; j < 4; j++){
        for (let i = 0; i < 4; i++){
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i, j - 1)){
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posY', j - 1);
                        }
                    })
                    arrayCells[i][j - 1] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsUp();
                    break; 
                }
                if (arrayCells[i][j] === arrayCells[i][j - 1]) {
                    arrayCells[i][j - 1] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j - 1 == getComputedStyle(item).getPropertyValue('--posY')){
                            cells.removeChild(item);
                        }
                    })
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posY', j - 1);
                            item.innerHTML = arrayCells[i][j - 1];
                            score.innerHTML = Number(score.innerHTML) + Number(item.innerHTML);
                            setPropertyUnit(item)
                        }
                    })
                    
                }
            }
        }
    }   
}
function moveCellsDown() {
    for (let j = 2; j >= 0; j--){
        for (let i = 0; i < 4; i++){
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i, j + 1)){
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posY', j + 1);
                        }
                    })
                    arrayCells[i][j + 1] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsDown();
                    break; 
                }
                if (arrayCells[i][j] === arrayCells[i][j + 1]) {
                    arrayCells[i][j + 1] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    units  = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j + 1 == getComputedStyle(item).getPropertyValue('--posY')){
                            cells.removeChild(item);
                        }
                    })
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posY', j + 1);
                            item.innerHTML = arrayCells[i][j + 1];
                            score.innerHTML = Number(score.innerHTML) + Number(item.innerHTML);
                            setPropertyUnit(item)
                        }
                    })
                    
                }
            }
        }
    } 
}
function moveCellsLeft() {
    for (let i = 1; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i - 1, j)){
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posX', i - 1);
                        }
                    })
                    arrayCells[i - 1][j] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsLeft();
                    break; 
                }
                if (arrayCells[i][j] === arrayCells[i - 1][j]) {
                    arrayCells[i - 1][j] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i - 1 == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            cells.removeChild(item);
                        }
                    })
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posX', i - 1);
                            item.innerHTML = arrayCells[i - 1][j];
                            score.innerHTML = Number(score.innerHTML) + Number(item.innerHTML);
                            setPropertyUnit(item)
                        }
                    })
                    
                }
            }
        }
    }
}
function moveCellsRight() {
    for (let i = 2; i >= 0; i--){
        for (let j = 0; j < 4; j++){
            if (arrayCells[i][j] !== 0) {
                if (isEmpty(i + 1, j)){
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posX', i + 1);
                        }
                    })
                    arrayCells[i + 1][j] = arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    moveCellsRight();
                    break; 
                }
                if (arrayCells[i][j] === arrayCells[i + 1][j]) {
                    arrayCells[i + 1][j] += arrayCells[i][j];
                    arrayCells[i][j] = 0;
                    units = document.querySelectorAll('.game2048__unit');
                    units.forEach((item) => {
                        if (i + 1 == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            cells.removeChild(item);
                        }
                    })
                    units.forEach((item) => {
                        if (i == getComputedStyle(item).getPropertyValue('--posX') && j == getComputedStyle(item).getPropertyValue('--posY')){
                            item.style.setProperty('--posX', i + 1);
                            item.innerHTML = arrayCells[i + 1][j];
                            score.innerHTML = Number(score.innerHTML) + Number(item.innerHTML);
                            setPropertyUnit(item)
                        }
                    })
                    
                }
            }
        }
    }
}

// 1. Если не получилось походить, он все равно создает новую ячейку
// 2. Нет окна победы
// 3. Добавить мобильную версию (со свайпами)
