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
}));

const ChatWindow = () => {
    const myId = useSelector(state => state.auth.uid);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [receiverUser, setReceiverUser] = useState({});
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState([]);
    console.log("userChats", users);
    const [displayInBox, setDisplayInBox] = useState(false);
    const [data, setData] = useState([]);
    console.log("data chat", data);

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
        setUsers(data?.map(chat => {
            return {
                chatId: chat.chat_id,
                user: chat.users.find(u => u.usr_id !== myId)
            }
        }));
        console.log("result", users)
    }, [data]);


    const handleOpenChat = (e, chatId, user) => {
        e.preventDefault();
        console.log("ids", chatId, user);
        setChatId(chatId);
        setReceiverUser(user);
        setOpenChat(!openChat);
    }

    const handleDisplayInBox = (e) => {
        e.preventDefault();
        setOpenChat(!openChat);
    };


    return (
        <>
            <Tooltip title="messenger" aria-label="chat" onClick={() => setOpen(true)}>
                <Fab color="secondary" className={classes.fab}>
                    <MessageIcon />
                </Fab>
            </Tooltip>
            <Modal open={open}>

                <div>
                    <Container className={classes.container}>
                        <div className='chatMenu'>
                            <div className='chatMenuWrapper'>
                                <input placeholder='Search for Contacts' className='chatMenuInput' />
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
                        {
                            openChat && (
                                <div>
                                    <button onClick={handleDisplayInBox}>X</button>
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
                        <div className={classes.item}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Salir
                            </Button>
                        </div>
                    </Container>
                </div>
            </Modal>
        </>
    )
}

export default ChatWindow;