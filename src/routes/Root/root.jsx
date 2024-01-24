import * as React from 'react' ; 
import MenuAppBar from "../../components/Navbar/navbar.jsx";
import { Box, Container, Typography } from "@mui/material";
import {  useSelector  } from "react-redux";
import {  Outlet, Navigate, useNavigate } from "react-router-dom";
import BottomNavigator from '../../components/bottomNavigator/bottomNavigator';
import MasterNavbar from '../../components/navbar/masterNavbar.jsx';


export default function Root() {
  const userData = useSelector( ( state ) => state.usersSlice.usuario );
  if( !userData.token ){
    return(
      <Container  >
        <Navigate to={'login'} />
        <Outlet />
      </ Container >
    );
  }
  else{
    switch( userData.Rol ){
      case 'Usuario' :
        return (
          <Box sx={{ position: 'relative', paddingBottom: '50px' }}>
              <MenuAppBar />
                <Container sx={ { padding: 15 } } >
                  <Navigate to={'/'}/>
                  <Outlet  />
                </Container>
              <BottomNavigator/>
          </Box>
        );
      case 'Master':
        return (
          <Box sx={{ position: 'relative', paddingBottom: '50px' }}>
              <MasterNavbar />
                <Container sx={ { padding: 15 } } >
                  <Navigate to={'panel-control'}/>
                  <Outlet  />
                </Container>
              <BottomNavigator/>
          </Box>
        );
    }
  }
    
}