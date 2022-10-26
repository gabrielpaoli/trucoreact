import React, { useState, useEffect } from 'react';
import BoardCards from '../boardCards/BoardCards';
import PlayedCards from '../playedCards/PlayedCards';
import Button from '@mui/material/Button';
import Hand from '../../clases/Hand';

const Game = (props) => {
	
	const [player1, setPlayer1] = useState({
		id: 'player1',
		cards: [],
		playedCards: [],
		handPoints: 0,
		roundsWon: 0,
	});

	const [player2, setPlayer2] = useState({
		id: 'player2',
		cards: [],
		playedCards: [],
		handPoints: 0,
		roundsWon: 0,
	});

	const [handData, setHandData] = useState({
		hand: null,
		turn: null,
		lastCardPlayed: null,
	}
	);

	const [gameData, setGameData] = useState({
		player1Points: 0,
		player2Points: 0,
		loaded: false
	}
	);

	function setGameDataLoaded(){
		setGameData(gameData => {
      return { ...gameData, loaded: true }
    });
	}

	function setHandPlayers(handCards){
		setPlayer1(player1 => ({
			 ...player1, cards: handCards[0], roundsWon: 0, handPoints: 0, playedCards: [] 
		}));
		setPlayer2(player2 => ({
			...player2, cards: handCards[1], roundsWon: 0, handPoints: 0, playedCards: []
		}));

	}

	function setHandInfo(){
		
		//ESTO PASA DESPUES DEL UPDATE
		let handDataP = {};

		if(handData.hand === null){
			handDataP = player1;
		}else if(handData.hand.id === player1.id){
			handDataP = player2;
		}else{
			handDataP = player1;
		}

		setHandData(handData => {
			return { ...handData, hand: handDataP, turn: handDataP, lastCardPlayed: handDataP}
		});
	}

	function initGame(){
		setGameDataLoaded();
		initHand()
	}

	function initHand(){
		let hand = new Hand();
		let handCards = hand.dealCards();
		setHandPlayers(handCards);
		setHandInfo();
	}

	function playCard(card, player){
		updatePlayedCards(card, player)

		setRoundWon(card, player)
 				
		if(player1.roundsWon < 2 && player2.roundsWon < 2){
			changePlayerTurn(card, player)
		}
		
	}

	useEffect(() => {
    if(player1.roundsWon === 2 || player2.roundsWon === 2){
			initHand()
		}
  }, [player1, player2, handData]);

	//TODO: WORKS BUT NEED REFACTOR -IF HELL-
	function setRoundWon(card, player){
		let bestCardData = {}
		let lastCard = {};
		let playedCards1 = player1.playedCards.length;
		let playedCards2 = player2.playedCards.length;

		if(playedCards1 !== playedCards2)
			return;
		
		if(player.id === 'player1'){
			lastCard = player2.playedCards.slice(-1)[0]
			bestCardData = bestCard(card, lastCard)
			if(bestCardData === card){
				setPlayer1(player1 => {
					return { ...player1, roundsWon: player1.roundsWon+1}
				});
			}else{
				setPlayer2(player2 => {
					return { ...player2, roundsWon: player2.roundsWon+1}
				});
			}
		}else{
			lastCard = player1.playedCards.slice(-1)[0]
			bestCardData = bestCard(card, lastCard)
			if(bestCardData === card){
				setPlayer2(player2 => {
					return { ...player2, roundsWon: player2.roundsWon+1}
				});
			}else{
				setPlayer1(player1 => {
					return { ...player1, roundsWon: player1.roundsWon+1}
				});
			}
		}

	}

	function updatePlayedCards(card, player){
		let playedCards = player.playedCards;
		playedCards.push(card);

		if(player.id === 'player1'){
			setPlayer1(player => {
				return { ...player, playedCards: playedCards }
			});
		}else{
			setPlayer2(player => {
				return { ...player, playedCards: playedCards }
			});
		}
	}

	function bestCard(card1, card2){
		let card = card1;

		if(typeof card1 === 'undefined'){
			return card2;
		}
		if(typeof card2 === 'undefined'){
			return card1;
		}

		if(card2.power > card1.power){
			card = card2;
		}

		if(card1.power === card2.power){
			card = 'tie';
		}

		return card;		
	}


	function changePlayerTurn(card, player){
		let bestCardData = {};
		let playerTurnO = {};
		let playerTurnO0 = {};
		let playerTurnO1 = {};
		let lastCard = {};
		let ownerPlayedCards = 0;
		let opponentPlayedCards = 0;

		if(player.id === 'player1'){
			playerTurnO0 = player2;
			playerTurnO1 = player1;
			ownerPlayedCards = player1.playedCards.length
			opponentPlayedCards = player2.playedCards.length
			lastCard = player2.playedCards.slice(-1)[0]
		}else{
			playerTurnO0 = player1;
			playerTurnO1 = player2;
			ownerPlayedCards = player2.playedCards.length
			opponentPlayedCards = player1.playedCards.length
			lastCard = player1.playedCards.slice(-1)[0]
		}

		if(handData.lastCardPlayed.id === player.id || ownerPlayedCards > opponentPlayedCards){
			playerTurnO = playerTurnO0;
		}else{
			bestCardData = bestCard(card, lastCard);
			if(bestCardData !== card || typeof lastCard === 'undefined'){
				playerTurnO = playerTurnO0;
			}else if(bestCardData === 'tie'){
				playerTurnO = handData.turn;					
			}else{
				playerTurnO = playerTurnO1;
			}
		}
		
		setHandData(handData => {
      return { ...handData, turn: playerTurnO, lastCardPlayed: playerTurnO1 }
    });

	}

	return (

      <div className="game">
				{!gameData.loaded && <Button variant="contained" onClick={() => initGame()}>Iniciar juego</Button>}

				<BoardCards 
					player = {player1} 
					playCard = {playCard}
					handData = {handData}
				/>
				
				<PlayedCards 
					player = {player1} 
				/>
				
				<PlayedCards 
					player = {player2} 
				/>
				
				<BoardCards 
					player = {player2} 
					playCard = {playCard}
					handData = {handData}
				/>
			
			</div>

  );

};
	
export default Game;