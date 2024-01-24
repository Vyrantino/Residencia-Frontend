import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./errorPage.jsx";
import { Provider } from 'react-redux' ; 
import store from './redux/store.js';
import { ThemeProvider , colors, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { grey, orange, red } from '@mui/material/colors';
import Homepage from './routes/Homepage/homepage.jsx';
import PaginaDocumentos from './routes/PaginaDocumentos/pagina-documentos.jsx';
import PanelControl from './routes/PanelControl/panel-control.jsx';
import FormularioDocumento from './routes/FormularioDocumento/formulario-documento.jsx';
import Login from './routes/Login/login.jsx';
import PanelUsuarios from './routes/PanelUsuarios/panel-usuarios.jsx';
import StepperDocumento from './routes/StepperDocumento/steper-documento.jsx';
import Root from './routes/Root/root.jsx';
import SelectorPlantillas from './routes/SelectorPlantillas/selector-plantillas.jsx';
import Register from './routes/Register/register.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root /> , 
    errorElement: < ErrorPage /> , 
    children: [
      {
        path: '/' ,
        element: <Homepage />
      },
      {
        path: 'pagina-documentos' ,
        element: < PaginaDocumentos />
      },
      {
        path: 'panel-control' ,
        element: < PanelControl />
      },
      {
        path: 'selector-plantilla' ,
        element: < SelectorPlantillas />
      },
      {
        path: 'formulario-documento' ,
        element: < FormularioDocumento />
      },
      {
        path: 'login' ,
        element: < Login />
      },
      {
        path: 'panel-usuarios' ,
        element: < PanelUsuarios />
      },
      {
        path: 'stepper-documento' ,
        element: < StepperDocumento />
      },
      {
        path: 'register' ,
        element: < Register />
      },
    ],
  },
]);



const theme = createTheme({
  palette: {
    primary:{
      main: '#590d0d',
    },
    secondary:{
      main: '#ab5810',
    },
    background:{
      paper: grey[400],
      default: grey[300],
    },
    text:{
      primary: red[700],
      secondary: red[600]
    },  
  },
  status: {
    danger: orange[500],
  },
  
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme = { theme } >
      <CssBaseline />
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </ThemeProvider> 
  </React.StrictMode>,
)
