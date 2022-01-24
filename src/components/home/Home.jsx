import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { getJobs, getPosts } from "../../controllers";
import { SearchBar } from "../SearchBar/SearchBar";
import Boton from '../Boton/Boton'
import FormEmpleador from "../FormEmpleador/FormEmpleador";
import Leftbar from "../NewNav/Leftbar/Leftbar";
import Feed from "../NewNav/Feed/Feed";
import Rightbar from "../NewNav/Rightbar/Rightbar";
import Add from "../NewNav/Add/Add";
import NewNav from "../NewNav/NewNav";
// import socket from "../socket";

// import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));




export default function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [type, setType] = useState("");

let location = window.location.pathname;

useEffect(() => {
  if (location === "/home") {
    setType("posts");
  } else if (location === "/jobs") {
    setType("jobs");
  }
}, [location]);

  return (
    <div>
      <NewNav />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
          {
            type === "posts" && (
              <Feed />
            )
          }
          {
            type === "jobs" && (
              <div className={styles.divJobs}>
                <Cards />
              </div>
            )
          }
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};
