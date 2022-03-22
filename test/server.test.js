
const chai = require("chai");
const chaiHttp = require("chai-http");

const { Servidor } = require("../models/Servidor");

const servidor = new Servidor(8080);



chai.should();

chai.use(chaiHttp);


describe("Tool-Box Desafio",()=>{

    //GET ALL FILES INFORMATION
    describe("GET /domain-csv",()=>{
        it("Deberia obtenerse la informacion de todos los archivos",
            (done)=>{
                
                chai.request(servidor.app)
                    .get("/domain-csv")
                    .set('content-type', 'application/json')
                    .end((err,response)=>{
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        response.body.data.should.be.a("array")
                        response.body.data.length.should.be.eq(4);
                        for(let i of response.body.data){
                            i.lines.should.be.a("array")
                        }

                        done();
                    })
            }
        ).timeout(5000)
    })

    describe("GET /domain-csv",()=>{
        it("Deberia obtenerse la informacion un archivo por nombre",
            (done)=>{
                chai.request(servidor.app)
                    .get("/domain-csv")
                    .set('content-type', 'application/json')
                    .query({
                        fileName: "test9.csv"
                    })
                    .end((err,response)=>{
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        response.body.data.should.be.a("array")
                        response.body.data.length.should.be.eq(1);
                        
                        for(let i of response.body.data){
                            i.lines.should.be.a("array")
                        }

                        done();
                    })
            }
        ).timeout(5000)
    })

    describe("GET /files/list",()=>{
        it("Deberia obtenerse el nombre de todos los archivos (7)",
            (done)=>{
                chai.request(servidor.app)
                    .get("/files/list")
                    .set('content-type', 'application/json')
                    .end((err,response)=>{
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        response.body.files.should.be.a("array")
                        response.body.files.length.should.be.eq(7);
                        
                    
                        done();
                    })
            }
        ).timeout(5000)
    })

    
})
