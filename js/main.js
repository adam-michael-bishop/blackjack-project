"use strict";

import * as Game from "./game.js";
import * as Cards from "./cards.js";

const mainGameWindowId = 'game-window';
const dealerWindowId = 'dealer-window';
const playerWindowId = 'player-window';
const buttonWindowId = 'button-window';
const playerHandWindowId = 'player-hand';
const dealerHandWindowId = 'dealer-hand';
const playerHandTotalWindowId ='player-hand-total';
const dealerHandTotalWindowId ='dealer-hand-total';
const messageWindowId = 'message-window';
const scoreWindowId = 'score-window';
const delay = 1500; //Delay in ms
const mainGameWindow = document.body.appendChild(document.createElement('div'));

mainGameWindow.id = mainGameWindowId;


function createButton(parentId, id, label, callbackFunction) {
    const button = document.createElement("button");

    button.setAttribute("id", id);
    button.innerText = label;
    document.getElementById(parentId).appendChild(button);

    document.querySelector(`#${id}`).addEventListener('click', callbackFunction);
}

function createWindow(parentId, id = '') {
    let window = document.createElement('div');
    if (id !== '') {
        window.id = id;
    }
    return document.getElementById(parentId).appendChild(window);
}

function displayMainMenu() {
    mainGameWindow.replaceChildren(
        createWindow(mainGameWindowId, 'title'),
        createWindow(mainGameWindowId, buttonWindowId)
    );
    Game.resetScores();

    document.getElementById('title').textContent = "Blackjack!!!";

    createButton(buttonWindowId, "start", "Start Game", displayPlayerTurnMenu);
    createButton(buttonWindowId, "exit", "Exit Game", exitGame);
}

async function displayPlayerTurnMenu() {
    Game.startHand();

    mainGameWindow.replaceChildren(
        createWindow(mainGameWindowId, scoreWindowId),
        createWindow(mainGameWindowId, dealerWindowId),
        createWindow(mainGameWindowId, messageWindowId),
        createWindow(mainGameWindowId, playerWindowId),
        createWindow(mainGameWindowId, buttonWindowId)
    );
    createWindow(dealerWindowId, dealerHandWindowId);
    createWindow(playerWindowId, playerHandWindowId);
    createWindow(playerWindowId, playerHandTotalWindowId).innerText = getHandTotalString(Game.player);

    document.getElementById(scoreWindowId).innerText = Game.printScores();
    displayHand(Game.player, playerHandWindowId);
    displayDealerFaceUpCard();
    // await checkForBlackjack();

    createButton(buttonWindowId, "hit", "Hit", hit);
    createButton(buttonWindowId, "stand", "Stand", stand);
    createButton(buttonWindowId, "quit", "Main Menu", displayMainMenu);
}

function displayHandOverMenu() {
    removeAllButtons();

    document.getElementById(messageWindowId).innerText = Game.determineHandWinner();
    createButton(buttonWindowId, "play-again", "Play Again", displayPlayerTurnMenu);
    createButton(buttonWindowId, "quit", "Main Menu", displayMainMenu);
}

function hit() {
    Game.deal(Game.player);
    document.getElementById(playerHandTotalWindowId).innerText = getHandTotalString(Game.player);
    displayHand(Game.player, playerHandWindowId);
    if (Game.player.getHandTotal() > Cards.blackjack) {
        displayHandOverMenu();
    }
}

async function stand() {
    removeAllButtons();
    displayHand(Game.dealer, dealerHandWindowId);
	createWindow(dealerWindowId, dealerHandTotalWindowId);
    await dealerHit();
    displayHandOverMenu();
}

function shouldDealerHit() {
    document.getElementById(messageWindowId).innerText = 'Dealer Flips';
    document.getElementById(dealerHandTotalWindowId).innerText = getHandTotalString(Game.dealer);
    return Game.dealer.getHandTotal() < Game.dealer.standAt;
}

function dealerHit() {
    return new Promise((resolve) => {
        let loop = true;
        if (!shouldDealerHit()) {
            resolve();
            return
        }
        const id = setInterval(() => {
            if (!loop) {
                clearInterval(id);
                resolve();
                return
            }
            Game.deal(Game.dealer);
            displayHand(Game.dealer, dealerHandWindowId);
            document.getElementById(dealerHandTotalWindowId).innerText = getHandTotalString(Game.dealer);
            if (Game.dealer.getHandTotal() > Cards.blackjack) {
                document.getElementById(messageWindowId).innerText = 'Dealer Busts!';
                loop = false;
            } else if (Game.dealer.getHandTotal() >= Game.dealer.standAt) {
                document.getElementById(messageWindowId).innerText = 'Dealer Stands';
                loop = false;
            } else {
                document.getElementById(messageWindowId).innerText = 'Dealer Hits again...';
            }
        }, delay);
    });
}

function displayHand(target, parentId) {
    document.getElementById(parentId).replaceChildren();
    for (const card of target.hand) {
        let myCard = document.createElement('img');
        myCard.src = Cards.getCardURL(card.rank.id, card.suit);
        document.getElementById(parentId).appendChild(myCard);
    }
}

function getHandTotalString(target) {
    let handTotalString = `Total: ${target.getHandTotal()}`;
    if (target.isHandSoft()) {
        handTotalString += ' (Soft)';
    }
    return handTotalString;
}

function displayDealerFaceUpCard() {
    let dealerHandWindow = document.getElementById(dealerHandWindowId);
    let faceUpCard = document.createElement('img');
    let faceDownCard = document.createElement('img');

    faceUpCard.src = Cards.getCardURL(Game.dealer.hand[0].rank.id, Game.dealer.hand[0].suit);
    dealerHandWindow.appendChild(faceUpCard);

    faceDownCard.src = Cards.FACE_DOWN_CARD_PATH;
    dealerHandWindow.appendChild(faceDownCard);
}

function checkForBlackjack() {
    return new Promise((resolve) =>{
        if (Game.dealer.hand[0].rank.value >= 10) {
            document.getElementById(messageWindowId).innerText = 'Checking for dealer Blackjack...';
            setTimeout(() => {
                if (Game.dealer.getHandTotal() === Cards.blackjack) {
                    resolve();
                }
                document.getElementById(messageWindowId).innerText = 'jk';
            }, delay);
        }
        if (Game.player.getHandTotal() === Cards.blackjack) {
            document.getElementById(messageWindowId).innerText = 'Blackjack!!!';
            setTimeout(() =>{
                resolve();
            }, delay);
        }
    });
}

function removeAllButtons() {
    let buttons = Array.from(mainGameWindow.getElementsByTagName('button'));
    
    for (const button of buttons) {
        button.remove();
    }
}

function exitGame() {
    //do stuff
    console.log("game over");
}

displayMainMenu();