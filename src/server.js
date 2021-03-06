'use strict';
// Required modules
require('./config/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('underscore');
// var endpoints = require('./routes/routes.js');
var routes = require('./routes/booksroutes/bookroute.js');
var config = require('./config/config.js');
var routes = require('./routes/booksroutes/bookroute');
const router = require('./routes/routes.js');

var app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware functions
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Routes
// app.use('/api', endpoints);
app.use('/api', routes);

// socket.io
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('new-message', message);
    });
});

http.listen(config.server.port, (req, res) => {
    if (config.server.host != 'localhost' && config.server.host != '0.0.0.0') {
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    } else {
        config.server.host = 'localhost';
        console.log(`Express server is listening on http://${config.server.host}:${config.server.port}`);
    }
});

module.exports = app;