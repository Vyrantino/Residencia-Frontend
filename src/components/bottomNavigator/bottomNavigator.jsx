import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogOut } from '../../redux/usuarios/userSlice';

export default function BottomNavigator() {
  const location = useLocation() ;
  const rol = useSelector( ( state ) => state.usersSlice.Role ) ;
  const [value, setValue] = React.useState(0);
  const [ homeLink , setHomeLink ] = React.useState('/') ;
  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ;
  const bringHomeLink = () =>{
    switch( rol ){
      case 'Usuario':  setHomeLink( '/' ) ; break ; 
      case 'Master':  setHomeLink( '/panel-control' ) ; break ; 
      default :  setHomeLink( '/' ) ;
    }
  }
  const handleBack = () => {
    if( location.pathname === '/' || location.pathname === '/panel-control' ){
    }
    else{
      navigate(-1);
    }
  }

  React.useEffect(() =>{
    bringHomeLink() ;
  },[]) ;

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%'  }} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ justifyContent: 'space-evenly'  }}
      >
        <BottomNavigationAction onClick={ handleBack } label="Pagina Anterior" icon={<ArrowBackIosNewIcon />} />
        <BottomNavigationAction LinkComponent={Link} to={ homeLink } label="Pagina Principal" icon={<HomeIcon />} />
        <BottomNavigationAction label="Mis Documentos" LinkComponent={Link} to={ '/pagina-documentos' }  icon={<FolderIcon />} />
      </BottomNavigation>
    </Box>
  );
}
