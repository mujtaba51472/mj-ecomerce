const express = require("express");
const product = require("./routes/productRoute");

const app = express();

//  json parser
app.use(express.json());

//  base url
app.use("/api/mj", product);

module.exports = app;
