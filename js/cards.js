"use strict";

export {buildDeck, getCardURL, shuffle, blackjack, aceConditionalValue, aceDefaultValue, deck, FACE_DOWN_CARD_PATH};

const CARDS_IMAGE_PATH = './assets/sprites/cards';
const FACE_DOWN_CARD_PATH = './assets/sprites/cards/back_blue_basic.png';
const blackjack = 21;
const aceConditionalValue = 1;
const aceDefaultValue = 11;
const deck = [];

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

function buildDeck() {
    ranks.forEach(assignSuit)
}

function assignSuit(cardRank) {
    for (let i = 0; i < suits.length; i++) {
        deck.push({
            rank: cardRank,
            suit: suits[i].name,
        });
    }
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}