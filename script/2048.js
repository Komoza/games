const gameBoard = document.querySelector('.game-board');
createRandomUnit();

function createRandomUnit() {
    const unit = document.createElement('div');
    unit.className = 'unit';
    unit.innerHTML = Math.random() < 0.7 ? '2' : '4';
    unit.style.setProperty('--posX', Math.floor(Math.random() * 4 + 1));
    unit.style.setProperty('--posY', Math.floor(Math.random() * 4 + 1));
    gameBoard.append(unit);
}


