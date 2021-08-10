const mongoose = require('mongoose');
var config = require('./config.js');
require('../models/User.js');
require('../models/Addbook');
require('../models/Employee');
var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(config.database.url, options);
mongoose.Promise = global.Promise;
var connection = mongoose.connection;

connection.once('open', function () {
    console.log('Mongodb connection success');
});

connection.on('error', function () {
    console.error('Mongodb connection failed');
});