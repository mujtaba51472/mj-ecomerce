class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
         console.log('sttatta' , )
        Error.captureStackTrace(this,this.constructor);

    }
    
}

module.exports = ErrorHandler