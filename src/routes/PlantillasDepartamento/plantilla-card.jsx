import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ITDlogo from '../../assets/itd.png' ;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PlantillaCard( props ) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card  sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{  position: 'inherit' , bgcolor: red[500] }} aria-label="recipe">
            { props.plantilla.usuario.NombreUsuario.substring(0,2) }
          </Avatar>
        }
        title={ props.Nombre }
        subheader={ props.plantilla.Nombre }
      />
      <CardMedia
        component="img"
        height="194"
        image= { ITDlogo }
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { 'Subida el:' + new Date(props.plantilla.FechaModificacion).toLocaleDateString('es-ES') }
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Un breve ejemplo de una descripcion igual de breve para los
            diferentes departamentos que hay en el tecnologico
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
