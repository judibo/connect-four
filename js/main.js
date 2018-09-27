/*----- constants -----*/
var players = {
    '1': 'red',
    '-1': 'yellow',
    'null': 'white'
};

/*----- app's state (variables) -----*/
var gameboard = [];
var turn;
var winner;
var turnCounter;
var dropAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
var winAudio = new Audio('audio/tada.mp3');
var tieAudio = new Audio('audio/tie.mp3');


/*----- cached element references -----*/
var board = document.getElementById('board');
var resetBtn = document.querySelector('#reset-btn');
var replayBtn = document.querySelector('.modal-button');


/*----- event listeners -----*/
board.addEventListener('click', clickSlot);
resetBtn.addEventListener('click', reset);
replayBtn.addEventListener('click', replay);
document.querySelector('.modal-close').addEventListener('click',toggleModal);

/*----- functions -----*/

function replay() {
    initialize();
    render();
    toggleModal();
};

function reset() {
    initialize();
    render();
};

function toggleModal() {
	document.querySelector('.modal-background').classList.toggle('hide');
    var resultMessage = document.querySelector('.modal-title');
    if (winner) {
        resultMessage.textContent = `${players[winner]} WON!`;
    } else {
        resultMessage.textContent = `It's a tie!`;
    };
};

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

function checkForTie() {
    if (winner === null && turnCounter === 42) {
        return true;
    };
};

function checkForWin(colIdx, rowIdx) {
    winner = winUp(colIdx, rowIdx);
    if (winner) return winner;
    winner = winSide(colIdx, rowIdx);
    if (winner) return winner;
    winner = winUpRight(colIdx, rowIdx);
    if (winner) return winner;
    return winDownRight(colIdx, rowIdx);
};

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
            td.className = players[cell];
        });
    });
    document.querySelector('.player-turn').textContent = `${players[turn]}'s turn`;
    if (winner) {
        toggleModal();
        winAudio.play();
    } else if (checkForTie()) {
        toggleModal();
        tieAudio.play();
    };
};

function clickSlot(evt) {
    if (winner !== null) return;
    var target = evt.target;
    if (target.tagName !== 'TD' || winner) return;
    var col = parseInt(evt.target.id.charAt(1));
    if (!gameboard[col].includes(null)) return;
    var row = gameboard[col].indexOf(null);
    dropAudio.play();
    gameboard[col][row] = turn;
    winner = getWinnner();
    turn *= -1;
    turnCounter += 1;
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
    turnCounter = 0;
    winner = null;
};

initialize();