const express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth-controller.js');
var userCtrl = require('../controllers/user-controller.js');
var Employee = require('../controllers/mongodbcontroller/Employee_controller')
// Server routes
router.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Socket works!'
    });
})

router.get('/server', (req, res, next) => {
    console.log("API works!");
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'API works!'
    });
});

router.post('/login', authCtrl.userLogin);

router.post('/signup', authCtrl.userSignup);

router.get('/getUsers', userCtrl.getUsers);

router.post('/getOneUserById', userCtrl.getOneUserById);



module.exports = router;