import axios from 'axios' ; 

const apiUrlAdministradores = import.meta.env.VITE_API_URL + "administradores/" ; 
const apiUrlUsuarios = import.meta.env.VITE_API_URL + "usuarios/" ; 

export const getUsuarios = async(  ) =>{//Obtiene la lista de usuarios 
    try{
        const response = await axios.get( apiUrlUsuarios + 'master' ) ;
        const usuarios = response.data ; 
        return usuarios ; 
    }
    catch( error ){
        console.error( 'No fue posible cargar la lista de usuarios ' + error ) ;
        return null ;
    }
}

export const deleteAdministrador = async ( administrador ) =>{
    try {
        const confirmDelete = confirm( 'Esta seguro de revocar derecho de administrador? ' );
        if( confirmDelete ){
            await axios.post( apiUrlAdministradores + 'eliminar-admin', {
                idAdministrador: administrador.idAdministrador ,
                idUsuario: administrador.idUsuario
            } ) ;
        }
        else{
            console.log( 'No se pudo borrar al administrador' ) ;
            return null ; 
        }

    } catch (error) {
        console.error( error );
    }
}

