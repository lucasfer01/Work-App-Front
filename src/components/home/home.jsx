import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { getJobs } from "../../actions/formJobs";
import { getUserChats } from "../../actions/chatActions";
import { profileUser } from "../../actions/profileActions";
import { getPosts } from "../../controllers";
import { SearchBar } from "../SearchBar/SearchBar";
import Boton from '../Boton/Boton'
import FormEmpleador from "../FormEmpleador/FormEmpleador";
// import Chat from "../chat/chat";
import Filtros from "../Filtros/Filtros";
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

  const user = useSelector((state) => state.auth);
  let location = window.location.pathname;

  useEffect(() => {
    if (location === "/home") {
      setType("posts");
    } else if (location === "/jobs") {
      setType("jobs");
    }
  }, [location]);

  useEffect(() => {
    const effect = async () => {
      await dispatch(profileUser(user.uid, "own"));
      await dispatch(getJobs());
      return "Datos cargados";
    }
    effect();
  }, [dispatch]);

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
              <div>
                <Filtros />
                <Feed />
              </div>
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
