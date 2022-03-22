const { verify } = require("jsonwebtoken")



const isValidJwt = (token) =>{

    const {isValid} = verify(token,"SECRET KEY");
    
    return isValid;
}

module.exports = {
    isValidJwt
}