'use strict'

var gLevel = {
    SIDE_SIZE: 4,
    MINESCOUNT: 2,
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    hintsLeft: 3,
    lives: 3,
    isHintOn: false,
}


var gWatchInterval;
var gStartTime;

var gFlippedCount = 0;
var gFlagsOnBoard = 0;

var gBoard;



function initGame() {
    resetHintButton();
    endStopWatch();
    resetGlobals();
    resetSmiley();
    rendLives();
    renderBoard(gLevel.SIDE_SIZE);
    setBombsOnBoard();
    setMinesNegsCount(gBoard);
    setFlagsRemainCount();
}

function resetGlobals() {
    gFlippedCount = 0;
    gFlagsOnBoard = 0;
    gGame.lives = 3;
    gGame.isOn = true;
    gGame.hintsLeft = 3;
    gBoard = [];
    gBoard = createMat(gLevel.SIDE_SIZE);
    gGame.isHintOn = false;
}

function rearrangeBoard() {
    gBoard = [];
    gBoard = createMat(gLevel.SIDE_SIZE);
    setBombsOnBoard();
    setMinesNegsCount(gBoard);
}

function setBombsOnBoard() {
    var currMinesCount = 0;
    while (currMinesCount < gLevel.MINESCOUNT) {
        var rowIdx = getRandomIntInclusive(0, gLevel.SIDE_SIZE - 1);
        var colIdx = getRandomIntInclusive(0, gLevel.SIDE_SIZE - 1);
        if (!gBoard[rowIdx][colIdx].isMine) {
            gBoard[rowIdx][colIdx].isMine = true;
            currMinesCount++;
        }
    }
}

function chooseLevel(lvlSize, lvlMines) {
    gLevel.SIDE_SIZE = lvlSize;
    gLevel.MINESCOUNT = lvlMines;
    initGame();
}

function setFlagsRemainCount() {
    var elCounter = document.querySelector('.flagCounter');
    elCounter.innerText = gLevel.MINESCOUNT - gFlagsOnBoard;
}

function resetSmiley() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerHTML = SMILEY;
}


function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) {
                for (let x = 0; x < 3; x++) {
                    for (let y = 0; y < 3; y++) {
                        if (i + x - 1 < 0 ||
                            j + y - 1 < 0 ||
                            i + x - 1 > board.length - 1 ||
                            j + y - 1 > board[0].length - 1) {
                            continue;
                        } else {
                            board[i + x - 1][j + y - 1].minesAround++;
                        }
                    }
                }
                board[i][j].minesAround = 0; //to exclude the bomb itself
            }
        }
    }
}

function cellMark(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown) return;
    //toggle model isMarked
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;

    //updating DOM
    if (gBoard[i][j].isMarked) {
        elCell.innerHTML = FLAG;
        gFlagsOnBoard++;
    } else {
        elCell.innerHTML = UNTOUCHED;
        gFlagsOnBoard--;
    }

    setFlagsRemainCount();

}

function cellClicked(i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown) return;
    if (gGame.isHintOn) {
        hintClick(i, j);
        return;
    }

    if (gFlippedCount < 1) { //first click of the game
        while (gBoard[i][j].isMine) {
            rearrangeBoard();
        }
        startStopWatch();
    }

    if (gBoard[i][j].isMarked) return;
    if (gBoard[i][j].isMine) {
        mineClicked(i, j);
        return;
    }
    rendCell(i, j, gBoard[i][j].minesAround);
    gBoard[i][j].isShown = true;
    gFlippedCount++;

    if (gBoard[i][j].minesAround === 0) {
        emptyCellClicked(i, j);
    }

    if (gFlippedCount === gLevel.SIDE_SIZE ** 2 - gLevel.MINESCOUNT) gameOver(true); // win

}

function turnHintOn(elHintButton) {
    gGame.isHintOn = true;
    elHintButton.innerHTML = '';
}

function resetHintButton() {
    var elHintButtons = document.querySelectorAll('.hint-button');
    for (let i = 0; i < 3; i++) {
        elHintButtons[i].innerHTML = '<img class="hint-img" src="imgs/hint.jpg"></img>';
    }
}

function hintClick(i, j) {
    var areMarked = [];
    var areShown = [];
    var counter = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            rendCell(i - 1 + x, j - 1 + y, gBoard[i - 1 + x][j - 1 + y].minesAround);
            if (gBoard[i - 1 + x][j - 1 + y].isShown) {
                areShown.push(true);
                areMarked.push(false);
            } else if (gBoard[i - 1 + x][j - 1 + y].isMarked) {
                areShown.push(false);
                areMarked.push(true);

            } else if (gBoard[i - 1 + x][j - 1 + y].isMine) {
                rendCell(i - 1 + x, j - 1 + y, 'mine');
                areShown.push(false);
                areMarked.push(false);
            } else {
                rendCell(i - 1 + x, j - 1 + y, gBoard[i - 1 + x][j - 1 + y]);
                areShown.push(false);
                areMarked.push(false);
            }
        }
    }

    setTimeout(() => {
        console.log('hi');
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (!areShown[counter]) rendCell(i - 1 + x, j - 1 + y, 'untouched');
                if (areMarked[counter]) rendCell(i - 1 + x, j - 1 + y, 'flag');
                counter++;
            }
        }
        gGame.isHintOn = false;
    }, 1000);
}


function emptyCellClicked(i, j) {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (i + x - 1 < 0 ||
                j + y - 1 < 0 ||
                i + x - 1 > gBoard.length - 1 ||
                j + y - 1 > gBoard[0].length - 1 ||
                gBoard[i + x - 1][j + y - 1].isShown ||
                gBoard[i + x - 1][j + y - 1].isMarked) {
                continue
            } else {
                if (gBoard[i - 1 + x][j - 1 + y].isMine === false) {
                    rendCell([i - 1 + x], [j - 1 + y], gBoard[i - 1 + x][j - 1 + y].minesAround);
                    gBoard[i - 1 + x][j - 1 + y].isShown = true;
                    gFlippedCount++;
                }
            }
        }
    }
    // gFlippedCount--; //offset (current cell counted already)

}

function mineClicked(i, j) {
    gGame.lives--;
    if (gGame.lives === 0) {
        rendCell(i, j, 'mine');
        gameOver(false);
    }
    rendLives();
}

function gameOver(isWin) {
    gGame.isOn = false;
    var elSmiley = document.querySelector('.smiley');
    endStopWatch();
    if (isWin) elSmiley.innerHTML = COOL_SMILEY;
    else {
        elSmiley.innerHTML = SAD_SMILEY;
        for (let i = 0; i < gLevel.SIDE_SIZE; i++) {
            for (let j = 0; j < gLevel.SIDE_SIZE; j++) {
                if (gBoard[i][j].isMine) rendCell(i, j, 'mine');
            }
        }
    }
}

function expandShown(board, elCell, i, j) {

}

function startStopWatch() {
    gWatchInterval = setInterval(updateWatch, 1000)
    gStartTime = Date.now()
}

function updateWatch() {
    var now = Date.now()
    var time = Math.abs(((now - gStartTime) / 1000).toFixed(0))
    var elTime = document.querySelector('.time')
    elTime.innerText = time
}

function endStopWatch() {
    clearInterval(gWatchInterval)
    gWatchInterval = null
}