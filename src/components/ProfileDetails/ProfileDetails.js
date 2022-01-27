import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { profileUser } from "../../actions/profileActions";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { BsGeoAlt, BsGithub } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { ImUserTie } from "react-icons/im";
import "./profileDetails.css";
import Cards from "../Cards/Cards";
import EditUbicacion from "../EditUbicacion/EditUbicacion";
import Boton from "../Boton/Boton";
import Chat from "../chat/chat";
import { LoadingScreen } from "../loadingScreen/LoadingScreen";
import Feed from "../NewNav/Feed/Feed";
import Jobs from "../Jobs/Jobs";
import { DEF_BANNER, IMG, POST_USER } from "../../enviroment";
import { FormJobs } from "../formJobs/FormJobs";
import ChatMessages from "../ChatWindow/ChatMessages";
import { Workerpost } from "../Workerpost/Workerpost";
import ChatWindowv2 from "../ChatWindow/ChatWindowv2";
import Leftbar from "../NewNav/Leftbar/Leftbar";
import {
  makeStyles,
  Container,
  Fab,
  Modal,
  Tooltip,
  Button,
} from "@material-ui/core";
import BuildIcon from '@material-ui/icons/Build';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  fab: {
    bottom: "-5px",
    left: "-50px",
  },
  container: {
    width: 320,
    height: 380,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  puntuar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  puntuarbox: {
    display: "flex",
    flexDirection: "row",
    gap: "5em",
    marginBottom: "1em",
  }
}));


export const ProfileDetails = () => {
  const classes = useStyles();
  const [viewChat, setViewChat] = useState(false);
  const [postOrWorkerpost, setPostOrWorkerpost] = useState({ show: 'post' });
  const [open, setOpen] = useState(false);
  const { userId } = useParams();
  const myId = useSelector((state) => state.auth.uid);
  const [inputRange, setInputRange] = useState(3);
  const [punteadoCorrectamente, setPunteadoCorrectamente] = useState(false);

  let user = useSelector((state) => state.profile.user);
  let { email } = useSelector((state) => state.auth);
  const loader = useSelector((state) => state.ui.loading);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId));
  }, [userId, dispatch]);

  const contactUser = () => {
    setViewChat(!viewChat);
  };

  function button() {
    if (user?.usr_email === email) {
      return (
        <>
          <Tooltip title="Configuraciones" aria-label="configuraciones" onClick={() => setOpen(true)}>
            <Fab color="primary" className={classes.fab}>
              <BuildIcon />
            </Fab>
          </Tooltip>
          <Modal open={open}>
            <Container className={classes.container}>
              <div className="boton-portada">
                <Link to={`/editprofile/${user.usr_id}`}>
                  <div className="btn-pro">
                    <Button type="button" color="primary" variant="outlined">
                      <BsFillGearFill /> Editar Perfil
                    </Button>
                  </div>
                </Link>
                <div className="btn-pro">
                  <Button
                    variant="outlined"
                    data-toggle="modal"
                    data-target="#editUbicacion"
                    color="primary"
                  >
                    Editar Ubicación
                  </Button>
                </div>
                {/* <Link to="/addjob"> */}
                <div className="btn-pro">
                  <Button
                    variant="outlined"
                    data-toggle="modal"
                    color="primary"
                    data-toggle="modal"
                    data-target="#addJobModal"
                  >
                    Agregar trabajo
                  </Button>
                </div>
                {/*  </Link> */}
                <div className="btn-pro">
                  <Link to={`/profile/${userId}/alert`}>
                    <Button color="primary" variant="outlined"> Crear Alerta de Empleo </Button>
                  </Link>
                  <EditUbicacion profile={user} id={userId} />

                  <FormJobs />
                </div>
                <div className="btn-pro">
                  <Button color="primary" variant="outlined">
                    <Link to='/create-workerpost'>Crear Workerpost</Link>
                  </Button>
                </div>
                <div className="btn-salir">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Container>
          </Modal>
        </>
      );
    }
  }
  return loader ? (
    <LoadingScreen />
  ) : (
    <div>
      <div className="left-prof">
        <Leftbar />
      </div>
      <section className="seccion-perfil-usuario">
        <div className="perfil-usuario-header">
          <div className="perfil-usuario-portada">
            <img
              className="imagen-portada"
              src={user?.usr_banner ? user.usr_banner : DEF_BANNER}
              alt="portada"
            ></img>
            <div className="perfil-usuario-avatar">
              <img
                src={user?.usr_photo ? user.usr_photo : IMG}
                alt="img-avatar"
                width="50px"
              />
            </div>
            {button()}
          </div>
        </div>
        <div className="perfil-usuario-body">
          <div className="perfil-usuario-bio">
            <h3 className="titulo">{user?.usr_username}</h3>
            <p className="texto">{user?.usr_description}</p>
          </div>
          <div className={classes.puntuarbox}>
            {userId === myId ? '' : <div className={classes.puntuar} >
              <label>Puntuar al usuario</label>
              <input type='range' min='1' max='5' value={inputRange} onChange={(e) => setInputRange(e.target.value)} />
              <label>{inputRange}⭐</label>
              <button onClick={() => {
                const puntaje = (user.usr_score ? (parseInt(user.usr_score) + parseInt(inputRange)) / 2 : inputRange);
                console.log('puntaje', puntaje)
                axios.put(`${POST_USER}/${userId}`, { usr_score: puntaje })
                  .then(response => setPunteadoCorrectamente(true))
                  .catch(error => console.log(error));
              }}>Puntuar</button>
              {punteadoCorrectamente && <h4>Punteado correctamente ✔</h4>}
            </div>}
            {
              user?.usr_email !== email && (
                <div>
                  <ChatWindowv2 receiverData={user} />
                </div>
              )
            }
          </div>
          <div className="perfil-usuario-footer">
            <ul className="lista-datos">
              <li>
                <ImUsers className="icono" />
                Sexo: {user?.usr_gender}
              </li>
              <li>
                <ImUserTie className="icono" />
                Cargo: {user?.usr_charge}
              </li>
            </ul>
            <ul className="lista-datos">
              <li>
                <BsGeoAlt className="icono" />
                País: {user?.usr_country}
              </li>
              <li>
                <BsTelephone className="icono" />
                Telefono: {user?.usr_phone}
              </li>
            </ul>
          </div>
          {/* <div> */}
          {/* <Cards key="job" profiledata={user?.jobs} profileType={"jobs"}></Cards> */}
          {/* </div> */}
          <div>{/* Aquí van los workerposts */}</div>
          <div className="vtn1">
            <Button color="primary" variant="outlined" onClick={() => postOrWorkerpost.show === 'workerpost' && setPostOrWorkerpost({ show: 'post' })}>Posts</Button>
          </div>
          <div className="vtn2">
            <Button color="primary" variant="outlined" onClick={() => postOrWorkerpost.show === 'post' && setPostOrWorkerpost({ show: 'workerpost' })}>WorkerPost</Button>
          </div>
          <div className="div-posted">
            {postOrWorkerpost.show === 'post' ? <Feed key="feed" profilePosts={user?.posts} /> : <Workerpost workerposts={user.workerPosts} />}
          </div>
          <div className="redes-sociales">
            {user.usr_social?.linkedin && (
              <a
                href={
                  user.usr_social?.linkedin ? user.usr_social.linkedin : null
                }
                target="_blank"
                className="boton-redes linkeding"
                rel="noreferrer"
              >
                {user.usr_social.linkedin && <FaLinkedin className="icons" />}
              </a>
            )}
            {user.usr_social?.github && (
              <a
                href={user?.usr_social?.github ? user?.usr_social.github : null}
                target="_blank"
                className="boton-redes github"
                rel="noreferrer"
              >
                <BsGithub fill="#000" className="icons" />
              </a>
            )}
            {user.usr_social?.instagram && (
              <a
                href={
                  user.usr_social?.instagram ? user.usr_social.instagram : null
                }
                target="_blank"
                className="boton-redes instagram"
                rel="noreferrer"
              >
                <FaInstagram className="icons" />
              </a>
            )}
            {user.usr_social?.facebook && (
              <a
                href={
                  user?.usr_social?.facebook ? user?.usr_social.facebook : null
                }
                target="_blank"
                className="boton-redes facebook"
                rel="noreferrer"
              >
                <FaFacebook className="icons" />
              </a>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
