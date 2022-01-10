import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { getJobs, getPosts } from "../../controllers";
import { SearchBar } from "../SearchBar/SearchBar";

export default function Home({type}) {
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
      <div className={styles.search}>
      <SearchBar  />
      </div>
      <div>
        <h3>Filters here</h3>
      </div>
      <div className={styles.divJobs}>
        <Cards type={type} data={data} />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};