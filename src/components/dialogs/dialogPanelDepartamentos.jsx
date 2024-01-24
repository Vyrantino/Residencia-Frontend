import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import * as React from 'react' ; 

export default function DialogDepartamentos( props ){
    const handleNombre = ( e ) => props.setNombre( e.target.value ) ;
    const submitInfo = async () =>{
        await props.handleUpdateDepartamento() ;
        props.closeDialog() ;
    }
    return(
        <>
            <Dialog open = { props.showDialog } onClose={ props.CloseDialog } >
                <DialogTitle> Cambie el nombre del siguiente Departamento </DialogTitle> 
                <DialogContent>
                    <Grid container justifyContent={'center'} spacing={2}  >
                        <Grid item xs={ 12 } marginTop={2} > 
                            <TextField 
                                label='Nombre' 
                                defaultValue={ props.departamento.Nombre }
                                onChange={ handleNombre } 
                                sx={{ width: '100%' }}
                            /> 
                        </Grid>
                        <Grid item xs={ 5 } > 
                            <Button  sx={{ width: '100%' }} onClick={ submitInfo } variant='contained' color='success' > Aceptar </Button> 
                        </Grid>
                        <Grid item xs={ 5 } > 
                            <Button  sx={{ width: '100%' }} onClick={ props.closeDialog } variant='contained' color='error' > Cancelar </Button> 
                        </Grid>
                    </Grid>
                </DialogContent>   
            </Dialog>
        </>
    ) ;
}