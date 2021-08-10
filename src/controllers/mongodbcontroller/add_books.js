const mongoose = require('mongoose');
const Addbooks = mongoose.model('BOOK');
const userlibrary = require('../../library/mongolibrary/userlibrary');
const { response } = require('express');
var Joi = require('joi');
module.exports.booksadded = (request, response) => {
    var addbooks = new Addbooks({
        book_id: '101',
        book_name: 'cp',
        book_author: 'balaguruswamy',
        book_shop: 'akrivia',
        created_by: 'mohan',
        created_at: new Date(),
        updated_at: new Date()
    })
    userlibrary.insertCollection(addbooks).then(resp => {
        response.status(200).json({
            status: 200,
            success: true,
            message: 'book inserted',
            data: resp
        });
    }).catch(err => {
        console.log('..........', err);
        response.status(200).json({
            status: 500,
            //success: failed,
            message: 'books not failed',
            data: null,
        })
    })
}

module.exports.getbboks = (req, res) => {
    userlibrary.commonselectquery(Addbooks).then(resp => {
        res.status(200).json({
            status: 200,
            success: true,
            message: 'fetck books',
            data: resp
        });
    }).catch(err => {
        res.status(200).json({
            status: 500,
            success: false,
            message: 'books data failed',
            data: null,
        })
    })
}

module.exports.updatebook = (req, res) => {
    var addbooks = {
        book_id: 101,
        book_name: 'algorithms',
        book_author: 'ravindra babu ravula',
        book_shop: 'hyderabad',
        created_by: 'mohan',
        created_at: new Date(),
        updated_at: new Date()
    }
    userlibrary.updatecollection(Addbooks, addbooks).then(resp => {
        res.status(200).json({
            status: 200,
            success: true,
            message: 'updated book',
            data: resp
        })
    }).catch(err => {
        console.log('...........', err);
        res.status(200).json({
            status: 500,
            success: false,
            message: 'not updated book',
            data: null
        })
    })
}

