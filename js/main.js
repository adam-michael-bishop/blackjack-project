"use strict";
import * as Cards from "./cards.js";

const player = {hand: [], score: 0, getHandTotal: getHandTotal, isHandSoft: isHandSoft};
const dealer = {hand: [], score: 0, getHandTotal: getHandTotal, isHandSoft: isHandSoft};
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

		if(playerMenuInput.trim() === "1" || playerMenuInput.trim().toLowerCase() === "start"){
			playingHand = true;
			initGame();
			return;
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
		dealer.hand.forEach(function (card, i) {
			if(i === dealer.hand.length - 1){
				dealerHandString += `${card.rank.id} of ${card.suit}s`;
			} else {
				dealerHandString += `${card.rank.id} of ${card.suit}s, `;
			}
		});
	} else {
		dealerHandString = `${dealer.hand[0].rank.id} of ${dealer.hand[0].suit}s`
	}

	player.hand.forEach(function (card, i) {
		if(i === player.hand.length - 1){
			playerHandString += `${card.rank.id} of ${card.suit}s`;
		} else {
			playerHandString += `${card.rank.id} of ${card.suit}s, `;
		}
	});
	//Following line is kind of messy, consider refactoring to make it readable.
	return `${printScores()}\n \nDealer's hand: ${dealerHandString}\n${dealerTurn ? `Dealer Total: ${dealer.getHandTotal()} ${dealer.isHandSoft()? '(Soft)' : ''}\n` : ''}\nYour hand: ${playerHandString}\nYour total: ${player.getHandTotal()} ${player.isHandSoft()? '(Soft)' : ''}`
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

function isHandSoft(){
	return this.hand.some(e => e.rank.id === "ace" && e.rank.value === Cards.aceDefaultValue);
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
		returnHandsToDeck();
		Cards.shuffle(deck);
	} else if ((player.getHandTotal() > dealer.getHandTotal() && player.getHandTotal() <= Cards.blackjack) || dealer.getHandTotal() > Cards.blackjack){
		player.score++;
		alert(`${displayHands()}\n \nYou Win!`);
		returnHandsToDeck();
		Cards.shuffle(deck);
	} else {
		dealer.score++;
		alert(`${displayHands()}\n \nYou Lose`);
		returnHandsToDeck();
		Cards.shuffle(deck);
	}
}

function deal(target, cardsToDeal = 1){
	for (let i = 0; i < cardsToDeal; i++) {
		target.hand.push(deck.pop());
	}
}

function returnHandsToDeck(){
	console.log(player.hand.length)

	if (player.hand.length === 0 && dealer.hand.length === 0){return;}
	for (const card of player.hand) {
		if (card.rank.id === "ace"){
			card.rank.value = Cards.aceDefaultValue;
		}

	}
	for (const card of dealer.hand) {
		if (card.rank.id === "ace"){
			card.rank.value = Cards.aceDefaultValue;
		}

	}
	while (player.hand.length > 0){
		deck.push(player.hand.pop());

	}
	while (dealer.hand.length > 0){
		deck.push(dealer.hand.pop());
	}

}

function playGame(){
	resetScores();
	while (playingHand) {
		returnHandsToDeck();
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
			while (dealer.getHandTotal() < dealerStandAt) {
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

initGame();