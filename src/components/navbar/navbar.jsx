import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogOut } from '../../redux/usuarios/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';

export default function MenuAppBar() {
  const [theme, setTheme] = React.useState('light');
  const [checked, setChecked] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch() ;
  const usuario = useSelector( ( state ) => state.usersSlice.Role ) ;

  const links = [
    {
      name: usuario,
      NavLink: "/",
      varant:"h5"
    },
    {
      name: "Crear un Documento",
      NavLink: "stepper-documento",
      varant:"h6"
    },
  ] ;

  const handleChange = (event) => {
    setChecked(event.target.checked) ; 
    if( theme == 'light' )
      setTheme('dark');
    else
      setTheme('light');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = ( ) => {
    setAnchorEl(null);
  };

  const handleLogOut = ( ) => {
    dispatch( actionLogOut() ) ;
    setAnchorEl(null);
  };

  return (
    <Box position={'fixed'} sx={{ flexGrow: 1 , width: '100%' , zIndex: 100000 }}>
      <AppBar position="static" sx={{  }} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={ () => dispatch( actionLogOut([]) )  }
          >
            <Typography fontWeight={'bold'} > Salir </Typography>
            <LogoutIcon  />
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
