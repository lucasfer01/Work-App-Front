import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./chatonline.css";
import Mensajes from '../Mensajes/Mensajes';
import { getProfile } from "../../../controllers";
import Chat from '../Chat/Chat';
import ChatWindow from '../ChatWindow/ChatWindow';


const Chatonline = ({ data }) => {
    const myId = useSelector(state => state.auth.uid);
    console.log("datachat", data)
    const [openChat, setOpenChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [receiverUser, setReceiverUser] = useState({});
    const [chatId, setChatId] = useState("");
    const chats = data;
    const [messages, setMessages] = useState([]);
    console.log("userChats", users);
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


    return (
        <div className='chatOnline'>
            {
                openChat && <div>
                    <div>
                        <button onClick={() => setOpenChat(false)}>X</button>
                    </div>
                    <div>
                        <ChatWindow
                            chatId={chatId}
                            myId={myId}
                            receiverId={receiverUser.usr_id}
                            receiverName={receiverUser.usr_username}
                            receiverPhoto={receiverUser.usr_photo}
                        />
                    </div>
                </div>
            }
            {
                users?.map(u => (
                    <button key={u.user.usr_id} onClick={(e) => handleOpenChat(e, u.chatId, u.user)}>
                        <div className='chatOnlineFriend'>
                            <div className='chatOnlineImgContainer'>
                                <img className='chatOnlineImg'
                                    src={u.user?.usr_photo}
                                    alt=""
                                />
                                <div className='chatOnlineBadge'></div>
                            </div>
                            <span className='chatOnlineName'>{u.user?.usr_username}</span>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}

export default Chatonline
