import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react' ;

export default function DialogFormularioDatos( props ){
    const handleContenido = ( e ) => props.setContenido( e.target.value ) ;
    return(
        <>
            <Dialog
                open = { props.showDialog }
                onClose={ props.closeDialog }
            >
                <DialogTitle sx={ { textAlign: 'center' } } > 
                    <Typography> Introduzca el nuevo Dato: </Typography> 
                    <Typography> { props.dato.datos_Nombre } </Typography> 
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={'center'} spacing={3} >
                        <Grid item xs={12} marginTop={2} > <TextField sx={{ width: '100%'  }} label='Contenido' onChange={ handleContenido } /> </Grid>
                        <Grid item xs={ 5 } > <Button sx={{ width: '100%'  }} onClick={ props.submitDato } variant='contained' color='success' > Aceptar </Button> </Grid>
                        <Grid item xs={ 5 }> <Button sx={{ width: '100%'  }} onClick={  props.closeDialog } variant='contained' color='error' > Cancelar </Button> </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}