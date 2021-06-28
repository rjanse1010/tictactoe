import Player from "./Player.js";

/* ### KEEP URL PARAMETERS WHEN GOING TO ANOTHER PAGE & SHOW BACK BUTTON */
const allLinks = document.querySelectorAll("a");
const backButtonEl = document.querySelector(".back_button");

let srcURL;
if(allLinks && window.location.search != "") {
	allLinks.forEach(function(element) {
		if(element != backButtonEl && !element.getAttribute("href").startsWith("#")) { //Don't change the back button url and don't change anchor links
			element.setAttribute("href", element.getAttribute("href") + window.location.search);
		}
	});
	const searchParams = new URL(location.href).searchParams;
	const srcName = searchParams.get('srcname');
	srcURL = searchParams.get('src');
	if(srcName && srcURL) {
		backButtonEl.innerHTML = "<i class='fas fa-long-arrow-alt-left'></i> Terug naar " + srcName;
		if(srcURL.startsWith("file://") && !window.location.href.startsWith("file://")) {
			backButtonEl.addEventListener("click", function() {
				alert("Helaas, webpagina's die op een server gehost worden mogen niet verwijzen naar lokale bestanden. Je kunt zelf de volgende URL bezoeken:\n\n" + srcURL);
			});
		} else {
			backButtonEl.href = srcURL;
		}
		backButtonEl.classList.remove("hidden");
	}
}

const mainEl = document.querySelector("main");

/**
 * To start:
 * Check index.html, make sure the board with fields are created with correct classnames
 * The board should be 3x3 fields
 * Add correct classes
 */

const players = [ ];
let currentPlayer = 0; // This is the index of the array of the currentplayer
//const board = document.querySelector('.board');
const fields = document.querySelectorAll('.board > .field');
const resetButton = document.querySelector(".reset-btn");
//Create two players aligned with the Player class
//const playerOne = ...
//const playerTwo = ...
//Add both players to the players array
const playerOne = new Player("Player 1", "X");
const playerTwo = new Player("Player 2", "O");
players.push(playerOne);
players.push(playerTwo);

/**
 * Assignment
 * Make a loop thru all the fields and add a click event. 
 * Connect the addSymbolToField function in the eventHandler
 */
//for ...
for(let i = 0; i < fields.length; i++) {
	let currentField = fields[i];
	currentField.addEventListener("click", function() {
		addSymbolToField(currentField);
	});
}

/**
 * Assignment 
 * Give body to the reset function (the function exists below)
 */
resetButton.addEventListener("click", resetGame);

function addSymbolToField(field) {
    const fieldContent = field.textContent;
    if (fieldContent === 'X' || fieldContent === 'O') {
        alert('This field can not be used');
    } else {
		field.textContent = players[currentPlayer].symbol; //Put in the current player's symbol
		currentPlayer = currentPlayer===0?1:0; //Switch current player
		checkWinner();
	}

    /**
     * Assignment
     * Add the current player symbol to the field textContent
     * What more needs to be done here? Make a short todolist
	 * --> Check if someone has won yet
	 * --> Switch the currentPlayer
     */
}

function checkWinner() {
    /**
     * Assignment
     * Add an algorithm to check if someone has three in a row
     * Try to use Internet - if not found the teacher will give you one
     * Also make sure you check for a draw (gelijkspel)
     * Again what more needs to be done, make a short todolist
	 * --> Add algorithm/more efficient code for wins TODO
     */
	 //if win
	 //else if draw
	if(userHasWon()) {
		playAgainPrompt(0);
	} else if(tieIsReached()) {
		playAgainPrompt(1);
	}
	 
}

function userHasWon() {
	let win = false;

	let field0 = fields[0].textContent;
	let field1 = fields[1].textContent;
	let field2 = fields[2].textContent;
	let field3 = fields[3].textContent;
	let field4 = fields[4].textContent;
	let field5 = fields[5].textContent;
	let field6 = fields[6].textContent;
	let field7 = fields[7].textContent;
	let field8 = fields[8].textContent;
	//1 === 2 === 3
	//4 === 5 === 6
	//7 === 8 === 9
	if(field0 !== " " && (field0 === field1 && field1 === field2)) {
		win = true;
	}
	if(field3 !== " " && (field3 === field4 && field4 === field5)) {
		win = true;
	}
	if(field6 !== " " && (field6 === field7 && field7 === field8)) {
		win = true;
	}
	//1 === 4 === 7
	//2 === 5 === 8
	//3 === 6 === 9
	if(field0 !== " " && (field0 === field3 && field3 === field6)) {
		win = true;
	}
	if(field1 !== " " && (field1 === field4 && field4 === field7)) {
		win = true;
	}
	if(field2 !== " " && (field2 === field5 && field5 === field8)) {
		win = true;
	}
	//1 === 5 === 9
	//3 === 5 === 7
	if(field0 !== " " && (field0 === field4 && field4 === field8)) {
		win = true;
	}
	if(field2 !== " " && (field2 === field4 && field4 === field6)) {
		win = true;
	}

	return win;
}

function tieIsReached() {
	let tie = false;
	Array.from(fields).every(function(element, index, array) {
		if(element.textContent === " ") { //If there's still an empty slot, the game is not over yet, so we'll return false
			tie = false;
			return false;
		} else {
			tie = true;
		}
		return true;
	});
	return tie;
}

function playAgainPrompt(type) {
	let typeString = type==0?"Congrats, you win!":"It's a tie."
	let playAgain = confirm(typeString + " Do you want to play again?");
	if(playAgain) {
		resetGame();
	} else {
		if(srcURL && !(srcURL.startsWith("file://") && !window.location.href.startsWith("file://"))) {
			window.location.href = srcURL;
		} else {
			mainEl.classList.add("hidden");
			resetButton.classList.add("hidden");
		}
	}
}

function resetGame() {
    /**
     * Assignment
     * Make sure this works (all fields empty, reset data if needed)
     */
	for(let i = 0; i < fields.length; i++) {
		fields[i].textContent = " ";
	}
	currentPlayer = 0;
}

console.log('File loaded');