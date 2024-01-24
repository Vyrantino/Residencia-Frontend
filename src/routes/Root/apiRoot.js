import axios from 'axios' ; 
require( 'dotenv' ).config() ;

const apiUrlUsuario = process.env.REACT_APP_API_URL + 'usuarios' ; 

export const getUsuario = async ( idUsuario ) =>{
    try{
        const response = await axios.get( apiUrlUsuario + idUsuario ) ;
        const usuario = response.data ; 
        return usuario ; 
    }
    catch( error ){
        console.error( 'No fue posible cargar al Usuario ' + error ) ; 
        return null ; 
    }
}