
const { default: axios } = require("axios");
const fs  = require("fs");
const { cleanData } = require("../helpers/cleanData");


const domainCsv = async( req,res ) =>{

   
    try {

        const { fileName } = req.query;

        
        const resp = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files",{
            headers:{
                "Authorization" : "Bearer aSuperSecretKey"
            }
        })
    
        
        const { files } = resp.data;
        
        if (fileName){
            const data = [];
            if( !files.includes(fileName) ){
                return res.status(400).json({
                    ok:false,
                    msg :"No existe un archivo con ese nombbre"
                })
            }else{
                
                const resp = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`,{
                    headers:{
                        "Authorization" : "Bearer aSuperSecretKey",
                        
                    }
                })
                const file = resp.data;
                const {valid,lines} = cleanData(file);
                if(valid){
                    data.push({
                        file:fileName,
                        lines,
                    })
                    return res.status(200).json({
                        ok:true,
                        data,
                    })
    
                }
                return res.status(400).json({
                    ok:false,
                })
                
            }

        }

        

        const data = [];
        for ( let i=0 ; i<files.length ; i ++){
    
            try {
                const resp = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${files[i]}`,{
                    headers:{
                        "Authorization" : "Bearer aSuperSecretKey",
                        
                    }
                })
                const file = resp.data;
               
                const {valid,lines} = cleanData(file);
                
                if(valid){
                    data.push({
                        file : files[i],
                        lines,
                    })

                }
                
            } catch (error) {
                console.log("La Descarga del archivo fallo");
            }
        }
        return res.json({
            ok:true,
            data
        })
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: "Error en el Servidor"
        })
    }
   
}

module.exports = {
    domainCsv,
}