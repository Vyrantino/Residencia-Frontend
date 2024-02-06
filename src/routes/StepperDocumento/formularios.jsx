import { Button, Container, TextField , Grid  } from '@mui/material';
import * as React from 'react' ; 

export default function Formularios( props ){
    
    return(
        <Grid container  >
            {
            props.formulario.map( ( nombre ) => (
                <Grid
                    key={ `Grid ${nombre}` }
                    item 
                    xs={12}
                > 
                    <TextField
                        size='medium'
                        multiline ={ true }
                        label = { nombre }
                        key={`TextField ${nombre}`}
                        fullWidth
                        variant="filled"
                        color="primary"
                        onChange={ (e) => props.handleChangeTextField(nombre, e.target.value)}
                    >
                        {  nombre  }
                    </ TextField>
                </ Grid>
            ) )
            }
        </Grid>
    ) ;
}