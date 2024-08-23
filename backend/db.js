const mongoose = require('mongoose');
const { Schema } = require('zod');

const dbUrl = 'mongodb+srv://utkarshpant1994:KfHsTyvVIrYtgG2g@cluster0.hep5gr7.mongodb.net/paytmApp';

mongoose.connect(dbUrl);

// Create a Schema for users
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        maxLength: 50
    },
    lastName: {
        type: String, 
        require: true,
        maxLength: 50
    },
    username: {
        type: String,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String, 
        require: true,
        minLength: 6
    }
});

// Account Schema
const accountSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } 
    ,
    balance: {type: Number, required: true},
    
})

// Create a model from Schema
const User = mongoose.model('user', userSchema);
const Account = mongoose.model('account', accountSchema);

module.exports = {User, Account}