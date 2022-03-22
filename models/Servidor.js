const express = require("express");


const { getFilesData } = require("../controllers/getFilesData");
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
        

        //OBTENER INFO DE TODOS LOS ARCHIVOS O POR QUERY LA DE UN SOLO ARCHIVO
        this.app.get("/files/data",getFilesData)

        //ARCHIVOS DISPONIBLES DE LA API EXTERNA
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
