import React from 'react';
//Enviroment
import { CHECKOUT_URL } from '../../enviroment';
// Axios
import axios from 'axios';

export default function Checkout({ dataPago }) {

    const dataPagoPrueba = {
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "cat123",
        quantity: 1,
        unit_price: 10
    }

    // Controlador paraenviar formulario
    function handleOnSubmit(e) {
        e.preventDefault()

        axios.post(CHECKOUT_URL, dataPago || dataPagoPrueba) // Enviamos la data recibida por parametro
            .then(response => window.location.href = response.data.init_point) // Cuando la promesa se resuelva redirige a link para realizar pago
            .catch(error => console.log(error))
    }


    return (
        <form onSubmit={handleOnSubmit}>
            <button type='submit' >COMPRAR</button>
        </form>
    )
}