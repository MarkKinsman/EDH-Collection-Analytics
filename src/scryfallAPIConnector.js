var request = require('request');
var async = require('async');
var _ = require('lodash');

var Connector = {};

Connector.callAPI = function callAPI(cardList, callback) {
    let calls = 0;
    var lookedupCards = [];
    async.eachSeries(_.chunk(cardList, 75), (chunk, done) => {

        var options = {
            method: 'POST',
            uri: 'https://api.scryfall.com/cards/collection',
            body: generateRequestBody(chunk),
            json: true
        }

        request.post(options, (err, response) => { 

            Array.prototype.push.apply(lookedupCards, response.body.data);
            
            if(calls++ % 10 === 0) {
                setTimeout(done, 1000);
            } else {
                done();
            }
        });
    }, (err) => {
        if(err) {
            console.Error(`There was an error getting cards: ${err}`);
        } else {
            return lookedupCards;
        }
    });
}

function generateRequestBody(cardList) {
    var requestJSON = { identifiers: [] };

    for ( const cardName of cardList) {
        requestJSON["identifiers"].push({name: cardName})
    }

    console.log("Generated request");
    return requestJSON;
}

module.exports = Connector;