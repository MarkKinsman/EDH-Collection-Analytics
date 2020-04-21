var request = require('request');
var async = require('async');
var _ = require('lodash');

var Connector = {};

Connector.callAPI = async (cardList) => {
    // let calls = 0;
    var lookedupCards = [];

    let chunks = _.chunk(cardList, 75);
    let promises = [];
    _.for(chunks, (chunk, index) => {
        promises.push(new Promise((resolve, reject) => {
            var options = {
                method: 'POST',
                uri: 'https://api.scryfall.com/cards/collection',
                body: generateRequestBody(chunk),
                json: true
            }

            request.post(options, (err, response) => {

                Array.prototype.push.apply(lookedupCards, response.body.data);
            });
        }))
    });

    let promiseChunks = _.chunk(promises, 10);
    _.for(promiseChunks, (chunk, index) => {
        chunk.push(new Promise( resolve => {
            setTimeout(()=>{
                resolve();
            }, 1000);
        }))
        await Promise.all(chunk);
    })

    return lookedupCards;
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