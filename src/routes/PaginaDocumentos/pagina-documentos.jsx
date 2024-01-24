import { 
    Container, 
    IconButton, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography ,
    Paper,
    Stack, 
    Pagination
} from '@mui/material';
import * as React from 'react' ; 
import { useSelector } from 'react-redux';
import { deleteDocumento, descargarDocumento, getDocumentos, getPageCount, getPaginatedDocumentos } from './apiPaginaDocumentos';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
export default function PaginaDocumentos(){
    const [ page, setPage ] = React.useState(1) ;
    const [ pageCount, setPageCount ] = React.useState(1) ;
    const usuario = useSelector( ( state ) => state.usersSlice.usuario );
    const [ documentos , setDocumentos ] = React.useState([]) ;
    const listaDocumentos = async () =>{
        try{
            const response = await getPaginatedDocumentos( usuario.idUsuario , 3 , page ) ;
            setDocumentos( response ) ;
        }
        catch( error ){
            console.error( error )  ;
        }
    }

    const handleDownload = async ( documento ) =>{
        try{
            const response = await descargarDocumento( documento ) ;
        }
        catch( error ) {
            console.error( error ) ;
        }
    }

    const handleDelete = async( idDocumento ) =>{
        try {
            await deleteDocumento( idDocumento ) ;
            listaDocumentos() ;
        } catch (error) {
            console.error( error );
        }
    }

    const handlePage = async ( event, newPage ) =>{
        try {
            setPage( newPage ) ;
        } catch (error) {
            
        }
    }

    const obtenerNumeroPaginas = async (  ) =>{
        try {
            const response = await getPageCount( usuario.idUsuario ) ; 
            setPageCount( response ) ;
        } catch (error) {
            
        }
    }

    React.useEffect(() =>{
        listaDocumentos() ;
        obtenerNumeroPaginas() ;
    },[ page ]);
    return(
        <Container sx={{ display: 'flex' , flexDirection: 'column' , alignItems: 'center' }} >
            <Typography variant='h4'  > Mis Documentos </Typography>
            <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: '#fbe9e7' }} >
                <Table size='medium' > 
                    <TableHead sx={{ backgroundColor: '#590d0d' }} >
                        <TableRow>
                        <TableCell  > <Typography variant='h6' color={'lightgrey'}  > Nombre </Typography> </TableCell>
                        <TableCell  > 
                            <Typography variant='h6' color={'lightgrey'}  > Creado el: </Typography> 
                        </TableCell>
                        <TableCell align='center' > <Typography variant='h6' color={'lightgrey'}  > Descargar </Typography> </TableCell>
                        <TableCell align='center' > <Typography variant='h6' color={'lightgrey'}  > Eliminar </Typography> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            documentos.map( ( documento ) => (
                                <TableRow
                                    key={ 'rowDocumento' + documento.idDocumento }
                                >
                                    <TableCell> { documento.Nombre } </TableCell>
                                    <TableCell> { new Date(documento.FechaModificacion).toLocaleDateString('es-ES') } </TableCell>
                                    <TableCell align='center' > 
                                        <IconButton onClick={ () => handleDownload( documento ) } > <SaveIcon /> </IconButton> 
                                    </TableCell>
                                    <TableCell align='center' > 
                                        <IconButton 
                                            onClick={ () => handleDelete( documento.idDocumento ) } 
                                        > 
                                            <DeleteIcon /> 
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack alignItems={'center'} spacing={2}  >
                <Pagination 
                    page={ page } 
                    onChange={ handlePage }
                    count={ pageCount }
                    color="secondary" 
                />
            </Stack>
        </Container>
    );
}