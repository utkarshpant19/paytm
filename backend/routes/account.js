const express = require('express');
const { signInValidation } = require('../middlewares/validationMiddleware');
const { Account } = require('../db');
const {authMiddleware} = require('../middlewares/validationMiddleware');
const {default: mongoose} = require("mongoose");

const accountRouter = express.Router();

accountRouter.get('/balance',authMiddleware, async (req, res)=>{

    const userId = req.userId;

    const account = await Account.findOne({
        userId
    });

    if(account){
        console.log(account);

        return res.json({
           balance: account.balance
        })
    }
    return res.status(411).json({
        message: "Account not found"
    })

});

accountRouter.post('/transfer',authMiddleware, async (req, res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    const {to, amount} = req.body;

    // Check if sender have suffient balance to transfer
    // const userId = req.userId;
    const account = await Account.findOne({userId: req.userId})

    console.log('Sender Account ', account);

    if(!account || account.balance < amount ){
        session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    // Check if receiver account is correct

    const recAccount = await Account.findOne({
        userId: to
    });

    console.log('Receiver account ',recAccount);

    if(!recAccount){
        return res.status(400).json({
            message: "Invalid Receiver account"
        })
    }

    // Perform the transfer
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}});
    await Account.updateOne({userId: to}, {$inc: {balance: amount}})

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: 'Transaction Successful'
    })

})


module.exports = accountRouter