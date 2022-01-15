import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileUser } from "../../actions/profileActions";
import "./chat.css";
import axios from "axios";
import socket from "../socket";


export default function Chat({ userProfile}) {
    const [chat, setChat] = useState({
        userName: "",
        message: "",
    });
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);

    console.log("user", user);
    console.log("messages", messages);

    useEffect(() => {
        socket.emit("join", { room: "room test"});
        socket.on("message", (data) => {
            console.log("data: ", data);
            setMessages(messages => [...messages, data]);
        });
        return () => {
            socket.off("message");
        }
    }, []);

    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleChange = (e) => {
        setChat({
            userName: user.name,
            message: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, chat]);
        socket.emit("message", {
            ...chat,
            response: true,
        });
    }

    return (
        <div className="chat-container">
            <div className="chat-window">
                <div className="chat-output">
                    {
                        messages.map((m, i) => {
                            return (
                                <div key={i} className={m.response ? "chat-message-response" : "chat-message"}>
                                    <p className="user-name-message">{m.userName}</p>
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