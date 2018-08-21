/*
 * Create a list that holds all of your cards
 */

let deck = [];
let moveCount = 0;

function start() {
    let cardList = document.getElementsByClassName('card');
    for (let i = 0; i < cardList.length; i++) {
        deck.push(cardList[i].innerHTML);
    }
    shuffle(deck);
    for (let j = 0; j < cardList.length; j++) {
        document.getElementsByClassName('card')[j].innerHTML = deck[j];
    }
}

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
}


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

let openCards = [];

function flip() {
    if (openCards.length == 0 && !event.target.classList.contains('match')) {
        event.target.classList.toggle('flip');
        openCards.push(event.target);
    } else if (openCards.length == 1 && !event.target.classList.contains('match')) {
        event.target.classList.toggle('flip');
        openCards.push(event.target);
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            openCards = [];
        } else {
            setTimeout( function() {
                openCards[0].classList.toggle('flip');
                openCards[1].classList.toggle('flip');
                openCards = [];
            }, 1200);
        }
    }
    moveCount++;
    document.getElementById('counter').innerHTML = moveCount;
}

document.getElementsByClassName('board')[0].addEventListener('click', flip);

start();