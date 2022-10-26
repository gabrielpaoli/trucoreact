class Deck{

	constructor(){
		this.suit = ['espada', 'basto', 'oro', 'copa'];
		this.numbers = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
	}

	createCard(){
		let randomSuit = this.suit[Math.floor(Math.random()*this.suit.length)];
		let randomNumber = this.numbers[Math.floor(Math.random()*this.numbers.length)];
		let cardText = randomNumber + ' de ' + randomSuit;
		let numberForEnvido = this.getValueOfEnvidoPerNumber(randomNumber);
		let id = randomNumber + randomSuit;
		let power = this.getPower(id, randomNumber);

		let card = {
			cardText: cardText,
			id: id,
			suit: randomSuit,
			number: randomNumber,
			power: power,
			valueForEnvido: numberForEnvido
		};
		return card;
	}

	getPower(id, number){
		let power = 0;
		if(number === 4){
			power = 1;
		}
		if(number === 5){
			power = 2;
		}
		if(number === 6){
			power = 3;
		}
		if(id === '7oro' || id === '7copa'){
			power = 4;
		}
		if(number === 10){
			power = 5;
		}
		if(number === 11){
			power = 6;
		}
		if(number === 12){
			power = 7;
		}
		if(id === '1oro' || id === '1copa'){
			power = 8;
		}
		if(number === 2){
			power = 9;
		}
		if(number === 3){
			power = 10;
		}
		if(id === '7oro'){
			power = 11;
		}
		if(id === '7espada'){
			power = 12;
		}
		if(id === '1basto'){
			power = 13;
		}
		if(id === '1espada'){
			power = 14;
		}

		return power;
	}

	getValueOfEnvidoPerNumber(number){
		var valueNumber = number;
		if(number >= 10){
			valueNumber = 20;
		}
		return valueNumber;
	}

}
  
export default Deck;