import { 
    Dialog,
    Box, 
    Button, 
    Card, 
    CardContent, 
    CardHeader, 
    CardMedia, 
    Container, 
    Grid, Typography, 
    colors } from "@mui/material";
import * as React from 'react' ;
import {  useSelector } from "react-redux";
import imagen1 from '../../assets/Imagen1.png' ;
import imagen2 from '../../assets/Imagen2.png' ;
export default function Homepage(){
    const role = useSelector( ( state ) => state.usersSlice.Role );
    const [ plantillas , setPlantillas ] = React.useState([]) ;
    const [ showImage1 , setShowImage1 ] = React.useState( false ) ;
    const [ showImage2 , setShowImage2 ] = React.useState( false ) ;
    const handleShowImage1 = () => {
        setShowImage1( !showImage1 ) ; 
    }
    const handleShowImage2 = () => {
        setShowImage2( !showImage2 ) ; 
    }
    React.useEffect( ()=>{
     
    },[] );
    return(
        <Grid container spacing={1} sx={ {  justifyContent: 'center' }  }>
            <Typography> Antes de usar la herramienta, porfavor realice los siguientes cambios dentro de su documento </Typography>
            <Grid
                item sm = {12} md={5}
            >
                <Card>
                    <CardContent sx={{ textAlign: 'center' }} > <Typography> Cambie Esto </Typography> </CardContent>
                    <Button
                       sx={{  p: 0 }}
                       hidden = { true }  
                       onClick={ handleShowImage1 }
                    >
                        <CardMedia 
                            component="img"
                            sx={{ objectFit: true }}
                            src={ imagen1 }
                        />
                    </Button>
                </Card>
            </Grid>
            <Grid
                item sm = {12} md={5} 
            >
                <Card>
                    <CardContent sx={{ textAlign: 'center' }} > <Typography> Por Esto </Typography> </CardContent>
                    <Button
                       sx={{  p: 0 }}
                       hidden = { true }  
                       onClick={ handleShowImage2 }
                    >
                        <CardMedia 
                            sx={{ objectFit: true }}
                            component="img"
                            src={ imagen2 }
                        />
                    </ Button>
                </Card>
            </Grid>
            <Grid
                item sm = {12} md={5}
            >
               <Typography> Lo encerrado en {'{ }'} se llama Etiqueta  </Typography>
               <Typography> Intente escribir sus "Etiquetas" con la mejor descripción posible  </Typography>
               <Typography> De ese modo evitará confundirse a la hora de registrar los datos  </Typography>
            </Grid>
            <Dialog 
                open = { showImage1 }
                onClose={ handleShowImage1 }
                onClick={ handleShowImage1 }
            >
                <img  src= { imagen1 } />
            </ Dialog >
            <Dialog 
                open = { showImage2 }
                onClose={ handleShowImage2 }
                onClick={ handleShowImage2 }
            >
                <img  src= { imagen2 } />
            </ Dialog >
        </Grid >
    );
}