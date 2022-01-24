import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./ChatWindow.css";
import Mensajes from '../Mensajes/Mensajes';
import { getProfile } from "../../../controllers";
import Chat from '../Chat/Chat';
import socket from '../../socket';


const ChatWindow = (props) => {
    const {chatId, myId, receiverId, receiverName, receiverPhoto} = props
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({
        sender: myId,
        receiver: receiverId,
        message: "",
    });

    useEffect(() => {
        socket.emit("register", myId);
        socket.emit("chat-history", ({chatId, senderId: myId, receiverId}));
        socket.on("chat-history", async (data) => {
            const chatHistory = await data;
            console.log("chatHistory", chatHistory);
            setMessages(chatHistory);
        });
        socket.on("response", (data) => {
            console.log("response: ", data);
            setMessages(messages => [...messages, data]);
        });
    }, [chatId]);

    const handleChange = (e) => {
        setNewMessage({
            ...newMessage,
            message: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, newMessage]);
        socket.emit("message", newMessage);
    }




    return (
        <div className='chatBox'>
            <div className='chatBoxWrapper'>
                <span>{receiverName}</span>
                <div className='chatBoxTop'>
                    {
                        messages?.map(message => (
                            <Mensajes
                                key={message.id}
                                text={message.message}
                                own={message.sender === myId ? true : false}
                            />
                        ))
                    }
                </div>
                <div className='chatBoxBottom'>
                    <textarea onChange={handleChange} className='chatMessageInput' placeholder='Write something...'></textarea>
                    <button onClick={handleSubmit} className='chatSubmitButton'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;