"use strict";

//define ranks and suits as arrays
const ranks = [{id: "2", value: 2}, {id:"3", value: 3}, {id:"4", value: 4}, {id:"5", value: 5}, {id:"6", value: 6}, {id:"7", value: 7}, {id:"8", value: 8}, {id:"9", value: 9}, {id:"10", value: 10}, {id:"jack", value: 10}, {id:"queen", value: 10}, {id:"king", value: 10}, {id:"ace", value: 11}];
const suits = ["club", "spade", "heart", "diamond"];
const blackjack = 21;
const aceConditionalValue = 1;

//define the deck as an array
export let deck = [];

//build the deck by iterating the assignSuit function for each element of the ranks array
export function buildDeck(){
    ranks.forEach(assignSuit)
}

//assigns each suit to a particular card rank and adds to the deck array. Called in the buildDeck function.
function assignSuit(cardRank){
    for (let i = 0; i < suits.length; i++) {
        deck.push({rank: cardRank, suit: suits[i]});
    }
}

export function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

//add the total value of the hand based on card rank
export function getHandTotal(target){
    let handTotal = 0;

    for (const card of target.hand) {
        handTotal += card.rank.value;
    }
    /**
     * TODO:
     * Test logic below
     */
    while (handTotal > blackjack && target.hand.some(e => e.id === "ace" && e.value !== aceConditionalValue)){
        //find the index of an object that contains the property id === "ace" and has not already been set to 1
        let aceIndex = target.hand.findIndex(e => e.id === "ace" && e.value !== aceConditionalValue);
        target.hand[aceIndex].value = aceConditionalValue;
    }

    return handTotal;
}