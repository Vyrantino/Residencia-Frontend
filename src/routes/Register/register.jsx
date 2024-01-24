import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getDepartamentos, newUsuario } from "./apiRegister";
import NewUserDto from "./dto/newUser.dto";
import * as React from 'react' ; 
import { Navigate, redirect } from 'react-router-dom' ; 
import { useDispatch } from "react-redux";
import { actionLogOut } from "../../redux/usuarios/userSlice";

export default function Register( props ){
    const dispatch = useDispatch( ) ;
    const [ Selected , setSelected ] = React.useState( '' ) ; 
    const [ Username , setUsername ] = React.useState( '' ) ; 
    const [ Password , setPassword ] = React.useState( '' ) ; 
    const [ Departamentos , setDepartamentos ] = React.useState([]) ;
    const [ ConfirmPassword , setConfirmPassword ] = React.useState( '' ) ; 
    const handleUsername = ( e ) => setUsername( e.target.value );
    const handlePassword = ( e ) => setPassword( e.target.value );
    const handleConfirmPassword = ( e ) => setConfirmPassword( e.target.value );
    const handleRegister = async (  )  => {
       try{
         if( Password === ConfirmPassword ){
            const user = new NewUserDto({
               NombreUsuario: Username,
               Contraseña: Password  ,
               Rol: 'Usuario'
            }); 
            const registerUser = await newUsuario( user ) ;
            alert( 'el usuario ha sido creado satisfactoriamente' ) ;
            dispatch( actionLogOut() ) ;
         }
         else{
            alert( 'Las contrasenas no coinciden' ) ;
         }
       }
       catch( error ){
         console.error( error ) ;
       }
       
      
    }

    const handleChange = ( e ) =>{
      e.preventDefault() ;
      try {
          setSelected( e.target.value ) ;
      } catch (error) {
          console.error( error );
      }
    }

        return(
            <Container 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'center' ,
                    m: 10 ,
                    flexDirection: 'column'
                }} 
            >
                 <TextField
                    sx={{ margin: 3 }}
                    id="filled-basic-Username"
                    label="Nombre de Usuario"
                    inputMode="none"
                    onChange={ handleUsername }
                 />
                 <TextField
                    sx={{ margin: 3 }}
                    id="filled-basic-Password"
                    label="Contraseña"
                    type="password"
                    onChange={ handlePassword }
                 />
                 <TextField
                    sx={{ margin: 3 }}
                    id="filled-basic-ConfirmPassword"
                    label="Confirmar Contraseña"
                    type="password"
                    onChange={ handleConfirmPassword }
                 />
    
                 <Button 
                    onClick={ handleRegister }
                    variant="contained"
                 >
                    Registrar Cuenta
                 </Button>
            </Container>
        );
}