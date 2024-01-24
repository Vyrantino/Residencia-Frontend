/**
 * Desplegara una lista de plantillas correspondientes al departamento
 * Solo servira para seleccionar una plantilla, nada mas
 */
import axios from 'axios' ; 

const apiUrlDepartamentos = import.meta.env.VITE_API_URL + "departamentos/"; 
const apiUrlPlantillas = import.meta.env.VITE_API_URL + "plantillas/"; 

export const getDepartamentos = async (  ) =>{ //Obtiene la lista de departamentos
   try{
        const response  = await axios.get( apiUrlDepartamentos ) ; 
        const allDepartamentos = response.data ; 
        return allDepartamentos ;     
   }
   catch( error ){
        console.error( 'Error al obtener los departamentos:' , error ) ; 
        return null ; 
   }
}

export const getDepartamento = async ( idDepartamento ) => { //Selecciona un departamento de la lista
    try{
        const response = await axios.get( apiUrl + idDepartamento ) ; 
        const departamento = response.data ; 
        return departamento ;    
    }
    catch( error ){
        console.error( 'Error al obtener el departamento' , error ) ;
        return null ; 
    }
}

