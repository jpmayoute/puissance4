document.addEventListener("DOMContentLoaded", () => {
  const ROWS = 6;
  const COLS = 7;
  const board = document.getElementById("board");
  let currentPlayer = "red";
  let gameOver = false;
  let scoreRed = 0;
  let scoreYellow = 0;
  
  // Créer le plateau
  function createBoard() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = row;
        cell.dataset.col = col;
        board.appendChild(cell);
      }
    }
  }

  createBoard();

  const cells = document.querySelectorAll(".cell");

  // Fonction pour vider le plateau
  function clearBoard() {
    cells.forEach(cell => {
      cell.classList.remove("red", "yellow");
    });
    gameOver = false;
    currentPlayer = "red";
  }

  // Fonction pour vérifier si un joueur a gagné
  function checkWin(row, col) {
    function checkDirection(dirX, dirY) {
      let count = 1;
      let r = row + dirX;
      let c = col + dirY;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && cells[r * COLS + c].classList.contains(currentPlayer)) {
        count++;
        r += dirX;
        c += dirY;
      }
      r = row - dirX;
      c = col - dirY;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && cells[r * COLS + c].classList.contains(currentPlayer)) {
        count++;
        r -= dirX;
        c -= dirY;
      }
      return count >= 4;
    }

    return checkDirection(1, 0) || // vertical
      checkDirection(0, 1) || // horizontal
      checkDirection(1, 1) || // diagonal \
      checkDirection(1, -1); // diagonal /
  }

  // Fonction pour vérifier si le plateau est plein (match nul)
  function checkDraw() {
    return [...cells].every(cell => cell.classList.contains("red") || cell.classList.contains("yellow"));
  }

  // Fonction pour placer un jeton dans une colonne
  function dropToken(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
      const cell = cells[row * COLS + col];
      if (!cell.classList.contains("red") && !cell.classList.contains("yellow")) {
        cell.classList.add(currentPlayer);
        if (checkWin(row, col)) {
          gameOver = true;
          setTimeout(() => {
            alert(`${currentPlayer.toUpperCase()} wins!`);
            updateScore();
            clearBoard(); // Réinitialiser le jeu après la victoire
          }, 100);
        } else if (checkDraw()) {
          gameOver = true;
          setTimeout(() => {
            alert("Match nul!");
            clearBoard(); // Réinitialiser le jeu après un match nul
          }, 100);
        } else {
          currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        }
        return;
      }
    }
  }

  // Fonction pour mettre à jour les scores
  function updateScore() {
    if (currentPlayer === "red") {
      scoreRed++;
      document.getElementById("scoreRed").textContent = scoreRed;
    } else {
      scoreYellow++;
      document.getElementById("scoreYellow").textContent = scoreYellow;
    }
  }

  // Gestionnaire d'événements pour cliquer sur une colonne
  board.addEventListener("click", (e) => {
    if (!gameOver && e.target.classList.contains("cell")) {
      const col = parseInt(e.target.dataset.col);
      dropToken(col);
    }
  });

  // Fonction pour réinitialiser le jeu après qu'un joueur a gagné
  function resetGame() {
    clearBoard();
    scoreRed = 0;
    scoreYellow = 0;
    document.getElementById("scoreRed").textContent = scoreRed;
    document.getElementById("scoreYellow").textContent = scoreYellow;
  }

  // Gestionnaire d'événements pour le bouton de réinitialisation
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", resetGame);
});
