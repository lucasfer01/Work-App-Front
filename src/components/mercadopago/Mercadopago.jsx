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

export default function Checkout() {
    // Estados
    const [canBuy, setCanBuy] = useState(false);
    
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
            if(usr_plan === 'free') { // Si el plan del usuario es free...
                // Seteamos el estado de setCanBuy a true
                setCanBuy(true);
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
        <form onSubmit={handleOnSubmit}>
            <button disabled={!canBuy} className={canBuy ? canBuyStyle.pagoButtonCanBuy : cantBuyStyle.pagoButtonCantBuy} type='submit'>COMPRAR</button>
        </form>
    )
}