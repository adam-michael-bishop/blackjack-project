"use strict";

let playingHand = false;
let player = {hand: [], score: 0};
let dealer = {hand: [], score: 0};

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
    console.clear();
    printScores();
    console.log('Main Menu\n \n \nWaiting for player prompt...');
    let playerMenuInput = prompt("Enter 1 or start to play Blackjack, enter 2 or exit to exit game...");
    if(playerMenuInput === null){
        displayMainMenu();
    } else if(playerMenuInput.trim() === "1" || playerMenuInput.trim().toLowerCase() === "start"){
        playingHand = true;
        initGame()
    } else if(playerMenuInput.trim() === "2" || playerMenuInput.trim().toLowerCase() === "exit") {
        let playerConfirmQuit = confirm("Are you sure you want to quit?");
        if(playerConfirmQuit){
            window.close();
        } else {
            displayMainMenu();
        }
    }
}

function playGame(){
    resetScores();
    while (playingHand) {
        printScores();
        /** TODO:
         *  deal 1 card to the player face up
         *  deal 1 card to the dealer face down
         *  1 card to player face up
         *  1 to dealer face up
         *  ---------
         *  check for player blackjack
         *  if player has blackjack then check for dealer blackjack otherwise player wins the hand
         */
        let playerGameMenuInput = prompt('Choose to Hit, Stand, or Return to Main Menu\n1: Hit\n2: Stand\n3: Main Menu');

        if (playerGameMenuInput === "1") {
            /** TODO:
             *  If player chose hit, deal them 1 card face up
             *  Add the total of the player's hand and display that to player
             *  Check if player busts, if so they lose the hand and dealer gets +1 to score
             *  continue to top of loop
             */
        }
        if (playerGameMenuInput === "2") {
            /** TODO:
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
    initGame();
}

initGame();
