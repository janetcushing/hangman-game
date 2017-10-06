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
	['South Twin', 'assets/images/southtwin.jpg'],
	['Carter Dome', 'assets/images/carterdome.jpg'],
	['Moosilauke', 'assets/images/moosilauke.jpg'],
	['Eisenhower', 'assets/images/eisenhower.jpg'],
	['North Twin', 'assets/images/northtwin.jpg'],
	['Carrigain', 'assets/images/carrigain.jpg'],
	['Bond', 'assets/images/bond.jpg'],
	['Middle Carter', 'assets/images/carter.jpg'],
	['West Bond', 'assets/images/bond.jpg'],
	['Garfield', 'assets/images/garfield.jpg'],
	['Liberty', 'assets/images/liberty.jpg'],
	['South Carter', 'assets/images/carter.jpg'],
	['Wildcat', 'assets/images/wildcat.jpg'],
	['Hancock', 'assets/images/hancock.jpg'],
	['South Kinsman', 'assets/images/kinsman.jpg'],
	['Field', 'assets/images/field.jpg'],
	['Osceola', 'assets/images/osceola.jpg'],
	['Flume', 'assets/images/flume.jpg'],
	['South Hancock', 'assets/images/hancock.jpg'],
	['Pierce', 'assets/images/eisenhower.jpg'],
	['North Kinsman', 'assets/images/kinsman.jpg'],
	['Willey', 'assets/images/willey.jpg'],
	['Bondcliff', 'assets/images/bond.jpg'],
	['Zealand', 'assets/images/zealand.jpg'],
	['North Tripyramid', 'assets/images/tripyramid.jpg'],
	['Cabot', 'assets/images/cabot.jpg'],
	['East Osceola', 'assets/images/osceola.jpg'],
	['Middle Tripyramid', 'assets/images/tripyramid.jpg'],
	['Cannon', 'assets/images/cannon.jpg'],
	['Hale', 'assets/images/hale.jpg'],
	['Jackson', 'assets/images/jackson.jpg'],
	['Tom', 'assets/images/tom.jpg'],
	['Moriah', 'assets/images/moriah.jpg'],
	['Passaconaway', 'assets/images/passaconaway.jpg'],
	['Owls Head', 'assets/images/owlshead.jpg'],
	['Galehead', 'assets/images/galehead.jpg'],
	['Whiteface', 'assets/images/whiteface.jpg'],
	['Waumbek', 'assets/images/waumbek.jpg'],
	['Isolation', 'assets/images/isolation.jpg'],
	['Tecumseh', 'assets/images/tecumseh.jpg']
];

//--------------------------------------------------------//
//alphabet used for tracking remainingLetters for guesses
//--------------------------------------------------------//
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

// how to play:
// press any key to begin
// get a random name from the mountains array
// count how many letters in the name and display that many dashes
// take in a guess, onKeyUp
// cycle through the letters in the word and if the entered letter is there, replace the appropriate dash with the letter
// also reduce the number of guesses by 1 and display the letter typed in the letters used category
// when all the letters in the word are replaced, then display a winning sound and message and update the photo
// when the used letter count reaches 0, then display end of game message and fill in the letters of the word and update the photo
// display do you want to play again message

//-------------------//
// global variables
//-------------------//
var userChoice = "";
var letterCounter = 0;
var mountainIndex = 0;
var chosenWord = "";
var guessWord = [];
var displayWord = "";
var begin = true;
var lettersUsed = [];
var lettersRemaining = [];
var winLoseMsg = "";
var winCounter = 0;
var lossCounter = 0;
var displayImg = "";
var imgPath = "";
var imgAttr = "";
var soundAttr = "";


//-------------//
// functions
//-------------//

// get a random number to use as the index to select the "chosenWord"
function getRandomIndex(array) {
	var index = Math.floor(Math.random() * array.length);
	return index;
}

// using the index generated from the getRandomIndex function,
// use this function to return the elements from the 
// mountains array.  First call the function to return the mountain 
// name as chosenWord, then call the function again to get the 
// picture associated with that mountain.
function getTheArrayElement(index0, index1, array) {
	var element1 = "";
	element1 = array[index0][index1];
	return element1;
}

// this function takes in the chosenWord, and
// returns the guessWord array populated with
// one underscore character for each letter in
// chosenWord.  if the chosenWord has a space in it,
// a space is entered into the guessWord, rather than 
// an underscore
function initializeGuessWord(word) {
	var hiddenWord = [];
	for (let i = 0; i < word.length; i++) {
		if (word.charAt(i) === " ") {
			hiddenWord.push("&#29;");
		} else {
			hiddenWord.push("_");
		}
	}
	return hiddenWord;
}

// update the letterCounter variable.  if the keystroke has not been
// entered yet, reduce the letter counter by 1, and move the letter
//from the lettersRemaining array to the lettersUsed array.  if it has been
// previously entered, then ignore that keystroke
function countTheLetter(oneKeyStroke, remaining, used, counter) {
	if (remaining.includes(oneKeyStroke.toLowerCase())) {
		var index = remaining.indexOf(oneKeyStroke.toLowerCase());
		remaining.splice(index, 1);
		used.push(oneKeyStroke);
		counter--;
	}
	return counter;
}

// process the key entered by the user.  check if it is in
// the chosenWord or not, and if so, add it to the guessWords array
// in the proper position 
function addTheLetter(oneKeyStroke, correctWord, guessingWord) {
	for (let i = 0; i < correctWord.length; i++) {
		if (oneKeyStroke.toLowerCase() == correctWord.charAt(i).toLowerCase()) {
			guessingWord.splice(i, 1, oneKeyStroke);
		}
	}
	return guessingWord;
}

// format the word for displaying to the DOM.  Put spaces between the letters
// and make the letters upper case
function formatTheWordForDisplay(word) {
	var formatWord = "";
	for (let i = 0; i < word.length; i++) {
		formatWord = formatWord + word[i].toUpperCase() + " ";
	}
	return formatWord;
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

		//--------------------//
		//initialize variables
		//--------------------//
		letterCounter = 12;
		chosenWord = "";
		guessWord = [];
		displayWord = "";
		lettersUsed = [];
		lettersRemaining = alphabet.slice();
		winLoseMsg = "";

		//------------------------------------------------//
		//randomly choose a word from the mountains array
		//------------------------------------------------//
		mountainIndex = getRandomIndex(mountains);
		chosenWord = getTheArrayElement(mountainIndex, 0, mountains);
		imgPath = getTheArrayElement(mountainIndex, 1, mountains);

		//------------------------------------------------//
		// initialize the guess word to one dash for each
		// letter in the chosen word
		// and display it in the DOM along with counters
		// de-emphasize the 'press any key to begin' message
		// and remove the win or lose message from the previous game
		//------------------------------------------------//
		guessWord = initializeGuessWord(chosenWord);
		displayWord = formatTheWordForDisplay(guessWord);

		document.getElementById("displayWord").innerHTML = displayWord;
		document.getElementById("letterCounter").innerHTML = letterCounter;
		document.getElementById("lettersUsed").innerHTML = lettersUsed.join(" ").toUpperCase();
		document.getElementById("begin").setAttribute("class", "inProgress");
		document.getElementById("winLoseMsg").innerHTML = "";
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
			letterCounter = countTheLetter(userChoice, lettersRemaining, lettersUsed, letterCounter);
			guessWord = addTheLetter(userChoice, chosenWord, guessWord);
			displayWord = formatTheWordForDisplay(guessWord);

			//write the variables to the DOM
			document.getElementById("displayWord").innerHTML = displayWord;
			document.getElementById("letterCounter").innerHTML = letterCounter;
			document.getElementById("lettersUsed").innerHTML = lettersUsed.join(" ").toUpperCase();

			//----------------------//
			// win or lose check
			//----------------------//
			// once all the letters have been guessed correctly, there are no more '_' 
			// in the guessWord and user wins
			// update the mountain image, send out win message, update win counter
			if (!guessWord.includes("_")) {
				//winning
				imgAttr = document.getElementById("displayImg");
				imgAttr.setAttribute("src", imgPath);
				soundAttr = document.getElementById("winLoseMsg");
				soundAttr.insertAdjacentHTML("afterend",
					"<audio autoplay hidden><source src='assets/sounds/24_Congrats.mp3' type='audio/mpeg'> CONGRATULATIONS!</audio>");
				winCounter++;
				document.getElementById("winLoseMsg").style.fontSize = "28px";
				document.getElementById("winLoseMsg").style.color = "red";
				document.getElementById("winLoseMsg").style.fontWeight = "bold";
				document.getElementById("winLoseMsg").innerHTML = "YOU WIN!!";
				document.getElementById("winCounter").innerHTML = winCounter;
				document.getElementById("begin").setAttribute("class", "begin");
				// break out of the for loop, user won and game is over
				i = 12;
				begin = true;

				// note: letterCounter counts down backwards from 12 to 0
				// when letterCounter gets to 0, all chances are used up and user loses
			} else if (letterCounter < 1) {
				//losing
				imgAttr = document.getElementById("displayImg");
				imgAttr.setAttribute("src", imgPath);
				soundAttr = document.getElementById("winLoseMsg");
				soundAttr.insertAdjacentHTML("afterend",
					"<audio autoplay hidden><source src='assets/sounds/336998__corsica-s__awww-01.wav' type='audio/wav'> SO SAD!</audio>");
				lossCounter++;
				displayWord = formatTheWordForDisplay(chosenWord);
				document.getElementById("winLoseMsg").style.fontSize = "28px";
				document.getElementById("winLoseMsg").style.color = "red";
				document.getElementById("winLoseMsg").style.fontWeight = "bold";
				document.getElementById("winLoseMsg").innerHTML = "YOU LOSE!!";
				document.getElementById("displayWord").innerHTML = displayWord;
				document.getElementById("lossCounter").innerHTML = lossCounter;
				document.getElementById("begin").setAttribute("class", "begin");
				begin = true;
				//at the end of the for loop, user lost and game is over
				i = 12;
			} //if win or lose end
		} //for loop end
	} //if begin end
} // on.keyup end