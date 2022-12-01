"use strict";

let playingHand = false;
let player = {hand: [], score: 0};
let dealer = {hand: [], score: 0};

function initGame(){
    playingHand = false;
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
    let userInput = prompt("Enter 1 or start to play Blackjack, enter 2 to exit game...");
    if(userInput === null){
        displayMainMenu();
    } else if(userInput.trim() === "1" || userInput.trim().toLowerCase() === "start"){
        initGame()
        playingHand = true;
    } else if(userInput.trim() === "2" || userInput.trim().toLowerCase() === "exit") {
        let playerConfirmQuit = confirm("Are you sure you want to quit?");
        if(playerConfirmQuit){
            window.close();
        } else {
            displayMainMenu();
        }
    }
}

initGame();
displayMainMenu();
