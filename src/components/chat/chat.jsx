import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileUser } from "../../actions/profileActions";
import "./chat.css";
import axios from "axios";
import socket from "../socket";
import { getProfile } from "../../controllers";



export default function Chat({receiverUser}) {
    const [allChats, setAllChats] = useState({});
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const [chat, setChat] = useState({
        sender: user.name,
        receiver: receiverUser?.usr_username,
        message: "",
    });

    console.log("chat", chat);


    useEffect(() => {
        socket.emit("register", user.name);
        socket.on("message", (data) => {
            console.log("data: ", data);
            setMessages(messages => [...messages, data]);
            setChat({
                ...chat,
                receiver: data.sender,
            })
        });
    }, []);

    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleChange = (e) => {
        setChat({
            ...chat,
            message: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, chat]);
        socket.emit("message", chat);
    }

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-output">
                    {
                        messages.map((m, i) => {
                            return (
                                <div key={i} className={m.sender === user.name ? "chat-message" : "chat-message-response"}>
                                    <p className="user-name-message">{m.sender}</p>

                                    <p className="message-body">{m.message}</p>
                                </div>
                            )
                        })
                    }
                    <div ref={divRef}></div>
                </div>
                <div className="chat-actions">

                </div>
            </div>
            <form >
                <p className="inputdata">{user.name}</p>
                <input className="inputdata" type="text" placeholder="Message" name="message" value={chat.message} onChange={handleChange} />
                <button className="send" onClick={handleSubmit}>Send</button>
            </form>
        </div>
    )
}