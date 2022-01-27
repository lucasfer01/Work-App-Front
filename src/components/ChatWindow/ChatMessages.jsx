import {
    Button,
    Container,
    Fab,
    makeStyles,
    Modal,
    Tooltip,
} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
import React, { useState, useEffect, useRef } from "react";
import Mensajes from '../Messenger/Mensajes/Mensajes';
import Chat from "../Messenger/Chat/Chat";
import "./chatWindow.css";
import socket from "../socket";
import {IMG} from "../../enviroment"

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: "22px",
        right: "7%",
    },
    container: {
        width: 1000,
        height: 800,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
    },
    item: {
        marginBottom: theme.spacing(3),
    },
    messagesWindow: {
        height: "63vh",
        overflowY: "scroll",
    }
}));


const ChatMessages = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { chatId, myId, receiverId, receiverName, receiverPhoto } = props
    let photo = receiverPhoto ? receiverPhoto : IMG;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({
        sender: myId,
        receiver: receiverId,
        message: "",
    });
    const divRef = useRef(null)

    useEffect(() => {
        socket.emit("register", myId);
        socket.emit("chat-history", ({ chatId, senderId: myId, receiverId }));
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

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
        setNewMessage({
            ...newMessage,
            message: "",
        });
    }


    return (
        <div className="chat-messages">
            <div className='conversation'>
                <img className='conversationImg'
                    src={photo}
                    alt=""
                />
                <span className='conversationName'>{receiverName}</span>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className={classes.messagesWindow}>
                        {
                            messages?.map(message => (
                                <Mensajes
                                    key={message.id}
                                    text={message.message}
                                    own={message.sender === myId ? true : false}
                                />
                            ))
                        }
                        <div ref={divRef}></div>
                    </div>
                    <div className='chatBoxBottom'>
                        <textarea 
                        onKeyPress={(e) => {
                             if (e.key === "Enter") {
                                handleSubmit(e)
                            }
                        }} 
                        onChange={handleChange}
                        value={newMessage.message} 
                        className='chatMessageInput' 
                        placeholder='Write something...'>
                        </textarea>
                        <button onClick={handleSubmit} className='chatSubmitButton' >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessages;