"use strict";

export {getCardURL, drawHandToContext, displayMainMenu, createButton};

const CARDS_IMAGE_PATH = '../blackjack/assets/sprites/cards';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

function drawHandToContext(target) {
    for (const card of target.hand) {
        let image = new Image();

        image.src = getCardURL(card.rank.id, card.suit);

        image.onload = function () {
            context.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                (target.hand.indexOf(card) * image.width),
                (canvas.height - image.height),
                image.width,
                image.height
            );
        };
    }
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
    createButton(document.body, "start", "Start Game");
    createButton(document.body, "exit", "Exit Game");
}