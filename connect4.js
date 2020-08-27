let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1;
let board = [];

// This creates a board that has 7 columns and 6 rows
function makeBoard() {
	for (let y = 0; y < HEIGHT; y++) {
    // this creates a new array with the length of WIDTH variable
		board.push(Array.from({ length: WIDTH }));
	}
}


// This function selects our div from our html page and
// starts assigning it values
function makeHtmlBoard() {
  
	const htmlBoard = document.getElementById('board');

	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);
  

// this code below creates a table with td's
	for (let x = 0; x < WIDTH; x++) {
		let headCell = document.createElement('td');
		headCell.setAttribute('id', x);
    top.append(headCell);
  
	}
  htmlBoard.append(top);
  
// this code adds to the table of td's with trs (rows)
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
      
		}
		htmlBoard.append(row);
	}
}

// this function checks to see if the targeted  row is filled
// if this is filled then it will return null
// if its not filled then it will add a marker to the game

function findSpotForCol(x) {
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board[y][x]) {
      return y;
      
		}
	}
	return null;
}

// this function creates the player pieces and shows
// where they are located in the table.
function placeInTable(y, x) {
	const piece = document.createElement('div');
	piece.classList.add('piece');
	piece.classList.add(`p${currPlayer}`);

	const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  console.log(spot)
}


// this function will run when certain parts of the 
// the game is completed and will show a pop up alert
function endGame(msg) {
	alert(msg)
}

function handleClick(evt) {
	let x = +evt.target.id;

	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

  // updates the variable for each player
  // shows which player is playing
  board[y][x] = currPlayer;

  

//main functionality that is setting x 
//to wherever you click along the top 7 columns.  
//then it finds y by calling the findSpotForCol function

	placeInTable(y, x);

	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

  // if every board div is full with a piece
	if (
		board.every(function(row) {
			return row.every(function(cell) {
				return cell;
			});
		})
	) {
		return endGame('Tie!');
	}
	// switch players
	currPlayer = currPlayer === 1 ? 2 : 1;
}

function checkForWin() {
	function _win(cells) {
		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
