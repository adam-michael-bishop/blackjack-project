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
        colPos: 1,
    },
    {
        id: "3",
        value: 3,
        colPos: 2,
    },
    {
        id: "4",
        value: 4,
        colPos: 3,
    },
    {
        id: "5",
        value: 5,
        colPos: 4,
    },
    {
        id: "6",
        value: 6,
        colPos: 5,
    },
    {
        id: "7",
        value: 7,
        colPos: 6,
    },
    {
        id: "8",
        value: 8,
        colPos: 7,
    },
    {
        id: "9",
        value: 9,
        colPos: 8,
    },
    {
        id: "10",
        value: 10,
        colPos: 9,
    },
    {
        id: "jack",
        value: 10,
        colPos: 10,
    },
    {
        id: "queen",
        value: 10,
        colPos: 11,
    },
    {
        id: "king",
        value: 10,
        colPos: 12,
    },
    {
        id: "ace",
        value: 11,
        colPos: 13,
    },
];
const suits = [
    {
        name: "club",
        rowPos: 1,
    },
    {
        name: "spade",
        rowPos: 3,
    },
    {
        name: "heart",
        rowPos: 0,
    },
    {
        name: "diamond",
        rowPos: 2,
    },
];
export const blackjack = 21;
export const aceConditionalValue = 1;
export const aceDefaultValue = 11;

//define the deck as an array
export let deck = [];

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
            pos: {
                col: cardRank.colPos,
                row: suits[i].rowPos,
            },
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
