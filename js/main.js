"use strict";

import * as Game from "./game.js";
import * as Cards from "./cards.js";

const CARDS_IMAGE_PATH = './assets/sprites/cards';
const MAIN_GAME_WINDOW = document.getElementById('game-window');
const PLAYER_HAND_WINDOW_ID = 'player-hand';
const DEALER_HAND_WINDOW_ID = 'dealer-hand';
const FACE_DOWN_CARD_PATH = './assets/sprites/cards/back_blue_basic.png'

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

function createButton(parent, id, label) {
    const button = document.createElement("button");

    if (id) {
        button.setAttribute("id", id);
    }
    if (label) {
        button.innerText = label;
    }

    parent.appendChild(button);
}

function displayMainMenu() {
    MAIN_GAME_WINDOW.replaceChildren();
    let text = document.createElement('div');
    text.innerText = 'Blackjack!!!';
    MAIN_GAME_WINDOW.appendChild(text);
    createButton(MAIN_GAME_WINDOW, "start", "Start Game");
    createButton(MAIN_GAME_WINDOW, "exit", "Exit Game");
    document.querySelector("#start").addEventListener('click', displayPlayerTurnMenu);
}

function displayPlayerTurnMenu() {

    let playerHandWindow = document.createElement('div');
    let dealerHandWindow = document.createElement('div');

    MAIN_GAME_WINDOW.replaceChildren();
    Game.startHand();

    dealerHandWindow.id = DEALER_HAND_WINDOW_ID;
    MAIN_GAME_WINDOW.appendChild(dealerHandWindow);
    playerHandWindow.id = PLAYER_HAND_WINDOW_ID;
    MAIN_GAME_WINDOW.appendChild(playerHandWindow);

    displayHand(Game.player, playerHandWindow);
    displayDealerFaceUpCard();

    createButton(MAIN_GAME_WINDOW, "hit", "Hit");
    createButton(MAIN_GAME_WINDOW, "stand", "Stand");
    createButton(MAIN_GAME_WINDOW, "quit", "Return to Main Menu");

    document.querySelector("#hit").addEventListener("click", hit);
    document.querySelector("#stand").addEventListener("click", stand);
    document.querySelector("#quit").addEventListener("click", displayMainMenu);
}

function hit() {
    Game.deal(Game.player);
    let playerHandWindow = document.getElementById(PLAYER_HAND_WINDOW_ID);
    displayHand(Game.player, playerHandWindow);
    if (Game.player.getHandTotal() > Cards.blackjack) {
        console.log("you lose");
        displayHandOverMenu();
    }
    console.log(Game.player.hand);
}

function stand() {
    //do stuff;
}

function displayHand(target, displayWindow) {
    displayWindow.replaceChildren();
    for (const card of target.hand) {
        let myCard = document.createElement('img');
        myCard.src = getCardURL(card.rank.id, card.suit);
        displayWindow.appendChild(myCard);
    }
}

function displayDealerFaceUpCard() {
    let dealerHandWindow = document.getElementById(DEALER_HAND_WINDOW_ID);
    let faceUpCard = document.createElement('img');
    let faceDownCard = document.createElement('img');

    faceUpCard.src = getCardURL(Game.dealer.hand[0].rank.id, Game.dealer.hand[0].suit);
    dealerHandWindow.appendChild(faceUpCard);

    faceDownCard.src = FACE_DOWN_CARD_PATH;
    dealerHandWindow.appendChild(faceDownCard);
}

function removeAllButtons() {
    let buttons = Array.from(MAIN_GAME_WINDOW.getElementsByTagName('button'));
    
    for (const button of buttons) {
        button.remove();
    }
}

function displayHandOverMenu() {
    removeAllButtons();

    createButton(MAIN_GAME_WINDOW, "play-again", "Play Again");
    createButton(MAIN_GAME_WINDOW, "quit", "Return to Main Menu");

    document.querySelector("#play-again").addEventListener("click", displayPlayerTurnMenu);
    document.querySelector("#quit").addEventListener("click", displayMainMenu);
}


displayMainMenu();