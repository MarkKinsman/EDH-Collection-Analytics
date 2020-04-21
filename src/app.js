const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })

app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

app.listen(8080);
console.log(`server started on port 8080`);