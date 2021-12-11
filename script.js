let player1sign;
let player2sign;

function chooseSign() {
  document.querySelector(".grid-container").addEventListener("click", event => {
    let target = event.target;
    if (target.matches("button")) {
      player1sign = target.innerHTML;
      player2sign = "O";
      if (player1sign === "O") {
        player2sign = "X";
      }
      insertGrid();
    }
  });
}

function insertGrid() {
  let container = document.querySelector(".container");
  container.innerHTML += "<div class=\"grid-container\" id=\"playArea\" style=\"width: 20rem; height: 20rem;\"></div>"
  let chooseSignArea = document.getElementById("chooseSignArea");
  chooseSignArea.style.display="none";
  let gridContainer = document.getElementById("playArea");
  gridContainer.style.backgroundImage = "url('XO-grid.jpg')";
  for(let i = 1; i <= 9; ++i) {
    let gridButton = document.createElement("button");
    gridButton.classList.add("grid-buttons");
    let buttonId = "B" + i;
    gridButton.setAttribute("id", buttonId);
    gridButton.setAttribute("type", "submit");
    gridButton.onclick = function() {addSign(buttonId);};
    gridButton.innerHTML = " ";
    gridContainer.appendChild(gridButton);
  }
}

let movesCounter = 0;
let nextMoveSign;

function addSign(buttonId) {
  if (movesCounter % 2 === 0) {
    nextMoveSign = player1sign;
    document.getElementById("Player2Turn").checked = true;
  } else {
    nextMoveSign = player2sign;
    document.getElementById("Player1Turn").checked = true;
  }
  let button = document.getElementById(buttonId);
  button.setAttribute("id", nextMoveSign);
  button.innerHTML = nextMoveSign;
  button.disabled = true;
  ++movesCounter;
  checkGameOver();
}

function checkGameOver() {
  let gridButtons = document.getElementsByClassName("grid-buttons");
  if (movesCounter > 4 && ((gridButtons[0].id === gridButtons[1].id && gridButtons[1].id === gridButtons[2].id) || 
    (gridButtons[0].id === gridButtons[3].id && gridButtons[3].id === gridButtons[6].id) || 
    (gridButtons[8].id === gridButtons[5].id && gridButtons[5].id === gridButtons[2].id) ||
    (gridButtons[8].id === gridButtons[7].id && gridButtons[7].id === gridButtons[6].id) || 
    (gridButtons[4].id === gridButtons[1].id && gridButtons[4].id === gridButtons[7].id) || 
    (gridButtons[4].id === gridButtons[3].id && gridButtons[4].id === gridButtons[5].id) || 
    (gridButtons[4].id === gridButtons[0].id && gridButtons[4].id === gridButtons[8].id) || 
    (gridButtons[4].id === gridButtons[2].id && gridButtons[4].id === gridButtons[6].id))) {
    let container = document.querySelector(".container");
    container.innerHTML += "<div class=\"card\" style=\"width: 20rem;\">" +
                              "<div class=\"card-header\" id=\"announceWinner\"></div>" +
                            "</div>";
    let announceWinner = document.getElementById("announceWinner");
    if (nextMoveSign === player1sign) {
      announceWinner.innerHTML += "<center><h3>Player 1 wins!</h3></center>";
    } else {
      announceWinner.innerHTML += "<center><h3>Player 2 wins!</h3></center>";
    }
    announceWinner.innerHTML += "<center><button type=\"submit\" class=\"btn btn-success\" onclick=\"window.location.reload();\">New Game</button></center>";
  }
}