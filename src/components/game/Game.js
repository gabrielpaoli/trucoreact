import React, { useState, useEffect } from 'react';
import BoardCards from '../boardCards/BoardCards';
import PlayedCards from '../playedCards/PlayedCards';
import Log from '../log/Log';
import Button from '@mui/material/Button';
import Hand from '../../clases/Hand';
import CommandControl from '../commandControl/CommandControl';
import Grid from '@mui/material/Grid';

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
		tie: null,
		lastCardPlayed: null,
		envido: null,
	}
	);

	const [gameData, setGameData] = useState({
		player1Points: 0,
		player2Points: 0,
		loaded: false
	}
	);

	function setGameDataLoaded(){
		setGameData(gameData => ({...gameData, loaded: true}));
	}

	function setHandPlayers(handCards){
		setPlayer1(player1 => ({...player1, cards: handCards[0], roundsWon: 0, handPoints: 0, playedCards: []}));
		setPlayer2(player2 => ({...player2, cards: handCards[1], roundsWon: 0, handPoints: 0, playedCards: []}));
	}

	function setHandInfo(){
		let handDataP = {};

		if(handData.hand === null){
			handDataP = player1;
		}else if(handData.hand.id === player1.id){
			handDataP = player2;
		}else{
			handDataP = player1;
		}

		setHandData(handData => ({...handData, hand: handDataP, turn: handDataP, tie: 0, lastCardPlayed: handDataP}));
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
		
		const playedCard = player.playedCards.find(el => el.id === card.id);
		
		if(!playedCard){
			updatePlayedCards(card, player)

			setRoundWon(card, player)
					
			if(player1.roundsWon < 2 && player2.roundsWon < 2){
				changePlayerTurn(card, player)
			}
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
				setPlayer1(player1 => ({...player1, roundsWon: player1.roundsWon+1}));
			}else if(bestCardData === 'tie'){
				setHandData(handData => ({...handData, tie: handData.tie + 1}));
				setPlayer1(player1 => ({...player1, roundsWon: player1.roundsWon+1}));
				setPlayer2(player2 => ({...player2, roundsWon: player2.roundsWon+1}));
			}else{
				setPlayer2(player2 => ({...player2, roundsWon: player2.roundsWon+1}));
			}
		}else{
			lastCard = player1.playedCards.slice(-1)[0]
			bestCardData = bestCard(card, lastCard)
			if(bestCardData === card){
				setPlayer2(player2 => ({...player2, roundsWon: player2.roundsWon+1}));
			}else if(bestCardData === 'tie'){
				setHandData(handData => ({...handData, tie: handData.tie + 1}));
				setPlayer1(player1 => ({...player1, roundsWon: player1.roundsWon+1}));
				setPlayer2(player2 => ({...player2, roundsWon: player2.roundsWon+1}));
			}else{
				setPlayer1(player1 => ({...player1, roundsWon: player1.roundsWon+1}));
			}
		}

	}

	function updatePlayedCards(card, player){
		let playedCards = player.playedCards;
		playedCards.push(card);

		if(player.id === 'player1'){
			setPlayer1(player => ({...player, playedCards: playedCards}));
		}else{
			setPlayer2(player => ({...player, playedCards: playedCards}));
		}
	}

	function cantarEnvido(){
		console.log('cantarEnvido')
	}
	function cantarRealEnvido(){
		console.log('cantarRealEnvido')
	}
	function cantarFaltaEnvido(){
		console.log('cantarFaltaEnvido')
	}
	function cantarFlor(){
		console.log('cantarFlor')
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


	//TODO: WORKS BUT NEED REFACTOR -VARIABLE NAMES-
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
		
		setHandData(handData => ({...handData, turn: playerTurnO, lastCardPlayed: playerTurnO1}));

	}

	return (

		<div>		
			{!gameData.loaded && <Grid item xs={12}><Button variant="contained" onClick={() => initGame()}>Iniciar juego</Button></Grid>}

			{gameData.loaded && 

				<Grid
				container
				direction="row"
				style={{ minHeight: '100vh' }}
			>
				<Grid item xs={12} lg={5}>
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
				</Grid>

				<Grid item xs={0} lg={1}></Grid>


				<Grid item xs={12} lg={6}>
					
					<CommandControl 
						handData = {handData}
						player = {player1}
						cantarEnvido = {cantarEnvido}
						cantarRealEnvido = {cantarRealEnvido}
						cantarFaltaEnvido = {cantarFaltaEnvido}
						cantarFlor = {cantarFlor}
					/>

					<Log>

					</Log>

					<CommandControl 
						handData = {handData}
						player = {player2}
						cantarEnvido = {cantarEnvido}
						cantarRealEnvido = {cantarRealEnvido}
						cantarFaltaEnvido = {cantarFaltaEnvido}
						cantarFlor = {cantarFlor}
					/>
					
				</Grid>
			</Grid>
			
		}

	</div>
);

};
	
export default Game;