import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react' ;

export default function DialogDatos( props ){
    const handleInput = ( e ) => props.setDialogInput( e.target.value ) ;
    const submitInfo = async () =>{
        await props.updateDato() ; 
        props.closeDialog() ; 
    }
    return(
        <>
            <Dialog open= { props.open } onClose={ props.closeDialog } >
                <DialogTitle textAlign={'center'} >
                    <Typography variant='h5' > Esta seguro de cambiar el siguiente dato? </Typography>
                    <Typography> { props.dato.Nombre }  </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} justifyContent={'center'} >
                        <Grid item xs={12}> 
                            <TextField 
                                sx={{ width: '100%' , marginTop: 1 }} 
                                onChange={ handleInput } 
                                label={'Contenido'}
                            > 
                                Introduzca su dato 
                            </TextField> 
                        </Grid>
                        <Grid item xs={5} > 
                            <Button
                                sx={{ width: '100%' }}
                                variant='contained'
                                onClick={ submitInfo }
                                color='success'
                            >
                                Aceptar cambios
                            </Button>    
                        </Grid>
                        <Grid item xs={5} > 
                            <Button
                                color='error'
                                sx={{ width: '100%' }}
                                variant='contained'
                                onClick={ props.closeDialog }
                            >
                                Cancelar
                            </Button>    
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    ) ;
}