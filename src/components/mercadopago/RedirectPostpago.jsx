// React
import axios from 'axios';
import React, { useEffect } from 'react';
// React-router-dom
import { useLocation, useNavigate } from 'react-router-dom';
// Url's
import { POSTPAGO_URL } from '../../enviroment';
// Loading Screen
import {LoadingScreen} from '../loadingScreen/LoadingScreen';

export function RedirectPostpago() {
  // useNavigate
  const navigate = useNavigate();

  // Query handler
  function useQuery() {
    // Obtenemos "search" de useLocation
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  // Usamos el query handler
  const query = useQuery();

  // useEffect
  useEffect(() => {
    // Obtenemos el external_reference
    const external_reference = query.get('external_reference');

    // Realizamos llamada al back para chequear el pago y cambiar el plan en caso de aprobado
    axios.get(`${POSTPAGO_URL}/${external_reference}`)
    .then(response => navigate('/home'))
    .catch(error => console.log(error));
  }, [])

  return <div>
    <LoadingScreen/>
  </div>;
}