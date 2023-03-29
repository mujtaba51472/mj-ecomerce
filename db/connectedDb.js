const mongoose = require("mongoose");

// connection
const connectingDb = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb is connected Successfully with ${data.connection.host}`);
    });
};

module.exports = connectingDb;
