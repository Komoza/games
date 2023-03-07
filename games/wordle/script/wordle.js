import { words } from "./words.js";
let original_word = '';
let current_word = '';
let current_level = 1;
let textLvl = document.querySelector('.wordle__level--val')
let modal;


document.querySelector(".wordle__main-menu").onclick = (event) => {
  document.location.href = "../../index.html";
};

document.querySelector(".wordle__main-menu-win").onclick = (event) => {
    document.location.href = "../../index.html";
  };

document.querySelector(".wordle__try-again").onclick = (event) => {
    document.querySelector(".wordle__lose-form").style.setProperty("display", "none");
    cleanBoard();
    generateNewWord();
    current_word = '';
    current_level = 1;
    textLvl.innerText = current_level; 
};


document.querySelector(".wordle__continue").onclick = (event) => {
  document
    .querySelector(".wordle__win-form")
    .style.setProperty("display", "none");
    cleanBoard();
    current_level += 1;
    current_word = '';
    textLvl.innerText = current_level; 
    generateNewWord();
};


document.querySelector(".wordle__restart").onclick = (event) => {
    cleanBoard();
    generateNewWord();
    document.querySelector(".wordle__lose-form").style.setProperty("display", "none");
    document.querySelector(".wordle__win-form").style.setProperty("display", "none");
    current_word = '';
    current_level = 1;
    textLvl.innerText = current_level; 
  };

function generateNewWord() {
    original_word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    // console.log(original_word);
}
generateNewWord();

document.addEventListener('keydown', event => {
    if (!modal) {
        if (event.code == 'Backspace') {
            drawLetter('prev');
            return;
        }
        if (event.key.search(/[А-яЁё]/) != -1) {
            drawLetter('next', event.key.toUpperCase());
            return;
        }
        if (event.code == 'Enter' && current_word.length === 5) {
            checkResult();
            return;
        }
    } else if (event.code == 'Enter') {
        hideWrongWord();
    }
  });

function drawLetter(course, letter) {
    const cells = document.querySelectorAll('.wordle__cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('wordle__cell--active')) {
            if (course === 'next') {
                if (current_word.length !== 5) {
                    current_word += letter; 
                    cells[i].innerHTML = letter;
                    if (current_word.length !== 5) {
                        cells[i].classList.remove(('wordle__cell--active'));
                        cells[i + 1].classList.add('wordle__cell--active');
                    }
                }
                return;
            }
            if (course === 'prev') {
                if (current_word.length !== 0) {
                    if (current_word.length === 5) {
                        cells[i].innerHTML = '';
                        current_word = current_word.slice(0, -1);
                    } else {
                        cells[i - 1].innerHTML = '';
                        cells[i].classList.remove('wordle__cell--active');
                        cells[i - 1].classList.add('wordle__cell--active');
                        current_word = current_word.slice(0, -1);
                    }
                }
                return;
            }
        }
    }
}

function checkResult() {
    if (words.includes(current_word.toUpperCase()) == false) {
        wrongWord();
        return;
    }

    let arrayOriginalWord = original_word.split('');
    let arrayCurrentWord =[];

    const cells = document.querySelectorAll('.wordle__cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('wordle__cell--active')) {
            for (let j = 4; j >= 0; j--){
                arrayCurrentWord.push(cells[i - j]);
            }
            break;
        }
    }

    for (let i = 0; i < 5; i++) {
        if (arrayOriginalWord[i] === arrayCurrentWord[i].innerHTML) {
            setColor(arrayCurrentWord[i], 'right_letter');
            setColorButton(arrayOriginalWord[i], 'right_letter');
            arrayOriginalWord[i] = '';
        }
    }

    if (current_word === original_word) {
        document.querySelector('.wordle__cell--active').classList.remove('wordle__cell--active');
        showWinWindow();
        return;
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (arrayCurrentWord[i].innerHTML === arrayOriginalWord[j] && !arrayCurrentWord[i].classList.contains('right_letter')) {
                setColor(arrayCurrentWord[i], 'wrong_position');
                setColorButton(arrayCurrentWord[i].innerHTML, 'wrong_position'); 
                arrayOriginalWord[j] = '';
            }
        }
    }
    for (let i = 0; i < 5; i++) {
        if (!arrayCurrentWord[i].classList.contains('right_letter') && !arrayCurrentWord[i].classList.contains('wrong_position')) {
            setColor(arrayCurrentWord[i], 'wrong_letter');
            setColorButton(arrayCurrentWord[i].innerHTML, 'wrong_letter');  
        }
    }
    current_word = '';
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('wordle__cell--active')) {
            if (i === 29) {
                cells[i].classList.remove('wordle__cell--active');
                showLoseWindow();
                return;
            }
            cells[i].classList.remove('wordle__cell--active');
            cells[i + 1].classList.add('wordle__cell--active');
            break;
        }
    }
}

function setColor(element, key) {
    if  (key === 'right_letter') {
        element.classList.remove('wrong_position');
        element.classList.add(key);
    } 
    if (key === 'wrong_position') {
        element.classList.add(key);
    }
    if (key === 'wrong_letter') {
        element.classList.add(key);
    }
}

function cleanBoard(){
    let focus =  document.querySelector('.wordle__cell--active');
    if (focus !== null) {
        focus.classList.remove('wordle__cell--active');
    }
    document.querySelector('.wordle__cell').classList.add('wordle__cell--active');

    const cells = document.querySelectorAll('.wordle__cell');
    cells.forEach(cell => {

        cell.classList.remove('right_letter');
        cell.classList.remove('wrong_position');
        cell.classList.remove('wrong_letter');
        cell.innerHTML = '';
    })

    const buttons = document.querySelectorAll('.wordle__key');
    buttons.forEach(button => {
        button.classList.remove('right_letter');
        button.classList.remove('wrong_position');
        button.classList.remove('wrong_letter'); 
    })

}

function setColorButton(letter, key) {
    const buttons = document.querySelectorAll('.wordle__key');
    buttons.forEach(button => {
        if (button.innerText === letter && button.classList != 'right_letter') {
            if  (key === 'right_letter') {
                button.classList.remove('wrong_position');
                button.classList.add(key);
            } 
            if (key === 'wrong_position') {
                button.classList.add(key);
            }
            if (key === 'wrong_letter') {
                button.classList.add(key);
            }
        }
    })
}

function showLoseWindow() {
    document.querySelector(".wordle__result--val").innerHTML = original_word;
  
    document
      .querySelector(".wordle__lose-form")
      .style.setProperty("display", "flex");
  }
  
function showWinWindow() {
    document
      .querySelector(".wordle__win-form")
      .style.setProperty("display", "flex");

      let i = 0;
      document.querySelectorAll('.wordle__letter').forEach(letter => {
        letter.innerHTML = original_word[i];
        console.log(original_word)
        i += 1;
      })
}


document.querySelectorAll(".wordle__key").forEach(button => {
    button.onclick = (event) => {
        if (button.innerText === 'ПРОВЕРИТЬ СЛОВО' && current_word.length === 5) {
            checkResult();
        } else if (button.innerText === '←' ) {
            drawLetter('prev');
        } else if (button.innerText !== 'ПРОВЕРИТЬ СЛОВО') {
            drawLetter('next', button.innerText);
        }
    }
})

function wrongWord() {
    document
    .querySelector(".wordle__wrong-word")
    .style.setProperty("display", "flex");
    modal = true 
}
function hideWrongWord() {
    document
    .querySelector(".wordle__wrong-word")
    .style.setProperty("display", "none");
    modal = false; 
}
// 1. Adaptive for mobile