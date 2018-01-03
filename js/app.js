/*
 * Create a list that holds all of your cards
 */


var deck = [];

$(".deck").find("li").each(function () {
	deck.push($(this));
	console.log($(this));
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


shuffle(deck);

for (i = 0; i < deck.length; i++) {
	$(".deck").prepend(deck[i]);
};





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var openCards = [];
var pair = [];
var moveCounter = 0;
const TOTAL_CARDS = 16;
var starCount = 3;
var timeCount = 0;

/** Timer required */
setInterval(function () {
  timeCount++;
  if (timeCount === 1) {
  	$(".time").text(timeCount + " sec");
  } else {
  	$(".time").text(timeCount + " secs");
  }
}, 1000);




/** Listener for the card click */
$(".deck").find("li").on("click", function () {
	flipCard($(this));
	addOpenCard($(this));
	addCount(moveCounter);
	pair.push($(this));
	displayStars(moveCounter);

	// setTimeout(flipCard(currentCard), 5000);
	// setTimeout(function () { alert("Hello!") }, 1000);

	if (typeof pair !== 'undefined' && pair.length > 1) {
   
    	var currentCard = pair[pair.length - 1];
   		var pastCard = pair[pair.length - 2];

   		console.log(pair);

    	if (currentCard.find("i").attr('class') === pastCard.find("i").attr('class')) {
    		matchCards(currentCard, pastCard);
    		console.log("Card Match!");
    	} else {
    		setTimeout(function () { removeOpenCards(currentCard, pastCard, openCards.length - 2) }, 500);
    	}

    	pair.splice(0);
	}

	

	if (openCards.length === 16) {
		setTimeout(function () { displayMessage() }, 500);
	}	

});


/** Listener for the restart button */
$(".restart").on("click", function () {
	restart();
});


/**
* @description Adds open card to openCards
* @param {object} card - a card
*/
function addOpenCard(card) {
	openCards.push(card);
}


/**
* @description Displays stars depending on number of moves made
* @param {int} moves - number of moves
*/
function displayStars (moves) {

	console.log("moves: " + moves);

	switch (moves) {
		case 20:
			$(".stars").find("#star3").find("i").attr("class", "fa fa-star-o");
			starCount -= 1;
			break;
		
		case 30:
			$(".stars").find("#star2").find("i").attr("class", "fa fa-star-o");
			starCount -= 1;
			break;

		default:
			break;
	}
}


/**
* @description Displays an open card
* @param {object} card - a card
*/
function flipCard(card) {
	card.attr("class", "card open show");
}

/**
* @description Removes two open cards on game board
* @param {object} card - first card
* @param {object} card - second card
* @param {int} index - index of openCards startng at card1
*/
function removeOpenCards (card1, card2, index) {
    openCards.splice(index);
    mismatch1 = card1.attr("class", "card");
    mismatch2 = card2.attr("class", "card");
    console.log(openCards);
}

/**
* @description Displays correct card color when two cards match
* @param {object} card1 - first card
* @param {object} card2 - second card
*/
function matchCards(card1, card2) {
	card1.attr("class", "card match");
	card2.attr("class", "card match");
}

/**
* @description Increment the number of moves a user takes
* @param {int} moveCounter - User move count
*/
function addCount(moveCount) {
	moveCounter += 1;
	console.log("moveCount: " + moveCounter);
	$(".moves").text(moveCounter);
}

function restart() {
	openCards.splice(0);
	pair.splice(0);
	moveCounter = 0;
	timeCount = 0;
	starCount = 3;
	$(".moves").text(moveCounter);
	$(".stars").find("i").attr("class", "fa fa-star");
	$(".deck").find("li").attr("class", "card");
}

/**
* @description Displays message at the end of the game
*/
function displayMessage () {
	if (window.confirm("Congrations! You've won! With " + moveCounter + " moves and " + starCount + " stars in " + timeCount + " seconds. Play Again?")) { 
		restart();
	}
}










