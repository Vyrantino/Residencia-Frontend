/**
 * Isn't it obvious?
 */
import axios from 'axios' ; 

const apiUrlUsuarios = import.meta.env.VITE_API_URL + 'usuarios' ;
const apiUrlDepartamentos = import.meta.env.VITE_API_URL + 'departamentos' ;

export const newUsuario = async( usuario ) =>{
    try{
        console.log( usuario ) ;
        await axios.post( apiUrlUsuarios + "/register" , {
            NombreUsuario: usuario.NombreUsuario , 
            Rol: usuario.Rol , 
            Contraseña: usuario.Contraseña 
        } ) ;
    }
    catch( error ){
        console.error( 'No fue posible registrar al usuario ' + error ) ;
    }
}

export const getDepartamentos = async() =>{
    try {
        const response =  await axios.get( apiUrlDepartamentos ) ;
        const departamentos = response.data ; 
        return departamentos ; 
    } catch (error) {
        
    }
}
