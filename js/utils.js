'use strict'
const UNTOUCHED = '<img src="imgs/facingDown.png">';
const FLAG = '<img src="imgs/flagged.png">';
const MINE = '<img src="imgs/bomb.png">';

const SMILEY = '<img src="imgs/highSmile.png">';
const SAD_SMILEY = '<img src="imgs/sadSmile.png">';
const COOL_SMILEY = '<img src="imgs/coolSmile.png">';

const ZERO = '<img src="imgs/0.png">';
const ONE = '<img src="imgs/1.png">';
const TWO = '<img src="imgs/2.png">';
const THREE = '<img src="imgs/3.png">';
const FOUR = '<img src="imgs/4.png">';
const FIVE = '<img src="imgs/5.png">';
const SIX = '<img src="imgs/6.png">';
const SEVEN = '<img src="imgs/7.png">';
const EIGHT = '<img src="imgs/8.png">';





function createMat(sideLength) {
    var mat = [];
    for (var i = 0; i < sideLength; i++) {
        mat.push([]);
        for (let j = 0; j < sideLength; j++) {
            mat[i][j] = createCellModel();
            mat[i][j].i = i;
            mat[i][j].j = j;
        }
    }
    return mat;
}


function createCellModel() {
    return {
        minesAround: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        i: null,
        j: null,
    };
}



function renderBoard(sideLength = 4) {
    var strHtml = '';
    for (let i = 0; i < sideLength; i++) {
        strHtml += '<tr>';
        for (let j = 0; j < sideLength; j++) {
            strHtml += `<td oncontextmenu="cellMark(this,${i},${j}); return false;" 
                        onclick = "cellClicked(this,${i},${j})"
                        class = "cell-${i}-${j}">${UNTOUCHED}</td>`
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function getRndCoor(sideLength) {
    
}

function rendCell(i, j, strHtml) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    switch (strHtml) {
        case 0:
            elCell.innerHTML = ZERO;
            break;
        case 1:
            elCell.innerHTML = ONE;
            break;
        case 2:
            elCell.innerHTML = TWO;
            break;
        case 3:
            elCell.innerHTML = THREE;
            break;
        case 4:
            elCell.innerHTML = FOUR;
            break;
        case 5:
            elCell.innerHTML = FIVE;
            break;
        case 6:
            elCell.innerHTML = SIX;
            break;
        case 7:
            elCell.innerHTML = SEVEN;
            break;
        case 8:
            elCell.innerHTML = EIGHT;
            break;
        case 'mine':
            elCell.innerHTML = MINE;
            break;
    
        default:
            break;
    }
}

function mineCheckMat() {
    var mat = [];
    for (let i = 0; i < gBoard.length; i++) {
        mat.push([]);
        for (let j = 0; j < gBoard[0].length; j++) {
            mat[i][j] = gBoard[i][j].isMine;
        }
    }
    console.table(mat);
}


function nearBombsTestMat() {
    var mat = [];
    for (let i = 0; i < gBoard.length; i++) {
        mat.push([]);
        for (let j = 0; j < gBoard[0].length; j++) {
            mat[i][j] = gBoard[i][j].minesAround;
        }
    }
    console.table(mat);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }