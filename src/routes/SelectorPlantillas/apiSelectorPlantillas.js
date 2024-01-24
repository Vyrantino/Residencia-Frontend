/**
 * En el selector solo se hara eso.. seleccionar la plantilla
 * Mostrarlas y... ya? 
 */
import axios from 'axios' ; 
require( 'dotenv' ).config() ;

const apiUrlPlantillas = process.env.REACT_APP_API_URL + 'plantillas' ; 

export const getPlantillas = async ( idDepartamento ) =>{
    try{
        const response = await axios.get( apiUrlPlantillas + idDepartamento ) ;
        const plantillas =  response.data ; 
        return plantillas ; 
    }
    catch( error ){
        console.error( 'No se pudo conseguir la lista de plantillas ' + error ) ;
        return null ; 
    }
}

