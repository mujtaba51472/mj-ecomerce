const express = require("express");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require('./routes/orderRoute')
const cookieParser = require("cookie-parser");

const errorMiddleWare = require("./middlewares/error");

const app = express();


//  json parser
app.use(express.json());

// cookie parser
app.use(cookieParser());


//  base url
app.use("/api/mj", product);

// user
app.use("/api/mj", user);

// order 
app.use("/api/mj", order);


app.use(errorMiddleWare);

module.exports = app;
