import { QueryDocumentSnapshot } from "@firebase/firestore";
import React from "react";
import styles from "./Boton.module.css"

export default function Boton({children, colorBtn, onClick, ...props}){
    return (
        <button className={`${styles.btn} ${styles[colorBtn]}`} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

// instrucciones de uso: 

// 1 importar componente Boton; 
// 2 asgnar una clase de boton entre las 4 existentes y ponerla en la propiedad "colorBtn"
// btn_azul
// btn_rojo
// btn_azulLine
// btn_rojoLine
// 4 pasarle la funcion onClick en la propiedad onClick
// 5 Disfrutar lo lindo que quedo
// Ejemplo: 
// <Boton colorBtn={"btn_azulLine"} onClick={()=>{"aqui tu función"}}>Texto del boton</Boton>