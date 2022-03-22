
//'test9.csv,iIIJUWLbpTUcJt,3,b9be0a19005f4219d8ef8e73f13fbe3d'
function analizarData(data){
    let elementsCsv = [];
    let elemento = "";
    console.log("data",data);
    for ( let i = 0 ; i< data.length ; i++ ){
        
        if (data[i]==="," || i===data.length-1){
            
            if(i===data.length-1){
                elemento+=data[i];
            }
            if(elemento.endsWith("\r")){
                elemento=elemento.substring(0, elemento.length - 1);
            }
            elementsCsv.push(elemento);
            
            elemento="";
            continue
        }
        
        elemento+=data[i];
       

    }
    
    if( elementsCsv.length !==4){
        return {
            isValid:false,
        };
    }
    
    return {
        isValid:true,
        elementsCsv
    }

    
}
/*
[
   {
      "file": "file1.csv",
      "lines": [
         {
            "text" :"RgTya",
            "number": 64075909,
            "hex": "70ad29aacf0b690b0467fe2b2767f765"
         },
         . . .
      ]
   }
]

*/

const cleanData = ( data ) =>{
    
    let cleaned ="" ;
    let analizar="";

    let lines = []
    let filename="";
   
    for(let i =0 ; i< data.length ; i++ ){
        
        if(data[i]==="\n" || i===data.length-1){
            if(i===data.length-1){
                analizar+=data[i];
            }
            const { isValid ,elementsCsv} = analizarData(analizar);
           
            
            if( isValid ){
                filename=elementsCsv[0]
              
                lines.push({
                    text: elementsCsv[1],
                    number:elementsCsv[2],
                    hex :elementsCsv[3]
                })
                cleaned+=analizar
            }

            analizar="";
            continue
        }

        analizar+=data[i];
    }
    lines.splice(0,1)
    
    let objeto = {
        filename,
        lines,
    }

    return objeto;
}
/*
file: 'file,text,number,hex\r\n' +
    'test6.csv,kGOhK\r\n' +
    'test6.csv,RBCJLIBllR,2754736828,b405e8d0faad6d2d5ef4287ccd582516\r\n' +
    'test6.csv,Z,9977869,db56b806f85fca10aad8896713cb7909\r\n' +
    'test6.csv,Q,07,42fa9cefda481f9f76e9e49da9653b8c\r\n' +
    'test6.csv,LtXaxjaLwAsPkJpzuMdtxRDdqPmhgY,2,0a498379f4b549e1fcf9d72cb7cd4b9b\r\n' +
    'test6.csv,VUdGqjISk,9062550,ce0c10f545f62a7230bb5c2059cd2f39\r\n' +
    'test6.csv,WpkoqZECIkjwkFQTtOGqz,4114496146,b1a9760041017a890668f9f5e1a9ce87\r\n' +
    'test6.csv,VTQqjUdumrEAtsyKiH,351,74371007e3eea8318f94ce421f024062\r\n' +
    'test6.csv,ffOXDKxaeYEZNsZCPnUy,8018630,fdc28f6be6c8408f48d40d0995eb3d18,,\r\n' +
    'test6.csv,UuMTG'

*/

module.exports ={
    cleanData,
}