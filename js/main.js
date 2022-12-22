"use strict";

import * as Game from "./game.js";
import * as Cards from "./cards.js";

const CARDS_IMAGE_PATH = './assets/sprites/cards';
const MAIN_GAME_WINDOW_ID = 'game-window';
const DEALER_WINDOW_ID = 'dealer-window';
const PLAYER_WINDOW_ID = 'player-window';
const BUTTON_WINDOW_ID = 'button-window';
const PLAYER_HAND_WINDOW_ID = 'player-hand';
const DEALER_HAND_WINDOW_ID = 'dealer-hand';
const PLAYER_HAND_TOTAL_WINDOW_ID ='player-hand-total';
const DEALER_HAND_TOTAL_WINDOW_ID ='dealer-hand-total';
const MESSAGE_WINDOW_ID = 'message-window';
const SCORE_WINDOW_ID = 'score-window';
const MAIN_GAME_WINDOW = document.getElementById(MAIN_GAME_WINDOW_ID);
const FACE_DOWN_CARD_PATH = './assets/sprites/cards/back_blue_basic.png'
//Delay in ms
const DELAY = 1000;

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

function createButton(parentId, id, label, callbackFunction) {
    const button = document.createElement("button");

    button.setAttribute("id", id); 
    button.innerText = label;
    document.getElementById(parentId).appendChild(button);

    document.querySelector(`#${id}`).addEventListener('click', callbackFunction);
}

function createWindow(parentId, id = false) {
    let window = document.createElement('div');
    if (id) {window.id = id};
    return document.getElementById(parentId).appendChild(window);
}

function displayMainMenu() {
    MAIN_GAME_WINDOW.replaceChildren(
        createWindow(MAIN_GAME_WINDOW_ID, 'title'),
        createWindow(MAIN_GAME_WINDOW_ID, BUTTON_WINDOW_ID)
    );

    document.getElementById('title').textContent = "Blackjack!!!";

    createButton(BUTTON_WINDOW_ID, "start", "Start Game", displayPlayerTurnMenu);
    createButton(BUTTON_WINDOW_ID, "exit", "Exit Game", exitGame);
}

function displayPlayerTurnMenu() {
    Game.startHand();

    MAIN_GAME_WINDOW.replaceChildren(
        createWindow(MAIN_GAME_WINDOW_ID, SCORE_WINDOW_ID),
        createWindow(MAIN_GAME_WINDOW_ID, DEALER_WINDOW_ID),
        createWindow(MAIN_GAME_WINDOW_ID, MESSAGE_WINDOW_ID),
        createWindow(MAIN_GAME_WINDOW_ID, PLAYER_WINDOW_ID),
        createWindow(MAIN_GAME_WINDOW_ID, BUTTON_WINDOW_ID)
    );
    createWindow(DEALER_WINDOW_ID, DEALER_HAND_WINDOW_ID);
    createWindow(PLAYER_WINDOW_ID, PLAYER_HAND_WINDOW_ID);
    createWindow(PLAYER_WINDOW_ID, PLAYER_HAND_TOTAL_WINDOW_ID).innerText = getHandTotalString(Game.player);

    document.getElementById(SCORE_WINDOW_ID).innerText = Game.printScores();
    displayHand(Game.player, PLAYER_HAND_WINDOW_ID);
    displayDealerFaceUpCard();

    createButton(BUTTON_WINDOW_ID, "hit", "Hit", hit);
    createButton(BUTTON_WINDOW_ID, "stand", "Stand", stand);
    createButton(BUTTON_WINDOW_ID, "quit", "Return to Main Menu", displayMainMenu);
}

function displayHandOverMenu() {
    removeAllButtons();

    document.getElementById(MESSAGE_WINDOW_ID).innerText = Game.determineHandWinner();
    createButton(BUTTON_WINDOW_ID, "play-again", "Play Again", displayPlayerTurnMenu);
    createButton(BUTTON_WINDOW_ID, "quit", "Return to Main Menu", displayMainMenu);
}

function hit() {
    Game.deal(Game.player);
    document.getElementById(PLAYER_HAND_TOTAL_WINDOW_ID).innerText = getHandTotalString(Game.player);
    displayHand(Game.player, PLAYER_HAND_WINDOW_ID);
    if (Game.player.getHandTotal() > Cards.blackjack) {
        displayHandOverMenu();
    }
}

async function stand() {
    /**
     * TODO:
     * If dealer's hand is 17 or higher, the dealer will stand and h
     */
    removeAllButtons();
    displayHand(Game.dealer, DEALER_HAND_WINDOW_ID);
	createWindow(DEALER_WINDOW_ID, DEALER_HAND_TOTAL_WINDOW_ID);
    dealerHit();
    displayHandOverMenu();
}

function shouldDealerHit() {
    document.getElementById(MESSAGE_WINDOW_ID).innerText = 'Dealer Flips...';
    document.getElementById(DEALER_HAND_TOTAL_WINDOW_ID).innerText = getHandTotalString(Game.dealer);
    return Game.dealer.getHandTotal() >= Game.dealer.standAt;
}

function dealerHit() {
    return new Promise((resolve) => {
        const id = setInterval(() => {
            
            Game.deal(Game.dealer);
            displayHand(Game.dealer, DEALER_HAND_WINDOW_ID);
            document.getElementById(DEALER_HAND_TOTAL_WINDOW_ID).innerText = getHandTotalString(Game.dealer);
            if (Game.dealer.getHandTotal() > Cards.blackjack) {
                document.getElementById(MESSAGE_WINDOW_ID).innerText = 'Dealer Busts!';
                clearInterval(id);
                resolve();
            } else if (Game.dealer.getHandTotal() < Game.dealer.standAt) {
                document.getElementById(MESSAGE_WINDOW_ID).innerText = 'Dealer Hits again...';
            } else {
                document.getElementById(MESSAGE_WINDOW_ID).innerText = 'Dealer Stands';
                clearInterval(id);
                resolve();
            }
        }, DELAY);
    });
}

function displayHand(target, parentId) {
    document.getElementById(parentId).replaceChildren();
    for (const card of target.hand) {
        let myCard = document.createElement('img');
        myCard.src = getCardURL(card.rank.id, card.suit);
        document.getElementById(parentId).appendChild(myCard);
    }
}

function getHandTotalString(target) {
    let handTotalString = `Total: ${target.getHandTotal()}`;
    if (target.isHandSoft()) {
        handTotalString += ' (Soft)';
    };
    return handTotalString;
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

function exitGame() {
    //do stuff
    console.log("game over");
}

displayMainMenu();