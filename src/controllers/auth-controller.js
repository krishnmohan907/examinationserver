const dateFormat = require('dateformat');
const jwt = require('jsonwebtoken');
var userquery = require('../library/userquery.js');
var config = require('../config/config.js');
var users = require('../models/User.js');

// user Login API
module.exports.userLogin = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(200).json({
            success: false,
            statusCode: 204,
            message: 'Required fields are empty, Please check once',
            data: null
        });
    }
    let wherecond = `username='${req.body.username}' AND password='${req.body.password}'`;
    (async () => {
        await userquery.simpleselect('users', '*', wherecond).then(async result => {
            // console.log("response is:", result);
            if (result == '' || result == null || result == []) {
                console.log("Invalid username or password");
                return res.status(200).json({
                    success: false,
                    statusCode: 404,
                    message: 'Invalid username or password',
                    data: null
                });
            }
            console.log("Login successful", result);
            var token = jwt.sign({
                id: result[0].username
            }, config.database.securitykey, {
                expiresIn: '24h'
            });
            console.log("token is:", token);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Login successful',
                data: result,
                token: token
            });
        }).catch(err => {
            console.log("Error while login", err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Error while login',
                data: err
            });
        })
    })();
}

// user Signup API
module.exports.userSignup = (req, res, next) => {

    console.log("request fields are:", req.body);

    let columndata = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
        role: req.body.role,
        assigned_role: req.body.assigned_role,
        desgination: req.body.desgination,
        depertmenet: req.body.depertmenet,
        profilepath: req.body.profilepath,
        uploadprofile: req.body.uploadprofile,
        status: req.body.status,
        configure: req.body.configure,
        created_at: new Date(),
        updated_at: new Date()
    }

    // (async () => {
    userquery.simpleselect('users', '*', `email='${req.body.email}'`).then(async result => {
        console.log('get user deatils', result);
        if (result[0].email == req.body.email) {
            return res.status(200).json({
                success: false,
                statusCode: 404,
                message: 'Email already exists',
                data: null
            });
        }
        await userquery.insertTable('users', columndata).then(resp => {
            console.log("response is:", resp);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Signup successful',
                data: resp
            });
        }).catch(err => {
            console.log("Signup failed", err);
            res.status(200).json({
                success: false,
                statusCode: 500,
                message: 'Signup failed',
                data: null
            });
        })
    }).catch(err => {
        console.log("Error while finding email", err);
        res.status(200).json({
            success: false,
            statusCode: 500,
            message: 'Error while finding email',
            data: null
        });
    })
    // })();
}