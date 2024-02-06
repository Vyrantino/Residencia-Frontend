import {  
    Button, 
    TextField , 
    Grid ,
    Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../redux/usuarios/userSlice";
import * as React from 'react' ; 
import {  userLogin } from "./apiLogin";
import itdLogo from '../../assets/itd.png' ; 

export default function Login(){
    const [ Username , setUsername ] = React.useState( '' ) ; 
    const [ Password , setPassword ] = React.useState( '' ) ; 
    const dispatch = useDispatch() ;
    const handleUsername = ( e ) => setUsername( e.target.value );
    const handlePassword = ( e ) => setPassword( e.target.value );
    const handleLogin = async (  )  => {
       try {
        const user = {
            NombreUsuario: Username , 
            Contraseña: Password 
        };
        const loginUser = await userLogin( user ) ;
        if( loginUser ) 
            dispatch( actionLogin( loginUser ) ) ;
       } catch (error) {
            console.error( 'La informacion ingresada es incorrecta ' + error ) ;
       }
    }
    const keyPress = ( e ) =>{
        if( e.keyCode == 13 ){
            handleLogin([]) ;
        }
    }
    
    

        return(
            <Grid
                display="flex"
                flexDirection={'column'}
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                    <Typography variant="h5" > 
                        Sistema de control y gestión para la generación de oficios 
                    </Typography>
                    <img height={'200'}  src={ itdLogo } />
                    <TextField
                        sx={{ margin: 3 }}
                        id="filled-basic-Email"
                        label="Nombre de Usuario"
                        onChange={ handleUsername }
                    />
                    <TextField
                        sx={{ margin: 3 }}
                        id="filled-basic-Password"
                        label="Contraseña"
                        type="password"
                        onChange={ handlePassword }
                        onKeyDown={ keyPress }
                    />
                    <Button 
                        variant="contained"
                        onClick={ handleLogin }
                        sx={{ alignContent: 'center' }}
                    >
                        Ingresar
                    </Button>
            </ Grid >
        );
}
