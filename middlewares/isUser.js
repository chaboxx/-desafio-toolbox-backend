
const { isValidJwt}  = require("../helpers/isValidJwt")

const isUser = (req,res,next) =>{
    
    const { userToken } = req.params;

    const isValid = isValidJwt(userToken ,"sdsd");
    
    if( !isValid ){
        return res.status(400).json({
            ok:false,
            msg:"Error en las credenciales"
        })
    }
    //---
    
    next()
    

}

module.exports= {
    isUser,
}