"use strict";

let moveCount = 0;
let time;
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
    time = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let openCards = [];

// this function controls what happens when a card is clicked
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

// when a match is made, this function determines if the game has been won
function winCheck() {
    if (document.getElementsByClassName('match').length === 16) {
        document.getElementById('seconds').innerHTML = time;
        document.getElementById('moves').innerHTML = moveCount;
        document.getElementById('starScore').innerHTML = document.getElementById('stars').innerHTML;
        modal.style.display = "block";
    };
}

// this function updates the star counter
function stars() {
    if (moveCount == 14) {
        document.getElementById('stars').innerHTML = '&#9733; &nbsp; &#9733; &nbsp; &#9734;';
    } else if (moveCount == 20) {
        document.getElementById('stars').innerHTML = '&#9733; &nbsp; &#9734; &nbsp; &#9734;';
    }
}

// this function adds zeroes to time if needed
function timePad(seconds) {
    if (seconds < 10) {
        return '0' + seconds;
    } else if (seconds >= 10) {
        return seconds;
    }
}

// this function resets the game
function restart() {
    modal.style.display = 'none';
    let matches = document.getElementsByClassName('card');
    for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove('match');
        matches[i].classList.remove('flip');
    }
    document.getElementById('stars').innerHTML = '&#9733; &nbsp; &#9733; &nbsp; &#9733;';
    start();
    document.getElementById('counter').innerHTML = moveCount;
}

// event listener for any element in the board
document.getElementsByClassName('board')[0].addEventListener('click', flip);

// event listener for the play again button in the modal
document.getElementById('play-again').addEventListener('click', restart);

// event listener for the restart button in the nav bar
document.getElementById('restart').addEventListener('click', restart);

start();

window.setInterval( function() {
    time++;
    if ( time < 60 ) {
        document.getElementById('timer').innerHTML = '0:' + timePad(time);
    } if (time >= 60 ) {
        document.getElementById('timer').innerHTML = (Math.floor(time / 60)) + ':' + timePad(time - (Math.floor(time / 60) * 60));
    }
}, 1000);