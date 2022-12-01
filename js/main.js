"use strict";

let playingHand = false;
let player = {hand: [], score: 0};
let dealer = {hand: [], score: 0};

function initGame() {
    playingHand = false;
    player = {hand: [], score: 0, total: 0};
    dealer = {hand: [], score: 0, total: 0};
}

function printScores(){
    console.log(`Player Score: ${player.score}\t\t\tDealer Score: ${dealer.score}`)
}

function displayMainMenu(){
    printScores();
    console.log('Main Menu');
}

initGame();
displayMainMenu();
