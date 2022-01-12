import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { getJobs, getPosts } from "../../controllers";
import { SearchBar } from "../SearchBar/SearchBar";
import Boton from '../Boton/Boton'
import FormEmpleador from "../FormEmpleador/FormEmpleador";

export default function Home() {
  const dispatch = useDispatch();
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
        <div className={styles.newPostButton}>
        <Boton
          data-toggle="modal"
          data-target="#FormEmpleador"
          colorBtn='btn_azul'
        >
          Nuevo post
        </Boton>
        </div>
      </div>
      <div className={styles.divJobs}>
        <Cards />
      </div>
      <button onClick={handleLogout}>Logout</button>
      <FormEmpleador/>
    </div>
  );
};