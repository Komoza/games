import { words } from "./words.js";
let original_word = '';
let current_word = '';
let current_level = 1;
let textLvl = document.querySelector('.wordle__level--val')
const restart = document.querySelector(".wordle__restart");

restart.onclick = (event) => {
    cleanBoard();
    generateNewWord();
    current_word = '';
    current_level = 1;
    textLvl.innerText = current_level; 
  };

function generateNewWord() {
    original_word = words[Math.floor(Math.random() * words.length)].toUpperCase();
}
generateNewWord();

document.addEventListener('keydown', event => {
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
        alert('Такого слова не существует');
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
            arrayOriginalWord[i] = '';
        }
    }

    if (current_word === original_word) {
        current_level += 1;
        current_word = '';
        textLvl.innerText = current_level; 
        generateNewWord();

        console.log('win');
        cleanBoard();
        return;
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (arrayCurrentWord[i].innerHTML === arrayOriginalWord[j] && !arrayCurrentWord[i].classList.contains('right_letter')) {
                setColor(arrayCurrentWord[i], 'wrong_position'); 
                arrayOriginalWord[j] = '';
            }
        }
    }
    for (let i = 0; i < 5; i++) {
        if (!arrayCurrentWord[i].classList.contains('right_letter') && !arrayCurrentWord[i].classList.contains('wrong_position')) {
            setColor(arrayCurrentWord[i], 'wrong_letter'); 
        }
    }
    current_word = '';
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('wordle__cell--active')) {
            if (i === 29) {
                cells[i].classList.remove('wordle__cell--active');
                console.log('lose');
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
    const cells = document.querySelectorAll('.wordle__cell');

    document.querySelector('.wordle__cell--active').classList.remove('wordle__cell--active');
    document.querySelector('.wordle__cell').classList.add('wordle__cell--active');
    cells.forEach(cell => {

        cell.classList.remove('right_letter');
        cell.classList.remove('wrong_position');
        cell.classList.remove('wrong_letter');
        cell.innerHTML = '';
    })
}

// 1. Добавить окна выигрыша и поражения
// 2. Адаптация для телефона