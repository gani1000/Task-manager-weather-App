const { CustomAPIErorr } = require("../error/error_custome");

const errorHandlerMiddleWare = (err, req, res, next) => {
    if (err instanceof CustomAPIErorr){
        return res.status(err.statusCode).json({ mes: err.message });
    }
    return res.status(500).json({ mes: `Something went wrong, try again later ${err.message}`});
} 

module.exports = errorHandlerMiddleWare;