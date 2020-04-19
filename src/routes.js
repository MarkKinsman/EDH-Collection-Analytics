const multer = require('multer');
const path = require('path');

const orchestrator = require('./orchestrator');

module.exports = app => {
    app.get('/ping', function(req, res) {
        res.status(200).send("We are running!");
    });


    var storage = multer.memoryStorage();
    var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            var extension = path.extname(file.originalname);
            if(extension !== '.txt') {
                return callback(new Error('Only .txt files are allowed'));
            }
            callback(null, true);
        }
    });

    app.post('/uploadDecks', upload.array('decklists'), orchestrator.webrequest);
}