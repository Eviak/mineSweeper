'use strict'
const UNTOUCHED = '<img src="imgs/facingDown.png">';
const FLAG = '<img src="imgs/flagged.png">';



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
        isShown: false,
        isMine: false,
        isMarked: false,
        i: null,
        j: null,
    };
}



function renderBoard(sideLength) {
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
    return strHtml;
}