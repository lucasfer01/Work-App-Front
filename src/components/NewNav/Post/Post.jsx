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
import { useNavigate } from 'react-router-dom';
// Icons
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
// Estilos
import postStyle from './Post.module.css';
// React-redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { startLoading, finishLoading } from '../../../actions/ui';
// Axios
import axios from 'axios';
// Url
import { IMG} from "../../../enviroment";
import { FRONT_URL, POST_URL} from "../../../enviroment";

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
  // CanEditOrDelete
  const [canEditOrDelete, setCanEditOrDelete] = useState(false);
  // Dispatch
  const dispatch = useDispatch();
  // useSelector
  const sessionUserId = useSelector(state => state.auth.uid);
  let photo = author?.usr_photo ? author.usr_photo : IMG;

  // useEffect
  useEffect(() => {
    // Verificar la ruta
    if (window.location.pathname.slice(9) === sessionUserId || authorId === sessionUserId) { // Si el post pertenec al usuario lo puede editar
      // Seteamos el estado en true
      setCanEditOrDelete(true);
    }

    getProfile(authorId).then(res => {
      setAuthor(res);
    }).catch(err => {
      console.log(err);
    });
  }, [authorId]);


  const handleDetails = () => {
    navigate(`/post/${props.id}`);
  }

  function handlerButtonEdit() {
    navigate(`/editPost/${props.id}`);
  }

  function handlerButtonDelete() {
    // Seteamos el loader en true
    dispatch(startLoading());

    // Hacemos llamada para borrar el post
    axios.delete(`${POST_URL}/${props.id}`)
      .then(response => {
        
        // Verifiacamos si estamos en home
        if (window.location.pathname.slice(1, 8) === 'profile') {
          window.location.href = `${FRONT_URL}/profile/${sessionUserId}`
        }
        
        // Seteamos el loader en false
        dispatch(finishLoading());
      })
      .catch(error => console.log(error));
  }


  return (
    <Card className={classes.card + ' ' + postStyle.container}>
      <CardActionArea>
        {props.photo.length > 0 ?
          <CardMedia className={classes.media} image={props.photo[0]} title="My Post" />
          : <CardMedia className={classes.media} image="https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FWorkingapp.jpg?alt=media&token=09c05864-0fca-4fed-8c69-e44c328b2d0e"
            alt="img default..." />
        }
        <Typography gutterBottom variant="h5">
          <img className='conversationImg'
            src={photo}
            alt=""
          />
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
        <Button size="small" color="primary" onClick={handleDetails}>
          Detalles
        </Button>
      </CardActions>

      {canEditOrDelete && <button onClick={handlerButtonEdit} className={postStyle.buttonEdit}>
        <AiOutlineEdit fill="#fff" style={{ fontSize: '1.1rem' }} />
      </button>}

      {canEditOrDelete && <button onClick={handlerButtonDelete} className={postStyle.buttonDelete}>
        <AiFillDelete fill="#fff" style={{ fontSize: '1.1rem' }} />
      </button>}

    </Card>
  );
};

export default Post;