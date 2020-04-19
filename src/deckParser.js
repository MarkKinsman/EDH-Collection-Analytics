var excel = require("excel4node");
var _ = require("lodash");

var DeckParser = {};

DeckParser.parse = async function parse(req, res) {
  try {
    var decks = [];
    var cardsInDeck = [];
    var cardsMaster = [];

    for (const index in req.files) {
      decks.push(req.files[index].originalname);

      //Method
      var decklist = req.files[index].buffer.toString().split(/\r?\n/);

      for (const deckIndex in decklist) {
        if (decklist[deckIndex].trim().length > 0) {
          qty = Number(str.split(/\s(.+)/)[0]); //everything before the first space
          card = str.split(/\s(.+)/)[1].trim(); //everything after the first space

          for (var i = 0; i < qty; i++) {
            cardsInDeck.push({
              deckid: index,
              cardid: cardIndex,
              name: card,
            });
          }
        }
      }
      //
    }

    async.each(
      myCollection,
      (item, done) => {},
      (err) => {}
    );

    const z = mySyncFunction(1, 2);

    myPrivateFunction(1, 2, (err, sum) => {
      console.log(sum);
    });


    module.exports.myExport(123, (err) => {
      console.log(err);
    });

    var workbook = new excel.Workbook();

    var deckSheet = workbook.addWorksheet("Decks");
    var cardSheet = workbook.addWorksheet("Cards");

    deckSheet.cell(1, 1).string("deck_id");
    deckSheet.cell(1, 2).string("deck_name");
    for (const index in decks) {
      deckSheet.cell(parseInt(index) + 2, 1).string(index);
      deckSheet
        .cell(parseInt(index) + 2, 2)
        .string(decks[index].replace(".txt", ""));
    }

    cardSheet.cell(1, 1).string("card_id");
    cardSheet.cell(1, 2).string("deck_id");
    cardSheet.cell(1, 3).string("qty");
    cardSheet.cell(1, 4).string("card_name");
    for (const index in cardsInDeck) {
      cardSheet.cell(parseInt(index) + 2, 1).string(index);
      cardSheet.cell(parseInt(index) + 2, 2).string(cardsInDeck[index].deckid);
      cardSheet.cell(parseInt(index) + 2, 3).string(cardsInDeck[index].qty);
      cardSheet.cell(parseInt(index) + 2, 4).string(cardsInDeck[index].name);
    }

    workbook.write(`DeckAnalysis-${Date.now()}.xlsx`);

    res.send("Good Work");
  } catch (err) {
    console.error(err);
    throw new Error("There was an error parsing deck lists");
  }
};

module.exports = DeckParser;
