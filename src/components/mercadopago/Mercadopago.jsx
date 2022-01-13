import React from 'react';
//Enviroment
import { CHECKOUT_URL } from '../../enviroment';
// Axios
import axios from 'axios';
// react-router-dom
import { useNavigate } from 'react-router-dom';

export default function Checkout(dataPago) {

    const dataPagoPrueba = {
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "cat123",
        quantity: 1,
        unit_price: 10
    }

    function handleOnSubmit(e) {
        e.preventDefault()

        axios.post(CHECKOUT_URL, dataPagoPrueba)
        .then(response => window.location.href = response.data.init_point)
        .catch(error => console.log(error))
    }


    return (
        <form onSubmit={handleOnSubmit}>
            <button type='submit' >COMPRAR</button>
        </form>
    )
}