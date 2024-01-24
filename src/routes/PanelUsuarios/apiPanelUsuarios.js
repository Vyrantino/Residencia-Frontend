/**
 * Esta ventana es para el de la cuenta maestro...
 * Aqui se va a poder editar a todos los usuarios sin algun tipo
 * de restriccion
 * Ya que se supone que quien estara por aqui sabra lo que hace... verdad? 
 * El CRUD de usuarios y...ya
 */
import axios from 'axios' ; 

const apiUrlUsuarios = import.meta.env.VITE_API_URL + 'usuarios' ;

export const getUsuarios = async () =>{
    try{
        const response = await axios.get( apiUrlUsuarios + '/master' ) ;
        const usuarios = response.data ; 
        return usuarios ; 
    }
    catch( error ){
        console.error( 'No fue posible cargar la lista de usuarios ' + error ) ;
        return null ;
    }
}

export const deleteUsuario = async( idUsuario ) =>{
    try{
        await axios.delete( apiUrlUsuarios + '/' + idUsuario ) ;
        alert( "Usuario Eliminado Exitosamente" ) ;
    }
    catch( error ){
        console.error( "No fue posible Eliminar al Usuario " + error );
        return null ;
    }
}

export const updateUsuario = async ( usuario , updatedUsuario ) =>{
    try{
        await axios.patch( apiUrlUsuarios + '/' + usuario.idUsuario , {
            NombreUsuario: updatedUsuario.NombreUsuario ,
            //Role: usuario.Role , //No Creo que sea recomendable usar el tema de los roles aqui
            //Creo que es mejor dejar esa logica a las secciones correspondientes... aunque eso signifique 
            //hacer que el usuario tenga que ir a otras partes para hacer cada cosa
            Contraseña: updatedUsuario.Contraseña
        } ) ;
        alert( "Usuario modificado Exitosamente" ) ;
    }
    catch( error ){
        console.error( "No fue posible modificar al departamento " + error );
        return null ;
    }
}

export const newUsuario = async ( usuario ) =>{
    try{
        await axios.post( apiUrlUsuarios , {
            Username: usuario.Username , 
            Email: usuario.Email ,
            Password: usuario.Password
        } ) ;
        alert( 'Usuario agregado correctamente' ) ;
    }
    catch( error ){
        console.error( 'No fue posible agregar al usuario ' + error ) ;
    }
}