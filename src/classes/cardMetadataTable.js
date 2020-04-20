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
        this.#cards = await connector.callAPI(cardList);
    }

}


module.exports = CardMetadataTable;