const app = require("./app");
const dotevn = require("dotenv");
const connectingDb = require("./db/connectedDb");

// Handling Uncaught Exception like write youtube it will crash the server so get rid of this 
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
// youtube   , writing this will give me , youtube is not defined and will crash our app
// config
dotevn.config();
connectingDb(process.env.DB_URL);
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});

// app.use((err, req, res, next) => {
//   if (err.name === "MongoParseError") {
//     return next(new ErrorHandler("Error while connecting DB", 500));
//   }

//   next();
// });

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
