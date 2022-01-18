import React from 'react';
import "./mensajes.css";

const Mensajes = ({own}) => {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <img className='messageImg'
                src="https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FDragonBall.jpg?alt=media&token=8b489b89-0177-4a73-bd52-8b1afb4ba6b3"
                alt=""
                />
                <p className='messageText'>Lorem Ipsum es simplemente el texto de relleno de las imprenta.
                    </p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}

export default Mensajes
