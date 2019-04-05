// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors = require('cors');

mongoose.set('useFindAndModify', false);

//Setup mongoose connection
module.exports = mongoose.connect('mongodb://localhost:27017/TurmalinaFims', {useNewUrlParser: true, useCreateIndex: true}, async (err) => {
    if (err) console.log('Some problem with the connection ' + err);
    else console.log('The mongoose connection is ready');
});

// initialize our express app
const app = express();

let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});