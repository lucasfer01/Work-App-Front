import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { getJobs, getPosts } from "../../controllers";
import Boton from "../Boton/Boton";
import Cards from "../Cards/Cards";
import s from "./ProfileDetails.module.css"


export const ProfileDetails = ({type}) => {
  const dispatch = useDispatch();
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

    <div className={s.Content}>
      <div className={s.Header}>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqph.fs.quoracdn.net%2Fmain-qimg-7ca600a4562ef6a81f4dc2bd5c99fee9-c&f=1&nofb=1"
          alt="profilePicture"
        ></img>
        
        <div className={s.EditProfile}>
        <Boton  colorBtn={"btn_azulLine"} onClick={()=>{"aqui tu función"}}>Edit Profile</Boton>
        </div>
      </div>
      <h2 className={s.UserName}>User Name</h2>
      <div className={s.ProfileInfo}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>


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
