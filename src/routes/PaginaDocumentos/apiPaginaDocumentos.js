/*
    Esta ventana es para mostrar los documentos que ya se han realizado
    Los muestra en una lista ordenada primeramente por la fecha de elaboracion
    Se puede editar el nombre del documento
    Se puede descargar el documento de nuevo
*/
import axios from 'axios' ; 
import * as jsFileDownload from 'js-file-download' ;
const apiUrlDocumentos = import.meta.env.VITE_API_URL + 'documentos' ; 


export const getDocumentos = async( idUsuario ) => {//Se obtiene la lista de documentos
    try{
        const response = await axios.get( apiUrlDocumentos + '/idUsuario/' + idUsuario ) ;
        const documentos = response.data ; 
        return documentos ;  
    }
    catch( error ){
        console.error( 'No fue posible conseguir la lista de Documentos ' + error ) ;
        return null ; 
    }
}

export const getPaginatedDocumentos = async( idUsuario , limit , page ) => {//Se obtiene la lista de documentos
    try{
        const response = await axios.get( apiUrlDocumentos + '/idUsuario/' + idUsuario + `?limit=${limit}&&page=${page}` ) ;
        const documentos = response.data.items ; 
        return documentos ;  
    }
    catch( error ){
        console.error( 'No fue posible conseguir la lista de Documentos ' + error ) ;
        return null ; 
    }
}

export const descargarDocumento = async( documento ) =>{//Se puede descargar un documento
    try{
        const response = await axios.get( apiUrlDocumentos + '/' + documento.idDocumento  , 
            {
                responseType: 'blob',
            }
        ) ;
        const split = documento.Nombre.split('.') ;
        const fileName = split[0] ;
        const file = jsFileDownload( response.data , `${ fileName }.docx` ) ; 
        return file ; 
    }
    catch( error ){
        console.log( 'No se pudo generar el documento ' + error );
        return null ; 
    }
}

export const updateDocumento = async( documento ) =>{
    try{
        await axios.patch( apiUrlDocumentos + documento.idDocumento , {
            Nombre: documento.Nombre 
        } ) ;
    }
    catch( error ){
        console.log( 'No se pudo actualizar el documento ' + error );
        return null ; 
    }
}

export const deleteDocumento = async( idDocumento ) =>{
    try {
        const confirmDelete = confirm( 'Desea Eliminar el documento de la lista?' ) ;
        if( confirmDelete )
            await axios.delete( apiUrlDocumentos + '/' + idDocumento ) ;
    } catch (error) {
        console.log( 'No se pudo borrar el documento ' + error );
        return null ; 
    }
}

export const getPageCount = async( idUsuario ) =>{
    try {
        const response = await axios.get( apiUrlDocumentos + '/pagecount/' + idUsuario ) ;
        const pageCount = response.data ;
        return pageCount ; 
    } catch (error) {
        
    }
}
  