const ErrorHandler = require("../utilis/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "MongoError" && err.code === 11000) {
    // Duplicate key error
    err.message = "Duplicate key error";
    err.statusCode = 400;
  }  else  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
   // Mongoose duplicate key error
   else if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Wrong JWT error
   else if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }
  // JWT EXPIRE error
   else if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }
   else if (err.name === "ValidationError") {
    // Mongoose validation error
    err.message = err.errors[Object.keys(err.errors)[0]].message;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: 'failed',
    message: err.message,
  });
};
