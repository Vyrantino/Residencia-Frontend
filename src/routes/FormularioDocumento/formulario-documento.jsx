import { Button, Container, Grid, IconButton, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material' ;
import * as React from 'react' ; 
import {  newDocumento } from './apiFormularioDocumento';
import { useSelector } from 'react-redux';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormularioDocumentoDepartamentCard from './formularioDocumentoDepartamentCard';
export default function FormularioDocumento(){
    const loadedPlantilla = useSelector( ( state ) => state.plantillasSlice.plantilla ) ;
    const loadedDepartamento = useSelector( ( state ) => state.departamentosSlice.departamento ) ;
    const idUsuario = useSelector( ( state ) => state.usersSlice.idUsuario ) ;
    const [ departamentos , setDepartamentos ] = React.useState([]) ;
    const [ selectedDepartamento , setSelectedDepartamento ] = React.useState([]) ;
    const [ plantillas , setPlantillas ] = React.useState([]) ;
    const [ selectedPlantilla , setSelectedPlantilla ] = React.useState([]) ;
    const [ datosFaltantes , setDatosFaltantes ] = React.useState([]) ;
    const [ selectedDatoFaltante , setSelectedDatoFaltante ] = React.useState([]) ;
    const [ showDialog , setShowDialog ] = React.useState(false) ;
    const [ showDownloadButton , setShowDownloadButton ] = React.useState(false) ;

    const handleSelectDepartamento =  ( departamento ) => {
        setSelectedDepartamento( departamento ) ;
        setSelectedPlantilla([]) ;
        setSelectedDatoFaltante([]) ;
        setDatosFaltantes([]) ;
        setShowDownloadButton( false ) ;
    }
    const handleSelectPlantilla =  ( plantilla ) => {
        setSelectedPlantilla( plantilla ) ;
    }
    const handleSelectDatoFaltante = ( datoFaltante ) => {
        try {
            setSelectedDatoFaltante( datoFaltante ) ;
            setShowDialog( true );
        } catch (error) {
            console.error( error ) ;
        }
    }
    const handleDownload = async () =>{
        try {
            const documento = {
                idPlantilla: selectedPlantilla.idPlantilla , 
                Nombre: selectedPlantilla.Nombre, 
                idUsuario: idUsuario 
            }
            const response = await newDocumento( documento ) ;
            setShowDownloadButton( false ) ;
        } catch (error) {
            console.error( error ) ;
        }
    }
    const closeDialog = () => setShowDialog( false ) ;

    const listaDatosFaltantes = async () =>{
        try {
            const response = await getNeededData( selectedPlantilla.idPlantilla , idUsuario ) ;
            setDatosFaltantes( response ) ;
            if( response.length == 0 )
                setShowDownloadButton( true ) ;
        } catch (error) {
            console.error( error ) ;
        }
    }

    const listaDepartamentos = async () =>{
        try {
            const response = await getDepartamentos() ;
            setDepartamentos( response ) ;
        } catch (error) {
            console.error( error ) ;
        }
    }

    const loadDepartamento = async() =>{
        try {
            const response = await getDepartamento( loadedDepartamento.idDepartamento ) ;
            console.log( response ) ;
            setDepartamentos( response ) ;
        } catch (error) {
            console.error( error ) ;
        }
    }

    return (
        <Container>
            {
                loadedDepartamento.length != 0 ? 
                <Button
                    hidden
                    onClick={() => handleSelectDepartamento( loadedDepartamento ) }
                >
                        <FormularioDocumentoDepartamentCard 
                            Nombre = { loadedDepartamento.Nombre }
                        />
                </Button>
                :
                <Grid container >
                    <Typography variant='h2' > Lista de Departamentos </Typography>
                {
                    departamentos.map( ( departamento ) => (
                        <Grid 
                            key={'departamento' + departamento.idDepartamento}
                            component={Paper} 
                            item xs={5} md={ 4 } 
                            xl = { 3 } 
                            width={10}
                        > 
                            <Button
                                hidden
                                onClick={() => handleSelectDepartamento( departamento ) }
                            >
                                <FormularioDocumentoDepartamentCard 
                                    Nombre = { departamento.Nombre }
                                />
                            </Button>
                        </ Grid>
                    ) )
                }
                </Grid>
            }
            <Typography variant='h2' > Lista de Plantillas </Typography>
            {
                loadedPlantilla.length != 0 ?
                <Button
                    hidden
                    onClick={() => handleSelectPlantilla( loadedPlantilla ) }
                >
                    <FormularioDocumentoDepartamentCard 
                        Nombre = { loadedPlantilla.plantilla_Nombre }
                    />
                </Button>
                :
                plantillas &&
                <Grid container >
                {
                    plantillas.map( ( plantilla ) => (
                        <Grid 
                            key={ 'plantilla' + plantilla.idPlantilla}
                            component={Paper} 
                            item xs={5} md={ 4 } 
                            xl = { 3 } 
                            width={10}
                        > 
                            <Button
                                hidden
                                onClick={ () => handleSelectPlantilla( plantilla ) }
                            >
                                <FormularioDocumentoDepartamentCard 
                                    Nombre = { plantilla.Nombre }
                                />
                            </Button>
                        </ Grid>
                    ) )
                }
                </Grid>
            }
            <Typography variant='h2' > Lista de Datos Faltantes </Typography>
            {
                datosFaltantes && datosFaltantes.length > 0 ?
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell> <Typography variant='h5' > Nombre del Dato  </Typography> </TableCell>
                            <TableCell> <Typography variant='h5' > Ingresar el Dato  </Typography> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            datosFaltantes.map( ( datoFaltante ) => (
                                <TableRow>
                                    <TableCell> <Typography variant='h6' > { datoFaltante.Datos_Nombre } </Typography> </TableCell>
                                    <TableCell> 
                                        <IconButton 
                                            onClick={ () => handleSelectDatoFaltante( datoFaltante ) } 
                                        >  
                                            <ArrowUpwardIcon /> 
                                        </IconButton> 
                                    </TableCell>
                                </TableRow>
                            ) )
                        }
                    </TableBody>
                </TableContainer>
                :
                showDownloadButton &&
                <Button 
                    variant='contained' 
                    color='warning' 
                    onClick={ handleDownload }
                > 
                    Descarga Lista 
                </Button>
                
            }
            <DialogFormularioDocumento 
                showDialog = { showDialog }
                idDato = { selectedDatoFaltante.DatosPlantilla_idDato }
                usuario = { idUsuario }
                listaDatosFaltante = { listaDatosFaltantes }
                closeDialog = { closeDialog }
                NombreDato = { selectedDatoFaltante.Datos_Nombre }
            />
        </Container>
    );
}