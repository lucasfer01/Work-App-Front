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
import { DEF_BANNER, IMG } from "../../enviroment";
import { FormJobs } from "../formJobs/FormJobs";
import ChatMessages from "../ChatWindow/ChatMessages";
import { Workerpost } from "../Workerpost/Workerpost";

export const ProfileDetails = () => {
  const [viewChat, setViewChat] = useState(false);
  const [postOrWorkerpost, setPostOrWorkerpost] = useState({ show: 'post' });
  const { userId } = useParams();
  const myId = useSelector((state) => state.auth.uid);

  let user = useSelector((state) => state.profile.user);
  let { email } = useSelector((state) => state.auth);
  const loader = useSelector((state) => state.ui.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId));
    console.log(user.workerPosts);
  }, [userId, dispatch]);

  const contactUser = () => {
    setViewChat(!viewChat);
  };

  function button() {
    if (user?.usr_email === email) {
      return (
        <div className="boton-portada">
          <Link to={`/editprofile/${user.usr_id}`}>
            <Boton type="button" colorBtn="btn_azul">
              <BsFillGearFill /> Editar Perfil
            </Boton>
          </Link>
          <Boton
            data-toggle="modal"
            data-target="#editUbicacion"
            colorBtn="btn_azul"
          >
            Editar Ubicación
          </Boton>
          {/* <Link to="/addjob"> */}
          <Boton
            data-toggle="modal"
            colorBtn="btn_azul"
            data-toggle="modal"
            data-target="#addJobModal"
          >
            Agregar trabajo
          </Boton>
          {/*  </Link> */}
          <Link to={`/profile/${userId}/alert`}>
            <Boton colorBtn="btn_azul"> Crear Alerta de Empleo </Boton>
          </Link>
          <EditUbicacion profile={user} id={userId} />

          <FormJobs />
        </div>
      );
    } else
      return (
        <button className="btn-prof" onClick={contactUser}>
          <span className="text">CONTACTAR</span>
        </button>
      );
  }
  return loader ? (
    <LoadingScreen />
  ) : (
    <div>
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
            {
              viewChat && (
                <ChatMessages
                  myId={myId}
                  receiverId={user.usr_id}
                  receiverName={user.usr_name}
                  receiverPhoto={user.usr_photo}
                />
              )
            }
          </div>
        </div>
        <div className="perfil-usuario-body">
          <div className="perfil-usuario-bio">
            <h3 className="titulo">{user?.usr_username}</h3>
            <p className="texto">{user?.usr_description}</p>
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
          <div>{/* Aquí van los workerposts */}</div>
              <div>
                <button onClick={() => postOrWorkerpost.show === 'workerpost' && setPostOrWorkerpost({show: 'post'})}>Posts</button>
                <button onClick={() => postOrWorkerpost.show === 'post' && setPostOrWorkerpost({show: 'workerpost'})}>WorkerPost</button>
              </div>
          <div>
            {postOrWorkerpost.show === 'post' ? <Feed key="feed" profilePosts={user?.posts} /> : <Workerpost workerposts={user.workerPosts}/>}
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
      
      <div>
        <Link to='/create-workerpost'>Crear Workerpost</Link>
      </div>
    </div>
  );
};
