"use strict";
import * as Cards from "./cards.js";

let playingHand = false;
const player = {hand: [], score: 0, getHandTotal: getHandTotal};
const dealer = {hand: [], score: 0, getHandTotal: getHandTotal};
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
	return `Player Score: ${player.score} Dealer Score: ${dealer.score}`;
}



function displayMainMenu(){
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
	return `${printScores()}\n \nDealer's hand: ${dealerHandString}\n${dealerTurn ? `Dealer Total: ${dealer.getHandTotal()}\n` : ''}\nYour hand: ${playerHandString}\nYour total: ${player.getHandTotal()}`
}

function displayHandTotals(){
	return `Your Hand Total: ${player.getHandTotal()} Dealer's Hand Total: ${dealer.getHandTotal()}`;
}

function getHandTotal(){
	let handTotal = 0;

	for (const card of this.hand) {
		handTotal += card.rank.value;
	}

	while (handTotal > Cards.blackjack && this.hand.some(e => e.rank.id === "ace" && e.rank.value !== Cards.aceConditionalValue)){
		//find the index of an object that contains the property id === "ace" and has not already been set to 1
		let aceIndex = this.hand.findIndex(e => e.rank.id === "ace" && e.rank.value !== Cards.aceConditionalValue);
		handTotal -= this.hand[aceIndex].rank.value;
		handTotal += Cards.aceConditionalValue;
		this.hand[aceIndex].rank.value = Cards.aceConditionalValue;
	}

	return handTotal;
}

function checkForBlackjack(){
	if (dealer.hand[0].rank.value >= 10){
		alert(`${displayHands()}\n \nChecking for dealer Blackjack...`);
	}
	if (player.getHandTotal() === Cards.blackjack || dealer.getHandTotal() === Cards.blackjack){
		if (player.getHandTotal() === Cards.blackjack){
			alert("Player Blackjack!");
		}
		determineHandWinner();
	}
}

function determineHandWinner(){
	if (player.getHandTotal() === dealer.getHandTotal()){
		alert(`${printScores()}\n \nPush\n \n${displayHandTotals()}`);
		returnHandsToDeck();
		Cards.shuffle(deck);
	} else if ((player.getHandTotal() > dealer.getHandTotal() && player.getHandTotal() <= Cards.blackjack) || dealer.getHandTotal() > Cards.blackjack){
		player.score++;
		alert(`${printScores()}\n \nYou Win!\n \n${displayHandTotals()}`);
		returnHandsToDeck();
		Cards.shuffle(deck);
	} else {
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
		returnHandsToDeck();
		Cards.shuffle(deck);
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
				if (player.getHandTotal() > Cards.blackjack){
					determineHandWinner();
					break;
				}
				do {
					playerGameMenuInput = prompt(`${displayHands()}\n \nSelect 1: Hit | 2: Stand | 3: Main Menu`);
					if (playerGameMenuInput === "2" || playerGameMenuInput === "3"){
						dealerTurn = true;
						break;
					}
				} while (playerGameMenuInput !== "1")
			}
		}
		if (playerGameMenuInput === "2") {
			dealerTurn = true;
			while (dealer.getHandTotal() < 17) {
				alert(`${displayHands()}\n \nDealer Hits`);
				deal(dealer);
			}
			determineHandWinner();
			continue;
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