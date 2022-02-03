import React from 'react';
import "./mensajes.css";

const Mensajes = ({text, own, date}) => {
    let msgDate;
    if (!date) {
        msgDate = new Date().toLocaleTimeString().slice(0, -3);
    }   else {
        msgDate = convertDate(date);
    }
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className='messageTop'>
                <p className='messageText'>{text}</p>
            </div>
            <div className='messageBottom'>{msgDate}</div>
        </div>
    )
}

export default Mensajes

function convertDate(date) {
    let data = date.split("T")[1].slice(0, 5);
    let hour = parseInt(data.split(":")[0]) - 3;
    let result = `${hour}:${data.split(":")[1]}`;
    return result;
}
