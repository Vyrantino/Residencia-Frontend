import { Container, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react' ;
import { deleteAdministrador, getAdministradores, getDepartamentos, getUserDepartaments } from './apiPanelControl';
import DeleteIcon from '@mui/icons-material/Delete';

const TableCellDepartamentos = ( props ) => {
    const [ selected , setSelected ] = React.useState('') ;
    const [ userDepartaments , setUserDepartaments ] = React.useState([]) ;
    const handleChange = ( e ) =>{
        e.preventDefault() ;
        try {
            setSelected( e.target.value ) ;
        } catch (error) {
            console.error( error );
        }
    }
    const listaUserDepartaments = async () =>{
        try {
            const response = await getUserDepartaments( props.usuario ) ;
            setUserDepartaments( response ) ;
        } catch (error) {
            console.error( error ) ;
        }
    }
    React.useEffect(()=>{
        listaUserDepartaments() ;
    },[]);
    
    return(
        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Departamentos</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Departamento"
                        onChange={handleChange}
                        defaultValue={0}
                    >
                        {
                            userDepartaments.map( ( userDepartament ) => (
                                <MenuItem 
                                    key={ userDepartament.departamento.idDepartamento } 
                                    value = { userDepartament.departamento.idDepartamento } 
                                > 
                                    { userDepartament.departamento.Nombre } 
                                </MenuItem>
                            ) )
                        }
                    </Select>
        </FormControl>
    ) ;
}

export default function PanelControlAdministradoresTable(){
    const [ administradores , setAdministradores ] = React.useState([]) ;
    const [ departamentos , setDepartamentos ] = React.useState([]) ;
    const [ selected , setSelected ] = React.useState('') ;
    const [ selectedDepartamento , setSelectedDepartamento ] = React.useState([]) ;
    const [ showTable , setShowTable ] = React.useState( false ) ;
    const listaAdministradores = async () =>{
        try {
            const response = await getAdministradores( selected ) ;
            setAdministradores( response ) ;
            setShowTable( true );

        } catch (error) {
            
        }
    }
    const listaDepartamentos = async () =>{
        try {
            const response = await getDepartamentos() ;
            setDepartamentos( response ) ;
        } catch (error) {
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

    const handleDelete = async ( administrador ) =>{
        try {
            await deleteAdministrador( administrador ) ;
            listaAdministradores( selected ) ;
        } catch (error) {
            
        }
    }
   
    React.useEffect( () => {
        if( selected )
        listaAdministradores( selected ) ;  
    } , [ selected ] );
    React.useEffect( () => {
        listaDepartamentos() ;  
    } , [ departamentos ] );
    return(
        <Container >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Departamentos</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Departamento"
                        onChange={handleChange}
                        defaultValue=""
                    >
                        {
                            departamentos.map( ( departamento ) => (
                                <MenuItem 
                                    key={ departamento.idDepartamento } 
                                    value = { departamento.idDepartamento } 
                                > 
                                    { departamento.Nombre } 
                                </MenuItem>
                            ) )
                        }
                    </Select>
                </FormControl>
            {
                showTable &&
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> idAdministrador </TableCell>
                                <TableCell> idUsuario </TableCell>
                                <TableCell> Email </TableCell>
                                <TableCell> Departamentos </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                administradores.map(( administrador ) => (
                                    <TableRow
                                        key={ administrador.idAdministrador }
                                    >
                                        <TableCell> { administrador.idAdministrador } </TableCell>
                                        <TableCell> { administrador.usuario.idUsuario } </TableCell>
                                        <TableCell> { administrador.usuario.Email } </TableCell>
                                        <TableCell> <TableCellDepartamentos usuario = { administrador.usuario.idUsuario }  /> </TableCell>
                                        <TableCell> 
                                            <IconButton
                                                color='error'
                                                onClick={ () => handleDelete( 
                                                    {
                                                        idAdministrador:  administrador.idAdministrador , 
                                                        idUsuario: administrador.idUsuario 
                                                    } 
                                                ) }
                                            >
                                                <DeleteIcon />    
                                            </IconButton> 
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Container>
    );
}