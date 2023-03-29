const ErrorHandler = require("../utilis/errorhandler");

module.exports = (err, req, res, next) => {
  console.log('errrrrrrrrrrrrrrrrryy' , err )
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "MongoError" && err.code === 11000) {
    // Duplicate key error
    err.message = "Duplicate key error";
    err.statusCode = 400;
    // mongo id error 
  } else if (err.name === "CastError") {
    // Invalid ObjectId error
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);

  } else if (err.name === "ValidationError") {
    // Mongoose validation error
    err.message = err.errors[Object.keys(err.errors)].message;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: 'failed',
    message: err.message,
  });
};
