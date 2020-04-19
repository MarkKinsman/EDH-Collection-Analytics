'use strict';
var connector = require('../scryfallAPIConnector');


class CardMetadataTable {
    #cards;

    constructor() {
        this.#cards = {}
    }

    get cards() {
        return this.#cards
    }

    async LoadTable(cardList) {
        connector.callAPI(cardList, (cardData) => {
            this.#cards = cardData
            return;
        });
    }

}


module.exports = CardMetadataTable;