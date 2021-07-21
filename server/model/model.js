const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
       // required: true,
        unique: true
    },
    //gender : String,
    status : String,
    phnumber : {
        type: Number,
        minlength: 10,
        maxlength: 13
    },
    address: {
        type: String,
        minlength: 5,
        maxlength: 67 
    },
    cname:{
        type: String,
        minlength: 1,
        maxlength: 15
    },
    cl :{
        type: String,
        minlength: 1,
        maxlength: 1
    }
}
   
);

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;