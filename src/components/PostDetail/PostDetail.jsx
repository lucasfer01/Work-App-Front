import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetail, getProfile } from "../../controllers";
import "./detalle.css"
import Chat from "../chat/chat";
// React-Redux
import { useSelector, useDispatch } from 'react-redux';
// Components
import { LoadingScreen } from '../loadingScreen/LoadingScreen';
// Actions
import { finishLoading, startLoading } from '../../actions/ui'; // ui.loading
import ChatMessages from "../ChatWindow/ChatMessages";
import { IMG} from "../../enviroment";
import ChatWindowv2 from "../ChatWindow/ChatWindowv2";
import Leftbar from "../NewNav/Leftbar/Leftbar"

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "-41%",
    width: "60%",
    marginLeft: "29%",
    boxShadow: "0 1rem 1rem rgba(0, 0, 0, 0.2)",
  },
  font: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    padding: "15px",
    color: "gray",
  },
  fontTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    padding: "15px",
    color: "#d74949",
  },
  fontDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "400",
    color: "gray",
  },
  fontStatus: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    color: "#d74949",
  },
  media: {
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
}));

export default function PostDetail() {
  const classes = useStyles();
  const myId = useSelector(state => state.auth.uid);
  const [post, setPost] = useState([]);
  const [authorId, setAuthorId] = useState([]);
  const [author, setAuthor] = useState({});
  const [viewChat, setViewChat] = useState(false);

  let photo = author.usr_photo ? author.usr_photo : IMG;

  // Dispatch
  const dispatch = useDispatch();

  // Estado de loading
  const loader = useSelector(state => state.ui.loading);

  // Id desde params
  const { id } = useParams();

  useEffect(() => {
    dispatch(startLoading())
    const getPostData = async () => {
      try {
        const postData = await getPostDetail(id);
        console.log("post:", postData)
        setPost(postData);
        setAuthorId(postData.usr_id);
        dispatch(finishLoading());
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
    const getAuthorData = async () => {
      try {
        const authorData = await getProfile(authorId);
        console.log("author:", authorData)
        setAuthor(authorData);
      } catch (error) {
        console.log(error);
      }
    }
    getAuthorData();
  }, [id, authorId]);

  return (loader ? <LoadingScreen /> :
    <>
    <div className="divleftDetail">
    <Leftbar />
    </div>
      {post.post_id ?
        <Card className={classes.card}>
          <CardActionArea>
            {post.post_photo.length > 0 ? post.post_photo.map(foto => {
              return (
                <CardMedia className={classes.media} image={foto} title="My Post" />
              )
            }) : <span>No hay fotos en esta publicación</span>}
            <Typography className={classes.font} gutterBottom variant="h5">
              <img className='conversationImg'
                src={photo}
                alt=""
              />
              {author?.usr_username}
            </Typography>
            <Typography className={classes.fontTitle} gutterBottom variant="h5">
              {post.post_title}
            </Typography>
            <CardContent>
              <Typography className={classes.fontDesc} variant="body2">
                {post.post_description}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography className={classes.fontStatus} variant="body2">
                {post.post_priority ? post.post_priority : <span>Poco urgente</span>}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography className={classes.fontDesc} variant="body2">
                Fecha de publicación:
                {post.createdAt.slice(0, 10)}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography className={classes.fontDesc} variant="body2">
                Pago:
                {post.post_fee ? post.post_fee : <span> Por acordar</span>}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card> : <h1>No se encontraron datos de este usuario</h1>}
      {/* <button className="btn-detalle" onClick={() => setViewChat(!viewChat)}>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
            </svg>
          </div>
        </div>
        <span>Abrir Chat</span>
      </button> */}
      <ChatWindowv2 receiverData={author} />
      {
        viewChat && (
          <ChatMessages
            myId={myId}
            receiverId={authorId}
            receiverName={author.usr_username}
            receiverPhoto={author.usr_photo}
          />
        )
      }
    </>
  );
};
