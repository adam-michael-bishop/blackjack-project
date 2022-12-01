"use strict";

let playingHand = false;
let player = {hand: [], score: 0};
let dealer = {hand: [], score: 0};

function initGame(){
    resetScores();
    if(playingHand){
        playGame();
    } else {
        displayMainMenu();
    }
}

function resetScores(){
    player = {hand: [], score: 0};
    dealer = {hand: [], score: 0};
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
        let playerGameMenuInput = prompt('Choose to Hit, Stand, or Return to Main Menu\n1: Hit\n2: Stand\n3: Main Menu');

        if(playerGameMenuInput === "3") {
            let playerConfirmQuit = confirm("Are you sure you want to quit?");
            if(playerConfirmQuit) {
                playingHand = false;
            } else {
                continue;
            }
        }
    }
    initGame();
}

initGame();
