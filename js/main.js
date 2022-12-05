"use strict";
import * as Cards from "./cards.js";

let playingHand = false;
const player = {hand: [], score: 0};
const dealer = {hand: [], score: 0};
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
    return `Player Score: ${player.score}\t\t\tDealer Score: ${dealer.score}`;
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

function displayHands(){
    let playerHandString = '';
    let dealerHandString = '';

    if (dealerTurn){
        for (const card of dealer.hand) {
            dealerHandString += `${card.rank.id} of ${card.suit}s, `
        }
    } else {
        dealerHandString = `${dealer.hand[0].rank.id} of ${dealer.hand[0].suit}s`
    }

    for (const card of player.hand) {
        playerHandString += `${card.rank.id} of ${card.suit}s, `
    }
    //Following line is kind of messy, consider refactoring to make it readable.
    return `Dealer's hand: ${dealerHandString}\n${dealerTurn ? `Dealer Total: ${getHandTotal(dealer)}\n` : ''}\nYour hand: ${playerHandString}\nYour total: ${getHandTotal(player)}`
}

function displayHandTotals(){
    return `Your Hand Total: ${getHandTotal(player)}\t\t\tDealer's Hand Total: ${getHandTotal(dealer)}`;
}

function getHandTotal(target){
    let handTotal = 0;

    for (const card of target.hand) {
        handTotal += card.rank.value;
    }

    while (handTotal > Cards.blackjack && target.hand.some(e => e.rank.id === "ace" && e.rank.value !== Cards.aceConditionalValue)){
        //find the index of an object that contains the property id === "ace" and has not already been set to 1
        let aceIndex = target.hand.findIndex(e => e.rank.id === "ace" && e.rank.value !== Cards.aceConditionalValue);
        handTotal -= target.hand[aceIndex].rank.value;
        handTotal += Cards.aceConditionalValue;
        target.hand[aceIndex].rank.value = Cards.aceConditionalValue;
    }

    return handTotal;
}

function checkForBlackjack(){
    if (dealer.hand[0].rank.value >= 10){
        alert(`${displayHands()}\n \nChecking for dealer Blackjack...`);
    }
    if (getHandTotal(player) === Cards.blackjack || getHandTotal(dealer) === Cards.blackjack){
        if (getHandTotal(player) === Cards.blackjack){
            alert("Player Blackjack!");
        }
        determineHandWinner();
    }
}

function determineHandWinner(){
    if (getHandTotal(player) > Cards.blackjack){
        dealer.score++;
        alert(`${printScores()}\n \nYou Lose\n \n${displayHandTotals()}`);
        returnHandsToDeck();
        Cards.shuffle(deck);
    } else if (getHandTotal(dealer) > Cards.blackjack){
        player.score++;
        alert(`${printScores()}\n \nYou Win!\n \n${displayHandTotals()}`);
        returnHandsToDeck();
        Cards.shuffle(deck);
    } else if (getHandTotal(player) === getHandTotal(dealer)){
        alert(`${printScores()}\n \nPush\n \n${displayHandTotals()}`);
        returnHandsToDeck();
        Cards.shuffle(deck);
    } else if (getHandTotal(player) > getHandTotal(dealer)){
        player.score++;
        alert(`${printScores()}\n \nYou Win!\n \n${displayHandTotals()}`);
        returnHandsToDeck();
        Cards.shuffle(deck);
    } else if (getHandTotal(player) < getHandTotal(dealer)){
        dealer.score++;
        alert(`${printScores()}\n \nYou Lose\n \n${displayHandTotals()}`);
        returnHandsToDeck();
        Cards.shuffle(deck);
    }
}

function deal(target){
    target.hand.push(deck.pop());
}

function returnHandsToDeck(){
    for (let i = 0; i < player.hand.length; i++) {
        deck.push(player.hand.pop());
    }
    for (let i = 0; i < dealer.hand.length; i++) {
        deck.push(dealer.hand.pop());
    }
}

function playGame(){
    resetScores();
    while (playingHand) {
        printScores();
        /** 
         *  TODO:
         *  check for player or dealer blackjack
         *  determine winner if either has blackjack
         */
        dealerTurn = false;
        deal(player);
        deal(dealer);
        deal(player);
        deal(dealer);
        checkForBlackjack();

        let playerGameMenuInput = prompt(`${displayHands()}\n \nSelect 1: Hit | 2: Stand | 3: Main Menu`);

        if (playerGameMenuInput === "1") {
            while (!dealerTurn){
                deal(player);
                if (getHandTotal(player) > Cards.blackjack){
                    determineHandWinner();
                }
                playerGameMenuInput = prompt(`${displayHands()}\n \nSelect 1: Hit | 2: Stand | 3: Main Menu`);
                if (playerGameMenuInput !== "1"){
                    dealerTurn = true;
                }
            }
        }
        if (playerGameMenuInput === "2") {
            /** 
             *  TODO:
             *  If player chose stand, show the dealer face down card
             *  Add dealer hand total, if the dealer total is 17 or higher the dealer must stand and the winner is decided
             *  If the dealer hand is 16 or lower the dealer must hit until they reach 17 or higher
             *  If the dealer hand is 17 with an ace counting as 11, the dealer must hit
             *  Once the dealer is forced to stand, player and dealer hand totals are compared against each other
             *  The winner is decided (or draw) and the score is updated
             *  continue the loop
             */
        }
        if (playerGameMenuInput === "3") {
            let playerConfirmQuit = confirm("Are you sure you want to quit?");
            if (playerConfirmQuit) {
                playingHand = false;
            }
        }
    }
}

initGame();