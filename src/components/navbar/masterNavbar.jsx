import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogOut } from '../../redux/usuarios/userSlice';




export default function MasterNavbar() {
  const [theme, setTheme] = React.useState('light');
  const [checked, setChecked] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const usuario = useSelector( ( state ) => state.usersSlice.Role ) ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  const links = [
    {
      name:  usuario ,
      NavLink: "/panel-control",
      varant:"h5"
    },
    {
      name: "Panel de Usuarios",
      NavLink: "panel-usuarios",
      varant:"h5"
    },
    {
      name: "Crear Documento",
      NavLink: "stepper-documento",
      varant:"h5"
    },
  ] ;
  
  const handleChange = (event) => {
    setChecked(event.target.checked) ; 
    if( theme == 'light' )
      setTheme('dark');
    else
      setTheme('light');
  };

  const handleLogOut = () =>{
      try {
        dispatch( actionLogOut() );
        navigate('/');
      } catch (error) {
        console.error( error ) ;
      }
  }

  const handleClose = ( ) => {
    setAnchorEl(null);
  };

  return (
    <Box position={'fixed'} sx={{ flexGrow: 1 , width: '100%' , zIndex: 1000000  }}>
      <AppBar position="static" sx={{  }} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={ handleLogOut }
          >
            <ExitToAppIcon  />
          </IconButton>
          {
            links.map( ( item ) =>(
              <MenuItem 
                key={'mi'+item.NavLink + item.name} 
                component={ Link }
                to = { item.NavLink }
                sx={{ flex: 1 }}
              > 
                <Typography
                   flex={1} 
                   m={1} 
                   variant={ item.varant } 
                   key={item.NavLink + item.name}
                >  
                  { item.name }
                </Typography> 
              </MenuItem>
             ) ) 
          }   
        </Toolbar>
      </AppBar>
    </Box>
  );
}
