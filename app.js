const express = require("express");
const product = require("./routes/productRoute");
const errorMiddleWare = require("./middlewares/error");
const app = express();

//  json parser
app.use(express.json());

// error midlle ware
app.use(errorMiddleWare);

//  base url
app.use("/api/mj", product);

module.exports = app;
