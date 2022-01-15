import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import styles from "./Home.module.css";
import { SearchBar } from "../SearchBar/SearchBar";
import Boton from '../Boton/Boton'
import FormEmpleador from "../FormEmpleador/FormEmpleador";
import AppChat from '../Chat/AppChat.js';


export default function Home() {
  const dispatch = useDispatch();

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
      <FormEmpleador/>
      <AppChat />
    </div>
  );
};