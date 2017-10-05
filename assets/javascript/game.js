//-------------------------------//
// javascript for hangman game
//-------------------------------//
//array to hold all of the hangman chosenWords plus thier corresponding pictures
var mountains = [
	['Washington', 'assets/images/washington.jpg'],
	['Adams', 'assets/images/adams.jpg'],
	['Jefferson', 'assets/images/jefferson.jpg'],
	['Monroe', 'assets/images/monroe.jpg'],
	['Madison', 'assets/images/madison.jpg'],
	['Lafayette', 'assets/images/lafayette.jpg'],
	['Lincoln', 'assets/images/lincoln.jpg'],
	// ['South Twin', 'assets/images/southtwin.jpg'],
	// ['Carter Dome', 'assets/images/carterdome.jpg'],
	['Moosilauke', 'assets/images/moosilauke.jpg'],
	['Eisenhower', 'assets/images/eisenhower.jpg'],
	// ['North Twin', 'assets/images/northtwin.jpg'],
	['Carrigain', 'assets/images/carrigain.jpg'],
	['Bond', 'assets/images/bond.jpg'],
	// ['Middle Carter', 'assets/images/carter.jpg'],
	// ['West Bond', 'assets/images/bond.jpg'],
	['Garfield', 'assets/images/garfield.jpg'],
	['Liberty', 'assets/images/liberty.jpg'],
	// ['South Carter', 'assets/images/carter.jpg'],
	['Wildcat', 'assets/images/wildcat.jpg'],
	['Hancock', 'assets/images/hancock.jpg'],
	// ['South Kinsman', 'assets/images/kinsman.jpg'],
	['Field', 'assets/images/field.jpg'],
	['Osceola', 'assets/images/osceola.jpg'],
	['Flume', 'assets/images/flume.jpg'],
	// ['South Hancock', 'assets/images/hancock.jpg'],
	['Pierce', 'assets/images/eisenhower.jpg'],
	// ['North Kinsman', 'assets/images/kinsman.jpg'],
	['Willey', 'assets/images/willey.jpg'],
	['Bondcliff', 'assets/images/bond.jpg'],
	['Zealand', 'assets/images/zealand.jpg'],
	// ['North Tripyramid', 'assets/images/tripyramid.jpg'],
	['Cabot', 'assets/images/cabot.jpg'],
	['East Osceola', 'assets/images/osceola.jpg'],
	// ['Middle Tripyramid', 'assets/images/tripyramid.jpg'],
	['Cannon', 'assets/images/cannon.jpg'],
	['Hale', 'assets/images/hale.jpg'],
	['Jackson', 'assets/images/jackson.jpg'],
	['Tom', 'assets/images/tom.jpg'],
	['Moriah', 'assets/images/moriah.jpg'],
	['Passaconaway', 'assets/images/passaconaway.jpg'],
	// ['Owls Head', 'assets/images/owlshead.jpg'],
	['Galehead', 'assets/images/galehead.jpg'],
	['Whiteface', 'assets/images/whiteface.jpg'],
	['Waumbek', 'assets/images/waumbek.jpg'],
	['Isolation', 'assets/images/isolation.jpg'],
	['Tecumseh', 'assets/images/tecumseh.jpg']
];

//-----------------------------------------------//
//used for tracking remainingLetters for guesses
//-----------------------------------------------//
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

// steps needed
// press any key to begin
//get a random name from the mountains array
//count how many letters in the name and display that many dashes
// take in a guess, onKeyUp
// cycle through the letters in the word and if the entered letter is there, replace the appropriate dash with the letter
// also reduce the number of guesses by 1 and display the letter typed in the letters used category
// when all the letters in the word are replaced, then display a winning sound and message and update the photo
// when the used letter count reaches 0, then display end of game message and fill in the letters of the word and update the photo
// display do you want to play again message

//------------//
// variables
//------------//
var userChoice = "";
var letterCounter = 0;
var mountainIndex = 0;
var chosenWord = "";
var guessWord = [];
var displayWord = "";
var begin = true;
var lettersUsed = [];
var imgPath = "";
// var playAgain = true;
var winLoseMsg = "";
var winCounter = 0;
var lossCounter = 0;
var displayImg = "";
// var winFlag = "N";
// var loseFlag = "N";
// var wordArray = [];
var imgAttr = "";
var soundAttr = "";
// var beginKey = "";
var lettersRemaining = [];

//-------------//
// functions
//-------------//

function getRandomIndex(array) {
	// Randomly chooses a choice from the mountains array and
	//return the index.
	console.log("im in the getRandomIndex function");
	var index = Math.floor(Math.random() * array.length);	
	console.log("mountainIndex: " + index);
	return index;
}
function getTheArrayElement(index0, index1, array) {
	// Randomly chooses a choice from the mountains array.
	console.log("im in the getTheArrayElement function");
	var element1 = "";
	element1 = array[index0][index1];
	console.log("index: " + index0);
	console.log("chosenWord: " + element1);
	return element1;
}


function initializeHiddenWord(word) {
	//the hidden word should have a "_" for each letter in the word
	console.log("im in the initializeHiddenWord function");
	console.log(" word length: " + word.length);
	hiddenWord = [];
	for (let i = 0; i < word.length; i++) {
		hiddenWord.push("_");
	}
	return hiddenWord;

}

function addTheLetter(oneKeyStroke, correctWord, hiddenWord) {
	console.log("im in the addTheLetter function");
	console.log("Word: " + correctWord);
	console.log("hiddenWord: " + hiddenWord.toString());
	console.log("userChoice: " + oneKeyStroke);
	//check to see that the letter hasnt already been used
	if (lettersRemaining.includes(oneKeyStroke.toLowerCase())) {
		console.log("im inside the lettersRemaing If:");
		var index = lettersRemaining.indexOf(oneKeyStroke.toLowerCase());
		lettersRemaining.splice(index, 1);
		lettersUsed.push(oneKeyStroke);
		letterCounter--;
		console.log("index: " + index);
		console.log("lettersUsed: " + lettersUsed.toString());
		console.log("lettersRemaining: " + lettersRemaining.toString());
		// cycle through and determine if the letter entered is in the word
		for (let i = 0; i < correctWord.length; i++) {
			if (oneKeyStroke.toLowerCase() == correctWord.charAt(i).toLowerCase()) {
				console.log("found a match! ");
				hiddenWord.splice(i, 1, oneKeyStroke);
			}
		}
	}
	console.log("hiddenWord: " + hiddenWord.toString());
	return hiddenWord;
}

function displayTheWord(word) {
	//display the hidden word to the screen with spaces between the letters. 
	displayWord = "";
	console.log("im in the displayTheWord function");
	console.log(" word length: " + word.length);
	for (let i = 0; i < word.length; i++) {
		displayWord = displayWord + word[i].toUpperCase() + " ";
	}
	console.log("Word: " + word);
	console.log("displayWord: " + displayWord);
	return displayWord;
}


//------------------------------------//
// User enters their keystroke choice here
// The game BEGINs by user pressing any key
//------------------------------------//
document.onkeyup = function (event) {
	// Determines which key was pressed.
	userChoice = event.key;

	//-------------------------------------------------------//
	//first keystroke initializes the game, but doesnt contribute
	//to the letters guessed as part of the word
	//-------------------------------------------------------//
	if (begin) {
		console.log("begin playing the game");
		console.log("begin: " + begin);
		//--------------------//
		//initialize variables
		//--------------------//
		// winFlag = "N";
		// loseFlag = "N";
		letterCounter = 12;
		chosenWord = "";
		guessWord = [];
		displayWord = "";
		lettersUsed = [];
		lettersRemaining = alphabet.slice();
		// winLoseMsg = "";
		document.getElementById("winLoseMsg").innerHTML = "";
		//------------------------------------------------//
		//randomly choose a word from the mountains array
		//------------------------------------------------//
		mountainIndex = getRandomIndex(mountains);
		chosenWord = getTheArrayElement(mountainIndex, 0, mountains);
		imgPath    = getTheArrayElement(mountainIndex, 1, mountains);
		//------------------------------------------------//
		// initialize the hidden word to one dash for each
		// letter in the chosen word
		// and display it in the DOM along with counters
		//de-emphasize the 'press any key to begin' message
		//------------------------------------------------//
		guessWord = initializeHiddenWord(chosenWord);
		displayWord = displayTheWord(guessWord);
		console.log("displayWord: " + displayWord);
		document.getElementById("displayWord").innerHTML = displayWord;
		document.getElementById("letterCounter").innerHTML = letterCounter;
		document.getElementById("lettersUsed").innerHTML = lettersUsed;
		document.getElementById("begin").setAttribute("class", "inProgress");
		//--------------------------------------//
		//turn off the begin flag
		//--------------------------------------//
		begin = false;
	} else {
		//------------------------------------//
		//the user gets 12 guesses maximum; 
		//for loop will execute 12 times
		//------------------------------------//	
		for (let i = 0; i < 12; i++) {
			//process the users typed in choice

			console.log("guessWord before addTheLetter: " + guessWord.toString());
			addTheLetter(userChoice, chosenWord, guessWord);
			displayWord = displayTheWord(guessWord);

			//write the variables to the DOM
			document.getElementById("displayWord").innerHTML = displayWord;
			document.getElementById("letterCounter").innerHTML = letterCounter;
			document.getElementById("lettersUsed").innerHTML = lettersUsed;
			console.log("letterCounter: " + letterCounter);
			console.log("guessWord : " + guessWord.toString());

			//----------------------//
			//winning or lose check
			//----------------------//
			//once all the letters have been guessed, there are no more '_' 
			//in the guessWord and user wins
			//update the mountain image, send out win message, update win counter
			if (!guessWord.includes("_")) {
				//winning
				console.log("im in the win if");
				// winFlag = "Y";
				console.log("imgPath: " + imgPath);
				imgAttr = document.getElementById("displayImg");
				imgAttr.setAttribute("src", imgPath);
				winCounter++;
				document.getElementById("winCounter").innerHTML = winCounter;
				document.getElementById("winLoseMsg").innerHTML = "YOU WIN!!";
				document.getElementById("begin").setAttribute("class", "begin");

				///////////////////////
				soundAttr = document.getElementById("winLoseMsg");
				soundAttr.insertAdjacentHTML("afterend", 
				"<audio autoplay hidden><source src='assets/sounds/24_Congrats.mp3' type='audio/mpeg'> CONGRATULATIONS!</audio>");
				///////////////////////
				// break out of the for loop, user won and game is over
				i = 12;
				console.log("i: " + i);
				console.log("in the win if, letterCounter: " + letterCounter);
				begin = true;
			//note: letterCounter counts down backwards from 12 to 0
			//when letterCounter gets to 0, all chances are used up and user loses
			} else if (letterCounter < 1) {
				//losing
				console.log("im in the lose if");
				// loseFlag = "Y";
				imgAttr = document.getElementById("displayImg");
				imgAttr.setAttribute("src", imgPath);
				lossCounter++;
				console.log("lossCounter " + lossCounter);
				displayWord = displayTheWord(chosenWord);
				document.getElementById("displayWord").innerHTML = displayWord;
				document.getElementById("lossCounter").innerHTML = lossCounter;
				document.getElementById("winLoseMsg").innerHTML = "YOU LOSE!!";
				document.getElementById("begin").setAttribute("class", "begin");
				begin = true;
				//at the end of the for loop, user lost and game is over
				console.log("i: " + i);
			} //if win or lose end

		} //for loop end
	} //if begin end
} // on.keyup end