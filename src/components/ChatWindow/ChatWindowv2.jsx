import {
    Button,
    Container,
    Fab,
    makeStyles,
    Modal,
    Tooltip,
} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mensajes from '../Messenger/Mensajes/Mensajes';
import Chat from "../Messenger/Chat/Chat";
import "./chatWindow.css";
import socket from "../socket";
import ChatMessages from "./ChatMessages";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row-reverse",
        width: 1000,
        height: 800,
        backgroundColor: "none",
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
}));

const ChatWindowv2 = ({ receiverData }) => {
    const myId = useSelector(state => state.auth.uid);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersCopy, setUsersCopy] = useState([]);
    const [receiverUser, setReceiverUser] = useState({});
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState([]);
    console.log("userChats", users);
    const [displayInBox, setDisplayInBox] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.emit("data", myId);
        socket.on("data", async (data) => {
            const newData = await data;
            setData(newData);
        })
        socket.on("message", (data) => {
            socket.emit("data", myId);
        });
    }, [myId]);

    useEffect(() => {
        const newData = data?.map(chat => {
            return {
                chatId: chat.chat_id,
                user: chat.users.find(u => u.usr_id !== myId)
            }
        })
        setUsers(newData);
        setUsersCopy(newData);
        if (receiverData) {
            setReceiverUser(receiverData);
            setOpenChat(true);
        }
    }, [data, receiverData]);


    const handleOpenChat = (e, chatId, user) => {
        e.preventDefault();
        setChatId(chatId);
        setReceiverUser(user);
        setOpenChat(!openChat);
    }

    const handleDisplayInBox = (e) => {
        e.preventDefault();
        setOpenChat(!openChat);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        const newUsers = usersCopy.filter(user => {
            return user.user.usr_username.toLowerCase().includes(value.toLowerCase());
        });
        setUsers(newUsers);
    }


    return (
        <>
            {
                receiverData ? (
                    <Tooltip title="messenger" aria-label="chat" onClick={() => setOpen(true)}>
                        <button className="btn-detalle" >
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                    </svg>
                                </div>
                            </div>
                            <span>Abrir Chat</span>
                        </button>
                    </Tooltip>
                ) : (
                    <Tooltip title="messenger" aria-label="chat" onClick={() => setOpen(true)}>
                        <MessageIcon />
                    </Tooltip>
                )
            }
            <Modal open={open}>
                <Container className={classes.container}>
                    <div className='chatMenu'>
                        <div className='chatMenuWrapper'>
                            <div className="chat-header">
                                <input onChange={handleSearch} placeholder='Search for Contacts' className='chatMenuInput' />
                                <button onClick={() => setOpen(false)}>
                                    X
                                </button>
                            </div>
                            <div className='chatMenuList'>
                                {
                                    users?.length === 0 && (
                                        <h3>No tienes chats</h3>
                                    )
                                }
                                {
                                    users?.map(u => (
                                        <button key={u.user?.usr_id} onClick={(e) => handleOpenChat(e, u.chatId, u.user)} >
                                            <Chat
                                                receiverName={u.user?.usr_username}
                                                receiverPhoto={u.user?.usr_photo}
                                            />
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className='chatWindow'>
                        {
                            openChat && (
                                <div className="caja">
                                    <button className="closechat" onClick={handleDisplayInBox}>X</button>
                                    <ChatMessages
                                        chatId={chatId}
                                        myId={myId}
                                        receiverId={receiverUser.usr_id}
                                        receiverName={receiverUser.usr_username}
                                        receiverPhoto={receiverUser.usr_photo}
                                    />
                                </div>
                            )
                        }
                    </div>
                </Container>
            </Modal>
        </>
    )
}

export default ChatWindowv2;