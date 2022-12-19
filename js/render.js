"use strict";

export {getCardURL, displayMainMenu, createButton, displayPlayerTurnMenu};

const CARDS_IMAGE_PATH = '../blackjack/assets/sprites/cards';
// const canvas = document.querySelector('canvas');
// const context = canvas.getContext('2d');
const MAIN_GAME_WINDOW = document.getElementById('game-window');

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

// function drawHandToContext(target) {
//     for (const card of target.hand) {
//         let image = new Image();

//         image.src = getCardURL(card.rank.id, card.suit);

//         image.onload = function () {
//             context.drawImage(
//                 image,
//                 0,
//                 0,
//                 image.width,
//                 image.height,
//                 (target.hand.indexOf(card) * image.width),
//                 (canvas.height - image.height),
//                 image.width,
//                 image.height
//             );
//         };
//     }
// }

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
    MAIN_GAME_WINDOW.replaceChildren();

    createButton(MAIN_GAME_WINDOW, "hit", "Hit");
    createButton(MAIN_GAME_WINDOW, "stand", "Stand");
    createButton(MAIN_GAME_WINDOW, "quit", "Return to Main Menu");
    document.querySelector("#quit").addEventListener("click", displayMainMenu);
}