import {
    Link,
    Container,
    makeStyles,
    Typography,
    Divider,
  } from "@material-ui/core";
  
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(10),
      position: "sticky",
      top: 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      color: "#555",
    },
    link: {
      marginRight: theme.spacing(2),
      color: "#555",
      fontSize: 16,
    },
  }));
  
  const Rightbar = () => {
    const classes = useStyles();
    return (
      <Container className={classes.container}>
        <Typography className={classes.title} gutterBottom>
          Categorias que puedan servirle
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Plomeria
        </Typography>
        <Link href="#" className={classes.link} variant="body2">
          Carpintero
        </Link>
        <Link href="#" className={classes.link} variant="body2">
          Electricista
        </Link>
        <Link href="#" className={classes.link} variant="body2">
          Programador
        </Link>
        <Divider flexItem style={{marginBottom:5}}/>
        <Link href="#" className={classes.link} variant="body2">
          Albañil
        </Link>
        <Link href="#" className={classes.link} variant="body2">
          Particular
        </Link>
        <Link href="#" className={classes.link} variant="body2">
          Mecanico
        </Link>
      </Container>
    );
  };
  
  export default Rightbar;