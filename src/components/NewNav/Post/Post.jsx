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
  import { useState, useEffect } from "react";
  import { getProfile } from "../../../controllers";
  import { useNavigate} from 'react-router-dom';
  
  const useStyles = makeStyles((theme) => ({
    card: {
      marginBottom: theme.spacing(5),
      marginTop: "5%",
    },
    media: {
      height: 250,
      [theme.breakpoints.down("sm")]: {
        height: 150,
      },
    },
  }));
  
  const Post = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const authorId = props.authorId;
    const [author, setAuthor] = useState({});
    console.log("authorId", authorId);
    useEffect(() => {
        getProfile(authorId).then(res => {
            setAuthor(res);
        }).catch(err => {
            console.log(err);
        });
    }, [authorId]);

    console.log("author", author);

    const handleDetails = () => {
        navigate(`/post/${props.id}`);
    }


    return (
      <Card className={classes.card}>
        <CardActionArea>
          {props.photo.length > 0? 
          <CardMedia className={classes.media} image={props.photo} title="My Post" />
            :  <CardMedia className={classes.media} image="https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FWorkingapp.jpg?alt=media&token=09c05864-0fca-4fed-8c69-e44c328b2d0e"
           alt="img default..." />
          }
            <Typography gutterBottom variant="h5">
              {author?.usr_username}
            </Typography>
            <Typography gutterBottom variant="h5">
              {props.title}
            </Typography>
          <CardContent>
            <Typography variant="body2">
              {props.shortdescription}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2">
              {props.priority}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Contactar
          </Button>
          <Button size="small" color="primary" onClick={handleDetails}>
            Detalles
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default Post;