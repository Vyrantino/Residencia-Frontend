import { Box, Button, Container, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import * as React from 'react' ; 
import { useSelector } from 'react-redux';
import { deletePlantilla, downloadDocumento, getPageCountPlantillas, getPlantilla, getPlantillas, getPlantillasPaginated, uploadDocument } from './apiStepperDocumento';
import Formularios from './formularios';
import Plantillas from '../PlantillasDepartamento/plantillas';

const steps = ['Subir/Elegir Archivo', 'Llenar la Informacion', 'Descargar el Documento'];

export function Paso( props ){
    switch( props.step ){
        case 0:
            return( 
                <Plantillas 
                    handleUploadDocument = { props.handleUploadDocument }
                    formulario = { props.formulario } 
                    plantillas = { props.plantillas }
                    handleDeletePlantilla = { props.handleDeletePlantilla }
                    handleSelectPlantilla = { props.handleSelectPlantilla }
                    page = { props.page }
                    handlePage = { props.handlePage } 
                    pageCount = { props.pageCount }
                /> 
            ) ;
        case 1:
            return( 
                <Formularios
                    formulario = { props.formulario } 
                    handleChangeTextField = { props.handleChangeTextField }
                    valores = { props.valores }
                    setDisabledNextStep = { props.setDisabledNextStep }
                />
            ) ;
        case 2:
            return( 
                <Container sx={{ display: 'flex' , flexDirection: 'column' , alignItems: 'center' }} >
                    <Typography> Antes de Descargar el Documento: </Typography>
                    <Typography> Puede ponerle un nombre </Typography>
                    <Typography> O dejar el campo vacío para un nombre predeterminado </Typography>
                    <TextField 
                        sx={{ margin: 2 , width: '60%' }}
                        variant='filled'
                        label = 'Nombre del Documento'
                        onChange={ (e) => props.handleNombreDocumento( e.target.value ) }
                    />
                    <Button
                        variant='contained'
                        onClick={ props.handleDownload }
                    >
                        Descargar Archivo
                    </Button>
                </Container>
            ) ;

        case 3:
            return( 
                <Container sx={{ display: 'flex' , flexDirection: 'column' , alignItems: 'center' }} >
                    <Typography variant='h4'  >
                        Gracias por usar la aplicación 
                    </Typography>
                    <Typography variant='h4'  >
                        En un momento iniciará la descarga
                    </Typography>
                    <Button
                        variant='contained'
                        onClick={ props.handleReiniciar }
                    >
                        Reiniciar proceso
                    </Button>
                </Container>
            ) ;

    }
}

export default function StepperDocumento(){
    const [ page, setPage ] = React.useState(1) ;
    const [ pageCount, setPageCount ] = React.useState(1) ;
    const [ pageTable , setPageTable ] = React.useState(1) ;
    const [ pageCountTable , setPageCountTable ] = React.useState(1) ;
    const [ plantillas , setPlantillas ] = React.useState([]);
    const [ disabledNextStep , setDisabledNextStep ] = React.useState( false ) ;
    const [ disableBackStep , setDisableBackStep ] = React.useState( false ) ;
    const [ formulario , setFormulario ] = React.useState( [] ) ;
    const [activeStep, setActiveStep] = React.useState(0);
    const [ valores, setValores] = React.useState({});
    const [ fileName , setFileName ] = React.useState('') ;
    const [ nombreDocumento , setNombreDocumento ] = React.useState('') ;
    const userData = useSelector( ( state ) => state.usersSlice.usuario );
    const handleNombreDocumento = ( e ) =>{
        console.log( nombreDocumento ) ;
        setNombreDocumento( e ) ;
    } 

    
    const handleAtras = () =>{
        if( activeStep == 0 ){
            setActiveStep( 0 ) ;
            setDisableBackStep( true ) ;
            setDisabledNextStep( false ) ;
        }
        else{
            setDisabledNextStep( false ) ;
            setActiveStep( activeStep - 1 ) ;
        }
    }

    const handleSiguiente = () =>{
        if( activeStep == 3 ){
            setActiveStep( 3 ) ;
            setDisabledNextStep( true ) ;
        }
        else{
            setDisableBackStep( false ) ;
            setActiveStep( activeStep + 1 ) ;
        }
    }

    const handleUploadDocument = async ( e ) =>{
        const file = e.target.files[0] ;
        setFileName( file.name ) ;
        const response = await uploadDocument( file , userData ) ;
        listaPlantillas() ;
        const nombrePropiedades = Object.keys( response ) ;
        setFormulario( nombrePropiedades ) ;
        setActiveStep( activeStep + 1 ) ;
        setDisabledNextStep( true ) ;
    }

    const handleChangeTextField = (etiqueta, valor) => {
        
        setValores((prevValores) => ({
          ...prevValores,
          [etiqueta]: valor,
        }));
        if( Object.keys( valores ).length < formulario.length ){
            setDisabledNextStep( true ) ;
        }
        else{
            setDisabledNextStep( false ) ;
        }
    };
  
    const handleDownload = async () =>{
        try {
            const documento = {
                idUsuario: userData.idUsuario ,
                NombreUsuario: userData.NombreUsuario , 
                nombreArchivo: fileName, 
                renderData: valores , 
                nombreDocumento: nombreDocumento ? nombreDocumento : ''
            }
            await downloadDocumento( documento ) ;
            setActiveStep( activeStep + 1 ) ;
            setDisabledNextStep( true ) ;
        } catch (error) {
            
        }
    }

    const listaPlantillas = async () =>{
        try {
            //const response = await getPlantillas( userData.idUsuario ) ; 
            const response = await getPlantillasPaginated( 3 , page ) ;
            setPlantillas( response ) ;
        } catch (error) {
            
        }
    }

    const handleDeletePlantilla = async ( plantilla ) => {
        try {
            await deletePlantilla( plantilla ) ;
            listaPlantillas( userData.idUsuario ) ;
        } catch (error) {
            console.error( 'no fue posible iniciar con el borrado de la plantilla ' + error ) ;
        }
    }

    const handleSelectPlantilla = async ( plantilla ) =>{
        try {
            const response = await getPlantilla( plantilla ) ;
            const nombrePropiedades = Object.keys( response ) ;
            setFileName( plantilla.Nombre + '.docx' ) ;
            setFormulario( nombrePropiedades ) ;
            setActiveStep( activeStep + 1 ) ;
            setDisabledNextStep( true ) ;
        } catch (error) {
            console.error( 'No se pudo seleccionar la plantilla ' + error ) ;
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
            const response = await getPageCountPlantillas(  ) ; 
            setPageCount( response ) ;
        } catch (error) {
            
        }
    }

    const handleReiniciar = () =>  setActiveStep(0) ;
    
    React.useEffect(()=>{
        listaPlantillas( ) ;
        obtenerNumeroPaginas() ;
    },[ page ]) ;
    return(
        <Box>
            <Stepper sx={{ marginBottom: 2 }} activeStep={ activeStep } >
            {
                steps.map( ( step ) =>(
                    <Step
                        key={ `step${step}` }
                    > 
                        <StepLabel> { step } </StepLabel>
                    </Step>
                ) )
            }
            </Stepper>

            <Paso 
                step = { activeStep }
                handleUploadDocument = { handleUploadDocument }
                formulario = { formulario }
                handleChangeTextField = { handleChangeTextField }
                valores = { valores }
                handleDownload = { handleDownload }
                setDisabledNextStep = { setDisabledNextStep }
                handleNombreDocumento = { handleNombreDocumento }
                plantillas = { plantillas }
                handleDeletePlantilla = { handleDeletePlantilla }
                handleSelectPlantilla = { handleSelectPlantilla }
                handleReiniciar = { handleReiniciar }
                page = { page }
                handlePage = { handlePage } 
                pageCount = { pageCount }
            />
            <Box marginTop={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
                <Button
                    
                    disabled= { disableBackStep }
                    variant='contained'
                    onClick={ handleAtras }
                > 
                    Atras
                </Button>
                <Button
                     
                    disabled = { disabledNextStep }
                    variant='contained'
                    onClick={ handleSiguiente }
                > 
                    Siguiente 
                </Button>
            </Box>
        </Box>
      
    ) ;
}