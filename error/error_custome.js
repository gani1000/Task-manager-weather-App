

class CustomAPIErorr extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
    }
}


const createCustomeAPIErorr = (msg, statusCode) => {
    return new CustomAPIErorr(msg, statusCode); 
}

module.exports = {
    CustomAPIErorr,
    createCustomeAPIErorr
}