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
    if (!gameboard[col].includes(null)) {
        alert('try another column');
    };
    var row = gameboard[col].indexOf(null);
    gameboard[col][row] = turn;
    turn *= -1;
    render();
    getWinner();
};

function initialize() {
    for (col = 0; col <= 6; col++) {
        gameboard[col] = [];
        for (row = 0; row <=5; row++) {
            gameboard[col][row] = null;
        };
    };
    turn = 1;
};

initialize();