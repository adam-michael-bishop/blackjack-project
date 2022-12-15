"use strict";

import * as Cards from "./cards.js";
import * as Main from "./main.js";

export {getCardURL};

const CARDS_IMAGE_PATH = '../blackjack/assets/sprites/cards';
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let image = new Image();

function getCardURL(rank, suit) {
    return `${CARDS_IMAGE_PATH}/${rank.toLowerCase()}_${suit.toLowerCase()}s_white.png`;
}

image.src = getCardURL(Main.player.hand[0].rank.id, Main.player.hand[0].suit);

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
