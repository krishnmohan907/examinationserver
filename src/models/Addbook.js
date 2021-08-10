const mongoose = require('mongoose');
const addbookschema = mongoose.Schema({
    book_id: {
        type: Number
    },
    book_name: {
        type: String,
    },
    book_author: {
        type: String
    },
    book_shop: {
        type: String
    },
    created_by: {
        type: String,   
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});
mongoose.model('BOOK', addbookschema, 'addbooks');