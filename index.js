const board = [];

const elements = document.getElementsByClassName("col");

let turn = true;
let end = false;

// Populate the board to work with
let rowCounter = 0;
let row = 0;
for (const element of elements) {
  if (rowCounter > 6) {
    rowCounter = 0;
    row++;
  }
  if (board[row] == undefined) board[row] = [];
  board[row].push(element);
  rowCounter++;
}

// Logic for the clear board button
const clearBtn = document.querySelector("#clear-board");
clearBtn.addEventListener("click", () => {
  end = false;
  for (const element of elements) {
    element.style.backgroundColor = "";
  }
});

for (const row of board) {
  for (let i = 0; i < row.length; i++) {
    const space = row[i];
    space.addEventListener("click", () => {
      dropTile(i);
    });
  }
}

function dropTile(columnIndex) {
  if (end) return;
  for (let i = 5; i > -1; i--) {
    if (board[0][columnIndex].style.backgroundColor != "") {
      alert("This row is full!");
      break;
    }
    if (board[i][columnIndex].style.backgroundColor == "") {
      board[i][columnIndex].style.backgroundColor = turn ? "yellow" : "red";
      const won = checkForWin(columnIndex, i);
      if (won) {
        alert(`${turn ? "Yellow" : "Red"} Connected 4!`);
        end = true;
        break;
      }
      turn = !turn;
      break;
    }
  }
}

// Util functions

function getAllLines(colIndex, rowIndex) {
  const diag1 = getDiag1(colIndex, rowIndex);
  const diag2 = getDiag2(colIndex, rowIndex);
  const horiz = [];
  const vert = [];

  for (let i = 0; i < 7; i++) horiz.push([i, rowIndex]);
  for (let i = 0; i < 6; i++) vert.push([colIndex, i]);

  return {
    diag1,
    diag2,
    horiz,
    vert,
  };
}

function getDiag1(colIndex, rowIndex) {
  const diag = [];
  let x = colIndex;
  let y = rowIndex;

  while (x >= 0 && y >= 0) {
    diag.unshift([x, y]);
    x--;
    y--;
  }

  x = colIndex + 1;
  y = rowIndex + 1;

  while (x < 7 && y < 6) {
    diag.push([x, y]);
    x++;
    y++;
  }

  return diag;
}

function getDiag2(colIndex, rowIndex) {
  const diag = [];
  let x = colIndex; //4
  let y = rowIndex; //4

  while (x >= 0 && y < 6) {
    diag.unshift([x, y]);
    x--;
    y++;
  }

  x = colIndex + 1;
  y = rowIndex - 1;

  while (x < 7 && y >= 0) {
    diag.push([x, y]);
    x++;
    y--;
  }

  return diag;
}

function checkForWin(colIndex, rowIndex) {
  const lines = getAllLines(colIndex, rowIndex);
  console.log(lines);
  const color = board[rowIndex][colIndex].style.backgroundColor;

  const diag1 = checkLineForFour(lines.diag1, color);
  const diag2 = checkLineForFour(lines.diag2, color);
  const horiz = checkLineForFour(lines.horiz, color);
  const vert = checkLineForFour(lines.vert, color);

  console.log({
    diag1,
    diag2,
    horiz,
    vert,
  });
  return diag1 || diag2 || horiz || vert;
}

function checkLineForFour(line, color) {
  let connected = 0;
  let counter = 0;
  console.log(line);
  line.forEach((space) => {
    const x = space[0];
    const y = space[1];

    board[(x, y)];

    if (board[y][x].style.backgroundColor == color) {
      counter++;
      console.log("Connected++", counter);
      connected = counter > connected ? counter : connected;
    } else {
      console.log("connected reset");
      counter = 0;
    }
  });
  console.log(connected);
  return connected >= 4;
}
