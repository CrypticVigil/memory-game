let moveCount = 0;
let startTime;
let modal = document.getElementsByClassName('win-modal')[0];

// function that sets up the cards for the beginning of the game
function start() {
    let deck = [];
    let cardList = document.getElementsByClassName('card');
    for (let i = 0; i < cardList.length; i++) {
        deck.push(cardList[i].innerHTML);
    }
    shuffle(deck);
    for (let j = 0; j < cardList.length; j++) {
        document.getElementsByClassName('card')[j].innerHTML = deck[j];
    }
    moveCount = 0;
    startTime = Date.now();
}

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
    if (openCards.length == 0
        && !event.target.classList.contains('match')
        && !event.target.classList.contains('board')) {
            event.target.classList.toggle('flip');
            openCards.push(event.target);
    } else if (openCards.length == 1
        && !event.target.classList.contains('match')
        && !event.target.classList.contains('board')) {
            event.target.classList.toggle('flip');
            openCards.push(event.target);
            if (openCards[0].innerHTML === openCards[1].innerHTML) {
                openCards[0].classList.add('match');
                openCards[1].classList.add('match');
                moveCount++;
                document.getElementById('counter').innerHTML = moveCount;
                openCards = [];
                stars();
                winCheck();
            } else {
                setTimeout( function() {
                    openCards[0].classList.toggle('flip');
                    openCards[1].classList.toggle('flip');
                    moveCount++;
                    document.getElementById('counter').innerHTML = moveCount;
                    openCards = [];
                    stars();
                }, 1200);
            }
    }
}

function winCheck() {
    if (document.getElementsByClassName('match').length === 16) {
        let totalTime = Date.now() - startTime;
        document.getElementById('seconds').innerHTML = Math.round(totalTime / 1000);
        document.getElementById('moves').innerHTML = moveCount;
        modal.style.display = "block";
    };
}

function stars() {
    if (moveCount == 14) {
        document.getElementById('stars').innerHTML = '&#9733; &nbsp; &#9733; &nbsp; &#9734;';
    } else if (moveCount == 21) {
        document.getElementById('stars').innerHTML = '&#9733; &nbsp; &#9734; &nbsp; &#9734;';
    } else if (moveCount == 28) {
        document.getElementById('stars').innerHTML = '&#9734; &nbsp; &#9734; &nbsp; &#9734;';
    }
}

document.getElementsByClassName('board')[0].addEventListener('click', flip);
document.getElementById('restart').addEventListener('click', function() {
    modal.style.display = 'none';
    let matches = document.getElementsByClassName('card');
    for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove('match');
        matches[i].classList.remove('flip');
    }
    start();
});

start();