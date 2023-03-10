"use strict";

/**
 * TODO:
 * clean up unused code
 * create a "highest win streak" stat to display on the main menu
 */

import * as Cards from "./cards.js";

export {player, dealer, startHand, deal, determineHandWinner, printScores, resetScores};

const handMethods = {
    getHandTotal: function () {
        let handTotal = 0;
        for (const card of this.hand) {
            if ((handTotal + Cards.aceDefaultValue) > Cards.blackjack && card.rank.id === 'ace') {
                handTotal += Cards.aceConditionalValue;
            } else {
                handTotal += card.rank.value;
            }
        }
        if (handTotal > Cards.blackjack) {
            return this.getLowestHandValue();
        }
        return handTotal;
    },
    getLowestHandValue: function () {
        let lowestHandValue = 0;
        for (const card of this.hand) {
            if (card.rank.id === "ace") {
                lowestHandValue += Cards.aceConditionalValue;
            } else {
                lowestHandValue += card.rank.value;
            }
        }
        return lowestHandValue;
    },
    isHandSoft: function () {
        if (this.getHandTotal() === Cards.blackjack) {
            return false;
        }
        if (this.hand.some((e) => e.rank.id === "ace")) {
            return this.getLowestHandValue() < this.getHandTotal();
        }
        return false;
    },
    resetAceValue: function () {
        for (const card of this.hand) {
            if (card.rank.id === "ace") {
                card.rank.value = Cards.aceDefaultValue;
            }
        }
    },
    getHandAsString: function () {
        let handString = '';
        this.hand.forEach(function (card, index, arr) {
            if (index === arr.length - 1) {
                handString += `${card.rank.id} of ${card.suit}s`;
            } else {
                handString += `${card.rank.id} of ${card.suit}s, `;
            }
        });
        return handString;
    },
    returnHandToDeck: function (arr) {
        while (this.hand.length > 0) {
            arr.push(this.hand.pop());
        }
    }
}

const player = {
    hand: [],
    score: 0,
};

const dealer = {
    hand: [],
    score: 0,
    turn: false,
    standAt: 17,
};

let deck = Cards.deck;
Object.assign(player, handMethods);
Object.assign(dealer, handMethods);

function startHand() {
    resetHands();
    Cards.shuffle(deck);
    deal(player, 2);
    deal(dealer, 2);
}

function resetScores() {
    player.score = 0;
    dealer.score = 0;
}

function printScores() {
    return `Player Score: ${player.score}\n\nDealer Score: ${dealer.score}`;
}

function determineHandWinner() {
    let handOverString = '';
    if (player.getHandTotal() === dealer.getHandTotal()) {
        handOverString = 'Push'
        resetHands();
        Cards.shuffle(deck);
    } else if ((player.getHandTotal() > dealer.getHandTotal() && player.getHandTotal() <= Cards.blackjack) || dealer.getHandTotal() > Cards.blackjack) {
        player.score++;
        handOverString = 'You Win!'
        resetHands();
        Cards.shuffle(deck);
    } else {
        dealer.score++;
        handOverString = 'You Lose'
        resetHands();
        Cards.shuffle(deck);
    }
    return handOverString;
}

function deal(target, cardsToDeal = 1) {
    for (let i = 0; i < cardsToDeal; i++) {
        target.hand.push(deck.pop());
    }
}

function resetHands() {
    if (player.hand.length === 0 && dealer.hand.length === 0) {
        return
    }

    player.resetAceValue();
    dealer.resetAceValue();
    player.returnHandToDeck(deck);
    dealer.returnHandToDeck(deck);
}

Cards.buildDeck();