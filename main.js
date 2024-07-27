// JavaScript: main.js

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const board = document.getElementById("tic-tac-toe-board");
    const cells = document.querySelectorAll(".cell");
    const winnerModal = document.getElementById("winner-modal");
    const winnerMessage = document.getElementById("winner-message");
    const winnerButton = document.getElementById("winner-button");
    let currentPlayer = 'x'; // 'x' starts the game
    let gameBoard = Array(9).fill(null); // Game state

    // Start the game
    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        restartButton.style.display = "block";
        board.style.display = "grid";
        gameBoard = Array(9).fill(null);
        currentPlayer = 'x'; // 'x' starts the game
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    });

    // Handle cell click
    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            const index = cell.dataset.index;
            if (!gameBoard[index] && board.style.display === "grid") {
                gameBoard[index] = currentPlayer;
                cell.textContent = currentPlayer.toUpperCase();
                cell.classList.add(currentPlayer);

                if (checkWinner()) {
                    winnerMessage.textContent = `${currentPlayer.toUpperCase()} wins!`;
                    winnerModal.style.display = "flex";
                    board.style.display = "none";
                    startButton.style.display = "block";
                    restartButton.style.display = "none";
                } else if (gameBoard.every(cell => cell)) {
                    winnerMessage.textContent = "It's a draw!";
                    winnerModal.style.display = "flex";
                    board.style.display = "none";
                    startButton.style.display = "block";
                    restartButton.style.display = "none";
                } else {
                    currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Switch player
                }
            }
        });
    });

    // Restart the match
    restartButton.addEventListener("click", function() {
        startButton.style.display = "none";
        restartButton.style.display = "block";
        board.style.display = "grid";
        winnerModal.style.display = "none";
        gameBoard = Array(9).fill(null);
        currentPlayer = 'x'; // 'x' starts the game
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    });

    // Close the winner modal
    winnerButton.addEventListener("click", function() {
        winnerModal.style.display = "none";
    });

    // Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }
});
