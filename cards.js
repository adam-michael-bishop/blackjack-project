"use strict";

//define ranks and suits as arrays
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
const suits = ["club", "spade", "heart", "diamond"];

//define the deck as an array
let deck = [];

//build the deck by iterating the assignSuit function for each element of the ranks array
function buildDeck(){
    ranks.forEach(assignSuit)
}

//assigns each suit to a particular card rank and adds to the deck array. Called in the buildDeck function.
function assignSuit(cardRank){
    for (let i = 0; i < suits.length; i++) {
        deck.push({rank: cardRank, suit: suits[i]});
    }
}

function shuffleArray(arr){
    for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

buildDeck();
shuffleArray(deck);
console.log(deck, deck.length);