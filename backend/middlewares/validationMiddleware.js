const zod = require('zod');
const { userSignupSchema, userSigninSchema } = require('../schemas/userSchema');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');

const signUpValidation = async (req, res, next) => {

    const body = req.body;

    const { success } = userSignupSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    console.log('Existing user ', existingUser);

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    next();

}

const signInValidation = async function (req, res, next) {

    const { username, password } = req.body;

    const { success } = userSigninSchema.safeParse({ username, password })

    if (!success) {
        return res.status(411).json({
            message: 'Error while logging in'
        })
    }

    // Check if username and password in db
    const result = await User.findOne({ username, password });

    if (!result) {
        return res.status(411).json({
            message: 'Username or Password is Incorrect'
        })
    }

    next();

}

const changePassword = async function(req, res, next){


    const {updatedFirstName, updatedLastName, updatedPassword} = req.body;
    const {success} = zod.safeParse({
        updatedFirstName,
        updatedLastName,
        updatedPassword
    }) 

    if(!success){
        return res.status(411).json({
            message: "Error while updating"
        })
    }

    next();
}

const authMiddleware = async function (req, res, next) {

    const { authHeader } = req.headers;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(411).json({
            message: "Incorrect Token"
        })
    }

    const token = authHeader.split(' ')[1];

    // verify token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded secret ', decoded);

       
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        }
        else{
            return res.status(411).json({
                message: "Authentication Error"
            })
        }
      
    }

    catch (err) {
        console.log('Error ', err);
    }




}



module.exports = { signUpValidation, signInValidation , changePassword, authMiddleware };