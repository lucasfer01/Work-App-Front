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
          <CardMedia className={classes.media} image={props.photo} title="My Post" />
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