import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { profileUser } from "../../actions/profileActions";
import { getJobs, getPosts } from "../../controllers";
import Boton from "../Boton/Boton";
import Cards from "../Cards/Cards";
import s from "./ProfileDetails.module.css"


export const ProfileDetails = () => {

  const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)

  let { email }= useSelector((state) => state.auth)

  console.log(user.usr_email)
  console.log(email)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, []);

  const contactUser = () =>{
    alert(`Contactando a ${user.usr_username}`) //cambiar a enlace a wsp u otra app
  }

  function button(){
    if(user.usr_email === email){
      return(
        <Link to={`/editprofile/${user.usr_id}`}>
            <Boton colorBtn={"btn_azulLine"}>Editar Perfil</Boton>
            </Link>
      )
    } else return (
      <Boton colorBtn={"btn_azulLine"} onClick={contactUser}>Contactar</Boton>
    )
  }


  return (
    <div>
      <div className={s.Content}>
        <div className={s.Header}>
          <img className={s.ProfileImg}
            src={user.usr_photo}
            alt="profilePicture"
          ></img>
          <div className={s.EditProfile}>
            {button()}
            {/* <Boton colorBtn={"btn_azulLine"} onClick={contactUser}>Contactar</Boton>
            <Link to={`/editprofile/${user.usr_id}`}>
            <Boton colorBtn={"btn_azulLine"}>Editar Perfil</Boton>
            </Link> */}
          </div>
        </div>
        <h2 className={s.UserName}>{user.usr_username}</h2>
        <div className={s.ProfileInfo}>{user.usr_description}</div>


        {/* Cards de jobs y posts ↓ */}
        <div className={s.Cards}>
          <div>
            <Cards key="job" profiledata={user.jobs} profileType={"jobs"}></Cards>
          </div>
          <div>
          <Cards key="post" profiledata={user.posts} profileType={"posts"}></Cards>
          </div>
        </div>
      </div>
    </div>
  );
};
