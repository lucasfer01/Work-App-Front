// React
import React from 'react';
// Components
import Mercadopago from '../mercadopago/Mercadopago'; // Boton pagar
// Estilos
import planEstilos from './Plan.module.css';

export function Plan() {
  return <div className={planEstilos.contenedor}>
      <h1 className={planEstilos.tituloH1}>Conseguí trabajo más rápido con <br /> <span className={planEstilos.spanTitulo}>WorkApp Premium</span></h1>
      <Mercadopago/>
  </div>;
}