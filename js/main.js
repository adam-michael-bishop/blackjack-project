"use strict";

import * as Cards from "./cards.js";
import * as Render from "./render.js";


const handMethods = {
	getHandTotal: function () {
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
	},
	isHandSoft: function () {
		return this.hand.some(e => e.rank.id === "ace" && e.rank.value === Cards.aceDefaultValue);
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
	__proto__: handMethods
};

const dealer = {
	hand: [],
	score: 0,
	turn: false,
	standAt: 17,
	__proto__: handMethods
};

const dealerStandAt = 17;
let playingHand = false;
let dealerTurn = false;
let deck = Cards.deck;

Cards.buildDeck();
Cards.shuffle(deck);

function initGame(){
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

function printScores(){
	return `Player Score: ${player.score} Dealer Score: ${dealer.score}`;
}

function displayMainMenu(){
	do {
		let playerMenuInput = prompt("Enter 1 or start to play Blackjack, enter 2 or exit to exit game...");

		if(playerMenuInput === "1"){
			playingHand = true;
			initGame();
			return;
		} else if(playerMenuInput === "2" || playerMenuInput === null) {
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
		dealerHandString = dealer.getHandAsString();
	} else {
		dealerHandString = `${dealer.hand[0].rank.id} of ${dealer.hand[0].suit}s`
	}
	playerHandString = player.getHandAsString();
	//Following line is kind of messy, consider refactoring to make it readable.
	return `${printScores()}\n \nDealer's hand: ${dealerHandString}\n${dealerTurn ? `Dealer Total: ${dealer.getHandTotal()} ${dealer.isHandSoft()? '(Soft)' : ''}\n` : ''}\nYour hand: ${playerHandString}\nYour total: ${player.getHandTotal()} ${player.isHandSoft()? '(Soft)' : ''}`
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
	dealerTurn = true;
	if (player.getHandTotal() === dealer.getHandTotal()){
		alert(`${displayHands()}\n \nPush`);
		resetHands();
		Cards.shuffle(deck);
	} else if ((player.getHandTotal() > dealer.getHandTotal() && player.getHandTotal() <= Cards.blackjack) || dealer.getHandTotal() > Cards.blackjack){
		player.score++;
		alert(`${displayHands()}\n \nYou Win!`);
		resetHands();
		Cards.shuffle(deck);
	} else {
		dealer.score++;
		alert(`${displayHands()}\n \nYou Lose`);
		resetHands();
		Cards.shuffle(deck);
	}
}

function deal(target, cardsToDeal = 1){
	for (let i = 0; i < cardsToDeal; i++) {
		target.hand.push(deck.pop());
	}
}

function resetHands(){
	if (player.hand.length === 0 && dealer.hand.length === 0) {return;}

	player.resetAceValue();
	dealer.resetAceValue();
	player.returnHandToDeck(deck);
	dealer.returnHandToDeck(deck);
}

function playGame(){
	resetScores();
	while (playingHand) {
		resetHands();
		Cards.shuffle(deck);
		dealerTurn = false;
		deal(player, 2);
		deal(dealer, 2);

		checkForBlackjack();
		if(dealerTurn) {continue;}

		let playerGameMenuInput = prompt(`${displayHands()}\n \nSelect 1: Hit | 2: Stand | 3: Main Menu`);

		while (playerGameMenuInput !== "1" && playerGameMenuInput !== "2" && playerGameMenuInput !== "3" && playerGameMenuInput !== null){
			playerGameMenuInput = prompt(`${displayHands()}\n \nSelect 1: Hit | 2: Stand | 3: Main Menu`);
		}

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
			while (dealer.__proto__.getHandTotal() < dealerStandAt) {
				alert(`${displayHands()}\n \nDealer Hits`);
				deal(dealer);
			}
			determineHandWinner();
			continue;
		}
		if (playerGameMenuInput === "3" || playerGameMenuInput === null) {
			let playerConfirmQuit = confirm("Are you sure you want to return to Main Menu?");
			if (playerConfirmQuit) {
				playingHand = false;
				displayMainMenu();
				return;
			}
		}
	}
}

/**
 * Testing out drawing a card and rendering on the screen
 */

deal(player, 1)
Render.drawCardToContext(player, 0);

console.log(player.getHandAsString());
console.log(player.hand);
console.log(player);

//turning off the game for now
// initGame();