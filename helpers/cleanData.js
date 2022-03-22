
const cleanData = ( data ) =>{
 

    let lines = []
    
   
    
    let datosCsvRow = [];
    let datoCsvRow="";
    for(let i =0 ; i< data.length ; i++ ){
        if(data[i]!=="\n" && data[i]!==","){
            datoCsvRow+=data[i]

        }
        if( data[i]==="," ){
            datosCsvRow.push(datoCsvRow);
            datoCsvRow="";
        }
        
        if(data[i]==="\n" || i===data.length-1){
            datosCsvRow.push(datoCsvRow);
            datoCsvRow="";
            
            

            if ( datosCsvRow.length===4 ){
                lines.push({
                    text: datosCsvRow[1],
                    number:datosCsvRow[2],
                    hex :datosCsvRow[3]
                })
                
            }
            datosCsvRow=[]
            
        }
            

    }
   
    lines.shift();
    if(lines.length>0){
        return {
            valid:true,
            lines,
        };

    }

    return {
        valid:false,
    }
    
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