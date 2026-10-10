
const cells = document.querySelectorAll(".cell");

const playerO = document.querySelector("#playerO");
const playerX = document.querySelector("#playerX");

const startGame = document.querySelector("#startGame");

const newRound = document.querySelector("#newRound");

const resetScore = document.querySelector("#resetScore");

const turn = document.querySelector("#turn");

const nameO = document.querySelector("#nameO");
const nameX = document.querySelector("#nameX");

const scoreO = document.querySelector("#scoreO");
const scoreX = document.querySelector("#scoreX");


let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let currentPlayer = "O";

let gameActive = false;



let players = {
    O: "Teux",
    X: "Rafaela Cara de Panela"
};

let score = JSON.parse(
    localStorage.getItem("ticTacToeScore")
) || {
    O: 0,
    X: 0
};

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];

function updateScore() {

    scoreO.textContent = score.O;

    scoreX.textContent = score.X;

}

function saveScore() {

    localStorage.setItem(
        "ticTacToeScore",
        JSON.stringify(score)
    );

}

function updatePlayers() {

    players.O = playerO.value;

    players.X = playerX.value;

    nameO.textContent = `${players.O} ⭕`;

    nameX.textContent = `${players.X} ❌`;

}

startGame.addEventListener("click", () => {

    // Impede os dois jogadores
    // de serem a mesma pessoa

    if (playerO.value === playerX.value) {

        turn.textContent =
            "Escolha jogadores diferentes!";

        return;
    }

    updatePlayers();

    startNewRound();

});

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        if (!gameActive) {
            return;
        }

        const index = cell.dataset.index;


        // Casa já ocupada

        if (board[index] !== "") {
            return;
        }

        board[index] = currentPlayer;


        if (currentPlayer === "O") {

            cell.textContent = "⭕";

        } else {

            cell.textContent = "❌";

        }

        checkWinner();

    });

});

function checkWinner() {

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            const winner = players[currentPlayer];

            score[currentPlayer]++;

            saveScore();

            updateScore();


            turn.textContent =
                `${winner} venceu!`;


            gameActive = false;

            return;
        }

    }

    if (!board.includes("")) {

        turn.textContent =
            "Deu velha!";

        gameActive = false;

        return;
    }

    currentPlayer =
        currentPlayer === "O" ? "X" : "O";


    updateTurn();

}

function updateTurn() {

    const symbol =
        currentPlayer === "O"
            ? "⭕"
            : "❌";


    turn.textContent =
        `Vez de ${players[currentPlayer]} ${symbol}`;

}

function startNewRound() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    currentPlayer = "O";

    gameActive = true;

    cells.forEach(cell => {

        cell.textContent = "";

    });


    updateTurn();

}

newRound.addEventListener("click", () => {

    if (
        playerO.value === playerX.value
    ) {

        turn.textContent =
            "Escolha jogadores diferentes!";

        return;
    }


    updatePlayers();

    startNewRound();

});

resetScore.addEventListener("click", () => {

    score = {
        O: 0,
        X: 0
    };


    saveScore();

    updateScore();

});

updateScore();