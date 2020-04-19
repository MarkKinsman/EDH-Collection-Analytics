"use strict";

class CardsInDeckTable {
  #cardsInDeck;

  constructor() {
    this.#cardsInDeck = [];
  }

  get cards() {
    return this.#cardsInDeck;
  }

  addFile(deckName, deckList) {
    
    var cards = deckList.split(/\r?\n/);

    for (const row of cards) {
      if (row.trim().length > 0) {
        var qty = Number(row.split(/\s(.+)/)[0]); //everything before the first space
        var card = row.split(/\s(.+)/)[1].trim(); //everything after the first space

        for (var i = 0; i < qty; i++) {
          this.#cardsInDeck.push({
            deckName: deckName,
            cardName: card,
          });
        }
      }
    }
  }

  getUniqueList() {
    var uniqueList = []

    for ( const card of this.#cardsInDeck) {
        if (!uniqueList.includes(card.cardName)) {
            uniqueList.push(card.cardName)
        }
    }

    return uniqueList;
  }
}

module.exports = CardsInDeckTable;
