'use strict'

var gLevel = {
    SIDE_SIZE: 9,
    MINESCOUNT: 2,
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

var gFlippedCount = 0;
var gFlagsOnBoard = 0;

// var gBoard = createMat(6);
// console.log(gBoard);
var gBoard;



function initGame() {
    resetGlobals();
    resetSmiley();
    renderBoard(gLevel.SIDE_SIZE);
    gBoard[2][2].isMine = true;
    gBoard[3][3].isMine = true;
    setMinesNegsCount(gBoard)
    console.log(gLevel.SIDE_SIZE ** 2);
}

function resetSmiley() {
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerHTML = SMILEY;
}

function resetGlobals() {
    gFlippedCount = 0;
    gFlagsOnBoard = 0;
    gGame.isOn = true;
    gBoard = [];
    gBoard = createMat(gLevel.SIDE_SIZE);
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

}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return;
    if (!gGame.isOn) return;
    if (gBoard[i][j].isMarked) return;
    if (gBoard[i][j].isMine) { //lost
        rendCell(i, j, 'mine');
        gameOver(false);
        return;
    }

    rendCell(i, j, gBoard[i][j].minesAround);
    gBoard[i][j].isShown = true;
    gFlippedCount++;

    if (gBoard[i][j].minesAround === 0) {
        emptyCellClicked(i, j);
    }

    if (gFlippedCount === gLevel.SIDE_SIZE ** 2) gameOver(true); // win

}

function emptyCellClicked(i, j) {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (i + x - 1 < 0 ||
                j + y - 1 < 0 ||
                i + x - 1 > gBoard.length - 1 ||
                j + y - 1 > gBoard[0].length - 1||
                gBoard[i+x-1][j+y-1].isShown) {
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
    gFlippedCount--; //offset (current cell counted already)

}



function gameOver(isWin) {
    gGame.isOn = false;
    var elSmiley = document.querySelector('.smiley');
    console.log('game over!');
    if (isWin) elSmiley.innerHTML = COOL_SMILEY;
    else elSmiley.innerHTML = SAD_SMILEY;

}

function expandShown(board, elCell, i, j) {

}

console.table(gBoard)