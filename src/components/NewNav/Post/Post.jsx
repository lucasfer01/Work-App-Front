import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  
  const useStyles = makeStyles((theme) => ({
    card: {
      marginBottom: theme.spacing(5),
    },
    media: {
      height: 250,
      [theme.breakpoints.down("sm")]: {
        height: 150,
      },
    },
  }));
  
  const Post = () => {
    const classes = useStyles();
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image="https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FDragonBall.jpg?alt=media&token=8b489b89-0177-4a73-bd52-8b1afb4ba6b3" title="My Post" />
          <CardContent>
            <Typography gutterBottom variant="h5">
              Busco Full Stack Developer
            </Typography>
            <Typography variant="body2">
            ¿Te apasionan los desafíos y tu objetivo es dar la milla extra siempre? ¡Tsoft es tu lugar!
            Nos encontramos en la búsqueda de un/a Dev Full Stack (Java+React)
            Ssr/Sr para sumarse a nuestra Gerencia de Desarrollo y DevOps para 
            participar en un desafiante proyecto.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Contactar
          </Button>
          <Button size="small" color="primary">
            Ir al peril
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default Post;