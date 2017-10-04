// javascript for hangman game

//array to hold all of the hangman words plus thier corresponding pictures
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

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "Q", "r", "s", "t", "u", "v", "x", "y", "z"
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

// variables

var userChoice = "";
var letterCounter = 12;
var mountainIndex = 0;
var word = "";
var imgPath = "chocorua.jpg";
var hiddenWord = [];
var displayWord = "";
var begin = false;
var lettersUsed = [];
var playAgain = true;
var winLoseMsg = "";
var winCounter = 0;
var lossCounter = 0;
var displayImg = "";
var winFlag = "N";
var loseFlag = "N";
var wordArray = [];
var imgAttr = "";


// functions

function chooseWord() {
	// Randomly chooses a choice from the mountains array.
	console.log("im in the chooseWord function");
	mountainIndex = Math.floor(Math.random() * mountains.length);
	word = mountains[mountainIndex][0];
	imgPath = mountains[mountainIndex][1];
	winLoseMsg = "";
	console.log("mountainIndex: " + mountainIndex);
	console.log("word: " + word);
	console.log("imgName: " + imgPath);

}

function initializeHiddenWord(word) {
	//the hidden word should have a "_" for each letter in the word
	console.log("im in the initializeHiddenWord function");
	console.log(" word length: " + word.length);
	hiddenword = [];
	for (let i = 0; i < word.length; i++) {
		// if (word.charAt(i) === " ") {
		// 	hiddenWord.push(" ");
		// } else {
		hiddenWord.push("_");
		}
		console.log("hiddenWord: " + hiddenWord.toString());
		return hiddenWord;
	
}

function addTheLetter() {
	console.log("im in the addTheLetter function");
	console.log("word: " + word);
	console.log("hiddenWord: " + hiddenWord.toString());
	console.log("userChoice: " + userChoice);
	console.log("lettersUsed: " + lettersUsed.toString());
	lettersUsed.push(userChoice);
	console.log("lettersUsed: " + lettersUsed.toString());
	for (let i = 0; i < word.length; i++) {
		console.log("hiddenWord: " + hiddenWord.toString());
		console.log("word.charAt: " + word.charAt(i).toLowerCase());
		if (userChoice.toLowerCase() == word.charAt(i).toLowerCase()) {
			console.log("found a match! ");
			hiddenWord.splice(i, 1, userChoice);
		}
	}
	console.log("hiddenWord: " + hiddenWord.toString());
	return hiddenWord;
}

function displayTheWord() {
	//display the hidden word to the screen with spaces between the letters. 
	displayWord = "";
	console.log("im in the displayTheWord function");
	console.log(" word length: " + hiddenWord.length);
	for (let i = 0; i < hiddenWord.length; i++) {
		displayWord = displayWord + hiddenWord[i].toUpperCase() + " ";
	}
	console.log("Word: " + word);
	console.log("hiddenWord: " + hiddenWord.toString());
	console.log("displayWord: " + displayWord);
	// document.getElementById("displayWord") = displayWord;
	return displayWord;
}

// function determineWinOrLose() {
// 	if (word.toLowerCase() === hiddenWord.toString.toLowerCase()) {
// 		imgPath = mountains[mountainIndex][1];
// 		winCounter++;
// 		document.getElementById("YOU WIN!!").innerHTML = winLoseMsg;
// 	} else {
// 		lossCounter++;
// 		document.getElementById("YOU LOSE!!").innerHTML = winLoseMsg;
// 	}
// }

function displayMountainImg(imgPath) {
	// writes an image tag for the appropriate mountain picture.
displayImg.setAttribute("src","assets/images/" + imgPath);
	// document.write("<img  " + "src=assets/images/" + imgPath + " height='300' width='300' alt='mountain pic'>");
	// return displayImg;
}


// BEGIN by pressing any key:
// while (playAgain) {
document.onkeyup = function (event) {
	// Determines which key was pressed.
	console.log("im beginning by setting begin to true");
	userChoice = event.key;
	console.log("begin: " + begin);
	begin = true;
	console.log("begin: " + begin);
	console.log("userChoice: " + userChoice);

	// displayImg = displayMountainImg(imgPath);
	// document.getElementById("displayImg").innerHTML = displayImg;

	//play the game, begin choosing letters
	console.log("begin playing the game");
	console.log("begin: " + begin);

	//choose a word from the mountains array
	chooseWord();
	// initialize the hidden word to all dashes
	hiddenWord = initializeHiddenWord(word);
	//display the hiddenword
	displayWord = displayTheWord(hiddenWord);
	document.getElementById("displayWord").innerHTML = displayWord;
	document.getElementById("letterCounter").innerHTML = letterCounter;
	// displayImg = "<img src=/assets/images/chocorua.jpg height='300' width='300' alt='mountain pic'>";
	// document.getElementById("displayImg").innerHTML = displayImg;
	// displayImg = document.write("<img src = " + imgPath + "height='300' width='300' alt='mountain pic'>"
	//    ); 

	//User enters their letter choice here
	// document.onkeyup = function (event) {
	// Determines which key was pressed.
	// userChoice = event.key;

	//the user gets 12 guesses maximum; for loop will execute 12 times
	for (let i = 0; i < 12; i++) {
		//User enters thier key choice
		document.onkeyup = function (event) {
			// Determines which key was pressed.
			userChoice = event.key;
			console.log("hiddenWord before addTheLetter: " + hiddenWord.toString());
			addTheLetter();
			console.log("hiddenWord before displayTheWord: " + hiddenWord.toString());
			displayWord = displayTheWord(hiddenWord);
			letterCounter--;
			document.getElementById("displayWord").innerHTML = displayWord;
			document.getElementById("letterCounter").innerHTML = letterCounter;
			console.log("letterCounter: " + letterCounter);
			document.getElementById("lettersUsed").innerHTML = lettersUsed;
			console.log("hiddenword to string: " + hiddenWord.toString().toLowerCase());
			console.log("word split: " + word.split(","));
			console.log("strigify " + JSON.stringify(hiddenWord));
			// wordArray = array.from(word);
			// if (JSON.stringify(wordArray) === JSON.stringify(hiddenWord)) {
			console.log("hiddenword : " + hiddenword.toString());
			if (!hiddenWord.includes("_") ){
				console.log("im in the win if");
				winFlag = "Y";
				imgPath = mountains[mountainIndex][1];
				imgAttr = document.getElementById("displayImg");
				imgAttr.setAttribute("src",  imgPath );
				winCounter++;
				document.getElementById("winCounter").innerHTML = winCounter;
				document.getElementById("winLoseMsg").innerHTML = "YOU WIN!!";
				i = 12;
				console.log("in the win if letterCounter: " + letterCounter);
			}
		}
		if (letterCounter === 0 && winFlag !== "Y") {
			console.log("im in the lose if");
			lossCounter++;
			document.getElementById("YOU LOSE!!").innerHTML = winLoseMsg;
			loseFlag = "Y";
		}
		// determineWinOrLose();
		// playAgain = alert("Do you want to play again??");
	}
}

// }
// }