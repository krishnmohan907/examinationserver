const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
var userlibrary = require('../../library/mongolibrary/userlibrary');
var config = require('../../config/config.js');
const { result } = require('underscore');

// User signup API
module.exports.signup = async (request, response) => {
    console.log('the request is the', request.body);
    var user = new User({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        phonenumber: request.body.phonenumber,
        designation: request.body.designation,
        department: request.body.department,
        status: request.body.status,
        created_at: new Date(),
        updated_at: new Date()
    })
    await userlibrary.emailverification(User, { email: `${request.body.email}` }).then(async result => {
        console.log('the result data is theeeeeee', result);
        if (result.email == request.body.email) {
            return response.status(200).json({
                statusCode: 200,
                success: true,
                message: 'email is alredy exist',
                data: null
            })
        }
        await userlibrary.insertCollection(user).then(resp => {
            response.status(200).json({
                statusCode: 200,
                success: true,
                message: 'signup successfully',
                data: resp
            });
        }).catch(err => {
            console.log('the error is theeeee', err);
            response.status(200).json({
                statusCode: 500,
                success: failed,
                message: 'signup failed',
                data: null,
            })
        })
    })
}

// User login API
module.exports.login = async (request, response, next) => {
    console.log('the login id is theeeeeeee', request.body);
    var whereObj = {
        username: request.body.username,
        password: request.body.password
    }
    console.log('the login id is theeeeeeee', whereObj);
    await userlibrary.simpleselectlogin(User, whereObj).then(async resp => {
        if (resp == null) {
            return response.status(200).json({
                statusCode: 404,
                success: false,
                message: 'Invalid username or password',
                data: null
            })
        } else {
            await userlibrary.updatecollection(User,{username: request.body.username},{ lastLoginTime: new Date() }).then(result => {
                console.log('Last login time updated', result);
            })
            var token = jwt.sign({
                username: resp.username,
                email: resp.email
            },config.database.securitykey, {
                expiresIn: '24h'
            });
            response.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Login successful',
                data: resp,
                token: token,
                lastlogintime: resp.lastLoginTime
            });
        }
    }).catch(err => {
        console.log('error', err);
        response.status(200).json({
            statusCode: 500,
            success: false,
            message: 'Error while login',
            data: null
        })
    })
}
