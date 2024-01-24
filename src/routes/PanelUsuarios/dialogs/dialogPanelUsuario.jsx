import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react' ; 

export default function DialogPanelUsuario( props ) {
    const handleUsername = ( e ) => props.setUsername( e.target.value ) ;
    const handlePassword = ( e ) => props.setPassword( e.target.value ) ;

    const submitInfo = async () =>{
        await props.updateUsuario() ; 
        props.closeDialog() ; 
    }

    return(
        <>
            <Dialog
                open = { props.showDialog }
                onClose={ props.closeDialog }
            >   
                <DialogTitle align='center'  >
                    <Typography> Modifique al siguiente usuario </Typography> 
                    <Typography> { props.usuario.Username } </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={'center'} spacing={4} >
                        <Grid item xs={ 8 } alignContent={'center'} marginTop={2}  >
                            <TextField onChange={ handleUsername } sx={{ width: '100%'  }} label={ 'Usuario' } defaultValue={ props.usuario.Username} />
                        </Grid>
                        <Grid item xs={ 8 } alignSelf={'center'}  >
                            <TextField onChange={ handlePassword } sx={{ width: '100%'  }} label= { 'Contraseña' } /> 
                        </Grid>
                        <Grid item xs={ 5 }  >
                            <Button onClick={ submitInfo } sx={{ width: '100%'  }} variant='contained' color='success' > Aceptar </ Button>
                        </Grid>
                        <Grid item xs={ 5 }  >
                            <Button onClick={ () => props.closeDialog() } sx={{ width: '100%'  }} variant='contained' color='error' > Cancelar </ Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}