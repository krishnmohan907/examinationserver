const mongoose = require('mongoose');

const addemployeeschem = mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    adress: {
        type: String
    },
    email: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    password: {
        type: String
    },
    cources: {
        type: String
    },
    male: {
        type: Number
    }
});

mongoose.model('EmployeeDetails', addemployeeschem, 'employee')