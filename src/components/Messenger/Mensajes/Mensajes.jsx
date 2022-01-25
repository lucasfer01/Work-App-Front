import React from 'react';
import "./mensajes.css";

const Mensajes = ({text, userPhoto, own}) => {

    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <img className='messageImg'
                src={userPhoto}
                alt=""
                />
                <p className='messageText'>{text}</p>
            </div>
            <div className='messageBottom'>1 hour ago</div>
        </div>
    )
}

export default Mensajes
