'use strict'

var gLevel = {
    SIDE_SIZE: 4,
    MINESCOUNT: 2,
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}

var gBoard = createMat(6);
console.log(gBoard);


var elBoard = document.querySelector('.board');
elBoard.innerHTML = renderBoard(5);

function initGame() {

}

function setMinesNegsCount(board) {

}

function cellMark(elCell, i, j) {
    if (!gBoard[i][j].isMarked) {        
        elCell.innerHTML = FLAG;
    } else {
        //unmark model
        
    }
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;

}

function cellClicked(elCell, i, j) {
    console.log('cellClicked');
}

function expandShown(board, elCell, i, j) {

}