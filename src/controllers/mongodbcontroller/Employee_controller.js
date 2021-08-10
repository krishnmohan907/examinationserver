const mongoose = require('mongoose');
const Employee = mongoose.model('EmployeeDetails');
const validator = require('express-joi-validation').createValidator({});
var Joi = require('joi');
const { response } = require('express');
const { Validator } = require('objection');
const { request } = require('../../server');

module.exports.addemployee = async (request, response) => {
    //Joi validation in Scheme
    let validate = false;
    const schema = Joi.object({
        firstname: Joi.string().required(),
        middlename: Joi.string().required(),
        lastname: Joi.string().required(),
        adress: Joi.string().required(),
        email: Joi.string().required(),
        phonenumber: Joi.number().required(),
        password: Joi.string().required(),
        cources: Joi.string().required(),
        male: Joi.number().required(),
    })
    await validator.query(request.body, schema, (err) => {
        console.log('validator responce issues is', err)
        if (err && err.details.lenght) {
            validate = true
        }
        if (validate) {
            return response.status(200).json({
                success: false,
                statuscode: 500,
                message: 'validation error, invalid credentials',
                data: []
            })
        }
    })
    var addemployee = new Employee({
        firstname: request.body.firstname,
        middlename: request.body.middlename,
        lastname: request.body.lastname,
        adress: request.body.adress,
        email: request.body.email,
        phonenumber: request.body.phonenumber,
        password: request.body.password,
        cources: request.body.cources,
        male: request.body.male
    })
    addemployee.save().then(resp => {
        response.status(200).json({
            status: 200,
            success: true,
            message: 'employee Added',
            data: resp
        })
    }).catch(err => {
        console.log('error', err);
        response.status(200).json({
            status: 500,
            success: false,
            message: 'Employee Not inserted',
            data: err

        })
    })
}

module.exports.GetEmployee = async (request, response) => {
    await Employee.find()
        .then(result => {
            return response.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Successfully fetching data',
                data: result
            })
        }).catch(err => {
            // console.log(err, 'error in fetch list')
            return response.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Unable to fetch data',
                data: null
            })
        })
}

module.exports.Updateemployee = async (request, response) => {
    //Joi validation in Scheme
    let validate = false;
    const schema = Joi.object({
        firstname: Joi.string().required(),
        middlename: Joi.string().required(),
        lastname: Joi.string().required(),
        adress: Joi.string().required(),
        email: Joi.string().required(),
        phonenumber: Joi.number().required(),
        password: Joi.string().required(),
        cources: Joi.string().required(),
        male: Joi.number().required(),
    })
    await validator.query(request.body, schema, (err) => {
        console.log('validator responce issues is', err)
        if (err && err.details.lenght) {
            validate = true
        }
        if (validate) {
            return response.status(200).json({
                success: false,
                statuscode: 500,
                message: 'validation error, invalid credentials',
                data: []
            })
        }
    })
    let obj = {
        _id: "60ff9148767a1071001d198e",
        firstname: request.body.firstname,
        middlename: request.body.middlename,
        lastname: request.body.lastname,
        adress: request.body.adress,
        email: request.body.email,
        phonenumber: request.body.phonenumber,
        password: request.body.password,
        cources: request.body.cources,
        male: request.body.male
    }
    addemployee.updateMany({}, { $set: setData }).then(resp => {
        response.status(200).json({
            status: 200,
            success: true,
            message: 'employee Added',
            data: resp
        })
    }).catch(err => {
        console.log('error', err);
        response.status(200).json({
            status: 500,
            success: false,
            message: 'Employee Not inserted',
            data: err

        })
    })
}