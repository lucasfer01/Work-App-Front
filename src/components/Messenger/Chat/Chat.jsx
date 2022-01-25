import React from 'react';
import "./chat.css";


const Chat = ({receiverName, receiverPhoto}) => {

    return (
        <div className='conversation2'>
            <img className='conversationImg' 
            src={receiverPhoto}
            alt=""
            />
            <span className='conversationName'>{receiverName}</span>
        </div>
    )
}

export default Chat
