
import axios from 'axios' ; 
import * as jsFileDownload from 'js-file-download' ;

const apiUrlUsuarios = import.meta.env.VITE_API_URL + 'usuarios' ;
const apiUrlPlantillas = import.meta.env.VITE_API_URL + 'plantillas/' ;
const apiUrlDocumentos = import.meta.env.VITE_API_URL + 'documentos/' ;


export const uploadDocument = async( file , userData ) =>{
    try {
        const fd = new FormData() ;
        console.log( userData.NombreUsuario ) ;
        fd.append( 'usuario' , userData.NombreUsuario  ) ;
        fd.append( 'idUsuario' , userData.idUsuario  ) ;
        fd.append( 'documento' , file , file.name ) ;
        const response = await axios.post( apiUrlDocumentos + 'upload' , fd   ) ;
        return response.data ; 
    } catch (error) {
        console.error( error ) ;
    }
}

export const downloadDocumento = async ( documento ) =>{//Crea un nuevo documento
    try{
        const file = await axios.post( apiUrlDocumentos + 'download' , {
            idUsuario: documento.idUsuario , 
            NombreUsuario: documento.NombreUsuario,
            nombreArchivo: documento.nombreArchivo, 
            renderData: documento.renderData , 
            nombreDocumento: documento.nombreDocumento ? documento.nombreDocumento : documento.nombreArchivo
        },  
        { responseType: 'blob' , }    
        ) ;
        const splitFileName = documento.nombreArchivo.split( '.' ) ;
        const fileName = documento.nombreDocumento ? documento.nombreDocumento : splitFileName[0] ;
        const download = jsFileDownload( file.data , `${ fileName }.docx` ) ; 
        return download ; 
    }
    catch( error ){
        console.error( 'No fue posible generar el documento ' + error ) ;
    }
}

export const getPlantillas = async ( idUsuario ) => {
    try {
        //const response = await axios.get( apiUrlPlantillas + 'idUsuario/' + idUsuario ) ;
        const response = await axios.get( apiUrlPlantillas ) ;
        const plantillas = response.data ; 
        return plantillas ; 
    } catch (error) {
        
    }
} 

export const getPlantillasPaginated = async ( limit , page ) => {
    try {
        //const response = await axios.get( apiUrlPlantillas + 'idUsuario/' + idUsuario ) ;
        const response = await axios.get( apiUrlPlantillas + `paginated?limit=${limit}&&page=${page}` ) ;
        const plantillas = response.data.items ; 
        return plantillas ; 
    } catch (error) {
        
    }
} 

export const getPlantilla = async ( selectedPlantilla ) => {
    try {
        const response = await axios.get( apiUrlPlantillas  + selectedPlantilla.idPlantilla ) ;
        const plantilla = response.data ; 
        return plantilla ; 
    } catch (error) {
        
    }
} 

export const deletePlantilla = async ( plantilla ) =>{
    try {
        if( confirm( 'Desea borrar la siguiente plantilla? ' + plantilla.Nombre ) ){
            await axios.delete( apiUrlPlantillas + plantilla.idPlantilla ) ;
            alert( 'se ha borrado la plantilla exitosamente' ) ;
        }
    } catch (error) {
        console.error( 'no se pudo borrar la plantilla ' + error ) ;
    }
}

export const getPaginatedPlantillas = async(  limit , page ) => {
    try{
        const response = await axios.get( apiUrlPlantillas + `paginated?limit=${limit}&&page=${page}` ) ;
        const plantillas = response.data.items ; 
        return plantillas ;  
    }
    catch( error ){
        console.error( 'No fue posible conseguir la lista de Documentos ' + error ) ;
        return null ; 
    }
}

export const getPageCountPlantillas = async(  ) =>{
    try {
        const response = await axios.get( apiUrlPlantillas + 'pagecount/'  ) ;
        const pageCount = response.data ;
        return pageCount ; 
    } catch (error) {
        
    }
}
  