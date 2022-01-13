import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { profileUser } from "../../actions/profileActions";
import { getJobs, getPosts } from "../../controllers";
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
// import Cards from "../Cards/Cards";


export const ProfileDetails = ({type}) => {
  const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, [dispatch, userId]);
  console.log(user)


  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  let data;
  if (type === "jobs") {
    data = jobs;
  } else if (type === "posts") {
    data = posts;
  }
  console.log(jobs);
  console.log(posts);


  useEffect(() => {
    const getData = async () => {
      try {
        const jobsData = await getJobs();
        const postsData = await getPosts();
        console.log("jobs:", jobsData)
        console.log("posts:", postsData)
        setJobs(jobsData);
        setPosts(postsData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  //Esta es la unica linea que no se para que sirve
  // {/* <Cards type={type} data={data}></Cards> */}

  return (
    <div>
    <section className='seccion-perfil-usuario'>
        <div className='perfil-usuario-header'>
            <div className='perfil-usuario-portada'>
            <div className='perfil-usuario-avatar'>
                <img src={user.usr_photo} alt="img-avatar" width="50px"/>
                <button type="button" className="boton-avatar">
                     <FaImage />
                </button>
              </div>
              <button type="button" className="boton-portada" 
                   onClick={()=>{"aqui tu función"}}>
                    <BsFillGearFill /> Editar Perfil
                </button>
            </div>
        </div>
      <div className='perfil-usuario-body'>
          <div className='perfil-usuario-bio'>
              <h3 className='titulo'>{user.usr_username}</h3>
              <p className='texto'>{user.usr_description}</p>
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
          <div className='redes-sociales'>
              <a href='www.facebook.com' class="boton-redes facebook"><FaFacebook className='icons'/></a>
              <a href='www.linkeding.com' class="boton-redes linkeding"><FaLinkedin className='icons' /></a>
              <a href='www.instagram.com' class="boton-redes instagram"><FaInstagram className="icons" /></a>
          </div>
          <div className="btn-1">
          <button className="btn-prof">
            <span className="text" onClick={handleLogout}>Logout</span>
            </button>
            </div>
      </div>
    </section>
</div>
  );
};
