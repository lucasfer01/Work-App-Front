import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { profileUser } from "../../actions/profileActions";
import { getJobs, getPosts } from "../../controllers";
import { profileReducer } from "../../reducers/profileReducer";
import { NavBar } from "../auth/NavBar/NavBar";
import Boton from "../Boton/Boton";
import Cards from "../Cards/Cards";
import s from "./ProfileDetails.module.css"


export const ProfileDetails = ({type}) => {
  const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, []);
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

  return (
    <div>
      {/* <div>
        <NavBar />
      </div> */}
    <div className={s.Content}>
      <div className={s.Header}>
        <img
          src={user.usr_photo}
          alt="profilePicture"
        ></img>
        
        <div className={s.EditProfile}>
        <Boton  colorBtn={"btn_azulLine"} onClick={()=>{"aqui tu función"}}>Edit Profile</Boton>
        </div>
      </div>
      <h2 className={s.UserName}>{user.usr_username}</h2>
      <div className={s.ProfileInfo}>{user.usr_description}</div>


      {/* Cards de jobs y posts ↓ */}
      <div className={s.Cards}>
      <div className={s.JobsCard}> 
        <Cards type={type} data={data}></Cards>
      </div>
      <div className={s.PostsCard}>
        <div>Post 1</div>
        <div>Post 2</div>
        <div>Post 3</div>
      </div>
      </div>
      <div className={s.Logout}>
      <Boton colorBtn={"btn_azulLine"} onClick={handleLogout}>Logout</Boton>
      </div>
    </div>
          </div>
  );
};
