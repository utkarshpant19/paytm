const mongoose = require('mongoose');

const MONGOOSE_URL = "mongodb+srv://utkarshpant1994:KfHsTyvVIrYtgG2g@cluster0.hep5gr7.mongodb.net/paytm";
mongoose.connect(MONGOOSE_URL).then((res)=>{
    console.log('Mongodb Connected');
}).catch((err)=>{
    console.log(err.message);
})


// Step2: Create Schema for User table
const userSchema = new mongoose.Schema({

    username: {
        type: String, 
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String, 
        required: true,
        trim: true,
        maxLength: 50
    },

    password: {
        type: String, 
        required: true,
        minLength: 6
    }
});

// Creating the model

const User = mongoose.model('User', userSchema);
// Exporting the model
module.exports = {
    User
};
