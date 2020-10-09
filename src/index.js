if (document.readyState !== "loading") {
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

let XTurn = 1;
let progressId;

function initializeCode() {
  createBoard(5, 5);
  progressMove();
  document.querySelectorAll(".col").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      var selected = button.id;
      gameEvent(selected, button);
      checkWinner(selected, button);
      XTurn = XTurn * -1;
      event.stopPropagation();
    });
  });
}

function createBoard(rows, columns) {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("div");
      cell.className = "col s1";
      cell.setAttribute("id", "R" + i + "C" + j);
      cell.setAttribute("state", "blank");
      cell.innerText = "[ ]";
      row.appendChild(cell);
    }
    document.getElementById("board").appendChild(row);
  }
}

function checkWinner(selected, button) {
  let row = selected[1];
  let col = selected[3];
  let pressedState = button.getAttribute("state");
  let won = false;

  console.log("Painettu:" + pressedState);
  console.log("Rivi: " + row + " Sarake: " + col);
  console.log();

  //Row winning condition
  for (let i = 0; i <= 4; i++) {
    if (
      document.getElementById("R" + row + "C" + i).getAttribute("state") ===
      pressedState
    ) {
      won = true;
    } else {
      won = false;
      break;
    }
  }
  if (won === true) {
    if (pressedState === "X") {
      alert("Player 1 won!");
      return;
    } else if (pressedState === "O") {
      alert("Player 2 won!");
    } else {
      alert("Error! Nobody actually won...");
    }
  }

  //Column winning condition
  for (let j = 0; j <= 4; j++) {
    if (
      document.getElementById("R" + j + "C" + col).getAttribute("state") ===
      pressedState
    ) {
      won = true;
    } else {
      won = false;
      break;
    }
  }
  if (won === true) {
    if (pressedState === "X") {
      alert("Player 1 won!");
      return;
    } else if (pressedState === "O") {
      alert("Player 2 won!");
    } else {
      alert("Error! Nobody actually won...");
    }
  }

  //Diagonal winning condition (top left to bottom right)
  for (let j = 0; j <= 4; j++) {
    if (
      document.getElementById("R" + j + "C" + j).getAttribute("state") ===
      pressedState
    ) {
      won = true;
    } else {
      won = false;
      break;
    }
  }
  if (won === true) {
    if (pressedState === "X") {
      alert("Player 1 won!");
      return;
    } else if (pressedState === "O") {
      alert("Player 2 won!");
    } else {
      alert("Error! Nobody actually won...");
    }
  }

  //Diagonal winning condition (bottom left to top right)
  for (let j = 0; j <= 4; j++) {
    if (
      document.getElementById("R" + j + "C" + (4 - j)).getAttribute("state") ===
      pressedState
    ) {
      won = true;
    } else {
      won = false;
      break;
    }
  }
  if (won === true) {
    if (pressedState === "X") {
      alert("Player 1 won!");
      return;
    } else if (pressedState === "O") {
      alert("Player 2 won!");
    } else {
      alert("Error! Nobody actually won...");
    }
  }
}

function progressMove() {
  clearInterval(progressId);
  var elem = document.getElementById("progressBar");
  var width = 1;
  progressId = setInterval(frame, 100);
  function frame() {
    if (width >= 100) {
      clearInterval(progressId);
      XTurn = XTurn * -1;
      progressMove();
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerText = Math.round(10 - width / 10) + "s";
    }
  }
}

function gameEvent(selected, button) {
  if (button.innerText === "[ ]") {
    if (XTurn === 1) {
      button.style.background = "green";
      button.innerText = "x";
      button.setAttribute("state", "X");
      console.log(XTurn);
      progressMove();
    } else if (XTurn === -1) {
      button.style.background = "red";
      button.innerText = "o";
      button.setAttribute("state", "O");
      console.log(XTurn);
      progressMove();
    }
  } else {
    XTurn = XTurn * -1;
  }
}
