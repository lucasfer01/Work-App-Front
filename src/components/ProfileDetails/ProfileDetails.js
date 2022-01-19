import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { profileUser } from "../../actions/profileActions";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { ImUserTie } from "react-icons/im";
import "./profileDetails.css";
import Cards from "../Cards/Cards";
import EditUbicacion from "../EditUbicacion/EditUbicacion";
import Boton from "../Boton/Boton";
import Chat from "../chat/chat";

import { FormJobs } from "../formJobs/FormJobs";
import { LoadingScreen } from "../loadingScreen/LoadingScreen";
import { getProfile } from "../../controllers";

export const ProfileDetails = () => {
  const [viewChat, setViewChat] = useState(false);
  const { userId } = useParams();
  const loader = useSelector((state) => state.ui.loading);

  let user = useSelector((state) => state.profile.user);
  let { email } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId));
    console.log("dispatch profile");
  }, [dispatch, userId]);

  console.log("user", user);
  console.log("email", email);

  const contactUser = () => {
    //alert(`Contactando a ${user.usr_username}`) //cambiar a enlace a wsp u otra app
    console.log("Ver chat");
    setViewChat(!viewChat);
  };

  function button() {
    if (user?.usr_email === email) {
      return (
        <div>
          <Link to={`/editprofile/${user.usr_id}`}>
            <button type="button" className="boton-portada">
              <BsFillGearFill /> Editar Perfil
            </button>
          </Link>
          <Boton
            data-toggle="modal"
            data-target="#editUbicacion"
            colorBtn="btn_azul"
          >
            Editar Ubicación
          </Boton>

          <Boton
            data-toggle="modal"
            data-target="#addJobModal"
            colorBtn="btn_azul"
          >
            Agregar trabajo
          </Boton>
          <FormJobs />

          <EditUbicacion profile={user} id={userId} />
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
            <div className="perfil-usuario-avatar">
              <img src={user?.usr_photo} alt="img-avatar" width="50px" />
              <button type="button" className="boton-avatar">
                <FaImage />
              </button>
            </div>
            {button()}

            {viewChat && <Chat userPRofile={user} />}
          </div>
        </div>
        <div className="perfil-usuario-body">
          <div className="perfil-usuario-bio">
            <h3 className="titulo">{user?.usr_username}</h3>
            <p className="texto">{user?.usr_description}</p>
          </div>

          <div className="perfil-usuario-footer">
            <ul className="lista-datos">
              {/* <li><BsHouseDoor className='icono' />Direccion de usuario:</li> */}
              {/* <li><FaCalendarAlt className='icono' /> Fecha de nacimiento:</li> */}
              <li>
                <ImUsers className="icono" /> Sexo: {user?.usr_gender}
              </li>
              {/* <li><FaCity className='icono' /> Trabaja en:</li> */}
              <li>
                <ImUserTie className="icono" />
                Cargo: {user?.usr_charge}
              </li>
            </ul>
            <ul className="lista-datos">
              <li>
                <BsGeoAlt className="icono" /> Nacionalidad: {user?.usr_country}
              </li>
              <li>
                <BsTelephone className="icono" /> Telefono: {user?.usr_phone}
              </li>
              {/* <li><FaRegGrinBeam className="icono" /> sociales:</li> */}
            </ul>
          </div>
          <div>
            <Cards
              key="job"
              profiledata={user?.jobs}
              profileType={"jobs"}
            ></Cards>
          </div>
          <div>
            <Cards
              key="post"
              profiledata={user?.posts}
              profileType={"posts"}
            ></Cards>
          </div>
          <div className="redes-sociales">
            <a
              href={user?.usr_social?.linkedin? user?.usr_social.linkedin : null}
              target="_blank"
              className="boton-redes linkeding"
            >
              <FaLinkedin className="icons" />
            </a>
            <a
              href={user?.usr_social?.github? user?.usr_social.github : null}
              target="_blank"
              className="boton-redes github"
            >
              <FaGithub className="icons" />
            </a>
            <a
              href={user?.usr_social?.instagram? user?.usr_social.instagram : null}
              target="_blank"
              className="boton-redes instagram"
            >
              <FaInstagram className="icons" />
            </a>
            <a
              href={user?.usr_social?.facebook? user?.usr_social.facebook : null}
              target="_blank"
              className="boton-redes facebook"
            >
              <FaFacebook className="icons" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
