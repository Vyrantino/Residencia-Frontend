import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
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

export default function HomepagePlantillaCard( props ) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{  position: 'inherit' , bgcolor: red[500] }} aria-label="recipe">
            { props.Nombre.substring(0,2) }
          </Avatar>
        }
        title={ props.Nombre }
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image= { ITDlogo }
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Instituto Tecnologico de Durango
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
