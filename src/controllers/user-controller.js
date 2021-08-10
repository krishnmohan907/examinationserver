var userquery = require('../library/userquery.js');
var User = require('../models/User.js');
var config = require('../config/config.js');

// CRUD Operation API's
module.exports.getUsers = (req, res, next) => {

    userquery.simpleselect('users', '*').then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data read successfully',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}

module.exports.getOneUserById = (req, res, next) => {
    console.log("request is", req.body);
    userquery.simpleselect('users', '*', `user_id='${req.body.user_id}'`).then(resp => {
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get one user by id',
            data: resp
        });
    }).catch(err => {
        res.status(200).send(err);
    })
}