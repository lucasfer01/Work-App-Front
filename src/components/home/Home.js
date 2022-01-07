import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import Jobs from "../Jobs/Jobs";
import styles from "./Home.module.css";

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
        <Jobs />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
