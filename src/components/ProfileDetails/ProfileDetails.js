import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { profileUser } from "../../actions/profileActions";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaRegGrinBeam } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { BsGeoAlt } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { ImUserTie } from "react-icons/im";
import "./profileDetails.css"
import Cards from "../Cards/Cards";
import EditUbicacion from "../EditUbicacion/EditUbicacion";
import Boton from "../Boton/Boton";
import Chat from "../chat/chat";
import { FormJobs } from "../formJobs/FormJobs"



export const ProfileDetails = () => {
  const [viewChat, setViewChat] = useState(false);
  const {userId} = useParams()
  
  let user= useSelector((state) => state.profile.user)
  let { email }= useSelector((state) => state.auth)





  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
    console.log("dispatch profile")
  }, []);

  console.log("user", user)
  console.log("email", email)


  const contactUser = () =>{
    //alert(`Contactando a ${user.usr_username}`) //cambiar a enlace a wsp u otra app
    console.log("Ver chat")
    setViewChat(!viewChat);
  }

  function button(){
    if(user?.usr_email === email){
      return(
        <div>
        <Link to={`/editprofile/${user.usr_id}`}>
            <button type="button" className="boton-portada">
                    <BsFillGearFill /> Editar Perfil
                </button>
            </Link>
            <Boton
                data-toggle="modal"
                data-target="#editUbicacion"
                colorBtn='btn_azul'
              >
                Editar Ubicación
              </Boton>
              <Link to='/addjob'> 
              <Boton
              data-toggle="modal"
              colorBtn='btn_azul'
              >
                Agregar trabajo
              </Boton>
              </Link> 
        <EditUbicacion profile = {user} id = {userId}/>
        </div>

      )
    } else return (
      <button className="btn-prof" onClick={contactUser}>
            <span className="text" >CONTACTAR</span>
            </button>
    )
  }

  return (
   <div>
     <section className='seccion-perfil-usuario'>
         <div className='perfil-usuario-header'>
             <div className='perfil-usuario-portada'>
             <div className='perfil-usuario-avatar'>
                 <img src={user?.usr_photo} alt="img-avatar" width="50px"/>
                 <button type="button" className="boton-avatar">
                      <FaImage />
                 </button>
              </div>
              {button()}

              

              {viewChat && <Chat userPRofile={user} />}

            </div>
        </div>
      <div className='perfil-usuario-body'>
          <div className='perfil-usuario-bio'>
                
              <h3 className='titulo'>{user?.usr_username}</h3>
              <p className='texto'>{user?.usr_description}</p>
          </div>
          <div className='perfil-usuario-footer'>
              <ul className='lista-datos'>
                  <li><BsHouseDoor className='icono' />Direccion de usuario:</li>
                  <li><BsTelephone  className='icono'/> Telefono:</li>
                  <li><FaCity className='icono' /> Trabaja en:</li>
                  <li><ImUserTie className="icono" />Cargo:</li>
              </ul>
              <ul className='lista-datos'>
                  <li><FaCalendarAlt className='icono' /> Fecha de nacimiento:</li>
                  <li><BsGeoAlt className='icono' /> Ubicacion:</li>
                  <li><ImUsers className="icono" /> Sexo:</li>
                  <li><FaRegGrinBeam className="icono" /> sociales:</li>
              </ul>
          </div>
          <div>
           <Cards key="job" profiledata={user?.jobs} profileType={"jobs"}></Cards>
           </div>
           <div>
          <Cards key="post" profiledata={user?.posts} profileType={"posts"}></Cards>
          </div>
          <div className='redes-sociales'>
              <a href='www.facebook.com' class="boton-redes facebook"><FaFacebook className='icons'/></a>
              <a href='www.linkeding.com' class="boton-redes linkeding"><FaLinkedin className='icons' /></a>
              <a href='www.instagram.com' class="boton-redes instagram"><FaInstagram className="icons" /></a>
          </div>
      </div>
    </section>
</div>
  );
};