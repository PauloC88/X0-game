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
  let chooseSignArea = document.getElementById("chooseSignArea");
  chooseSignArea.style.display="none";
  let gridContainer = document.getElementById("playArea");
  gridContainer.style.display = "grid";
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

let gridButtons = document.getElementsByClassName("grid-buttons");
let container = document.querySelector(".container");

function checkGameOver() {
  if (movesCounter > 4 && (
    (gridButtons[0].id === gridButtons[1].id && gridButtons[1].id === gridButtons[2].id) || 
    (gridButtons[0].id === gridButtons[3].id && gridButtons[3].id === gridButtons[6].id) || 
    (gridButtons[8].id === gridButtons[5].id && gridButtons[5].id === gridButtons[2].id) ||
    (gridButtons[8].id === gridButtons[7].id && gridButtons[7].id === gridButtons[6].id) || 
    (gridButtons[4].id === gridButtons[1].id && gridButtons[4].id === gridButtons[7].id) || 
    (gridButtons[4].id === gridButtons[3].id && gridButtons[4].id === gridButtons[5].id) || 
    (gridButtons[4].id === gridButtons[0].id && gridButtons[4].id === gridButtons[8].id) || 
    (gridButtons[4].id === gridButtons[2].id && gridButtons[4].id === gridButtons[6].id))) {
    container.innerHTML += "<div class=\"card\" style=\"width: 20rem;\">" +
                              "<div class=\"card-header\" id=\"announceWinner\"></div>" +
                           "</div>";
    strikethrough();
    announceWinner();
  } else if (movesCounter > 8) {
    announceTie();
  }
}

function strikethrough() {
  if (gridButtons[0].id === gridButtons[1].id && gridButtons[1].id === gridButtons[2].id) {
    container.innerHTML += "<img id=\"horizontal-line1\" src=\"horizontal-line.png\">";
  } else if (gridButtons[3].id === gridButtons[4].id && gridButtons[4].id === gridButtons[5].id) {
    container.innerHTML += "<img id=\"horizontal-line2\" src=\"horizontal-line.png\">";
  } else if (gridButtons[6].id === gridButtons[7].id && gridButtons[7].id === gridButtons[8].id) {
    container.innerHTML += "<img id=\"horizontal-line3\" src=\"horizontal-line.png\">";
  } else if (gridButtons[0].id === gridButtons[3].id && gridButtons[3].id === gridButtons[6].id) {
    container.innerHTML += "<img id=\"vertical-line1\" src=\"vertical-line.png\">";
  } else if (gridButtons[1].id === gridButtons[4].id && gridButtons[4].id === gridButtons[7].id) {
    container.innerHTML += "<img id=\"vertical-line2\" src=\"vertical-line.png\">";
  } else if (gridButtons[2].id === gridButtons[5].id && gridButtons[5].id === gridButtons[8].id) {
    container.innerHTML += "<img id=\"vertical-line3\" src=\"vertical-line.png\">";
  } else if (gridButtons[0].id === gridButtons[4].id && gridButtons[4].id === gridButtons[8].id) {
    container.innerHTML += "<img id=\"diagonal-line\" src=\"diagonal-line1.png\">";
  } else {
    container.innerHTML += "<img id=\"diagonal-line\" src=\"diagonal-line2.png\">";
  }
}

function announceWinner() {
  let announceWinner = document.getElementById("announceWinner");
  if (nextMoveSign === player1sign) {
    announceWinner.innerHTML += "<center><h3>Player 1 wins!</h3></center>";
  } else {
    announceWinner.innerHTML += "<center><h3>Player 2 wins!</h3></center>";
  }
  announceWinner.innerHTML += "<center><button type=\"submit\" class=\"btn btn-success\" onclick=\"window.location.reload();\">New Game</button></center>";
}

function announceTie() {
  container.innerHTML += "<div class=\"card\" style=\"width: 20rem;\">" +
                            "<div class=\"card-header\" id=\"announceTie\"></div>" +
                         "</div>";
  let announceTie = document.getElementById("announceTie");
  announceTie.innerHTML += "<center><h3>It's a tie!</h3></center>" + 
                           "<center><button type=\"submit\" class=\"btn btn-success\" onclick=\"window.location.reload();\">New Game</button></center>";
}
