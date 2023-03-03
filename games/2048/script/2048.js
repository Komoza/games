const cells = document.querySelector(".game2048__cells");
const restart = document.querySelector(".game2048__restart");
let units = 0;
let score = document.querySelector(".game2048__score--val");

let arrayCells = new Array(4);
for (let i = 0; i < 4; i++) {
  arrayCells[i] = new Array(4);
}

const mainMenu = document.querySelector(".game2048__main-menu");
mainMenu.onclick = (event) => {
  document.location.href = "../../index.html";
};
const tryAgain = document.querySelector(".game2048__try-again");
tryAgain.onclick = (event) => {
  cleanBoard();
  reloadArrayCells();
  document
    .querySelector(".game2048__lose-form")
    .style.setProperty("display", "none");
  createRandomUnit();
  createRandomUnit();
};
const continueBtn = document.querySelector(".game2048__continue");
continueBtn.onclick = (event) => {
  document
    .querySelector(".game2048__win-form")
    .style.setProperty("display", "none");
};
const tryAgainWin = document.querySelector(".game2048__try-again--win");
tryAgainWin.onclick = (event) => {
  cleanBoard();
  reloadArrayCells();
  document
    .querySelector(".game2048__win-form")
    .style.setProperty("display", "none");
  createRandomUnit();
  createRandomUnit();
};

reloadArrayCells();
createRandomUnit();
createRandomUnit();

restart.onclick = (event) => {
  cleanBoard();
  reloadArrayCells();
  document.querySelector(".game2048__lose-form").style.setProperty("display", "none");
  document.querySelector(".game2048__win-form").style.setProperty("display", "none");
  createRandomUnit();
  createRandomUnit();
};

function reloadArrayCells() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      arrayCells[i][j] = 0;
    }
  }
}

function createRandomUnit(val) {
  units = document.querySelectorAll(".game2048__unit");
  const posX = Math.floor(Math.random() * 4);
  const posY = Math.floor(Math.random() * 4);

  if (isEmpty(posX, posY)) {
    arrayCells[posX][posY] = Math.random() < 0.7 ? 2 : 4;
    const unit = document.createElement("div");
    unit.className = "game2048__unit";
    unit.style.setProperty("--posX", posX);
    unit.style.setProperty("--posY", posY);
    unit.innerHTML = arrayCells[posX][posY];

    setPropertyUnit(unit);
    cells.appendChild(unit);
  } else {
    createRandomUnit();
  }
}

function cleanBoard() {
  units = document.querySelectorAll(".game2048__unit");
  score.innerHTML = "0";
  units.forEach((item) => {
    cells.removeChild(item);
  });
}

function isEmpty(x, y) {
  if (arrayCells[x][y] !== 0) {
    return false;
  }
  return true;
}

function setPropertyUnit(cell) {
  switch (cell.innerHTML) {
    case "2":
      cell.style.setProperty("background", "rgb(240, 228, 217)");
      cell.style.setProperty("color", "rgb(121, 112, 99)");
      cell.style.setProperty("font-size", "8vmin");
      return cell;
    case "4":
      cell.style.setProperty("background", "rgb(238, 225, 199)");
      cell.style.setProperty("color", "rgb(121, 112, 99)");
      cell.style.setProperty("font-size", "8vmin");
      return cell;
    case "8":
      cell.style.setProperty("background", "rgb(253, 175, 112)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "8vmin");
      return cell;
    case "16":
      cell.style.setProperty("background", "rgb(255, 143, 86");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "7vmin");
      return cell;
    case "32":
      cell.style.setProperty("background", "rgb(255, 112, 80");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "7vmin");
      return cell;
    case "64":
      cell.style.setProperty("background", "rgb(255, 70, 18)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "6vmin");
      return cell;
    case "128":
      cell.style.setProperty("background", "rgb(241, 210, 104)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "6vmin");
      return cell;
    case "256":
      cell.style.setProperty("background", "rgb(241, 208, 86)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "6vmin");
      return cell;
    case "512":
      cell.style.setProperty("background", "rgb(240, 203, 65)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "6vmin");
      return cell;
    case "1024":
      cell.style.setProperty("background", "rgb(242, 201, 39)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "5vmin");
      return cell;
    case "2048":
      cell.style.setProperty("background", "rgb(243, 197, 0)");
      cell.style.setProperty("color", "rgb(255, 246, 230)");
      cell.style.setProperty("font-size", "5vmin");
      showWinWindow();
      return cell;

    default:
      cell.style.setProperty("background", "black");
      cell.style.setProperty("font-size", "4vmin");
  }
}

document.addEventListener("keydown", event =>{
  switch (event.code) {
    case "ArrowUp":
      if (moveCellsUp()) {
        createRandomUnit();
      }
      checkLose();
      return;
    case "ArrowDown":
      if (moveCellsDown()) {
        createRandomUnit();
      }
      checkLose();
      return;
    case "ArrowLeft":
      if (moveCellsLeft()) {
        createRandomUnit();
      }
      checkLose();
      return;
    case "ArrowRight":
      if (moveCellsRight()) {
        createRandomUnit();
      }
      checkLose();
      return;
    default:
      return;
  }
});

function moveCellsUp() {
  let isWasMove = false;
  let wasShift = true;
  let count = 0;
  while (wasShift) {
    wasShift = shiftUp();
    if (count > 0) {
      isWasMove = true;
    }
    count += 1;
  }

  for (let j = 1; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      if (arrayCells[i][j] !== 0) {
        if (arrayCells[i][j] === arrayCells[i][j - 1]) {
          isWasMove = true;
          arrayCells[i][j - 1] += arrayCells[i][j];
          arrayCells[i][j] = 0;
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j - 1 == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              cells.removeChild(item);
            }
          });
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posY", j - 1);
              item.innerHTML = arrayCells[i][j - 1];
              score.innerHTML =
                Number(score.innerHTML) + Number(item.innerHTML);
              setPropertyUnit(item);
            }
          });
          wasShift = true;
          while (wasShift) {
            wasShift = shiftUp();
          }
        }
      }
    }
  }
  return isWasMove;
}

function moveCellsDown() {
  let isWasMove = false;
  let wasShift = true;
  let count = 0;
  while (wasShift) {
    wasShift = shiftDown();
    if (count > 0) {
      isWasMove = true;
    }
    count += 1;
  }

  for (let j = 2; j >= 0; j--) {
    for (let i = 0; i < 4; i++) {
      if (arrayCells[i][j] !== 0) {
        if (arrayCells[i][j] === arrayCells[i][j + 1]) {
          isWasMove = true;
          arrayCells[i][j + 1] += arrayCells[i][j];
          arrayCells[i][j] = 0;
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j + 1 == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              cells.removeChild(item);
            }
          });
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posY", j + 1);
              item.innerHTML = arrayCells[i][j + 1];
              score.innerHTML =
                Number(score.innerHTML) + Number(item.innerHTML);
              setPropertyUnit(item);
            }
          });
          wasShift = true;
          while (wasShift) {
            wasShift = shiftDown();
          }
        }
      }
    }
  }
  return isWasMove;
}

function moveCellsLeft() {
  let isWasMove = false;
  let wasShift = true;
  let count = 0;

  while (wasShift) {
    wasShift = shiftLeft();
    if (count > 0) {
      isWasMove = true;
    }
    count += 1;
  }

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (arrayCells[i][j] !== 0) {
        if (arrayCells[i][j] === arrayCells[i - 1][j]) {
          isWasMove = true;
          arrayCells[i - 1][j] += arrayCells[i][j];
          arrayCells[i][j] = 0;
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i - 1 == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              cells.removeChild(item);
            }
          });
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posX", i - 1);
              item.innerHTML = arrayCells[i - 1][j];
              score.innerHTML =
                Number(score.innerHTML) + Number(item.innerHTML);
              setPropertyUnit(item);
            }
          });
          wasShift = true;
          while (wasShift) {
            wasShift = shiftLeft();
          }
        }
      }
    }
  }
  return isWasMove;
}

function moveCellsRight() {
  let isWasMove = false;
  let wasShift = true;
  let count = 0;

  while (wasShift) {
    wasShift = shiftRight();
    if (count > 0) {
      isWasMove = true;
    }
    count += 1;
  }

  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (arrayCells[i][j] !== 0) {
        if (arrayCells[i][j] === arrayCells[i + 1][j]) {
          isWasMove = true;
          arrayCells[i + 1][j] += arrayCells[i][j];
          arrayCells[i][j] = 0;
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i + 1 == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              cells.removeChild(item);
            }
          });
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posX", i + 1);
              item.innerHTML = arrayCells[i + 1][j];
              score.innerHTML =
                Number(score.innerHTML) + Number(item.innerHTML);
              setPropertyUnit(item);
            }
          });
          wasShift = true;
          while (wasShift) {
            wasShift = shiftRight();
          }
        }
      }
    }
  }
  return isWasMove;
}

//  ==== shifts
function shiftUp() {
  for (let j = 1; j < 4; j++) {
    for (let i = 0; i < 4; i++) {
      if (arrayCells[i][j] !== 0) {
        if (isEmpty(i, j - 1)) {
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posY", j - 1);
            }
          });
          arrayCells[i][j - 1] = arrayCells[i][j];
          arrayCells[i][j] = 0;
          return true;
        }
      }
    }
  }
  return false;
}
function shiftDown() {
  for (let j = 2; j >= 0; j--) {
    for (let i = 0; i < 4; i++) {
      if (arrayCells[i][j] !== 0) {
        if (isEmpty(i, j + 1)) {
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posY", j + 1);
            }
          });
          arrayCells[i][j + 1] = arrayCells[i][j];
          arrayCells[i][j] = 0;
          return true;
        }
      }
    }
  }
  return false;
}
function shiftLeft() {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (arrayCells[i][j] !== 0) {
        if (isEmpty(i - 1, j)) {
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posX", i - 1);
            }
          });
          arrayCells[i - 1][j] = arrayCells[i][j];
          arrayCells[i][j] = 0;
          return true;
        }
      }
    }
  }
  return false;
}
function shiftRight() {
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (arrayCells[i][j] !== 0) {
        if (isEmpty(i + 1, j)) {
          units = document.querySelectorAll(".game2048__unit");
          units.forEach((item) => {
            if (
              i == getComputedStyle(item).getPropertyValue("--posX") &&
              j == getComputedStyle(item).getPropertyValue("--posY")
            ) {
              item.style.setProperty("--posX", i + 1);
            }
          });
          arrayCells[i + 1][j] = arrayCells[i][j];
          arrayCells[i][j] = 0;
          return true;
        }
      }
    }
  }
  return false;
}

function checkLose() {
  let isLose = true;
  if (document.querySelectorAll(".game2048__unit").length === 16) {
    for (let j = 1; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        if (arrayCells[i][j] === arrayCells[i][j - 1]) {
          isLose = false;
        }
      }
    }

    for (let j = 2; j >= 0; j--) {
      for (let i = 0; i < 4; i++) {
        if (arrayCells[i][j] === arrayCells[i][j + 1]) {
          isLose = false;
        }
      }
    }

    for (let i = 1; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (arrayCells[i][j] === arrayCells[i - 1][j]) {
          isLose = false;
        }
      }
    }
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < 4; j++) {
        if (arrayCells[i][j] === arrayCells[i + 1][j]) {
        }
      }
    }

    if (isLose) {
      showLoseWindow();
    }
  }
}

function showLoseWindow() {
  const score = document.querySelector(".game2048__score--val").innerHTML;
  document.querySelector(".game2048__result--val").innerHTML = score;

  document
    .querySelector(".game2048__lose-form")
    .style.setProperty("display", "flex");
}

function showWinWindow() {
  document
    .querySelector(".game2048__win-form")
    .style.setProperty("display", "flex");
}

// add mobile vesion with swipe
