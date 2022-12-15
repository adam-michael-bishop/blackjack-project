"use strict";

import * as Cards from "./cards.js";

export {getCardURL, drawCardToContext};

const CARDS_IMAGE_PATH = '../blackjack/assets/sprites/cards';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

function drawCardToContext(target, card) {
    let image = new Image();

    image.src = getCardURL(target.hand[card].rank.id, target.hand[card].suit);

    image.onload = function () {
        context.drawImage(
            image,
            0,
            0,
            Cards.SPRITE_WIDTH,
            Cards.SPRITE_HEIGHT,
            0,
            0,
            Cards.SPRITE_WIDTH,
            Cards.SPRITE_HEIGHT
        );
    };
}
