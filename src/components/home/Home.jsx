import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { getJobs, getPosts } from "../../controllers";

export default function Home() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div>
      <div>
        <h3>Filters here</h3>
      </div>
      <div className={styles.divJobs}>
        <Cards />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};