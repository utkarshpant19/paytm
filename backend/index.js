const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const bodyParser = require('body-parser')
const jsonwebtoken = require("jsonwebtoken");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json())


app.use('/api/v1',rootRouter )

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword
// /api/v1/account/balance
// /api/v1/account/transferMoney


app.listen(PORT, function(){

    console.log(`App is listening on port ${PORT}`);
})

