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
var resetBtn = document.querySelector('button');
var replayBtn = document.querySelector('.modalbutton');


/*----- event listeners -----*/
board.addEventListener('click', clickSlot);
resetBtn.addEventListener('click', reset);
replayBtn.addEventListener('click', replay);

/*----- functions -----*/

function replay() {
    initialize();
    render();
    toggleModal();
}

function reset() {
    initialize();
    render();
}

function toggleModal() {
	const modal = document.querySelector('.modalbackground');
    modal.classList.toggle('hide');
    var winningMessage = document.querySelector('.modaltitle');
    winningMessage.textContent = `${players} WON!`;
}

function winUp(colIdx, rowIdx) {
    if (rowIdx > 2) return null;
    return Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx][rowIdx+1] + gameboard[colIdx][rowIdx+2] + gameboard[colIdx][rowIdx+3]) === 4 ? gameboard[colIdx][rowIdx] : null;
};

function winSide(colIdx, rowIdx) {
    if (colIdx > 3) return null;
    return Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx] + gameboard[colIdx+2][rowIdx] + gameboard[colIdx+3][rowIdx]) === 4 ? gameboard[colIdx][rowIdx] : null;
};

function winUpRight(colIdx, rowIdx) {
    if (colIdx > 3) return null;
    return Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx+1] + gameboard[colIdx+2][rowIdx+2] + gameboard[colIdx+3][rowIdx+3]) === 4 ? gameboard[colIdx][rowIdx] : null;
};

function winDownRight(colIdx, rowIdx) {
    if (colIdx > 3 && rowIdx < 6 ) return null;
    return Math.abs(gameboard[colIdx][rowIdx] + gameboard[colIdx+1][rowIdx-1] + gameboard[colIdx+2][rowIdx-2] + gameboard[colIdx+3][rowIdx-3]) === 4 ? gameboard[colIdx][rowIdx] : null;
};

function checkForWin(colIdx, rowIdx) {
    winner = winUp(colIdx, rowIdx);
    if (winner) return winner;
    winner = winSide(colIdx, rowIdx);
    if (winner) return winner;
    winner = winUpRight(colIdx, rowIdx);
    if (winner) return winner;
    return winDownRight(colIdx, rowIdx);
}

function getWinnner() {
    for (var colIdx = 0; colIdx < gameboard.length; colIdx++) {
        for ( var rowIdx = 0; rowIdx < gameboard[colIdx].length; rowIdx++) {
            if (gameboard[colIdx][rowIdx] === null) break;
            winner = checkForWin(colIdx, rowIdx);
            if (winner) break;
        };
        if (winner) break;
    };
    return winner;  
};      

function render() {
    gameboard.forEach( function(col, colIdx) {
        col.forEach( function(cell, rowIdx ) {
            var td = document.getElementById(`c${colIdx}r${rowIdx}`);
            td.style.background = players[cell];
        });
    });
    if (winner) {
        toggleModal();
    };
};

function clickSlot(evt) {
    var target = evt.target;
    if (target.tagName !== 'TD') return;
    var col = parseInt(evt.target.id.charAt(1));
    if (!gameboard[col].includes(null));
    var row = gameboard[col].indexOf(null);
    gameboard[col][row] = turn;
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