const { default: axios } = require("axios")



const getArchivosList = async( req, res )=>{

    try {
        const resp = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files",{
            headers:{
                "Authorization" : "Bearer aSuperSecretKey",
                
            }
        })
        
        if ( resp.status !== 200 ){
            return res.status(resp.status).json({
                ok:false,
                msg:"Error en el servidor"
            })
        }
        
        const { files } = resp.data;

        

        return res.status(200).json({
            ok:true,
            msg:'Todos los Archivos',
            files,
        })
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Error en el Servidor."
        })
    }
    
}

module.exports = {
    getArchivosList,
}