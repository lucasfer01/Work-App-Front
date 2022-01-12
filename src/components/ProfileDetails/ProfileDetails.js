import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { profileUser } from "../../actions/profileActions";
import { getJobs, getPosts } from "../../controllers";
import Boton from "../Boton/Boton";
import Cards from "../Cards/Cards";
import s from "./ProfileDetails.module.css"


export const ProfileDetails = () => {

  const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, []);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const contactUser = () =>{
    alert(`Contactando a ${user.usr_username}`) //cambiar a enlace a wsp u otra app
  }

// console.log("user", user)
  return (
    <div>
      <div className={s.Content}>
        <div className={s.Header}>
          <img className={s.ProfileImg}
            src={user.usr_photo}
            alt="profilePicture"
          ></img>
          <div className={s.EditProfile}>
            <Boton colorBtn={"btn_azulLine"} onClick={contactUser}>Contactar</Boton>
            {/* <Boton colorBtn={"btn_azulLine"} onClick={() => { "aqui tu función" }}>Editar Perfil</Boton> */}
          </div>
        </div>
        <h2 className={s.UserName}>{user.usr_username}</h2>
        <div className={s.ProfileInfo}>{user.usr_description}</div>


        {/* Cards de jobs y posts ↓ */}
        <div className={s.Cards}>
          <div className={s.JobsCard}>
            <Cards key="job" profiledata={user.jobs} profileType={"jobs"}></Cards>
          </div>
          <div>
          <Cards key="post" profiledata={user.posts} profileType={"posts"}></Cards>
          </div>
        </div>
        <div className={s.Logout}>
          <Boton colorBtn={"btn_azulLine"} onClick={handleLogout}>Logout</Boton>
        </div>
      </div>
    </div>
  );
};
