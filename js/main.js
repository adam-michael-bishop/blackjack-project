"use strict";
import * as Cards from "./cards.js";

let playingHand = false;
let player = {hand: [], score: 0};
let dealer = {hand: [], score: 0};
let dealerTurn = false;
let deck = Cards.deck;

Cards.buildDeck();
Cards.shuffle(deck);

function initGame(){
    resetScores();
    resetHands();
    if(playingHand){
        playGame();
    } else {
        displayMainMenu();
    }
}

function resetScores(){
    player.score = 0;
    dealer.score = 0;
}

function resetHands(){
    player.hand = [];
    player.score = [];
}

function printScores(){
    console.log(`Player Score: ${player.score}\t\t\tDealer Score: ${dealer.score}`)
}



function displayMainMenu(){
    // console.clear();
    printScores();
    console.log('Main Menu\n \n \nWaiting for player prompt...');
    do {
        let playerMenuInput = prompt("Enter 1 or start to play Blackjack, enter 2 or exit to exit game...");
        if(playerMenuInput === null){
            continue;
        } else if(playerMenuInput.trim() === "1" || playerMenuInput.trim().toLowerCase() === "start"){
            playingHand = true;
            initGame()
        } else if(playerMenuInput.trim() === "2" || playerMenuInput.trim().toLowerCase() === "exit") {
            let playerConfirmQuit = confirm("Are you sure you want to quit?");
            if(playerConfirmQuit){
                break;
            }
        }
    } while (!playingHand);
}

/**
 * TODO:
 * Create a function that displays the hands of the dealer and player
 * Only the dealer's first card will be shown until it is the dealers turn
 */

function displayHands(){
    if (dealerTurn){
        /**
         * TODO:
         * If it's the dealers turn, we must return all cards face up
         */
    }
    let playerHandString = '';

    for (const card of player.hand) {
        playerHandString += `${card.rank.id} of ${card.suit}s, `
    }
    
    return `Dealer's face card: ${dealer.hand[0].rank.id} of ${dealer.hand[0].suit}s\n \nYour hand: ${playerHandString}\n \nTotal: ${Cards.getHandTotal(player)}`
}

/**
 * TODO:
 * Deal a card to the dealer or player
 */

function deal(target){
    target.hand.push(deck.pop());
}

function playGame(){
    resetScores();
    while (playingHand) {
        printScores();
        /** 
         * TODO:
         *  check for player or dealer blackjack
         *  determine winner if either has blackjack
         */
        deal(player);
        deal(dealer);
        deal(player);
        deal(dealer);

        let playerGameMenuInput = prompt(`${displayHands()}\n \nChoose to Hit, Stand, or Return to Main Menu\n1: Hit\n2: Stand\n3: Main Menu`);

        if (playerGameMenuInput === "1") {
            /** 
             * TODO:
             *  If player chose hit, deal them 1 card face up
             *  Add the total of the player's hand and display that to player
             *  Check if player busts, if so they lose the hand and dealer gets +1 to score
             *  continue to top of loop
             */
        }
        if (playerGameMenuInput === "2") {
            /** 
             * TODO:
             *  If player chose stand, show the dealer face down card
             *  Add dealer hand total, if the dealer total is 17 or higher the dealer must stand and the winner is decided
             *  If the dealer hand is 16 or lower the dealer must hit until they reach 17 or higher
             *  If the dealer hand is 17 with an ace counting as 11, the dealer must hit
             *  Once the dealer is forced to stand, player and dealer hand totals are compared against each other
             *  The winner is decided (or draw) and the score is updated
             *  continue the loop
             */
        }
        if(playerGameMenuInput === "3") {
            let playerConfirmQuit = confirm("Are you sure you want to quit?");
            if(playerConfirmQuit) {
                playingHand = false;
            }
        }
    }
}

initGame();
