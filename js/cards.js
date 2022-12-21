"use strict";

//For generating card sprite
export const SPRITE_WIDTH = 60;
export const SPRITE_HEIGHT = 84;
export const BORDER_WIDTH = 1;
export const SPACING_WIDTH = 2;

const ranks = [
    {
        id: "2",
        value: 2,
    },
    {
        id: "3",
        value: 3,
    },
    {
        id: "4",
        value: 4,
    },
    {
        id: "5",
        value: 5,
    },
    {
        id: "6",
        value: 6,
    },
    {
        id: "7",
        value: 7,
    },
    {
        id: "8",
        value: 8,
    },
    {
        id: "9",
        value: 9,
    },
    {
        id: "10",
        value: 10,
    },
    {
        id: "jack",
        value: 10,
    },
    {
        id: "queen",
        value: 10,
    },
    {
        id: "king",
        value: 10,
    },
    {
        id: "ace",
        value: 11,
    },
];
const suits = [
    {
        name: "club",
    },
    {
        name: "spade",
    },
    {
        name: "heart",
    },
    {
        name: "diamond",
    },
];
export const blackjack = 21;
export const aceConditionalValue = 1;
export const aceDefaultValue = 11;

//define the deck as an array
export const deck = [];

//build the deck by iterating the assignSuit function for each element of the ranks array
export function buildDeck(){
    ranks.forEach(assignSuit)
}

//assigns each suit to a particular card rank and adds to the deck array. Called in the buildDeck function.
function assignSuit(cardRank){
    for (let i = 0; i < suits.length; i++) {
        deck.push({
            rank: cardRank,
            suit: suits[i].name,
        });
    }
}

export function shuffle(arr){
    for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function spritePositionToImagePosition(row, col) {
    return {
        x: (BORDER_WIDTH + col * (SPACING_WIDTH + SPRITE_WIDTH)),
        y: (BORDER_WIDTH + row * (SPACING_WIDTH + SPRITE_HEIGHT)),
    }
}
