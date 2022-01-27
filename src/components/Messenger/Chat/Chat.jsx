import React from 'react';
import "./chat.css";
import {IMG} from "../../../enviroment"

const Chat = ({receiverName, receiverPhoto}) => {
    let photo = receiverPhoto ? receiverPhoto : IMG;

    return (
        <div className='conversation2'>
            <img className='conversationImg' 
            src={photo}
            alt=""
            />
            <span className='conversationName'>{receiverName}</span>
        </div>
    )
}

export default Chat
