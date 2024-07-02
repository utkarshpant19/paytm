require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const rootRouter = require('./routes/index');

app.use('/api/v1', rootRouter);

app.listen(PORT, ()=>{
    console.log('App is listening on port ',PORT);
})








