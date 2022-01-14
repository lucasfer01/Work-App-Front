import React, { useEffect, useState } from "react";
import "./chat.css";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";



export default function Chat() {
    
    const [chat, setChat] = useState({
        userName: "",
        message: "",
    });

    const [messages, setMessages] = useState([]);
    console.log("messages: ", messages);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("message", (data) => {
            console.log("data: ", data);
            setMessages(messages => [...messages, data]);
        });
    }, []);

    const handleChange = (e) => {
        setChat({
            ...chat,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const socket = socketIOClient(ENDPOINT);
        socket.emit("message", chat);
    }

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-output">
                    {
                        messages.map((m, i) => {
                            return (
                                <div key={i} className="chat-message">
                                    <p className="user-name-message">{m.userName}</p>
                                    <p className="message-body">{m.message}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-actions">

                </div>
            </div>
            <form >
                <input className="inputdata" type="text" placeholder="User name" name="userName" value={chat.userName} onChange={handleChange} />
                <input className="inputdata" type="text" placeholder="Message" name="message" value={chat.message} onChange={handleChange} />
                <button className="send" onClick={handleSubmit}>Send</button>
            </form>
        </div>
    )
}