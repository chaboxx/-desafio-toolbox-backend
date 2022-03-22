const express = require("express");

const { obtenerArchivo } = require("../controllers/archivos");
const { isUser } = require("../middlewares/isUser");
const { domainCsv } = require("../controllers/domainCsv");
const { getArchivosList } = require("../controllers/getArchivosList");


const cors  = require("cors");


class Servidor {


    constructor(port){
        this.port = port;
        this.app = express();
        this.middlewares();
        this.rutas();            
        this.app.listen(this.port, ()=>{
            console.log("Escuchando en el puerto :",this.port);
        })
    }

    rutas(){
        

        //OBTENER LOS ARCHIVOS
        this.app.get("/",[isUser],obtenerArchivo)

        this.app.use("/archivos", express.static("./archivos"))
        
        this.app.get("/domain-csv",domainCsv)

        this.app.get("/files/list", getArchivosList)
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    
}

module.exports= {
    Servidor,
}
