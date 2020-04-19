'use strict';

class DecksTable {
    #decks;

    constructor() {
        this.#decks = {}
    }

    get decks() {
        return this.#decks
    }

    add(deckName) {
        if(!this.#decks[deckName])
        {
            this.#decks[deckName] = {fileName: deckName, prettyName: deckName.replace(".txt", "").trim()}
        }
    }
}

module.exports = DecksTable;