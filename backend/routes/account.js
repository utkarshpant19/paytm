const express = require('express');

const accountRouter = express.Router();

accountRouter.get('/', (req, res, next)=>{

    res.json({
        message: 'Hi User from account'
    })
});

module.exports = accountRouter;