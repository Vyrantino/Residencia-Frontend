/**
 * Este formulario debe recopilar la siguiente informacion:
 * Debe de saber en que departamento se quiere generar el documento
 * Y sobre que plantilla de dicho departamento
 * Tambien, antes de generar el documento, debe de preguntarle al usuario
 * Los datos que le faltan, para que los llene ahi mismo y
 * Consecuentemente generar el documento y descargarlo en la computadora del usuario
 * Por lo que se necesita una lista de Deptos y de sus plantillas
 * Una lista de datos que le faltan al usuario
 */
import axios from 'axios' ; 
import * as jsFileDownload from 'js-file-download' ;

 
const apiUrlPlantillas =  import.meta.env.VITE_API_URL + "plantillas/";  
const apiUrlDocumentos =  import.meta.env.VITE_API_URL + "documentos/" ; 


// export const getPlantillas = async ( idDepartamento ) =>{//Carga la lista de plantillas en funcion al departamento que se ha elegido
//     try{
//         const response = await axios.get( apiUrlPlantillas + 'idDepartamento/' + idDepartamento ) ;
//         const plantillas = response.data ; 
//         return plantillas ; 
//     }
//     catch( error ){
//         console.error( 'No fue posible conseguir la lista de plantillas del departamento ' + error ) ; 
//         return null ; 
//     }
// }



export const newDocumento = async ( documento ) =>{//Crea un nuevo documento
    try{
        const file = await axios.post( apiUrlDocumentos , {
                Nombre: documento.Nombre , 
                idPlantilla: documento.idPlantilla ,
                idUsuario: documento.idUsuario
        },  
        { responseType: 'blob' , }    
        ) ;
        const download = jsFileDownload( file.data , `${ documento.Nombre }.docx` ) ; 
        return download ; 
    }
    catch( error ){
        console.error( 'No fue posible generar el documento ' + error ) ;
    }
}


export const getPlantilla = async ( idPlantilla ) =>{
    try {
        const response = await axios.get( apiUrlPlantillas + idPlantilla ) ;
        const plantilla = response.data ; 
        return plantilla ; 
    } catch (error) {
        console.error( error ) ;
    }
}


