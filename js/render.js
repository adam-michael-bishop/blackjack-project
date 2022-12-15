"use strict";

import * as Cards from "./cards.js";

export {getCardURL, drawHandToContext};

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
