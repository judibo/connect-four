/*----- constants -----*/
var players = {
    "1": "red",
    "-1": "yellow",
    "null": "white"
};

/*----- app's state (variables) -----*/
var gameboard = [];
var turn;
var winner;

/*----- cached element references -----*/
var board = document.getElementById('board');

/*----- event listeners -----*/
board.addEventListener('click', clickSlot);

/*----- functions -----*/

function checkForWin() {
    //check vertical
    for (var colIdx = 0; colIdx <= 6; colIdx++) {
        for ( var rowIdx = 0; rowIdx <= 5; rowIdx++) {
            Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx][rowIdx+1] + gameboard[colIdx][rowIdx+2] + gameboard[colIdx][rowIdx+3]) === 4 ? alert(`Winner is: ${players[turn]}`) : null;
        };
    };
    //check horizontal
    for (var colIdx = 0; colIdx <= 3; colIdx++) {
        for ( var rowIdx = 0; rowIdx <= 5; rowIdx++) {
            // totalSumRight === 4 ? alert (`Winner is: ${players[turn]}`) : null;
            Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx] + gameboard[colIdx+2][rowIdx] + gameboard[colIdx+3][rowIdx]) === 4 ? alert(`Winner is: ${players[turn]}`) : null;
        };
    };
    //check diagonal up
    for (var colIdx = 0; colIdx <= 3; colIdx++) {
        for ( var rowIdx = 0; rowIdx <= 5; rowIdx++) {
            Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx+1] + gameboard[colIdx+2][rowIdx+2] + gameboard[colIdx+3][rowIdx+3]) === 4 ? alert(`Winner is: ${players[turn]}`) : null;
        };
    };
};

            // var sumUpRight = (gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx+1] + gameboard[colIdx+2][rowIdx+2] + gameboard[colIdx+3][rowIdx+3]);
            // var totalSumUpRight = Math.abs(sumUpRight);
            // totalSumUpRight === 4 ? alert (`Winner is: ${players[turn]}`) : null;



function getWinnner() {
    for (var colIdx = 0; colIdx < gameboard.length; colIdx++) {
        for ( var rowIdx = 0; rowIdx < gameboard[colIdx].length; rowIdx++) {
            if (gameboard[colIdx][rowIdx] === null) break;
            if (winner) break;
        };
        if (winner) break;
    };        
};      

function render() {
    gameboard.forEach( function(col, colIdx) {
        col.forEach( function(cell, rowIdx ) {
            var td = document.getElementById(`c${colIdx}r${rowIdx}`);
            td.style.background = players[cell];
        });
    });
};

function clickSlot(evt) {
    var target = evt.target;
    if (target.tagName !== 'TD') return;
    var col = parseInt(evt.target.id.charAt(1));
    if (!gameboard[col].includes(null));
    var row = gameboard[col].indexOf(null);
    gameboard[col][row] = turn;
    checkForWin();
    winner = getWinnner();
    turn *= -1;
    render();
};

function initialize() {
    for (col = 0; col <= 6; col++) {
        gameboard[col] = [];
        for (row = 0; row <=5; row++) {
            gameboard[col][row] = null;
        };
    };
    turn = 1;
    winner = null;
};

initialize();