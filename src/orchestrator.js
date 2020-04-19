'use strict';
var DecksTable = require('./classes/decksTable');
var CardsInDeckTable = require('./classes/cardsInDeckTable');
var CardMetadataTable = require('./classes/cardMetadataTable');

var Orchestrator = {};

Orchestrator.webrequest = async function webrequest(req, res){
    var decksTable = new DecksTable();
    var cardsInDecks = new CardsInDeckTable();
    
    for (const index in req.files) {
        decksTable.add(req.files[index].originalname);
        cardsInDecks.addFile(req.files[index].originalname, req.files[index].buffer.toString());
    }
    
    var cardMetadata = new CardMetadataTable();
    await cardMetadata.LoadTable(cardsInDecks.getUniqueList())

    console.log(`Card Metadata: ${JSON.stringify(cardMetadata.cards)}`);

    res.send("Success");
}

Orchestrator.consoleRequest = async function consoleRequest() {

}

module.exports = Orchestrator;