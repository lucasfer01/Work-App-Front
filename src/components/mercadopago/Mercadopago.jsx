// React
import React, { useEffect, useState } from 'react';
//Enviroment
import { CHECKOUT_URL, POST_USER } from '../../enviroment';
// Axios
import axios from 'axios';
// React-redux
import { useSelector } from 'react-redux';
// Estilos
import canBuyStyle from './style/mercadopago_canBuy.module.css'; // Puede comprar
import cantBuyStyle from './style/mercadopago_cantBuy.module.css'; // No puede comprar
import formStyle from './style/mercadopago.module.css';
// Img
import spinner from './assets/loading-buffering.gif';

export default function Checkout() {
    // Estados
    const [canBuy, setCanBuy] = useState(true);
    const [loader, setLoader] = useState(false);
    
    // Seleccionamos el id del estado global
    const userId = useSelector(state => state.auth.uid);

    // useEffect
    useEffect(() => {
        // Obtener el usuario por el id
        axios.get(`${POST_USER}/${userId}`)
        .then(user => {
            // Obtenemos la propiedad usr_plan
            const { usr_plan } = user.data;

            // Verifiacmos el plan del usuario
            if(usr_plan === 'premium') { // Si el plan del usuario es free...
                // Seteamos el estado de setCanBuy a true
                setCanBuy(false);
            }
        })
    },[])

    // Informacion de pago
    const dataPago = {
        items: {
            title: "WorkApp Premium",
            description: "Plan premium de WorkApp para mejorar el alcance",
            picture_url: "http://www.myapp.com/myimage.jpg",
            category_id: "cat123",
            quantity: 1,
            unit_price: 500
        },
        usr_id: userId
    }

    // button handler
    function handlerOnClick() {
        // Seteamos el loader en true
        setLoader(true);
    }

    // Controlador para enviar formulario
    function handleOnSubmit(e) {
        // Prevenir accion por defecto
        e.preventDefault()

        // Comenzamos le proceso de pago
        axios.post(CHECKOUT_URL, dataPago) // Enviamos la data recibida por parametro
            .then(response => window.location.href = response.data.init_point) // Cuando la promesa se resuelva redirige a link para realizar pago
            .catch(error => console.log(error))
    }


    return (
        <form className={formStyle.container} onSubmit={handleOnSubmit}>
            <button disabled={!canBuy} onClick={handlerOnClick} className={canBuy ? canBuyStyle.pagoButtonCanBuy : cantBuyStyle.pagoButtonCantBuy} type='submit'>COMPRAR</button>

            {loader && <img className={formStyle.spinner} src={spinner} alt='spinner'/>}

            {!canBuy && <h3>Ya tenes WorkApp Premium 👍</h3>}
        </form>
    )
}