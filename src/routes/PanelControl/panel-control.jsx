import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import ITDlogo from '../../assets/itd.png' ;
import { Link } from "react-router-dom";
import * as React from 'react' ;
export default function PanelControl(){
    const [ showDialog , setShowDialog ] = React.useState(false) ;
    const closeDialog = () => setShowDialog( false ) ;
    return (
        <Container  >
            <Grid container marginTop={4} >
                <Grid item xs={ 12 } sm={ 5.5 } md={ 5.5 }  >
                    <Link to="/panel-usuarios" style={{ textDecoration: 'none' }}>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardMedia
                                component="img"
                                height="194"
                                image= { ITDlogo }
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Entrar al panel de Usuarios
                                </Typography>
                            </CardContent>
                        </Card>
                    </ Link>
                </Grid>
            </Grid>
        </Container>
    );
}