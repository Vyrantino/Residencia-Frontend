import { 
    Button, 
    TableContainer , 
    Table,
    TableHead, 
    TableRow,
    TableCell,
    TableBody, 
    IconButton,
    Typography,
    Paper,
    Container , 
    Box,
    Grid, 
    Stack , 
    Pagination
} from "@mui/material";
import * as React from 'react' ; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import PlantillaCard from "./plantilla-card";

export default function Plantillas( props ){
    const [ showTable , setShowTable ] = React.useState( false ) ;
    const theme = useTheme() ; 
    const handleShowTable = () =>{
        setShowTable( !showTable );
    }
    return (
        <Container>
            <Box sx={{ 
                marginBottom: 2 , 
                display: 'flex' , 
                justifyContent: 'space-between', 
                alignContent: 'center'
             }}>
                <Button
                    variant='contained'
                    component = 'label'
                >
                    <input 
                        hidden 
                        type="file" 
                        onChange={ props.handleUploadDocument } 
                    />
                    Subir Plantilla
                </Button>
                <Button
                    variant="contained"
                    onClick={ handleShowTable }
                >
                    { showTable ? 'Cambiar Vista' : 'Mostrar Tabla' }
                </Button>
            </Box>
                <Stack alignItems={'center'} spacing={2}  >
                    <Pagination 
                        page={ props.page } 
                        onChange={ props.handlePage }
                        count={ props.pageCount }
                        color="secondary" 
                    />
                </Stack>
             { showTable ?
               <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: '#fbe9e7' }}  >
                    <Table size="medium"   >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#590d0d' }} >
                                <TableCell scope="row" > <Typography variant='h6' color={'lightgrey'}  > Plantilla </Typography> </TableCell>
                                <TableCell  > <Typography variant='h6' color={'lightgrey'}  > Subido por: </Typography> </TableCell>
                                <TableCell  > <Typography variant='h6' color={'lightgrey'}  > Fecha: </Typography> </TableCell>
                                <TableCell  > <Typography variant='h6' color={'lightgrey'}  > Borrar </Typography> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.plantillas.map(( plantilla ) => (
                                    <TableRow
                                        key={ plantilla.idPlantilla }
                                    >
                                        <TableCell  > 
                                            <Button 
                                                variant="contained" 
                                                color="warning" 
                                                onClick = { () => props.handleSelectPlantilla( plantilla ) } 
                                            > 
                                                { plantilla.Nombre } 
                                            </Button> 
                                        </TableCell>
                                        <TableCell> { plantilla.usuario.NombreUsuario } </TableCell>
                                        <TableCell> { new Date(plantilla.FechaModificacion).toLocaleDateString('es-ES') } </TableCell>
                                        <TableCell> 
                                            <IconButton
                                                color='error'
                                                onClick={ () => {
                                                    props.handleDeletePlantilla( plantilla ) 
                                                }}
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
                :
                <Grid container spacing={1} justifyContent={'space-around'} >
                    {
                        props.plantillas.map( (plantilla) => (
                            <Grid item xs={12} md={5} lg = {4} key={`PlantillaCard${plantilla.idPlantilla}`} > 
                                <Button fullWidth hidden onClick={ () => props.handleSelectPlantilla( plantilla ) } >
                                    <PlantillaCard 
                                        plantilla = { plantilla }
                                        handleSelectPlantilla = { () => props.handleSelectPlantilla( plantilla ) }
                                    />
                                </Button>
                            </ Grid>
                        ) )
                    }
                </Grid>
             }
        </ Container>
    );
}