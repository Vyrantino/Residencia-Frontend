//Ventana exclusiva para ingresar a la aplicacion
import axios  from "axios" ;

const apiUrlLogin = import.meta.env.VITE_API_URL + "usuarios" ;



export const userLogin = async( usuario ) =>{
    try{
        const response = await axios.post( apiUrlLogin + '/login' , {
            Contraseña: usuario.Contraseña , 
            NombreUsuario: usuario.NombreUsuario , 
        } );
        const userData = response.data ; 
        return userData ; 
    }
    catch( error ){
        console.error( 'No se pudo conectar con el servidor ' + error ) ;
    }
}



