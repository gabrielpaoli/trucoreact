import Deck from "./Deck";

class Hand{

	constructor(players = 2){
		this.deck = new Deck();
		this.players = players;
		this.cardsPerPlayer = 3;
	}

	chunk (arr, size){
		return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
			arr.slice(i * size, i * size + size)
		);
	}

  createHandCards() {
    var tableCards = [];
    var i;
    for (i = 0; i < (this.players * this.cardsPerPlayer); i++) {
      tableCards.push(this.existCardInTable(this.deck.createCard(), tableCards, this.deck));
    }
    return tableCards;
  }

  existCardInTable(card, tableCards) {
    var i;
    for (i = 0; i < tableCards.length; i++) {
      if(tableCards[i].cardText === card.cardText){
        var newCard = this.deck.createCard();
        return this.existCardInTable(newCard, tableCards);
      }
    }
    return card;
  }

	dealCards(){
		let handCards = this.chunk(this.createHandCards(this.deck), 3);
		return handCards;
	}

}
  
export default Hand;