const express = require("express");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const cookieParser = require('cookie-parser');

const errorMiddleWare = require("./middlewares/error");
const app = express();

//  json parser
app.use(express.json());

// cookie parser 
app.use(cookieParser());


// error midlle ware
app.use(errorMiddleWare);

//  base url
app.use("/api/mj", product);

// user
app.use("/api/mj", user);

module.exports = app;
